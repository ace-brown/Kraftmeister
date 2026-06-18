import { z } from "zod";

export const loginSchema = z.object({
  email: z.email({ error: "Ungültige E-Mail-Adresse" }),
  password: z.string().min(1, { message: "Passwort ist erforderlich" }),
});

export type LoginFormValues = z.infer<typeof loginSchema>;
