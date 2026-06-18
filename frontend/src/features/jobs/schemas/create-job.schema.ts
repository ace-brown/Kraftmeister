import * as z from "zod";
import { JOB_STATUSES } from "../types";

export const jobFormSchema = z.object({
  title: z
    .string()
    .min(5, "Titel muss mindestens 5 Zeichen lang sein.")
    .max(100, "Titel darf maximal 100 Zeichen lang sein."),
  address: z
    .string()
    .min(5, "Adresse muss mindestens 5 Zeichen lang sein.")
    .max(100, "Adresse darf maximal 100 Zeichen lang sein."),
  description: z
    .string()
    .min(20, "Beschreibung muss mindestens 20 Zeichen lang sein.")
    .max(500, "Beschreibung darf maximal 500 Zeichen lang sein."),
  status: z.enum(JOB_STATUSES),
  customerId: z.string().optional(),
});
