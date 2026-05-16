"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Briefcase, Users, Receipt } from "lucide-react";

const items = [
  {
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/jobs",
    icon: Briefcase,
  },
  {
    href: "/customers",
    icon: Users,
  },
  {
    href: "/invoices",
    icon: Receipt,
  },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 border-t border-zinc-800 bg-zinc-950 flex items-center justify-around">
      {items.map((item) => {
        const isActive = pathname.startsWith(item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            className={`p-2 rounded-lg ${
              isActive ? "text-white" : "text-zinc-500"
            }`}
          >
            <item.icon className="h-6 w-6" />
          </Link>
        );
      })}
    </nav>
  );
}
