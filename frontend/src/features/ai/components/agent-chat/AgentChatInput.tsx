'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AgentChatInputProps } from '../../types/ai.types';

/** Text input and send button for the agent chat. Clears the field after each submission. */
export function AgentChatInput({ onSend, isPending }: AgentChatInputProps) {
  const [value, setValue] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!value.trim() || isPending) return;
    onSend(value.trim());
    setValue('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Wie viele offene Aufträge habe ich diese Woche?"
        disabled={isPending}
        className="flex-1"
      />
      <Button type="submit" disabled={isPending || !value.trim()}>
        Senden
      </Button>
    </form>
  );
}
