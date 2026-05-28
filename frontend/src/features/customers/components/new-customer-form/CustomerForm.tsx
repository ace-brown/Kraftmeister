"use client";

import * as z from "zod";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCreateCustomer } from "../../hooks";
import { CustomerFormSchema } from "../../schemas/create-customer.schema";

type CustomerFormData = z.infer<typeof CustomerFormSchema>;

export default function CustomerForm() {
  const router = useRouter();
  const { mutate, isPending } = useCreateCustomer();
  const { handleSubmit, control, reset } = useForm<CustomerFormData>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: { name: "", email: "", phone: "", address: "" },
  });

  const onSubmit = (data: CustomerFormData) => {
    mutate(
      {
        name: data.name,
        email: data.email || undefined,
        phone: data.phone || undefined,
        address: data.address || undefined,
      },
      { onSuccess: () => router.push("/customers") },
    );
  };

  return (
    <Card>
      <form id="form-create-customer" onSubmit={handleSubmit(onSubmit)}>
        {/* ========== Name Field ==========*/}
        <CardContent>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="customer-name">Name *</FieldLabel>
                  <Input
                    {...field}
                    id="customer-name"
                    placeholder="z.B. Thomas Müller"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* ========== Email Field ==========*/}
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="customer-email">E-Mail</FieldLabel>
                  <Input
                    {...field}
                    id="customer-email"
                    type="email"
                    placeholder="z.B. thomas@beispiel.de"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* ========== Phone Field ==========*/}
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="customer-phone">Telefon</FieldLabel>
                  <Input
                    {...field}
                    id="customer-phone"
                    type="tel"
                    placeholder="z.B. +49 170 1234567"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* ========== Address Field ==========*/}
            <Controller
              name="address"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="customer-address">Adresse</FieldLabel>
                  <Input
                    {...field}
                    id="customer-address"
                    placeholder="z.B. Musterstraße 12, 80331 München"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </CardContent>
      </form>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Zurücksetzen
          </Button>
          <Button
            type="submit"
            form="form-create-customer"
            disabled={isPending}
          >
            {isPending ? "Speichern..." : "Kunde anlegen"}
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
