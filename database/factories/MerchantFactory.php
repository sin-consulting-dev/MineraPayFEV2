<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Merchant>
 */
class MerchantFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->company(),
            'key' => fake()->regexify('[A-Z0-9]{5}'),
            'email' => fake()->companyEmail(),
            'client_key' => fake()->uuid(),
            'client_secret' => sha1(random_bytes(12)),
            'is_head_group' => true,
            'is_verified' => true,
            'deposit_callback_url' => fake()->url(),
            'withdraw_callback_url' => fake()->url(),
        ];
    }
}
