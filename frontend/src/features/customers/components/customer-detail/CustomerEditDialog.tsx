"use client";

import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { CustomerFormSchema } from "../../schemas/create-customer.schema";
import { useUpdateCustomer } from "../../hooks";
import { CustomerEditDialogProps } from "../../types";

type FormValues = z.infer<typeof CustomerFormSchema>;

export function CustomerEditDialog({
  customer,
  open,
  onOpenChange,
}: CustomerEditDialogProps) {
  const { mutate, isPending } = useUpdateCustomer();

  const { handleSubmit, control } = useForm<FormValues>({
    resolver: zodResolver(CustomerFormSchema),
    defaultValues: {
      name: customer.name,
      email: customer.email ?? "",
      phone: customer.phone ?? "",
      address: customer.address ?? "",
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(
      {
        id: customer.id,
        data: {
          name: data.name,
          email: data.email || undefined,
          phone: data.phone || undefined,
          address: data.address || undefined,
        },
      },
      { onSuccess: () => onOpenChange(false) }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Kunde bearbeiten</DialogTitle>
          <DialogDescription>
            Kundendaten aktualisieren.
          </DialogDescription>
        </DialogHeader>

        <form id="form-edit-customer" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-customer-name">Name *</FieldLabel>
                  <Input {...field} id="edit-customer-name" autoComplete="off" />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-customer-email">E-Mail</FieldLabel>
                  <Input
                    {...field}
                    id="edit-customer-email"
                    type="email"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-customer-phone">Telefon</FieldLabel>
                  <Input
                    {...field}
                    id="edit-customer-phone"
                    type="tel"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="address"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="edit-customer-address">Adresse</FieldLabel>
                  <Input
                    {...field}
                    id="edit-customer-address"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>

        <DialogFooter showCloseButton>
          <Button type="submit" form="form-edit-customer" disabled={isPending}>
            {isPending ? "Speichern..." : "Speichern"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
