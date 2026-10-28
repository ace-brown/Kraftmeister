import type { Metadata } from "next";
import { TypographyH1, TypographyP } from "@/components/ui/Typography";
import { LegalSection } from "@/features/legal/components/LegalSection";
import { LegalContactBlock } from "@/features/legal/components/LegalContactBlock";
import { LEGAL_CONTACT } from "@/features/legal/types/legal.types";

export const metadata: Metadata = { title: "Impressum – Kraftmeister" };

/** Impressum (legal notice) required by § 5 DDG for publicly reachable German websites. */
export default function ImpressumPage() {
  return (
    <>
      <TypographyH1>Impressum</TypographyH1>

      <LegalSection title="Angaben gemäß § 5 DDG">
        <LegalContactBlock />
      </LegalSection>

      <LegalSection title="Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV">
        <TypographyP>
          {LEGAL_CONTACT.name}, Anschrift wie oben.
        </TypographyP>
      </LegalSection>

      <LegalSection title="Hinweis zum Projekt">
        <TypographyP>
          Kraftmeister ist ein privates Portfolio-Projekt zur Demonstration von Softwareentwicklung. Es handelt sich
          nicht um ein kommerzielles Angebot. Alle Daten im Demo-Zugang (Firmen, Kunden, Aufträge, Rechnungen,
          Bankverbindungen) sind frei erfunden.
        </TypographyP>
      </LegalSection>

      <LegalSection title="Haftung für Links">
        <TypographyP>
          Diese Website enthält gegebenenfalls Links zu externen Websites Dritter, auf deren Inhalte kein Einfluss
          besteht. Für diese fremden Inhalte ist stets der jeweilige Anbieter oder Betreiber verantwortlich.
        </TypographyP>
      </LegalSection>
    </>
  );
}
