import { useForm, Link } from '@inertiajs/react';
import type { Company, Job } from '@/types';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

interface Props {
  company: Company;
  job: Job;
}

export default function Edit({ company, job }: Props) {
  const { data, setData, post, processing, errors } = useForm({
    title: job.title,
    description: job.description,
    location: job.location,
    position_type: job.position_type,
    salary_min: job.salary_min ?? '',
    salary_max: job.salary_max ?? '',
    employment_type: job.employment_type ?? '',
    published: job.published ?? true,
  } as any);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    post(
      `/admin/companies/${company.id}/jobs/${job.id}/update`,
      {
        preserveScroll: true,
      },
    );
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAdmin />

      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Edit Job Posting</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Update job details for {company.name}.
                </p>
              </div>
              <Link
                href={`/admin/companies/${company.id}/jobs/${job.id}`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                ← Back to job
              </Link>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <form
              onSubmit={handleSubmit}
              className="max-w-2xl space-y-6 rounded-lg border border-border bg-card p-6"
            >
              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  value={data.title}
                  onChange={(e) => setData('title', e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
                {errors.title && (
                  <p className="text-xs text-destructive mt-1">{errors.title}</p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm font-medium">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={data.location}
                    onChange={(e) => setData('location', e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    required
                  />
                  {errors.location && (
                    <p className="text-xs text-destructive mt-1">{errors.location}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="position_type"
                    className="block text-sm font-medium"
                  >
                    Position Type
                  </label>
                  <select
                    id="position_type"
                    value={data.position_type}
                    onChange={(e) =>
                      setData('position_type', e.target.value as 'remote' | 'in-person')
                    }
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="remote">Remote</option>
                    <option value="in-person">In-Person</option>
                  </select>
                  {errors.position_type && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.position_type}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="salary_min" className="block text-sm font-medium">
                    Salary Min
                  </label>
                  <input
                    id="salary_min"
                    type="number"
                    value={data.salary_min ?? ''}
                    onChange={(e) => setData('salary_min', e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    min={0}
                  />
                  {errors.salary_min && (
                    <p className="text-xs text-destructive mt-1">{errors.salary_min}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label htmlFor="salary_max" className="block text-sm font-medium">
                    Salary Max
                  </label>
                  <input
                    id="salary_max"
                    type="number"
                    value={data.salary_max ?? ''}
                    onChange={(e) => setData('salary_max', e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    min={0}
                  />
                  {errors.salary_max && (
                    <p className="text-xs text-destructive mt-1">{errors.salary_max}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="employment_type"
                  className="block text-sm font-medium"
                >
                  Employment Type
                </label>
                <input
                  id="employment_type"
                  type="text"
                  value={data.employment_type ?? ''}
                  onChange={(e) => setData('employment_type', e.target.value)}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
                {errors.employment_type && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.employment_type}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <input
                    type="checkbox"
                    checked={data.published}
                    onChange={(e) => setData('published', e.target.checked)}
                    className="h-4 w-4 rounded border border-input bg-background"
                  />
                  Published
                </label>
                {errors.published && (
                  <p className="text-xs text-destructive mt-1">{errors.published}</p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  className="w-full min-h-[160px] rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                />
                {errors.description && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-end gap-3">
                <Link
                  href={`/admin/companies/${company.id}/jobs/${job.id}`}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={processing}
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
