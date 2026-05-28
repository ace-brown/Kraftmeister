import { apiClient } from "@/lib/api/client";
import {
  CreateCustomerPayload,
  Customer,
  UpdateCustomerPayload,
} from "../types";

export async function getCustomers(search?: string): Promise<Customer[]> {
  const params = new URLSearchParams();
  if (search) params.append("search", search);
  const query = params.toString();
  return apiClient(query ? `/customers?${query}` : "/customers");
}

export async function getCustomer(id: string): Promise<Customer> {
  return apiClient(`/customers/${id}`);
}

export async function createCustomer(
  data: CreateCustomerPayload
): Promise<Customer> {
  return apiClient("/customers", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function updateCustomer({
  id,
  data,
}: UpdateCustomerPayload): Promise<Customer> {
  return apiClient(`/customers/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteCustomer(id: string): Promise<void> {
  return apiClient(`/customers/${id}`, { method: "DELETE" });
}
