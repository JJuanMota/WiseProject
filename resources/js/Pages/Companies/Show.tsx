import { Head } from '@inertiajs/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { JobCard } from '@/components/jobs/job-card';
import type { Company, Job } from '@/types';

interface Props {
  company: Company;
  jobs: Job[];
}

export default function Show({ company, jobs }: Props) {
  const hasJobs = jobs.length > 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Head title={`${company.name} - WiseJobs`} />
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                {company.logo && (
                  <div className="w-16 h-16 rounded-lg bg-muted overflow-hidden border border-border">
                    <img
                      src={company.logo || '/placeholder.svg'}
                      alt={company.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-balance">
                    {company.name}
                  </h1>
                  {company.location && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {company.location}
                    </p>
                  )}
                </div>
              </div>

              {company.description && (
                <p className="text-base text-muted-foreground text-pretty">
                  {company.description}
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {hasJobs ? 'Open Positions' : 'No Open Positions'}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {hasJobs
                    ? `${jobs.length} ${
                        jobs.length === 1 ? 'job' : 'jobs'
                      } currently available`
                    : 'This company has no open positions at the moment.'}
                </p>
              </div>
            </div>

            {hasJobs ? (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
                <h3 className="text-lg font-semibold">No jobs found</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Check back later for new opportunities at this company.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

