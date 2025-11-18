import { Link } from '@inertiajs/react';
import type { Company, Job } from '@/types';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { JobCard } from '@/components/jobs/job-card';

interface Props {
  company: Company;
  jobs: Job[];
}

export default function Index({ company, jobs }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header isAdmin />

      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">
                  Jobs for {company.name}
                </h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage job postings for this company.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  href={`/admin/companies/${company.id}`}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  ← Back to company
                </Link>
                <Link
                  href={`/admin/companies/${company.id}/jobs/create`}
                  className="rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90"
                >
                  + New Job
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {jobs.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
                No job postings yet. Create the first job for this company.
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

