'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TypographyH2 } from '@/components/ui/Typography';
import { useAskAgent } from '../hooks/useAskAgent';
import { AgentChatMessage } from '../types/ai.types';
import { AgentChatMessages } from './agent-chat/AgentChatMessages';
import { AgentChatInput } from './agent-chat/AgentChatInput';

/** Conversational AI assistant panel that answers natural-language questions about jobs, customers, and invoices. */
export function AgentChat() {
  const [messages, setMessages] = useState<AgentChatMessage[]>([]);
  const { mutate, isPending } = useAskAgent();

  function handleSend(message: string) {
    setMessages((prev) => [...prev, { role: 'user', content: message }]);
    mutate(message, {
      onSuccess: (data) => {
        setMessages((prev) => [...prev, { role: 'agent', content: data.answer }]);
      },
    });
  }

  return (
    <Card>
      <CardContent className="p-4 flex flex-col gap-4">
        <TypographyH2 className="text-base font-semibold">KI-Assistent</TypographyH2>
        <AgentChatMessages messages={messages} isPending={isPending} />
        <AgentChatInput onSend={handleSend} isPending={isPending} />
      </CardContent>
    </Card>
  );
}
