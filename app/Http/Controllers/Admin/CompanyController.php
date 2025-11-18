<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Job;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CompanyController extends Controller
{
    public function index(): Response
    {
        $companies = Company::query()
            ->withCount([
                'jobs as jobs_count' => function ($query) {
                    $query->where('published', true);
                },
            ])
            ->orderBy('name')
            ->get();

        return Inertia::render('Admin/Companies/Index', [
            'companies' => $companies,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Companies/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'logo' => ['nullable', 'string', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
        ]);

        Company::create($data);

        return redirect('/admin/companies');
    }

    public function show(Company $company): Response
    {
        $company->loadCount([
            'jobs as jobs_count' => function ($query) {
                $query->where('published', true);
            },
        ]);

        $jobs = Job::query()
            ->with('company')
            ->where('company_id', $company->id)
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Admin/Companies/Show', [
            'company' => $company,
            'jobs' => $jobs,
        ]);
    }

    public function edit(Company $company): Response
    {
        return Inertia::render('Admin/Companies/Edit', [
            'company' => $company,
        ]);
    }

    public function update(Request $request, Company $company): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'logo' => ['nullable', 'string', 'max:255'],
            'website' => ['nullable', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
            'location' => ['nullable', 'string', 'max:255'],
        ]);

        $company->update($data);

        return redirect('/admin/companies');
    }

    public function destroy(Company $company): RedirectResponse
    {
        $company->delete();

        return redirect('/admin/companies');
    }
}

