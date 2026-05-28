"use client";

import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { TypographyP } from "@/components/ui/Typography";
import { useCustomer } from "../hooks";
import { CustomerDetailHeader } from "./customer-detail";

export default function CustomerDetail({ id }: { id: string }) {
  const { data: customer, isLoading, error } = useCustomer(id);

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
      <CustomerDetailHeader customer={customer} />
      <div className="h-px bg-zinc-800 mb-6" />
      <TypographyP className="text-sm text-zinc-500">
        Auftragsverlauf folgt in Phase 4.
      </TypographyP>
    </PageContainer>
  );
}
