import { ReactNode } from "react";

import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar/Topbar";
import { MobileNav } from "@/components/layout/mobile-nav";
import { PageContainer } from "@/components/layout/page-container";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex h-screen bg-zinc-900">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Topbar />

        <PageContainer>{children}</PageContainer>

        <MobileNav />
      </div>
    </div>
  );
}
