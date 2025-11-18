export interface Company {
  id: number;
  name: string;
  logo?: string | null;
  website?: string | null;
  description?: string | null;
  location?: string | null;
  jobs_count?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Job {
  id: number;
  company_id: number;
  company: Company;
  title: string;
  description: string;
  location: string;
  position_type: 'remote' | 'in-person';
  salary_min?: number | null;
  salary_max?: number | null;
  employment_type?: string | null;
  published: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface PaginatedJobs {
  data: Job[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
}

export interface JobFilters {
  search?: string;
  position_type?: 'remote' | 'in-person' | '';
  company_id?: number | '';
  location?: string;
  salary_min?: number | '';
  salary_max?: number | '';
}

export interface PageProps {
  auth?: {
    user: {
      id: number;
      name: string;
      email: string;
    };
  };
}

