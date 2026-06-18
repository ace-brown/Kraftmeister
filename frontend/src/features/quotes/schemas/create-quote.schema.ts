import * as z from "zod";

export const quoteItemSchema = z.object({
  description: z.string().min(1, "Beschreibung ist erforderlich"),
  quantity: z.number().min(0.01, "Muss größer als 0 sein"),
  unitPrice: z.number().min(0, "Muss 0 oder größer sein"),
});

export const createQuoteSchema = z.object({
  customerId: z.string().min(1, "Kunde ist erforderlich"),
  jobId: z.string().optional(),
  vatRate: z.number().min(0).max(100),
  items: z.array(quoteItemSchema).min(1, "Mindestens eine Position erforderlich"),
});

export type CreateQuoteFormValues = z.infer<typeof createQuoteSchema>;
