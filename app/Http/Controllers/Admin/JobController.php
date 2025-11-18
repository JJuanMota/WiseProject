<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Company;
use App\Models\Job;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JobController extends Controller
{
    public function index(Company $company): Response
    {
        $jobs = Job::query()
            ->with('company')
            ->where('company_id', $company->id)
            ->orderByDesc('created_at')
            ->get();

        return Inertia::render('Admin/Jobs/Index', [
            'company' => $company,
            'jobs' => $jobs,
        ]);
    }

    public function create(Company $company): Response
    {
        return Inertia::render('Admin/Jobs/Create', [
            'company' => $company,
        ]);
    }

    public function store(Request $request, Company $company): RedirectResponse
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'location' => ['required', 'string', 'max:255'],
            'position_type' => ['required', 'in:remote,in-person'],
            'salary_min' => ['nullable', 'integer', 'min:0'],
            'salary_max' => ['nullable', 'integer', 'min:0'],
            'employment_type' => ['nullable', 'string', 'max:255'],
            'published' => ['sometimes', 'boolean'],
        ]);

        $data['published'] = (bool) ($data['published'] ?? true);

        $company->jobs()->create($data);

        return redirect("/admin/companies/{$company->id}");
    }

    public function show(Company $company, Job $job): Response
    {
        if ($job->company_id !== $company->id) {
            abort(404);
        }

        $job->load('company');

        return Inertia::render('Admin/Jobs/Show', [
            'company' => $company,
            'job' => $job,
        ]);
    }

    public function edit(Company $company, Job $job): Response
    {
        if ($job->company_id !== $company->id) {
            abort(404);
        }

        $job->load('company');

        return Inertia::render('Admin/Jobs/Edit', [
            'company' => $company,
            'job' => $job,
        ]);
    }

    public function update(Request $request, Company $company, Job $job): RedirectResponse
    {
        if ($job->company_id !== $company->id) {
            abort(404);
        }

        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['required', 'string'],
            'location' => ['required', 'string', 'max:255'],
            'position_type' => ['required', 'in:remote,in-person'],
            'salary_min' => ['nullable', 'integer', 'min:0'],
            'salary_max' => ['nullable', 'integer', 'min:0'],
            'employment_type' => ['nullable', 'string', 'max:255'],
            'published' => ['sometimes', 'boolean'],
        ]);

        $data['published'] = (bool) ($data['published'] ?? true);

        $job->update($data);

        return redirect("/admin/companies/{$company->id}");
    }

    public function destroy(Company $company, Job $job): RedirectResponse
    {
        if ($job->company_id !== $company->id) {
            abort(404);
        }

        $job->delete();

        return redirect("/admin/companies/{$company->id}");
    }
}

