import Link from "next/link";

/** Small Impressum / Datenschutz links; required on every page, so used on auth pages, legal pages and the sidebar. */
export function LegalLinks() {
  return (
    <nav className="flex items-center justify-center gap-4 text-xs text-zinc-500">
      <Link href="/impressum" className="hover:text-zinc-300 hover:underline underline-offset-4">
        Impressum
      </Link>
      <Link href="/datenschutz" className="hover:text-zinc-300 hover:underline underline-offset-4">
        Datenschutz
      </Link>
    </nav>
  );
}
