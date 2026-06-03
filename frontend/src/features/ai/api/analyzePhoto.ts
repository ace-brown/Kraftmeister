import { apiClient } from "@/lib/api/client";
import { AnalyzePhotoRequest, AnalyzePhotoResponse } from "../types/ai.types";

/** Sends an image URL to Claude vision and returns detected issues, suggested tasks, and complexity. */
export async function analyzePhoto(data: AnalyzePhotoRequest): Promise<AnalyzePhotoResponse> {
  return apiClient("/ai/analyze-photo", {
    method: "POST",
    body: JSON.stringify(data),
  });
}
