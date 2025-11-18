<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\Company;
use Illuminate\Http\Request;
use Inertia\Inertia;

class JobController extends Controller
{
    /**
     * Display the job listings with filters.
     */
    public function index(Request $request)
    {
        $filters = $request->only([
            'search',
            'position_type',
            'company_id',
            'location',
            'salary_min',
            'salary_max',
        ]);

        $jobsQuery = Job::query()
            ->with('company')
            ->where('published', true);

        if (! empty($filters['search'])) {
            $search = $filters['search'];

            $jobsQuery->where(function ($query) use ($search) {
                $query->where('title', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%")
                    ->orWhereHas('company', function ($q) use ($search) {
                        $q->where('name', 'like', "%{$search}%");
                    });
            });
        }

        if (! empty($filters['position_type'])) {
            $jobsQuery->where('position_type', $filters['position_type']);
        }

        if (! empty($filters['company_id'])) {
            $jobsQuery->where('company_id', $filters['company_id']);
        }

        if (! empty($filters['location'])) {
            $jobsQuery->where('location', 'like', '%' . $filters['location'] . '%');
        }

        if (! empty($filters['salary_min'])) {
            $min = (int) $filters['salary_min'];
            $jobsQuery->where(function ($query) use ($min) {
                $query->whereNull('salary_max')
                    ->orWhere('salary_max', '>=', $min);
            });
        }

        if (! empty($filters['salary_max'])) {
            $max = (int) $filters['salary_max'];
            $jobsQuery->where(function ($query) use ($max) {
                $query->whereNull('salary_min')
                    ->orWhere('salary_min', '<=', $max);
            });
        }

        $jobs = $jobsQuery
            ->orderByDesc('created_at')
            ->get();

        $companies = Company::query()
            ->withCount([
                'jobs as jobs_count' => function ($query) {
                    $query->where('published', true);
                },
            ])
            ->orderBy('name')
            ->get();

        return Inertia::render('Jobs/Index', [
            'jobs' => $jobs,
            'companies' => $companies,
            'filters' => $filters,
        ]);
    }

    /**
     * Display a single published job.
     */
    public function show(Job $job)
    {
        if (! $job->published) {
            abort(404);
        }

        $job->load('company');

        return Inertia::render('Jobs/Show', [
            'job' => $job,
        ]);
    }
}
