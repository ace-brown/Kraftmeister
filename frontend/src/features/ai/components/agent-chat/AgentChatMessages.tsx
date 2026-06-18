import ReactMarkdown from "react-markdown";
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
            className={`rounded-lg px-4 py-2 text-sm ${
              msg.role === "user"
                ? "max-w-[80%] bg-zinc-700 text-white whitespace-pre-wrap"
                : "w-full bg-zinc-900 text-zinc-100 border border-zinc-800 prose prose-invert prose-sm max-w-none"
            }`}
          >
            {msg.role === "user" ? (
              msg.content
            ) : (
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            )}
          </div>
        </div>
      ))}
      {isPending && (
        <div className="max-w-[80%] px-4 py-3 flex items-center justify-center">
          <LoadingSpinner />
        </div>
      )}
    </div>
  );
}
