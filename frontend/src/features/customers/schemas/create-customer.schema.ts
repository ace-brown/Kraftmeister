import * as z from "zod";

export const CustomerFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters.")
    .max(64, "Name must be at most 32 characters."),
  email: z.union([z.literal(""), z.email("Invalid email address.")]).optional(),
  phone: z.string().min(6, "Phone must be at least 6 characters.").optional(),
  address: z.string().min(5, "Address must be at least 5 characters.").optional(),
});
