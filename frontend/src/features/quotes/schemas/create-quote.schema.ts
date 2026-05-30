import * as z from "zod";

export const quoteItemSchema = z.object({
  description: z.string().min(1, "Description is required"),
  quantity: z.number().min(0.01, "Must be greater than 0"),
  unitPrice: z.number().min(0, "Must be 0 or greater"),
});

export const createQuoteSchema = z.object({
  customerId: z.string().min(1, "Customer is required"),
  jobId: z.string().optional(),
  vatRate: z.number().min(0).max(100),
  items: z.array(quoteItemSchema).min(1, "At least one item is required"),
});

export type CreateQuoteFormValues = z.infer<typeof createQuoteSchema>;
