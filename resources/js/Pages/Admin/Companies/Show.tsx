import { Link, router } from '@inertiajs/react';
import type { Company, Job } from '@/types';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { JobCard } from '@/components/jobs/job-card';

interface Props {
  company: Company;
  jobs: Job[];
}

export default function Show({ company, jobs }: Props) {
  const handleDeleteJob = (job: Job) => {
    if (!window.confirm(`Delete job "${job.title}"?`)) {
      return;
    }

    router.post(`/admin/companies/${company.id}/jobs/${job.id}/delete`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAdmin />

      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-4">
                {company.logo && (
                  <div className="w-12 h-12 rounded-lg bg-muted overflow-hidden border border-border">
                    <img
                      src={company.logo || '/placeholder.svg'}
                      alt={company.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold">{company.name}</h1>
                  {company.location && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {company.location}
                    </p>
                  )}
                  {company.website && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {company.website}
                    </p>
                  )}
                  {company.description && (
                    <p className="mt-3 text-sm text-muted-foreground whitespace-pre-line">
                      {company.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col items-end gap-3">
                <Link
                  href="/admin/companies"
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  ← Back to companies
                </Link>
                <div className="inline-flex items-center gap-2">
                  <Link
                    href={`/admin/companies/${company.id}/edit`}
                    className="rounded-md border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    Edit
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
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                Job Postings ({jobs.length})
              </h2>
            </div>

            {jobs.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
                No job postings yet. Create the first job for this company.
              </div>
            ) : (
              <div className="space-y-4">
                {jobs.map((job) => (
                  <div
                    key={job.id}
                    className="group relative rounded-lg border border-border bg-card p-4"
                  >
                    <div className="absolute right-4 top-4 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link
                        href={`/admin/companies/${company.id}/jobs/${job.id}`}
                        className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        View
                      </Link>
                      <Link
                        href={`/admin/companies/${company.id}/jobs/${job.id}/edit`}
                        className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleDeleteJob(job)}
                        className="rounded-md border border-destructive/60 px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
                      >
                        Delete
                      </button>
                    </div>
                    <JobCard job={job} />
                  </div>
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
