<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Merchant extends Model
{
    use HasUuids, HasFactory, SoftDeletes;

    protected $fillable = [
        'name',
        'key',
        'email',
        'client_key',
        'client_secret',
        'is_head_group',
        'is_verified',
        'merchant_group_id',
        'active_balance',
        'pending_balance',
        'total_disburse',
        'deposit_callback_url',
        'withdraw_callback_url',
    ];

    protected function casts(): array
    {
        return [
            'is_head_group' => 'boolean',
            'is_verified' => 'boolean',
        ];
    }

    public function group()
    {
        return $this->belongsTo(MerchantGroup::class);
    }

    public function domains()
    {
        return $this->hasMany(MerchantDomain::class);
    }
}
