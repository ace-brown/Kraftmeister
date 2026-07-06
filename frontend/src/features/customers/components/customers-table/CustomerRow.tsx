import Link from "next/link";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { CustomerRowProps } from "../../types";

export function CustomerRow({ customer }: CustomerRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium text-white">{customer.name}</TableCell>
      <TableCell className="text-zinc-400">{customer.phone ?? "—"}</TableCell>
      <TableCell className="text-zinc-400">{customer.email ?? "—"}</TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Link href={`/customers/${customer.id}`}>
            <Button variant="outline" size="sm">Ansehen</Button>
          </Link>
          <Link href={`/customers/${customer.id}`}>
            <Button variant="outline" size="sm">Bearbeiten</Button>
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
}
