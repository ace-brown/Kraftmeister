# Docker Issues Log

A running log of Docker infrastructure problems on this machine, their root causes, and
permanent fixes. Add new entries at the top with a timestamp.

---

## 2026-06-07 — "cannot stop container: permission denied" on rebuild/up (RESOLVED)

### Symptom

`docker compose up --build` (and plain `docker compose up`) failed when it tried to recreate
a running container:

```
✘ Container ... Error response from daemon: cannot stop container: <id>: permission denied
Error response from daemon: cannot stop container: <id>: permission denied
```

Long-running containers (`Up 34h`, `Up 35h`, `Up 36h`) could not be stopped by the daemon.
One container showed a hash-prefixed name (`ce52e5e8d65f_ai-service`) — the artifact of a
half-recreated container after a failed stop. This had recurred **three times in one month**.

### Root cause

**Docker was installed twice on this machine — once via the Canonical `snap`, once via the
official `apt` repo (`docker-ce`) — and the snap was winning.**

- The `apt` engine (`docker-ce` 29.5.0) was installed with its socket at `/run/docker.sock`
  and data dir `/var/lib/docker`.
- The Canonical `docker` **snap** (29.3.1) was *also* installed. The snap grabbed
  `/var/run/docker.sock` and ran the active engine, with data dir
  `/var/snap/docker/common/var-lib-docker`.
- Telltale sign: client reported **29.5.0** (apt CLI) while the engine answering reported
  **29.3.1** (snap) — a version skew.

Why it broke repeatedly: **snaps auto-refresh in the background** on snapd's own schedule
(several times a month — matching the "three times in a month" cadence). On each refresh:

1. The snap daemon restarts under a **new snap revision**.
2. Each revision gets its **own AppArmor confinement profile**, tied to the revision path.
3. Containers started *before* the refresh are confined under the **old** profile.
4. The **new** daemon lacks AppArmor permission to signal processes confined under the **old**
   profile → `cannot stop container: ... permission denied`.

This has **nothing** to do with `sudo` or `dnsmasq`. Those were symptoms/workarounds from an
earlier instance of this same snap problem and were misleading.

### Solution (permanent)

Remove the snap entirely and run only the apt `docker-ce` engine (no auto-refresh, single
stable AppArmor profile, standard `/var/lib/docker` data dir, managed by systemd).

```bash
# 1. Remove the Canonical docker snap (snapd saves a data snapshot automatically)
sudo snap remove docker

# 2. Snap removal deletes /run/docker.sock out from under the still-running apt dockerd,
#    leaving docker.socket in a stale "active but no file" state. Recreate the socket:
sudo systemctl restart docker.socket docker.service

# 3. Verify the apt engine is now serving:
docker info | grep -iE "Server Version|Docker Root Dir"
#   → Server Version: 29.5.0
#   → Docker Root Dir: /var/lib/docker   (NOT /var/snap/...)

# 4. Clean rebuild of the project stack:
docker compose down
docker compose up --build
```

After this, `docker compose down` runs with **no permission errors** — confirming the snap
was the culprit.

### Hardening — keep it from coming back

The whole problem was the snap existing at all. To prevent any tool or future `apt`/`snap`
suggestion from reinstalling it:

```bash
snap list | grep -i docker        # should return nothing
# Optional belt-and-suspenders: block the snap from ever reinstalling
# (uncomment to apply)
# sudo snap refresh --hold docker   # only useful if docker snap is installed; we removed it
```

If `docker info` ever again shows `Docker Root Dir: /var/snap/docker/...` or a client/engine
version skew, the snap has crept back in — remove it again.

### Notes on shutting down cleanly

- **Always run `docker compose down` before shutting down or rebooting.** This cleanly removes
  all containers so Docker starts fresh. Containers that survive a reboot may lose their
  network connection and can't be reached by hostname.
- If a container is running but unreachable by hostname (e.g. `redis`, `postgres`), check its
  network and reconnect it:
  ```bash
  docker inspect <name> | grep -A5 '"Networks"'
  # If Networks is empty, reconnect it:
  docker network connect kraftmeister_default <name>
  ```
- **Never run `docker` / `docker compose` with `sudo`.** With the apt engine you don't need to —
  your user is in the `docker` group. Using `sudo` creates root-owned containers that are
  harder to manage.
