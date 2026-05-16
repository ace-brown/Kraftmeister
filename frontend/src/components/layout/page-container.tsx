import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export function PageContainer({ children }: Props) {
  return (
    <main className="flex-1 overflow-y-auto bg-zinc-900 p-4 md:p-6 pb-24">
      {children}
    </main>
  );
}
