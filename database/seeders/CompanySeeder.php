<?php

namespace Database\Seeders;

use App\Models\Company;
use Illuminate\Database\Seeder;

class CompanySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $companies = [
            [
                'name' => 'TechCorp',
                'logo' => null,
                'website' => 'https://techcorp.com',
                'description' => 'Leading technology company building the future of software.',
                'location' => 'San Francisco, CA',
            ],
            [
                'name' => 'DataSystems Inc',
                'logo' => null,
                'website' => 'https://datasystems.com',
                'description' => 'Enterprise data solutions and analytics platform.',
                'location' => 'New York, NY',
            ],
            [
                'name' => 'CloudVentures',
                'logo' => null,
                'website' => 'https://cloudventures.com',
                'description' => 'Cloud infrastructure and DevOps solutions.',
                'location' => 'Austin, TX',
            ],
        ];

        foreach ($companies as $data) {
            Company::firstOrCreate(
                ['name' => $data['name']],
                $data,
            );
        }
    }
}
