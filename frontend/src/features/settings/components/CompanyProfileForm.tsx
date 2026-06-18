'use client';

import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Separator } from '@/components/ui/separator';
import { useUpdateCompany } from '../hooks/useUpdateCompany';
import { Settings } from '../types/settings.types';

const schema = z.object({
  name: z.string().min(1, 'Firmenname ist erforderlich'),
  address: z.string().optional(),
  vatId: z.string().optional(),
  defaultVatRate: z.number().min(0).max(100).optional(),
  paymentTermsDays: z.number().min(0).optional(),
  bankName: z.string().optional(),
  bankIban: z.string().optional(),
  bankBic: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  settings: Settings;
}

/** Form for updating company profile and invoice default fields. */
export function CompanyProfileForm({ settings }: Props) {
  const { mutate, isPending, isSuccess } = useUpdateCompany();

  const { handleSubmit, control, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: settings.name ?? '',
      address: settings.address ?? '',
      vatId: settings.vatId ?? '',
      defaultVatRate: settings.defaultVatRate ?? undefined,
      paymentTermsDays: settings.paymentTermsDays ?? undefined,
      bankName: settings.bankName ?? '',
      bankIban: settings.bankIban ?? '',
      bankBic: settings.bankBic ?? '',
    },
  });

  useEffect(() => {
    reset({
      name: settings.name ?? '',
      address: settings.address ?? '',
      vatId: settings.vatId ?? '',
      defaultVatRate: settings.defaultVatRate ?? undefined,
      paymentTermsDays: settings.paymentTermsDays ?? undefined,
      bankName: settings.bankName ?? '',
      bankIban: settings.bankIban ?? '',
      bankBic: settings.bankBic ?? '',
    });
  }, [settings, reset]);

  const onSubmit = (data: FormValues) => {
    mutate({
      name: data.name,
      address: data.address || undefined,
      vatId: data.vatId || undefined,
      defaultVatRate: data.defaultVatRate,
      paymentTermsDays: data.paymentTermsDays,
      bankName: data.bankName || undefined,
      bankIban: data.bankIban || undefined,
      bankBic: data.bankBic || undefined,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Unternehmensprofil</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="company-name">Firmenname *</FieldLabel>
                  <Input {...field} id="company-name" autoComplete="off" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="address"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="company-address">Adresse</FieldLabel>
                  <Input {...field} id="company-address" autoComplete="off" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="vatId"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="company-vatId">Steuernummer / USt-IdNr.</FieldLabel>
                  <Input {...field} id="company-vatId" autoComplete="off" placeholder="DE123456789" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <Separator className="my-6" />
          <p className="text-sm font-medium text-zinc-400 mb-4">Rechnungsstandards</p>

          <FieldGroup>
            <Controller
              name="defaultVatRate"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="default-vat">Standard-MwSt.-Satz (%)</FieldLabel>
                  <Input
                    id="default-vat"
                    type="number"
                    min={0}
                    max={100}
                    placeholder="19"
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value === '' ? undefined : e.target.valueAsNumber)}
                    onBlur={field.onBlur}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="paymentTermsDays"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="payment-terms">Zahlungsziel (Tage)</FieldLabel>
                  <Input
                    id="payment-terms"
                    type="number"
                    min={0}
                    placeholder="14"
                    value={field.value ?? ''}
                    onChange={(e) => field.onChange(e.target.value === '' ? undefined : e.target.valueAsNumber)}
                    onBlur={field.onBlur}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="bankName"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="bank-name">Bankname</FieldLabel>
                  <Input {...field} id="bank-name" autoComplete="off" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="bankIban"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="bank-iban">IBAN</FieldLabel>
                  <Input {...field} id="bank-iban" autoComplete="off" placeholder="DE89 3704 0044 0532 0130 00" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <Controller
              name="bankBic"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="bank-bic">BIC</FieldLabel>
                  <Input {...field} id="bank-bic" autoComplete="off" placeholder="COBADEFFXXX" />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <div className="mt-6 flex items-center gap-3">
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Speichern…' : 'Änderungen speichern'}
            </Button>
            {isSuccess && <p className="text-sm text-green-500">Erfolgreich gespeichert</p>}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
