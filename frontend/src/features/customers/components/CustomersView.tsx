"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

import { PageHeader } from "@/components/ui/page-header";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

import { useCustomers } from "../hooks";
import { CustomersSearchBar } from "./CustomersSearchBar";
import { CustomersTable } from "./customers-table";

export default function CustomersView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("search") ?? "";

  const { data: customers, isLoading, error } = useCustomers(search || undefined);

  const handleSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams();
      if (value) params.set("search", value);
      const query = params.toString();
      router.replace(query ? `/customers?${query}` : "/customers");
    },
    [router]
  );

  return (
    <>
      <PageHeader
        title="Kunden"
        description="Alle Kunden verwalten"
        action={
          <Link href="/customers/new">
            <Button>Neuer Kunde</Button>
          </Link>
        }
      />
      <CustomersSearchBar value={search} onChange={handleSearch} />
      {isLoading && <LoadingSpinner />}
      {error && <div className="text-red-400">Fehler beim Laden der Kunden</div>}
      {!isLoading && !error && !customers?.length && (
        <EmptyState
          title="Keine Kunden"
          description="Lege deinen ersten Kunden an"
        />
      )}
      {!isLoading && !error && !!customers?.length && (
        <CustomersTable customers={customers} />
      )}
    </>
  );
}
