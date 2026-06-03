"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyH2, TypographyP } from "@/components/ui/Typography";
import { useAnalyzePhoto } from "@/features/ai/hooks/useAnalyzePhoto";
import { AnalyzePhotoResponse } from "@/features/ai/types/ai.types";

/** Renders the photos section of a job detail page, including AI photo analysis. */
export function JobDetailPhotos() {
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState<AnalyzePhotoResponse | null>(null);
  const { mutate: analyze, isPending } = useAnalyzePhoto();

  const handleAnalyze = () => {
    analyze(
      { imageUrl },
      { onSuccess: (data) => setResult(data) },
    );
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <TypographyH2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide pb-0">
          Photos
        </TypographyH2>
        <Button variant="outline" size="sm" disabled>
          + Upload
        </Button>
      </div>

      <TypographyP className="text-xs text-zinc-600 mb-4">Photo uploads coming in Phase 7.</TypographyP>

      {/* AI Photo Analysis */}
      <div className="border border-dashed border-zinc-700 rounded-lg p-4 flex flex-col gap-3">
        <TypographyH2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide pb-0">
          KI-Fotoanalyse
        </TypographyH2>
        <div className="flex gap-2">
          <Input
            placeholder="Bild-URL eingeben…"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="text-sm"
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            disabled={!imageUrl.trim() || isPending}
            onClick={handleAnalyze}
          >
            {isPending ? "Analysiere…" : "✨ Analysieren"}
          </Button>
        </div>

        {result && (
          <div className="flex flex-col gap-2 text-sm text-zinc-300">
            <p><span className="text-zinc-500">Zusammenfassung:</span> {result.summary}</p>
            <p><span className="text-zinc-500">Komplexität:</span> {result.estimatedComplexity}</p>
            {result.detectedIssues.length > 0 && (
              <div>
                <span className="text-zinc-500">Probleme:</span>
                <ul className="list-disc list-inside ml-2 text-zinc-400">
                  {result.detectedIssues.map((issue, i) => <li key={i}>{issue}</li>)}
                </ul>
              </div>
            )}
            {result.suggestedTasks.length > 0 && (
              <div>
                <span className="text-zinc-500">Empfohlene Aufgaben:</span>
                <ul className="list-disc list-inside ml-2 text-zinc-400">
                  {result.suggestedTasks.map((task, i) => <li key={i}>{task}</li>)}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
