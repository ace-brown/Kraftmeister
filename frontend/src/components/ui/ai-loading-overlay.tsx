/** Full-card overlay shown while an AI operation is in progress. Wrap the parent in `relative overflow-hidden`. */
export function AiLoadingOverlay({ visible }: { visible: boolean }) {
  if (!visible) return null;

  return (
    <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 rounded-xl bg-zinc-950/80 backdrop-blur-sm">
      <div className="relative">
        <div className="h-16 w-16 animate-spin rounded-full border-4 border-zinc-700 border-t-violet-500" />
        <span className="absolute inset-0 flex items-center justify-center text-2xl">🎤</span>
      </div>
      <p className="animate-pulse text-sm font-medium text-zinc-300">KI verarbeitet…</p>
      <div className="flex gap-1">
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-500 [animation-delay:0ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-500 [animation-delay:150ms]" />
        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-violet-500 [animation-delay:300ms]" />
      </div>
    </div>
  );
}
