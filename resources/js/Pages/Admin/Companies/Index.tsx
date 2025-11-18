import { router, Link } from '@inertiajs/react';
import type { Company } from '@/types';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

interface Props {
  companies: Company[];
}

export default function Index({ companies }: Props) {
  const handleDelete = (company: Company) => {
    if (!window.confirm(`Delete company "${company.name}" and all of its postings?`)) {
      return;
    }

    router.post(`/admin/companies/${company.id}/delete`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAdmin />

      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Companies</h1>
                <p className="mt-1 text-sm text-muted-foreground">
                  Manage companies and their job postings.
                </p>
              </div>

              <Link
                href="/admin/companies/create"
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                + New Company
              </Link>
            </div>
          </div>
        </section>

        <section className="py-8">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {companies.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-muted/30 p-8 text-center text-sm text-muted-foreground">
                No companies yet. Create the first company to start posting jobs.
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg border border-border bg-card">
                <table className="min-w-full divide-y divide-border text-sm">
                  <thead className="bg-muted/60">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Company
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Location
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-muted-foreground">
                        Jobs
                      </th>
                      <th className="px-4 py-3 text-right font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    {companies.map((company) => (
                      <tr key={company.id} className="hover:bg-muted/40">
                        <td className="px-4 py-3 align-middle">
                          <div className="flex items-center gap-3">
                            {company.logo && (
                              <div className="w-8 h-8 rounded-md bg-muted overflow-hidden border border-border">
                                <img
                                  src={company.logo || '/placeholder.svg'}
                                  alt={company.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                            )}
                            <div>
                              <Link
                                href={`/admin/companies/${company.id}`}
                                className="text-sm font-medium text-foreground hover:text-primary"
                              >
                                {company.name}
                              </Link>
                              {company.website && (
                                <p className="text-xs text-muted-foreground">
                                  {company.website}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 align-middle text-sm text-muted-foreground">
                          {company.location || '—'}
                        </td>
                        <td className="px-4 py-3 align-middle text-sm text-muted-foreground">
                          {company.jobs_count ?? 0}
                        </td>
                        <td className="px-4 py-3 align-middle text-right">
                          <div className="inline-flex items-center gap-2">
                            <Link
                              href={`/admin/companies/${company.id}/edit`}
                              className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                              Edit
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDelete(company)}
                              className="rounded-md border border-destructive/60 px-2 py-1 text-xs text-destructive hover:bg-destructive/10"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
