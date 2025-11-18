import { Head, Link } from '@inertiajs/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { JobCard } from '@/components/jobs/job-card';
import { JobFilters } from '@/components/jobs/job-filters';
import type { Job, Company, JobFilters as Filters } from '@/types';

interface Props {
  jobs: Job[];
  companies: Company[];
  filters: Filters;
}

export default function Index({ jobs, companies, filters }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head title="WiseJobs" />
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-balance mb-6">
                Find Your Next <span className="text-primary">Career Opportunity</span>
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground text-pretty">
                Discover thousands of job opportunities with top companies. Your dream job is
                waiting.
              </p>
            </div>
          </div>
        </section>

        {/* Jobs Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-[300px_1fr] gap-8">
              {/* Filters Sidebar */}
              <aside className="lg:sticky lg:top-20 lg:self-start">
                <div className="rounded-lg border border-border bg-card p-6">
                  <JobFilters filters={filters} companies={companies} />
                </div>
              </aside>

              {/* Jobs List */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold">
                    {jobs.length} {jobs.length === 1 ? 'Job' : 'Jobs'} Found
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Showing {jobs.length} results
                  </p>
                </div>

                {jobs.length > 0 ? (
                  <div className="space-y-4" aria-label="Job results">
                    {jobs.map((job) => (
                      <Link
                        key={job.id}
                        href={`/jobs/${job.id}`}
                        className="block rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                        aria-label={`View details for ${job.title} at ${job.company.name}`}
                      >
                        <JobCard job={job} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <h3 className="mt-4 text-lg font-semibold">No jobs found</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Try adjusting your filters to find more opportunities.
                    </p>
                  </div>
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
