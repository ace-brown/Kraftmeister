import { AgentChatMessagesProps } from "../../types/ai.types";
import { TypographyP } from "@/components/ui/Typography";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

/** Renders the message history list, with user messages on the right and agent answers on the left. */
export function AgentChatMessages({
  messages,
  isPending,
}: AgentChatMessagesProps) {
  if (!messages.length && !isPending) {
    return (
      <TypographyP className="text-zinc-400 text-sm text-center py-8">
        Frag mich etwas über deine Aufträge, Kunden oder Rechnungen.
      </TypographyP>
    );
  }

  return (
    <div className="flex flex-col gap-3 min-h-50 max-h-100 overflow-y-auto pr-1">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`rounded-lg px-4 py-2 max-w-[80%] text-sm whitespace-pre-wrap ${
              msg.role === "user"
                ? "bg-zinc-700 text-white"
                : "bg-zinc-900 text-zinc-100 border border-zinc-800"
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
      {isPending && (
        // <div className="w-full rounded-lg px-4 py-3 bg-zinc-900 border border-zinc-800 flex items-center">
        <div className="max-w-[80%] px-4 py-3 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
