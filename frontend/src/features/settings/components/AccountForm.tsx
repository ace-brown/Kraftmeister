'use client';

import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { useUpdateAccount } from '../hooks/useUpdateAccount';
import { Settings } from '../types/settings.types';

const schema = z
  .object({
    email: z.string().email().optional().or(z.literal('')),
    currentPassword: z.string().optional(),
    newPassword: z.string().min(8).optional().or(z.literal('')),
  })
  .refine(
    (data) => !data.newPassword || !!data.currentPassword,
    { message: 'Current password is required to set a new password', path: ['currentPassword'] },
  );

type FormValues = z.infer<typeof schema>;

interface Props {
  settings: Settings;
}

/** Form for updating the user's email and/or password. */
export function AccountForm({ settings }: Props) {
  const { mutate, isPending, isSuccess } = useUpdateAccount();

  const { handleSubmit, control, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: settings.email ?? '', currentPassword: '', newPassword: '' },
  });

  const onSubmit = (data: FormValues) => {
    mutate(
      {
        email: data.email || undefined,
        currentPassword: data.currentPassword || undefined,
        newPassword: data.newPassword || undefined,
      },
      { onSuccess: () => reset({ email: data.email, currentPassword: '', newPassword: '' }) },
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Account</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="account-email">Email</FieldLabel>
                  <Input {...field} id="account-email" type="email" autoComplete="off" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="currentPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="current-password">Current password</FieldLabel>
                  <Input {...field} id="current-password" type="password" autoComplete="current-password" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="newPassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="new-password">New password</FieldLabel>
                  <Input {...field} id="new-password" type="password" autoComplete="new-password" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="mt-6 flex items-center gap-3">
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Saving…' : 'Save changes'}
            </Button>
            {isSuccess && <p className="text-sm text-green-500">Saved successfully</p>}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
