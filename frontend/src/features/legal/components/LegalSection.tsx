import { TypographyH3 } from "@/components/ui/Typography";
import { LegalSectionProps } from "@/features/legal/types/legal.types";

/** One titled section of a legal page, with consistent spacing between paragraphs. */
export function LegalSection({ title, children }: LegalSectionProps) {
  return (
    <section className="space-y-3">
      <TypographyH3 className="text-xl">{title}</TypographyH3>
      <div className="space-y-3 text-sm leading-6 text-zinc-300 [&_p]:mt-0! [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}
