import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/Typography";
import { JOB_STATUS_LABELS, JobDetailStatusProps } from "@/features/jobs/types";

const FLOW_STATUSES = ["OPEN", "IN_PROGRESS", "DONE"] as const;

export function JobDetailStatus({ status, onStatusChange }: JobDetailStatusProps) {
  return (
    <section className="mb-6">
      <TypographyH2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide mb-3 pb-0">
        Status
      </TypographyH2>
      <div className="flex items-center gap-2 flex-wrap">
        {FLOW_STATUSES.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <Button
              variant={status === s ? "secondary" : "outline"}
              size="sm"
              disabled={status === s}
              onClick={() => onStatusChange(s)}
              className={status === s ? "border-white text-white" : "border-zinc-700 text-zinc-500"}
            >
              {JOB_STATUS_LABELS[s]}
            </Button>
            {i < FLOW_STATUSES.length - 1 && (
              <span className="text-zinc-600 text-xs">→</span>
            )}
          </div>
        ))}
        <span className="text-zinc-600 text-xs mx-1">·</span>
        <Button
          variant={status === "CANCELLED" ? "secondary" : "outline"}
          size="sm"
          disabled={status === "CANCELLED"}
          onClick={() => onStatusChange("CANCELLED")}
          className={status === "CANCELLED" ? "border-white text-white" : "border-zinc-700 text-zinc-500"}
        >
          {JOB_STATUS_LABELS["CANCELLED"]}
        </Button>
      </div>
    </section>
  );
}
