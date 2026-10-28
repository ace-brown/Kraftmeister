import { TypographyP } from "@/components/ui/Typography";
import { LEGAL_CONTACT } from "@/features/legal/types/legal.types";

/** Operator name, postal address and email, shared by Impressum and Datenschutzerklärung. */
export function LegalContactBlock() {
  return (
    <TypographyP>
      {LEGAL_CONTACT.name}
      <br />
      {LEGAL_CONTACT.street}
      <br />
      {LEGAL_CONTACT.city}
      <br />
      E-Mail: {LEGAL_CONTACT.email}
    </TypographyP>
  );
}
