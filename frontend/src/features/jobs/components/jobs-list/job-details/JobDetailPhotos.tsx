import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/Typography";

export function JobDetailPhotos() {
  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <TypographyH2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide pb-0">
          Photos
        </TypographyH2>
        <Button variant="outline" size="sm" disabled>
          + Upload
        </Button>
      </div>
      <p className="text-xs text-zinc-600">Photo uploads coming in Phase 7.</p>
    </section>
  );
}
