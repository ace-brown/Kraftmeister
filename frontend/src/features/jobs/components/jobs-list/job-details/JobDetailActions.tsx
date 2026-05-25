import Link from "next/link";
import { Button } from "@/components/ui/button";

export function JobDetailActions() {
  return (
    <div className="flex items-center justify-between mb-6">
      <Link
        href="/jobs"
        className="text-sm text-zinc-400 hover:text-white transition-colors"
      >
        ← Back to Jobs
      </Link>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" disabled>
          Edit
        </Button>
        <Button size="sm" disabled>
          + Quote
        </Button>
      </div>
    </div>
  );
}
