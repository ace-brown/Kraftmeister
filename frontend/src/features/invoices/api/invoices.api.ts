import { apiClient } from "@/lib/api/client";
import { Invoice, UpdateInvoiceStatusPayload } from "../types/invoice.types";

export async function getInvoices(): Promise<Invoice[]> {
  return apiClient("/invoices");
}

export async function getInvoice(id: string): Promise<Invoice> {
  return apiClient(`/invoices/${id}`);
}

export async function updateInvoiceStatus({
  id,
  status,
}: UpdateInvoiceStatusPayload): Promise<Invoice> {
  return apiClient(`/invoices/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify({ status }),
  });
}
