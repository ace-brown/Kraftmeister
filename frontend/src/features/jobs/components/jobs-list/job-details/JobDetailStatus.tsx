import { TypographyH2 } from "@/components/ui/Typography";
import { JobStatus } from "@/features/jobs/types";

interface Props {
  status: JobStatus;
}

const STATUSES = ["open", "in-progress", "done"] as const;

export function JobDetailStatus({ status }: Props) {
  return (
    <section className="mb-6">
      <TypographyH2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide mb-3 pb-0">
        Status
      </TypographyH2>
      <div className="flex items-center gap-2 flex-wrap">
        {STATUSES.map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <button
              disabled
              className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-colors ${
                status === s
                  ? "border-white text-white"
                  : "border-zinc-700 text-zinc-500"
              }`}
            >
              {s.toUpperCase()}
            </button>
            {i < STATUSES.length - 1 && (
              <span className="text-zinc-600 text-xs">→</span>
            )}
          </div>
        ))}
        <span className="text-zinc-600 text-xs mx-1">·</span>
        <button
          disabled
          className="px-3 py-1.5 rounded-md text-xs font-medium border border-zinc-700 text-zinc-500"
        >
          CANCEL
        </button>
      </div>
    </section>
  );
}
