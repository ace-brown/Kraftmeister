import { useMutation } from "@tanstack/react-query";
import { voiceToJob } from "../api/voiceToJob";

/** Mutation hook that sends an audio blob to the AI service and returns structured job note fields. */
export function useVoiceToJob() {
  return useMutation({
    mutationFn: ({ audioBlob, filename }: { audioBlob: Blob; filename: string }) =>
      voiceToJob(audioBlob, filename),
  });
}
