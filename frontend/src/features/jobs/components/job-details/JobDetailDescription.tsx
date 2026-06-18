import { TypographyH2, TypographyP } from "@/components/ui/Typography";

interface Props {
  description: string;
}

export function JobDetailDescription({ description }: Props) {
  return (
    <section className="mb-6">
      <TypographyH2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide mb-2 pb-0">
        Beschreibung
      </TypographyH2>
      <TypographyP>{description}</TypographyP>
    </section>
  );
}
