<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Job extends Model
{
    use HasFactory;

    /**
     * We keep queue jobs table intact and use a dedicated
     * table for job listings.
     */
    protected $table = 'job_listings';

    protected $fillable = [
        'company_id',
        'title',
        'description',
        'location',
        'position_type',
        'salary_min',
        'salary_max',
        'employment_type',
        'published',
    ];

    protected $casts = [
        'published' => 'boolean',
        'salary_min' => 'integer',
        'salary_max' => 'integer',
    ];

    public function company(): BelongsTo
    {
        return $this->belongsTo(Company::class);
    }
}

