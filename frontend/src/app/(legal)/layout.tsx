import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LegalLinks } from "@/features/legal/components/LegalLinks";

/** Public, auth-free shell for Impressum and Datenschutz: readable column, back link and legal links footer. */
export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 px-4 py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <Button asChild variant="ghost" size="sm" className="-ml-3 text-zinc-400">
          <Link href="/login">
            <ArrowLeft className="size-4" />
            Zurück zu Kraftmeister
          </Link>
        </Button>

        <main className="space-y-8">{children}</main>

        <footer className="border-t border-zinc-800 pt-6">
          <LegalLinks />
        </footer>
      </div>
    </div>
  );
}
