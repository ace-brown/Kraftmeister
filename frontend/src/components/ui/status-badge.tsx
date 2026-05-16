import { cn } from "@/lib/utils";

type Status = "open" | "in-progress" | "done" | "cancelled" | "draft" | "paid";

interface Props {
  status: Status;
}

const styles: Record<Status, string> = {
  open: "bg-blue-500/10 text-blue-400",
  "in-progress": "bg-yellow-500/10 text-yellow-400",
  done: "bg-green-500/10 text-green-400",
  cancelled: "bg-red-500/10 text-red-400",
  draft: "bg-zinc-700 text-zinc-300",
  paid: "bg-emerald-500/10 text-emerald-400",
};

export function StatusBadge({ status }: Props) {
  return (
    <span
      className={cn("px-2 py-1 rounded-md text-xs font-medium", styles[status])}
    >
      {status}
    </span>
  );
}
