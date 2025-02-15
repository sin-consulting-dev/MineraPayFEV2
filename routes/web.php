<?php

use App\Http\Controllers\BankController;
use App\Http\Controllers\DepositController;
use App\Http\Controllers\MerchantBankAccountController;
use App\Http\Controllers\MerchantDomainController;
use App\Http\Controllers\OnboardingController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::middleware(['auth'])->group(function () {
    Route::get('/', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('bank', [BankController::class, 'index'])->name('bank.index');

    Route::get('/onboarding/{step?}', [OnboardingController::class, 'index'])->name('onboarding.index');
    Route::post('/onboarding/{step?}', [OnboardingController::class, 'store'])->name('onboarding.store');

    Route::prefix('merchant')->name('merchant.')->group(function () {
        Route::resource('domain', MerchantDomainController::class);
        Route::resource('bank-account', MerchantBankAccountController::class);
    });

    Route::resource('deposit', DepositController::class);
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
