export interface Settings {
  id: string;
  name: string;
  address: string | null;
  vatId: string | null;
  logoUrl: string | null;
  defaultVatRate: number | null;
  paymentTermsDays: number | null;
  bankName: string | null;
  bankIban: string | null;
  bankBic: string | null;
  createdAt: string;
  email: string | null;
}

export interface UpdateCompanyPayload {
  name?: string;
  address?: string;
  vatId?: string;
  defaultVatRate?: number;
  paymentTermsDays?: number;
  bankName?: string;
  bankIban?: string;
  bankBic?: string;
}

export interface UpdateAccountPayload {
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}
