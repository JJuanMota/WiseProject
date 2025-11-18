import { Link } from '@inertiajs/react';
import type { Company } from '@/types';

interface CompanyCardProps {
  company: Company;
}

export function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Link href={`/companies/${company.id}`} className="block group">
      <article className="relative rounded-lg border border-border bg-card p-6 hover:border-primary/50 transition-all duration-200 hover:shadow-lg hover:shadow-primary/10">
        <div className="flex items-start gap-4">
          {company.logo && (
            <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-muted overflow-hidden border border-border">
              <img
                src={company.logo || '/placeholder.svg'}
                alt={company.name}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors text-balance">
              {company.name}
            </h3>

            {company.location && (
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                {company.location}
              </p>
            )}

            {company.description && (
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
                {company.description}
              </p>
            )}

            {company.jobs_count !== undefined && (
              <div className="mt-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-muted/50 px-2.5 py-0.5 text-xs font-medium">
                  {company.jobs_count}{' '}
                  {company.jobs_count === 1 ? 'job' : 'jobs'} available
                </span>
              </div>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

