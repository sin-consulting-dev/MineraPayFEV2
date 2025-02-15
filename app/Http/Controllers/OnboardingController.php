<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class OnboardingController extends Controller
{
    public function index($step = null)
    {
        if (!in_array($step, ['information', 'verification', 'payment'])) {
            if ($step === null) {
                return inertia('Onboarding/Intro');
            }

            return to_route('dashboard');
        }

        return inertia('Onboarding/' . ucfirst($step));
    }
}
