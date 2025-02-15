<?php

namespace Database\Seeders;

use App\Models\Merchant;
use App\Models\MerchantDomain;
use App\Models\MerchantGroup;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'Administrator',
            'email' => 'superuser@minerapay.dev',
            'password' => bcrypt('asdf1234'),
            'type' => User::ADMIN,
        ]);

        MerchantGroup::factory()
            ->has(
                Merchant::factory()
                    ->hasDomains(50)
                    ->count(5)
                    ->state([
                        'name' => 'Test Merchant',
                        'email' => 'merchant@minerapay.dev',
                    ])
            )
            ->create();

        $merchants = Merchant::all();

        foreach ($merchants as $merchant) {
            User::factory()->count(5)->create([
                'password' => bcrypt('password'),
                'merchant_id' => $merchant->id,
            ]);
        }
    }
}
