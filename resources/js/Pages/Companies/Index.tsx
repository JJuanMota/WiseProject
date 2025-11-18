import { Head } from '@inertiajs/react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { CompanyCard } from '@/components/companies/company-card';
import type { Company } from '@/types';

interface Props {
  companies: Company[];
}

export default function Index({ companies }: Props) {
  return (
    <div className="min-h-screen flex flex-col">
      <Head title="Companies - WiseJobs" />
      <Header />

      <main className="flex-1">
        <section className="border-b border-border bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-balance mb-4">
                Top Companies Hiring Now
              </h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Explore companies that are actively hiring and discover your next workplace.
              </p>
            </div>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {companies.length === 0 ? (
              <div className="rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
                <h2 className="text-xl font-semibold">No companies found</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Once companies are added, they will appear here.
                </p>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {companies.map((company) => (
                  <CompanyCard key={company.id} company={company} />
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

