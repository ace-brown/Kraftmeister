import { Job } from "../types/job.types";

export async function getJobs(): Promise<Job[]> {
  return [
    {
      id: "1",
      title: "Küche Wasserleitung reparieren",
      status: "open",
      address: "Stuttgart",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Heizung warten",
      status: "in-progress",
      address: "Esslingen",
      createdAt: new Date().toISOString(),
    },
  ];
}
