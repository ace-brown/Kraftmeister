"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFieldArray, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Separator } from "@/components/ui/separator";
import { TypographyH2, TypographyP } from "@/components/ui/Typography";
import { useCustomers } from "@/features/customers/hooks";
import { useJobs } from "@/features/jobs/hooks";
import { createQuoteSchema, CreateQuoteFormValues } from "../schemas/create-quote.schema";
import { useCreateQuote } from "../hooks";
import { useSuggestItems } from "@/features/ai/hooks/useSuggestItems";

export function QuoteForm() {
  const router = useRouter();
  const { mutate, isPending } = useCreateQuote();
  const { data: customers } = useCustomers();
  const { data: jobs } = useJobs();
  const { mutate: suggest, isPending: isSuggesting } = useSuggestItems();
  const [aiDescription, setAiDescription] = useState("");

  const { control, handleSubmit, watch } = useForm<CreateQuoteFormValues>({
    resolver: zodResolver(createQuoteSchema),
    defaultValues: {
      customerId: "",
      jobId: "",
      vatRate: 19,
      items: [{ description: "", quantity: 1, unitPrice: 0 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchedItems = watch("items");
  const vatRate = watch("vatRate");

  const subtotal = watchedItems.reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0),
    0,
  );
  const vatAmount = subtotal * ((Number(vatRate) || 19) / 100);
  const total = subtotal + vatAmount;

  const onSubmit = (data: CreateQuoteFormValues) => {
    mutate(
      {
        customerId: data.customerId,
        jobId: data.jobId || undefined,
        vatRate: data.vatRate,
        items: data.items,
      },
      { onSuccess: () => router.push("/quotes") },
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardContent className="pt-6">
          <FieldGroup>
            {/* Customer */}
            <Controller
              name="customerId"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Kunde *</FieldLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Kunde auswählen" />
                    </SelectTrigger>
                    <SelectContent>
                      {customers?.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Job (optional) */}
            <Controller
              name="jobId"
              control={control}
              render={({ field }) => (
                <Field>
                  <FieldLabel>Auftrag (optional)</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Auftrag verknüpfen" />
                    </SelectTrigger>
                    <SelectContent>
                      {jobs?.map((j) => (
                        <SelectItem key={j.id} value={j.id}>
                          {j.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            />

            {/* VAT rate */}
            <Controller
              name="vatRate"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>MwSt. (%)</FieldLabel>
                  <Input
                    value={field.value}
                    onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                    onBlur={field.onBlur}
                    type="number"
                    min={0}
                    max={100}
                    step={0.5}
                    className="w-32"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>

          <Separator className="my-6" />

          {/* AI Suggest Items */}
          <div className="flex gap-2 mb-6">
            <Input
              placeholder="Beschreibe die Arbeit für KI-Vorschläge…"
              value={aiDescription}
              onChange={(e) => setAiDescription(e.target.value)}
            />
            <Button
              type="button"
              variant="outline"
              disabled={!aiDescription.trim() || isSuggesting}
              onClick={() =>
                suggest(
                  { jobDescription: aiDescription },
                  {
                    onSuccess: (data) => {
                      data.items.forEach((item) =>
                        append({ description: item.description, quantity: item.quantity, unitPrice: item.unitPrice }),
                      );
                    },
                  },
                )
              }
            >
              {isSuggesting ? "KI lädt…" : "✨ Positionen vorschlagen"}
            </Button>
          </div>

          {/* Line items */}
          <TypographyH2 className="text-base mb-4">Positionen</TypographyH2>

          <div className="flex flex-col gap-3">
            {/* Header row */}
            <div className="grid grid-cols-[1fr_80px_100px_40px] gap-2 text-xs text-zinc-400 px-1">
              <span>Beschreibung</span>
              <span>Menge</span>
              <span>Einzelpreis</span>
              <span />
            </div>

            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-[1fr_80px_100px_40px] gap-2 items-start"
              >
                <Controller
                  name={`items.${index}.description`}
                  control={control}
                  render={({ field: f, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Input {...f} placeholder="z.B. Rohrmaterial" />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name={`items.${index}.quantity`}
                  control={control}
                  render={({ field: f, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Input
                        value={f.value}
                        onChange={(e) => f.onChange(parseFloat(e.target.value) || 0)}
                        onBlur={f.onBlur}
                        type="number"
                        min={0.01}
                        step={0.01}
                        placeholder="1"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name={`items.${index}.unitPrice`}
                  control={control}
                  render={({ field: f, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <Input
                        value={f.value}
                        onChange={(e) => f.onChange(parseFloat(e.target.value) || 0)}
                        onBlur={f.onBlur}
                        type="number"
                        min={0}
                        step={0.01}
                        placeholder="0.00"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => remove(index)}
                  disabled={fields.length === 1}
                  className="text-zinc-500 hover:text-red-400 mt-1"
                >
                  ✕
                </Button>
              </div>
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-fit"
              onClick={() =>
                append({ description: "", quantity: 1, unitPrice: 0 })
              }
            >
              + Position hinzufügen
            </Button>
          </div>

          <Separator className="my-6" />

          {/* Totals */}
          <div className="flex flex-col items-end gap-1 text-sm">
            <div className="flex gap-8 text-zinc-400">
              <span>Netto</span>
              <span>€{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex gap-8 text-zinc-400">
              <span>MwSt. {vatRate}%</span>
              <span>€{vatAmount.toFixed(2)}</span>
            </div>
            <div className="flex gap-8 font-semibold text-base mt-1">
              <span>Gesamt</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push("/quotes")}
          >
            Abbrechen
          </Button>
          <Button type="submit" disabled={isPending}>
            {isPending ? "Speichern..." : "Angebot erstellen"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
