"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  JOB_STATUSES,
  JOB_STATUS_LABELS,
  JobsFilterBarProps,
} from "../../types/job.types";

export function JobsFilterBar({ filters, onChange }: JobsFilterBarProps) {
  const hasActiveFilters = !!filters.status || !!filters.date;

  return (
    <div className="flex items-center gap-3 mb-6 flex-wrap">
      <Select
        value={filters.status ?? "ALL"}
        onValueChange={(val) =>
          onChange({
            ...filters,
            status: val === "ALL" ? undefined : (val as typeof filters.status),
          })
        }
      >
        <SelectTrigger className="w-40">
          <SelectValue placeholder="All statuses" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All statuses</SelectItem>
          {JOB_STATUSES.map((s) => (
            <SelectItem key={s} value={s}>
              {JOB_STATUS_LABELS[s]}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Input
        type="date"
        value={filters.date ?? ""}
        onChange={(e) =>
          onChange({ ...filters, date: e.target.value || undefined })
        }
        className="w-40"
      />

      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={() => onChange({})}>
          Clear
        </Button>
      )}
    </div>
  );
}
