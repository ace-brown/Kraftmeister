"use client";

import { useState } from "react";
import * as z from "zod";
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
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters.")
    .max(32, "Title must be at most 32 characters."),
  description: z
    .string()
    .min(20, "Description must be at least 20 characters.")
    .max(100, "Description must be at most 100 characters."),
  status: z.enum(["open", "in-progress", "done"]),
});

export function JobForm() {
  const { register, handleSubmit, control } = useForm<
    z.infer<typeof formSchema>
  >({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: "open",
    },
  });
  return (
    <Card>
      <CardContent>
        <form id="form-create-new-job">
          <FieldGroup>
            {/* ========== Title Field ==========*/}
            <Controller
              name="title"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-job-title">Title</FieldLabel>
                    <Input
                      {...field}
                      id="create-job-title"
                      placeholder="e.g. Kitchen sink repair"
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                );
              }}
            />
            {/* ========== Description Field ========== */}
            <Controller
              name="description"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
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
                );
              }}
            />
            {/* ========== Status Field ========== */}
            <Controller
              name="status"
              control={control}
              render={({ field, fieldState }) => {
                return (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="create-job-status">Status</FieldLabel>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="open">Open</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="done">Done</SelectItem>
                      </SelectContent>
                    </Select>
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}

// "use client";

// import { useState } from "react";

// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// export function JobForm() {
//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [status, setStatus] = useState("open");

//   function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();

//     console.log({
//       title,
//       description,
//       status,
//     });

//     // later: API call to NestJS
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
//       {/* Title */}
//       <div>
//         <label className="text-sm text-zinc-300">Title</label>
//         <Input
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           placeholder="e.g. Kitchen sink repair"
//         />
//       </div>

//       {/* Description */}
//       <div>
//         <label className="text-sm text-zinc-300">Description</label>
//         <Textarea
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           placeholder="Job details..."
//         />
//       </div>

//       {/* Status */}
//       <div>
//         <label className="text-sm text-zinc-300">Status</label>

//         <Select value={status} onValueChange={setStatus}>
//           <SelectTrigger>
//             <SelectValue placeholder="Select status" />
//           </SelectTrigger>

//           <SelectContent>
//             <SelectItem value="open">Open</SelectItem>
//             <SelectItem value="in-progress">In Progress</SelectItem>
//             <SelectItem value="done">Done</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Submit */}
//       <Button type="submit" className="w-full">
//         Create Job
//       </Button>
//     </form>
//   );
// }
