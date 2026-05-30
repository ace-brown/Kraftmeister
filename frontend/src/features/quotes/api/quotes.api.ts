import { apiClient } from "@/lib/api/client";
import { CreateQuotePayload, Quote, UpdateQuotePayload } from "../types/quote.types";

export async function getQuotes(): Promise<Quote[]> {
  return apiClient("/quotes");
}

export async function getQuote(id: string): Promise<Quote> {
  return apiClient(`/quotes/${id}`);
}

export async function createQuote(data: CreateQuotePayload): Promise<Quote> {
  return apiClient("/quotes", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateQuote({ id, data }: UpdateQuotePayload): Promise<Quote> {
  return apiClient(`/quotes/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function convertToInvoice(id: string): Promise<unknown> {
  return apiClient(`/quotes/${id}/convert-to-invoice`, { method: "POST" });
}
