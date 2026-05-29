"use client";

import { useState } from "react";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { TypographyP } from "@/components/ui/Typography";
import { useCustomer } from "../hooks";
import { CustomerDetailHeader } from "./customer-detail/CustomerDetailHeader";
import { CustomerEditDialog } from "./customer-detail/CustomerEditDialog";

export default function CustomerDetail({ id }: { id: string }) {
  const { data: customer, isLoading, error } = useCustomer(id);
  const [editOpen, setEditOpen] = useState(false);

  if (isLoading) {
    return (
      <PageContainer>
        <TypographyP className="text-zinc-400 text-sm">Laden...</TypographyP>
      </PageContainer>
    );
  }

  if (error || !customer) {
    return (
      <PageContainer>
        <TypographyP className="text-red-400 text-sm">
          Kunde nicht gefunden.
        </TypographyP>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Link
        href="/customers"
        className="text-sm text-zinc-400 hover:text-white mb-4 inline-block"
      >
        ← Zurück zu Kunden
      </Link>
      <CustomerDetailHeader customer={customer} onEdit={() => setEditOpen(true)} />
      <div className="h-px bg-zinc-800 mb-6" />
      <TypographyP className="text-sm text-zinc-500">
        Auftragsverlauf folgt in Phase 4.
      </TypographyP>

      <CustomerEditDialog
        customer={customer}
        open={editOpen}
        onOpenChange={setEditOpen}
      />
    </PageContainer>
  );
}
