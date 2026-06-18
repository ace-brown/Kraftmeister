import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { TypographyH2, TypographyP } from '@/components/ui/Typography';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { DashboardOpenJobsProps } from '../types/dashboard.types';

/** Renders the list of open jobs, each linking to its detail page. */
export function DashboardOpenJobs({ jobs, isLoading }: DashboardOpenJobsProps) {
  return (
    <div>
      <TypographyH2 className="text-base font-semibold mb-3">Offene Aufträge</TypographyH2>
      {isLoading && <LoadingSpinner />}
      {!isLoading && !jobs?.length && (
        <TypographyP className="text-zinc-400 text-sm">Keine offenen Aufträge</TypographyP>
      )}
      <div className="flex flex-col gap-2">
        {jobs?.map((job) => (
          <Link key={job.id} href={`/jobs/${job.id}`}>
            <Card className="hover:border-zinc-600 transition-colors cursor-pointer">
              <CardContent className="py-3 flex items-center justify-between">
                <TypographyP className="text-sm font-medium">{job.title}</TypographyP>
                <TypographyP className="text-xs text-zinc-400">
                  {new Date(job.createdAt).toLocaleDateString('de-DE')}
                </TypographyP>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
