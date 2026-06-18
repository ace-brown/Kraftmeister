export const INVOICE_STATUSES = ["DRAFT", "SENT", "PAID", "CANCELLED"] as const;
export type InvoiceStatus = (typeof INVOICE_STATUSES)[number];

export const INVOICE_STATUS_LABELS: Record<InvoiceStatus, string> = {
  DRAFT: "Entwurf",
  SENT: "Versendet",
  PAID: "Bezahlt",
  CANCELLED: "Storniert",
};

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  description: string;
  quantity: number;
  unitPrice: number;
  vatRate: number;
}

export interface Invoice {
  id: string;
  companyId: string;
  customerId: string;
  quoteId?: string | null;
  invoiceNumber: string;
  status: InvoiceStatus;
  dueDate?: string | null;
  total: number;
  subtotal: number;
  vatAmount: number;
  createdAt: string;
  items: InvoiceItem[];
  customer: { id: string; name: string; email?: string | null };
  quote?: { id: string; status: string } | null;
}

export type UpdateInvoiceStatusPayload = {
  id: string;
  status: InvoiceStatus;
};
