"use client";

import { ChangeEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TypographyH2, TypographyP } from "@/components/ui/Typography";
import { useAnalyzePhoto } from "@/features/ai/hooks/useAnalyzePhoto";
import { AnalyzePhotoResponse } from "@/features/ai/types/ai.types";
import { useDeleteJobPhoto, useJob, useUploadJobPhoto } from "../../hooks";

/** Renders the photos section of a job detail page, including AI photo analysis. */
export function JobDetailPhotos({ jobId }: { jobId: string }) {
  const uploadRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [result, setResult] = useState<AnalyzePhotoResponse | null>(null);
  const { mutate: analyze, isPending } = useAnalyzePhoto();
  const { data: job } = useJob(jobId);
  const { mutate: upload } = useUploadJobPhoto(jobId);
  const { mutate: deletePhoto } = useDeleteJobPhoto(jobId);

  const handleAnalyze = () => {
    analyze({ imageUrl }, { onSuccess: (data) => setResult(data) });
  };

  const handleUplaod = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <TypographyH2 className="text-sm font-semibold text-zinc-300 uppercase tracking-wide pb-0">
          Photos
        </TypographyH2>
        <Button variant="outline" size="sm" onClick={() => uploadRef.current?.click()}>
          + Upload
        </Button>
        <input type="file" ref={uploadRef} onChange={handleUplaod} className="hidden" accept="image/*" />
      </div>

      {job?.photos && job.photos.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-4">
          {job.photos.map((url) => (
            <div key={url} className="flex flex-col gap-1">
              <img src={url} alt="Job photo" className="rounded-md object-cover aspect-square w-full" />
              <div className="flex items-center gap-1">
                <Input
                  readOnly
                  value={url}
                  className="text-xs h-6 px-2 text-zinc-400 bg-zinc-900 border-zinc-700"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-zinc-400 hover:text-zinc-100"
                  onClick={() => navigator.clipboard.writeText(url)}
                >
                  Copy
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs text-red-500 hover:text-red-400"
                  onClick={() => deletePhoto(url)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Photo Analysis */}
      <div className="border border-dashed border-zinc-700 rounded-lg p-4 flex flex-col gap-3">
        <TypographyH2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide pb-0">
          KI-Fotoanalyse
        </TypographyH2>
        <TypographyP className="text-xs text-zinc-500">
          Paste a public photo URL from the job site — Claude will analyse the
          image and suggest what tasks need doing, what problems it spots, and
          how complex the job is.
        </TypographyP>
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
            <p>
              <span className="text-zinc-500">Zusammenfassung:</span>{" "}
              {result.summary}
            </p>
            <p>
              <span className="text-zinc-500">Komplexität:</span>{" "}
              {result.estimatedComplexity}
            </p>
            {result.detectedIssues.length > 0 && (
              <div>
                <span className="text-zinc-500">Probleme:</span>
                <ul className="list-disc list-inside ml-2 text-zinc-400">
                  {result.detectedIssues.map((issue, i) => (
                    <li key={i}>{issue}</li>
                  ))}
                </ul>
              </div>
            )}
            {result.suggestedTasks.length > 0 && (
              <div>
                <span className="text-zinc-500">Empfohlene Aufgaben:</span>
                <ul className="list-disc list-inside ml-2 text-zinc-400">
                  {result.suggestedTasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
