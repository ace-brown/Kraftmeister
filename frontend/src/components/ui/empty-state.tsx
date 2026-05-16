import { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  action?: ReactNode;
}

export function EmptyState({ title, description, action }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h3 className="text-lg font-medium text-white">{title}</h3>

      <p className="text-sm text-zinc-400 mt-2 max-w-sm">{description}</p>

      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
