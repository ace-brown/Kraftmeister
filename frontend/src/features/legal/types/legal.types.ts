import { ReactNode } from "react";

export interface LegalContact {
  name: string;
  street: string;
  city: string;
  email: string;
}

export interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

/** Operator details shown in Impressum and Datenschutzerklärung. */
export const LEGAL_CONTACT: LegalContact = {
  name: "Kazem Abdi Dehnoei",
  street: "Kornwestheimer Straße 16",
  city: "70439 Stuttgart",
  email: "kabmabdeh@gmail.com",
};

/** Date shown as "Stand" at the bottom of the legal pages; update whenever their content changes. */
export const LEGAL_LAST_UPDATED = "Oktober 2026";
