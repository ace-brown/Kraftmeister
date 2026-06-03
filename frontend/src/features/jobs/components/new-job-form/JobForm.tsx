"use client";

import * as z from "zod";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { jobFormSchema } from "../../schemas/create-job.schema";
import { useCreateJob } from "../../hooks/useCreateJob";
import { JOB_STATUSES, JOB_STATUS_LABELS } from "../../types/job.types";
import { useVoiceToJob } from "@/features/ai/hooks/useVoiceToJob";

export function JobForm() {
  const router = useRouter();
  const { mutate, isPending } = useCreateJob();
  const { mutate: transcribe, isPending: isTranscribing } = useVoiceToJob();
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const { handleSubmit, control, reset, setValue } = useForm<
    z.infer<typeof jobFormSchema>
  >({
    resolver: zodResolver(jobFormSchema),
    defaultValues: {
      title: "",
      address: "",
      description: "",
      status: "OPEN",
    },
  });

  const handleMicClick = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      return;
    }
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const recorder = new MediaRecorder(stream);
    chunksRef.current = [];
    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.onstop = () => {
      stream.getTracks().forEach((t) => t.stop());
      const blob = new Blob(chunksRef.current, { type: "audio/webm" });
      transcribe(
        { audioBlob: blob, filename: "recording.webm" },
        {
          onSuccess: (data) => {
            setValue("title", data.title);
            setValue("description", data.description);
          },
        },
      );
      setIsRecording(false);
    };
    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);
  };

  const onSubmit = (data: z.infer<typeof jobFormSchema>) => {
    mutate(
      {
        title: data.title,
        address: data.address,
        description: data.description,
        status: data.status,
      },
      { onSuccess: () => router.push("/jobs") },
    );
  };

  return (
    <Card>
      <form id="form-create-new-job" onSubmit={handleSubmit(onSubmit)}>
        <CardContent>
          <FieldGroup>
            {/* ========== Voice to Job ==========*/}
            <div className="md:col-span-2 flex items-center gap-3 p-3 rounded-lg border border-dashed border-zinc-700">
              <Button
                type="button"
                variant={isRecording ? "destructive" : "outline"}
                size="sm"
                onClick={handleMicClick}
                disabled={isTranscribing}
              >
                {isTranscribing ? "KI verarbeitet…" : isRecording ? "⏹ Aufnahme stoppen" : "🎤 Sprachnotiz"}
              </Button>
              <span className="text-xs text-zinc-500">
                {isRecording ? "Aufnahme läuft…" : "Sprach-Notiz aufnehmen — KI füllt Titel und Beschreibung aus."}
              </span>
            </div>

            {/* ========== Title Field ==========*/}
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-job-title">Title</FieldLabel>
                  <Input
                    {...field}
                    id="create-job-title"
                    required
                    placeholder="e.g. Kitchen sink repair"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* ========== Description Field ========== */}
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="md:col-span-2">
                  <FieldLabel htmlFor="create-job-description">
                    Description
                  </FieldLabel>
                  <Textarea
                    {...field}
                    id="create-job-description"
                    placeholder="Job details..."
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* ========== Address Field ========== */}
            <Controller
              name="address"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-job-address">Address</FieldLabel>
                  <Input
                    {...field}
                    id="create-job-address"
                    placeholder="e.g. Stuttgart"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* ========== Status Field ========== */}
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="create-job-status">Status</FieldLabel>
                  <Select
                    value={field.value}
                    onValueChange={field.onChange}
                    aria-invalid={fieldState.invalid}
                  >
                    <SelectTrigger id="create-job-status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {JOB_STATUSES.map((s) => (
                        <SelectItem key={s} value={s}>
                          {JOB_STATUS_LABELS[s]}
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
          </FieldGroup>
        </CardContent>
      </form>
      <CardFooter>
        <Field orientation="horizontal">
          <Button type="button" variant="outline" onClick={() => reset()}>
            Reset
          </Button>
          <Button type="submit" form="form-create-new-job">
            Submit
          </Button>
        </Field>
      </CardFooter>
    </Card>
  );
}
