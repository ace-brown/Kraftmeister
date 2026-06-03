import { VoiceToJobResponse } from "../types/ai.types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

/**
 * Sends an audio blob to the AI service for Whisper transcription + Claude extraction.
 * Uses raw fetch (not apiClient) because multipart/form-data must not have Content-Type forced to application/json.
 */
export async function voiceToJob(audioBlob: Blob, filename: string): Promise<VoiceToJobResponse> {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;

  const form = new FormData();
  form.append("audio", audioBlob, filename);

  const response = await fetch(`${API_URL}/ai/voice-to-job`, {
    method: "POST",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    body: form,
  });

  if (!response.ok) throw new Error("Voice to job request failed");
  return response.json();
}
