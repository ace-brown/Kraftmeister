import { useMutation } from "@tanstack/react-query";
import { analyzePhoto } from "../api/analyzePhoto";

/** Mutation hook that sends an image URL to Claude vision and returns a job site analysis. */
export function useAnalyzePhoto() {
  return useMutation({ mutationFn: analyzePhoto });
}
