import * as z from "zod";

export const CustomerFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name muss mindestens 2 Zeichen lang sein.")
    .max(64, "Name darf maximal 64 Zeichen lang sein."),
  email: z.union([z.literal(""), z.email("Ungültige E-Mail-Adresse.")]).optional(),
  phone: z.string().min(6, "Telefonnummer muss mindestens 6 Zeichen lang sein.").optional(),
  address: z.string().min(5, "Adresse muss mindestens 5 Zeichen lang sein.").optional(),
});
