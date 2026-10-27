'use client';

import { useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { DEMO_CREDENTIALS } from '@/features/auth/types/auth.types';
import { Button } from '@/components/ui/button';
import { TypographyP } from '@/components/ui/Typography/TypographyP';

/** One-click login into the shared demo account, so visitors can try the app without registering. */
export function DemoLoginButton() {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Logs in with the demo credentials; AuthProvider redirects to the dashboard on success. */
  async function handleClick() {
    setIsLoading(true);
    setError(null);
    try {
      await login(DEMO_CREDENTIALS);
    } catch {
      setError('Die Demo ist gerade nicht verfügbar. Bitte später erneut versuchen.');
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <Button
        type="button"
        className="w-full"
        onClick={handleClick}
        disabled={isLoading}
        data-umami-event="demo-login"
      >
        {isLoading ? 'Demo wird geladen…' : 'Demo ansehen – ohne Registrierung'}
      </Button>
      <TypographyP className="text-center text-xs text-zinc-400 not-first:mt-0">
        Mit Beispieldaten: Aufträge, Kunden, Angebote und Rechnungen
      </TypographyP>
      {error && <TypographyP className="text-center text-sm text-red-500 not-first:mt-0">{error}</TypographyP>}
    </div>
  );
}
