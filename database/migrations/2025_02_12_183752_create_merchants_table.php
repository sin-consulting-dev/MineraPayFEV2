<?php

use App\Models\MerchantGroup;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('merchant_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->string('key');
            $table->string('token');
            $table->string('provider')->default('SPN');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('merchants', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name')->index();
            $table->string('key')->unique();
            $table->string('email');
            $table->string('client_key');
            $table->string('client_secret');
            $table->boolean('is_head_group')->default(false);
            $table->boolean('is_verified')->default(false);
            $table->foreignId('merchant_group_id')->nullable()->constrained()->cascadeOnDelete();
            $table->decimal('active_balance', 20, 2)->nullable();
            $table->decimal('pending_balance', 20, 2)->nullable();
            $table->decimal('total_disburse', 20, 2)->nullable();
            $table->string('deposit_callback_url')->nullable();
            $table->string('withdraw_callback_url')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('merchant_domains', function (Blueprint $table) {
            $table->id();
            $table->foreignUuid('merchant_id')->constrained()->cascadeOnDelete();
            $table->string('domain')->index();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('merchants');
    }
};
