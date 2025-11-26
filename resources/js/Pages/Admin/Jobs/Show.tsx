import { Link, router } from '@inertiajs/react';
import type { Company, Job } from '@/types';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { JobCard } from '@/components/jobs/job-card';

interface Props {
  company: Company;
  job: Job;
}

export default function Show({ company, job }: Props) {
  const handleDelete = () => {
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
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">{job.title}</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  {company.name} • {job.location}
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
                  href={`/admin/companies/${company.id}/jobs/${job.id}/edit`}
                  className="rounded-md border border-border px-3 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  Edit
                </Link>
                <button
                  type="button"
                  onClick={handleDelete}
                  className="rounded-md border border-destructive/60 px-3 py-1 text-xs text-destructive hover:bg-destructive/10"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            <div className="rounded-lg border border-border bg-card p-4">
              <JobCard job={job} interactive={false} />
            </div>

            <div className="rounded-lg border border-border bg-card p-4">
              <h2 className="text-lg font-semibold mb-2">Full Description</h2>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {job.description}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
