import { apiClient } from "@/lib/api/client";
import { SuggestItemsRequest, SuggestItemsResponse } from "../types/ai.types";

/** Sends a job description to the AI service and returns suggested invoice line items. */
export async function suggestItems(data: SuggestItemsRequest): Promise<SuggestItemsResponse> {
  return apiClient("/ai/suggest-items", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
