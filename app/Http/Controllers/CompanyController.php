<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Job;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * List all companies.
     */
    public function index()
    {
        $companies = Company::query()
            ->withCount([
                'jobs as jobs_count' => function ($query) {
                    $query->where('published', true);
                },
            ])
            ->orderBy('name')
            ->get();

        return Inertia::render('Companies/Index', [
            'companies' => $companies,
        ]);
    }

    /**
     * Show a single company and its jobs.
     */
    public function show(Company $company)
    {
        $jobs = Job::query()
            ->with('company')
            ->where('company_id', $company->id)
            ->where('published', true)
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Companies/Show', [
            'company' => $company,
            'jobs' => $jobs,
        ]);
    }
}

