<?php

use App\Http\Controllers\Admin\CompanyController as AdminCompanyController;
use App\Http\Controllers\Admin\JobController as AdminJobController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\JobController;
use Illuminate\Support\Facades\Route;

Route::get('/', [JobController::class, 'index'])->name('jobs.index');

Route::get('/jobs/{job}', [JobController::class, 'show'])->name('jobs.show');

Route::get('/companies', [CompanyController::class, 'index'])->name('companies.index');
Route::get('/companies/{company}', [CompanyController::class, 'show'])->name('companies.show');

Route::get('/login', [AuthController::class, 'showLoginForm'])
    ->middleware('guest')
    ->name('login');
Route::post('/login', [AuthController::class, 'login'])
    ->middleware('guest');
Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth')
    ->name('logout');

Route::prefix('admin')->name('admin.')->middleware(['auth', 'admin'])->group(function () {
    // Companies
    Route::get('/companies', [AdminCompanyController::class, 'index'])->name('companies.index');
    Route::get('/companies/create', [AdminCompanyController::class, 'create'])->name('companies.create');
    Route::post('/companies', [AdminCompanyController::class, 'store'])->name('companies.store');
    Route::get('/companies/{company}', [AdminCompanyController::class, 'show'])->name('companies.show');
    Route::get('/companies/{company}/edit', [AdminCompanyController::class, 'edit'])->name('companies.edit');
    Route::post('/companies/{company}/update', [AdminCompanyController::class, 'update'])->name('companies.update');
    Route::post('/companies/{company}/delete', [AdminCompanyController::class, 'destroy'])->name('companies.destroy');

    // Jobs (nested under companies)
    Route::get('/companies/{company}/jobs', [AdminJobController::class, 'index'])->name('companies.jobs.index');
    Route::get('/companies/{company}/jobs/create', [AdminJobController::class, 'create'])->name('companies.jobs.create');
    Route::post('/companies/{company}/jobs', [AdminJobController::class, 'store'])->name('companies.jobs.store');
    Route::get('/companies/{company}/jobs/{job}', [AdminJobController::class, 'show'])->name('companies.jobs.show');
    Route::get('/companies/{company}/jobs/{job}/edit', [AdminJobController::class, 'edit'])->name('companies.jobs.edit');
    Route::post('/companies/{company}/jobs/{job}/update', [AdminJobController::class, 'update'])->name('companies.jobs.update');
    Route::post('/companies/{company}/jobs/{job}/delete', [AdminJobController::class, 'destroy'])->name('companies.jobs.destroy');
});
