'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useAuth } from '@/providers/AuthProvider';
import { registerSchema, RegisterFormValues } from '@/features/auth/schemas/register.schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { TypographyH2 } from '@/components/ui/Typography/TypographyH2';
import { TypographyP } from '@/components/ui/Typography/TypographyP';

export default function RegisterPage() {
  const { register: registerCompany } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormValues>({ resolver: zodResolver(registerSchema) });

  async function onSubmit(values: RegisterFormValues) {
    try {
      await registerCompany(values);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Registration failed';
      setError('root', { message });
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="space-y-1 pb-4">
          <TypographyH2>Register your company</TypographyH2>
          <TypographyP className="text-zinc-400">Create your Kraftmeister account</TypographyP>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="companyName">Company name</Label>
              <Input id="companyName" placeholder="Muster GmbH" {...register('companyName')} />
              {errors.companyName && <p className="text-sm text-red-500">{errors.companyName.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="admin@muster.de" {...register('email')} />
              {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
            </div>

            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" {...register('password')} />
              {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
            </div>

            {errors.root && <p className="text-sm text-red-500">{errors.root.message}</p>}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Creating account…' : 'Create account'}
            </Button>

            <TypographyP className="text-center text-sm text-zinc-400">
              Already have an account?{' '}
              <Link href="/login" className="text-white underline underline-offset-4">
                Sign in
              </Link>
            </TypographyP>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
