import * as z from "zod";
import { JOB_STATUSES } from "../types";

export const jobFormSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(100, "Title must be at most 100 characters."),
  address: z
    .string()
    .min(5, "Address must be at least 5 Characters")
    .max(100, "Address must be at most 100 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(500, "Description must be at most 500 characters."),
  status: z.enum(JOB_STATUSES),
  customerId: z.string().optional(),
});
