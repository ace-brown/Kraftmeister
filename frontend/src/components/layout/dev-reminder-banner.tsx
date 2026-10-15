import { Video } from "lucide-react";

import { TypographyP } from "@/components/ui/Typography";

/** Loud dev-only reminder to record the portfolio demo video; never rendered in production builds. */
export function DevReminderBanner() {
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div
      role="alert"
      className="flex items-center justify-center gap-3 border-b-4 border-yellow-500 bg-linear-to-r from-pink-600 via-red-500 to-orange-500 px-4 py-3 text-white shadow-lg"
    >
      <Video className="size-6 shrink-0 animate-pulse" />
      <TypographyP className="text-center text-base font-bold tracking-wide">
        🎬 TODO: 2-minütiges Demo-Video aufnehmen und in die README einbinden!
      </TypographyP>
      <Video className="size-6 shrink-0 animate-pulse" />
    </div>
  );
}
