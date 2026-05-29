import { Button } from "@/components/ui/button";
import { TypographyH1, TypographyP } from "@/components/ui/Typography";
import { Customer } from "../../types";

interface Props {
  customer: Customer;
  onEdit: () => void;
}

export function CustomerDetailHeader({ customer, onEdit }: Props) {
  const formattedDate = new Date(customer.createdAt).toLocaleDateString(
    "de-DE",
    { day: "2-digit", month: "2-digit", year: "numeric" }
  );

  return (
    <div className="flex items-start justify-between mb-6">
      <div>
        <TypographyH1 className="mb-1">{customer.name}</TypographyH1>
        {customer.email && (
          <TypographyP className="text-sm text-zinc-400 mt-0 mb-0">
            {customer.email}
          </TypographyP>
        )}
        {customer.phone && (
          <TypographyP className="text-sm text-zinc-400 mt-0 mb-0">
            {customer.phone}
          </TypographyP>
        )}
        {customer.address && (
          <TypographyP className="text-sm text-zinc-400 mt-0 mb-0">
            {customer.address}
          </TypographyP>
        )}
        <p className="text-xs text-zinc-500 mt-2">Erstellt: {formattedDate}</p>
      </div>
      <Button variant="outline" onClick={onEdit}>Bearbeiten</Button>
    </div>
  );
}
