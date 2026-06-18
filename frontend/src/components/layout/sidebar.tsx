"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Briefcase,
  Users,
  FileText,
  Receipt,
  Settings,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Aufträge",
    href: "/jobs",
    icon: Briefcase,
  },
  {
    label: "Kunden",
    href: "/customers",
    icon: Users,
  },
  {
    label: "Angebote",
    href: "/quotes",
    icon: FileText,
  },
  {
    label: "Rechnungen",
    href: "/invoices",
    icon: Receipt,
  },
  {
    label: "Einstellungen",
    href: "/settings",
    icon: Settings,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex h-screen w-64 border-r border-zinc-800 bg-zinc-950 flex-col">
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold">Kraftmeister</h1>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              }`}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
