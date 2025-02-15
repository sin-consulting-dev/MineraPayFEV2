<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MerchantBankAccount extends Model
{
    /** @use HasFactory<\Database\Factories\MerchantBankFactory> */
    use HasFactory;

    protected $fillable = [
        'merchant_id',
        'bank_id',
        'number',
        'name',
        'branch',
    ];

    public function merchant()
    {
        return $this->belongsTo(Merchant::class);
    }

    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }
}
