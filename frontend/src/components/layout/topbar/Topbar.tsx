'use client';

import { TypographyH2 } from '@/components/ui/Typography/TypographyH2';
import { UserMenu } from './UserMenu';

/** Top navigation bar with the app title and user account menu. */
export function Topbar() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950 flex items-center justify-between px-4">
      <TypographyH2 className="text-lg font-semibold text-white">Dashboard</TypographyH2>
      <UserMenu />
    </header>
  );
}
