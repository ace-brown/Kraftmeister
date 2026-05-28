import { Input } from "@/components/ui/input";
import { CustomersSearchBarProps } from "../types";

export function CustomersSearchBar({ value, onChange }: CustomersSearchBarProps) {
  return (
    <div className="mb-4">
      <Input
        placeholder="Name, Telefon oder E-Mail suchen..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="max-w-sm"
      />
    </div>
  );
}
