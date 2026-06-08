"use client";

import { useAuth } from "@/providers/AuthProvider";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { TypographyP } from "@/components/ui/Typography/TypographyP";

/** Avatar button that opens a side sheet with the user's profile and a sign-out action. */
export function UserMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  const initials = user.companyName.charAt(0).toUpperCase();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full bg-zinc-600 text-sm font-semibold text-white hover:bg-zinc-500 cursor-pointer"
        >
          {initials}
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-72 [&>button]:cursor-pointer">
        <SheetHeader>
          <SheetTitle>Account</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2 ml-2">
            <div className="h-12 w-12 rounded-full bg-zinc-600 flex items-center justify-center text-lg font-semibold text-white">
              {initials}
            </div>
            <div className="flex flex-col items-start gap-1">
              <TypographyP className="text-sm font-medium text-white m-0!">
                {user.companyName}
              </TypographyP>
              <TypographyP className="text-xs text-zinc-400 m-0!">
                {user.email}
              </TypographyP>
            </div>
          </div>

          <Separator />

          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-transparent cursor-pointer"
            onClick={logout}
          >
            Sign out
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
