import JobDetails from "@/features/jobs/components/jobs-list/job-details/JobDetails";

export default async function JobDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <JobDetails id={id} />
    </>
  );
}
