<?php

namespace Database\Seeders;

use App\Models\Company;
use App\Models\Job;
use Illuminate\Database\Seeder;

class JobSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companiesByName = Company::query()->pluck('id', 'name');

        $jobs = [
            [
                'company' => 'TechCorp',
                'title' => 'Senior Frontend Developer',
                'description' => 'We are looking for an experienced frontend developer to join our team and help build amazing user experiences.',
                'location' => 'San Francisco, CA',
                'position_type' => 'remote',
                'salary_min' => 120000,
                'salary_max' => 180000,
                'employment_type' => 'Full-time',
            ],
            [
                'company' => 'TechCorp',
                'title' => 'Full Stack Engineer',
                'description' => 'Join our engineering team to work on cutting-edge web applications using modern technologies.',
                'location' => 'San Francisco, CA',
                'position_type' => 'remote',
                'salary_min' => 130000,
                'salary_max' => 200000,
                'employment_type' => 'Full-time',
            ],
            [
                'company' => 'DataSystems Inc',
                'title' => 'Data Engineer',
                'description' => 'Build scalable data pipelines and work with big data technologies to power our analytics platform.',
                'location' => 'New York, NY',
                'position_type' => 'in-person',
                'salary_min' => 110000,
                'salary_max' => 160000,
                'employment_type' => 'Full-time',
            ],
            [
                'company' => 'DataSystems Inc',
                'title' => 'Machine Learning Engineer',
                'description' => 'Develop and deploy ML models to solve complex business problems.',
                'location' => 'New York, NY',
                'position_type' => 'remote',
                'salary_min' => 140000,
                'salary_max' => 190000,
                'employment_type' => 'Full-time',
            ],
            [
                'company' => 'CloudVentures',
                'title' => 'DevOps Engineer',
                'description' => 'Manage cloud infrastructure and CI/CD pipelines for our platform.',
                'location' => 'Austin, TX',
                'position_type' => 'remote',
                'salary_min' => 115000,
                'salary_max' => 165000,
                'employment_type' => 'Full-time',
            ],
            [
                'company' => 'CloudVentures',
                'title' => 'Site Reliability Engineer',
                'description' => 'Ensure high availability and performance of our cloud services.',
                'location' => 'Austin, TX',
                'position_type' => 'in-person',
                'salary_min' => 125000,
                'salary_max' => 175000,
                'employment_type' => 'Full-time',
            ],
        ];

        foreach ($jobs as $data) {
            $companyId = $companiesByName[$data['company']] ?? null;

            if (! $companyId) {
                continue;
            }

            Job::create([
                'company_id' => $companyId,
                'title' => $data['title'],
                'description' => $data['description'],
                'location' => $data['location'],
                'position_type' => $data['position_type'],
                'salary_min' => $data['salary_min'],
                'salary_max' => $data['salary_max'],
                'employment_type' => $data['employment_type'],
                'published' => true,
            ]);
        }
    }
}

