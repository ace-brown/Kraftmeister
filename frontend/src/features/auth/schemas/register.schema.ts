import { z } from "zod";

export const registerSchema = z.object({
  companyName: z.string().min(1, "Firmenname ist erforderlich"),
  email: z.email({ error: "Ungültige E-Mail-Adresse" }),
  password: z
    .string()
    .min(8, { error: "Passwort muss mindestens 8 Zeichen lang sein" }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
