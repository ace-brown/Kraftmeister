import * as z from "zod";

export const CustomerFormSchema = z.object({
  name: z.string().min(2).max(64),
  email: z.union([z.literal(""), z.email()]).optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});
