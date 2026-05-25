import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/Typography";
import { JobDetailStatusProps } from "@/features/jobs/types";

const STATUSES = ["open", "in-progress", "done"] as const;

export function JobDetailStatus({ status }: JobDetailStatusProps) {
  return (
    <section className="mb-6">
      <TypographyH2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide mb-3 pb-0">
        Status
      </TypographyH2>
      <div className="flex items-center gap-2 flex-wrap">
        {STATUSES.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <Button
              variant={status === s ? "secondary" : "outline"}
              size="sm"
              disabled
              className={status === s ? "border-white text-white" : "border-zinc-700 text-zinc-500"}
            >
              {s.toUpperCase()}
            </Button>
            {i < STATUSES.length - 1 && (
              <span className="text-zinc-600 text-xs">→</span>
            )}
          </div>
        ))}
        <span className="text-zinc-600 text-xs mx-1">·</span>
        <Button variant="outline" size="sm" disabled className="border-zinc-700 text-zinc-500">
          CANCEL
        </Button>
      </div>
    </section>
  );
}
