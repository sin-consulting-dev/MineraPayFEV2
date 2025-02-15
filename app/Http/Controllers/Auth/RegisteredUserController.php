<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Merchant;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Str;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $captchaEnabled = config('services.hcaptcha.enabled', false);
        $captchaSiteKey = config('services.hcaptcha.site_key');

        return Inertia::render('Auth/Register', [
            'captchaEnabled' => $captchaEnabled,
            'captchaSiteKey' => $captchaSiteKey,
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $nameParts = explode(' ', $request->name);
        $key = count($nameParts) > 1 ?
            strtoupper(substr($nameParts[0], 0, 2) . substr($nameParts[1], 0, 1)) :
            strtoupper(substr(preg_replace('/\s+/', '', $request->name), 0, 3));

        $merchant = Merchant::create([
            'name' => $request->name,
            'email' => $request->email,
            'key' => $key,
            'client_key' => Str::uuid(),
            'client_secret' => Str::random(64),
        ]);

        $user = $merchant->users()->create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        event(new Registered($user));

        Auth::login($user);

        return to_route('dashboard');
    }
}
