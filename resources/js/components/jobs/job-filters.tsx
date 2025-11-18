import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';
import type { JobFilters, Company } from '@/types';

interface JobFiltersProps {
  filters: JobFilters;
  companies: Company[];
}

export function JobFilters({ filters, companies }: JobFiltersProps) {
  const [localFilters, setLocalFilters] = useState<JobFilters>(filters);

  useEffect(() => {
    const timer = setTimeout(() => {
      router.get('/', localFilters, {
        preserveState: true,
        preserveScroll: true,
        only: ['jobs', 'filters'],
      });
    }, 300);

    return () => clearTimeout(timer);
  }, [localFilters]);

  const handleFilterChange = (key: keyof JobFilters, value: any) => {
    setLocalFilters((prev) => ({
      ...prev,
      [key]: value || '',
    }));
  };

  const clearFilters = () => {
    setLocalFilters({});
    router.get('/', {}, { preserveState: true, preserveScroll: true });
  };

  const hasActiveFilters = Object.values(localFilters).some(
    (value) => value !== '' && value !== undefined,
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-primary hover:text-primary/80 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      <div className="space-y-4">
        {/* Search */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium mb-2">
            Search
          </label>
          <input
            type="text"
            id="search"
            placeholder="Job title or keywords..."
            value={localFilters.search || ''}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>

        {/* Position Type */}
        <div>
          <label htmlFor="position_type" className="block text-sm font-medium mb-2">
            Position Type
          </label>
          <select
            id="position_type"
            value={localFilters.position_type || ''}
            onChange={(e) => handleFilterChange('position_type', e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="">All Types</option>
            <option value="remote">Remote</option>
            <option value="in-person">In-Person</option>
          </select>
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium mb-2">
            Company
          </label>
          <select
            id="company"
            value={localFilters.company_id || ''}
            onChange={(e) =>
              handleFilterChange(
                'company_id',
                e.target.value ? Number(e.target.value) : '',
              )
            }
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="">All Companies</option>
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
              </option>
            ))}
          </select>
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium mb-2">
            Location
          </label>
          <input
            type="text"
            id="location"
            placeholder="City, state, or country..."
            value={localFilters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          />
        </div>

        {/* Salary Range */}
        <div>
          <label className="block text-sm font-medium mb-2">Salary Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={localFilters.salary_min || ''}
              onChange={(e) =>
                handleFilterChange(
                  'salary_min',
                  e.target.value ? Number(e.target.value) : '',
                )
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
            <input
              type="number"
              placeholder="Max"
              value={localFilters.salary_max || ''}
              onChange={(e) =>
                handleFilterChange(
                  'salary_max',
                  e.target.value ? Number(e.target.value) : '',
                )
              }
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

