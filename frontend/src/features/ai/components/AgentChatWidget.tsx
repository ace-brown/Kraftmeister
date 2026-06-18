"use client";

import { useState } from "react";
import { Bot, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { TypographyP } from "@/components/ui/Typography";
import { useAskAgent } from "../hooks/useAskAgent";
import { AgentChatMessage } from "../types/ai.types";
import { AgentChatMessages } from "./agent-chat/AgentChatMessages";
import { AgentChatInput } from "./agent-chat/AgentChatInput";

/** Floating AI chat bubble fixed to the bottom-right corner, available on every dashboard page. */
export function AgentChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AgentChatMessage[]>([]);
  const { mutate, isPending } = useAskAgent();

  function handleSend(message: string) {
    setMessages((prev) => [...prev, { role: "user", content: message }]);
    mutate(message, {
      onSuccess: (data) => {
        setMessages((prev) => [
          ...prev,
          { role: "agent", content: data.answer },
        ]);
      },
    });
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {isOpen && (
        <Card className="w-100 shadow-2xl border-zinc-700 bg-zinc-950 flex flex-col max-h-[calc(100vh-8rem)]">
          {/* Panel header */}
          <div className="shrink-0 flex items-center justify-between px-4 pt-4 pb-3 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
                <Bot className="h-4 w-4 text-white" />
              </div>
              <div>
                <TypographyP className="text-sm font-semibold leading-none">
                  KI-Assistent
                </TypographyP>
                <TypographyP className="text-xs text-zinc-400 mt-0.5">
                  Frag mich alles über dein Geschäft
                </TypographyP>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 cursor-pointer text-zinc-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <CardContent className="p-4 flex flex-col flex-1 overflow-hidden gap-4">
            <div className="flex-1 min-h-0 overflow-y-auto">
              <AgentChatMessages messages={messages} isPending={isPending} />
            </div>
            <div className="shrink-0">
              <AgentChatInput onSend={handleSend} isPending={isPending} />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating bubble */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-indigo-600 shadow-lg shadow-indigo-900/50 hover:bg-indigo-500 transition-colors"
      >
        {isOpen ? (
          <X className="h-6 w-6 text-white" />
        ) : (
          <>
            <Bot className="h-6 w-6 text-white" />
            <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-yellow-400" />
          </>
        )}
      </button>
    </div>
  );
}
