import { cn } from "@/lib/utils";

type Status =
  // job statuses
  | "OPEN"
  | "IN_PROGRESS"
  | "DONE"
  | "CANCELLED"
  // quote statuses
  | "DRAFT"
  | "SENT"
  | "ACCEPTED"
  | "REJECTED"
  // invoice statuses
  | "PAID";

interface Props {
  status: Status;
}

const styles: Record<Status, string> = {
  OPEN: "bg-blue-500/10 text-blue-400",
  IN_PROGRESS: "bg-yellow-500/10 text-yellow-400",
  DONE: "bg-green-500/10 text-green-400",
  CANCELLED: "bg-red-500/10 text-red-400",
  DRAFT: "bg-zinc-700 text-zinc-300",
  SENT: "bg-blue-900/60 text-blue-300",
  ACCEPTED: "bg-green-900/60 text-green-300",
  REJECTED: "bg-red-900/60 text-red-300",
  PAID: "bg-emerald-500/10 text-emerald-400",
};

const labels: Record<Status, string> = {
  OPEN: "Open",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
  CANCELLED: "Cancelled",
  DRAFT: "Draft",
  SENT: "Sent",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
  PAID: "Paid",
};

export function StatusBadge({ status }: Props) {
  return (
    <span
      className={cn("px-2 py-1 rounded-md text-xs font-medium", styles[status])}
    >
      {labels[status]}
    </span>
  );
}
