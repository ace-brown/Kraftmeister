import * as z from "zod";
import { JOB_STATUSES } from "../types";

export const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(32, "Title must be at most 32 characters."),
  address: z
    .string()
    .min(5, "Address must be at least 5 Characters")
    .max(32, "Address must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
  status: z.enum(JOB_STATUSES),
});
