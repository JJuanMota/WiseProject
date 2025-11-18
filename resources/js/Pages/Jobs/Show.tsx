import { Head } from '@inertiajs/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { JobCard } from '@/components/jobs/job-card';
import type { Job } from '@/types';

interface Props {
  job: Job;
}

export default function Show({ job }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head title={`${job.title} - ${job.company.name} | WiseJobs`} />
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="max-w-3xl space-y-4">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="text-xs text-muted-foreground hover:text-foreground mb-2 inline-flex items-center gap-1"
              >
                <span aria-hidden="true">←</span> Back to jobs
              </button>

              <div className="rounded-lg border border-border bg-card p-4 md:p-6">
                <JobCard job={job} />
              </div>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl space-y-6">
              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-lg font-semibold mb-3">Job Description</h2>
                <p className="text-sm text-muted-foreground whitespace-pre-line">
                  {job.description}
                </p>
              </div>

              <div className="rounded-lg border border-border bg-card p-6">
                <h2 className="text-lg font-semibold mb-3">Company</h2>
                <p className="text-sm font-medium text-foreground">
                  {job.company.name}
                </p>
                {job.company.location && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {job.company.location}
                  </p>
                )}
                {job.company.website && (
                  <a
                    href={job.company.website}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center text-sm text-primary hover:text-primary/80"
                  >
                    Visit company website
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

