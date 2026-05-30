export const QUOTE_STATUSES = ["DRAFT", "SENT", "ACCEPTED", "REJECTED"] as const;
export type QuoteStatus = (typeof QUOTE_STATUSES)[number];

export const QUOTE_STATUS_LABELS: Record<QuoteStatus, string> = {
  DRAFT: "Draft",
  SENT: "Sent",
  ACCEPTED: "Accepted",
  REJECTED: "Rejected",
};

export interface QuoteItem {
  id: string;
  quoteId: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface Quote {
  id: string;
  companyId: string;
  customerId: string;
  jobId?: string | null;
  status: QuoteStatus;
  vatRate: number;
  total: number;
  subtotal: number;
  vatAmount: number;
  createdAt: string;
  items: QuoteItem[];
  customer: { id: string; name: string; email?: string | null };
  job?: { id: string; title: string } | null;
  invoice?: { id: string; invoiceNumber: string; status: string } | null;
}

export type CreateQuoteItemPayload = {
  description: string;
  quantity: number;
  unitPrice: number;
};

export type CreateQuotePayload = {
  customerId: string;
  jobId?: string;
  vatRate?: number;
  items: CreateQuoteItemPayload[];
};

export type UpdateQuotePayload = {
  id: string;
  data: {
    status?: QuoteStatus;
    vatRate?: number;
    items?: CreateQuoteItemPayload[];
  };
};
