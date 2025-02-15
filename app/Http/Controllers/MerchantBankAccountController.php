<?php

namespace App\Http\Controllers;

use App\Models\MerchantBankAccount;
use App\Models\User;
use App\Responses\CommonResponse;
use Illuminate\Http\Request;

class MerchantBankAccountController extends Controller
{
    public function index(Request $request)
    {
        if (!$request->inertia() && $request->wantsJson()) {
            $user = auth()->user();

            $merchantBankAccounts = MerchantBankAccount::with('bank:id,name')
                ->when($user->type === User::MERCHANT, function ($query) use ($user) {
                    return $query->where('merchant_id', $user->merchant->id);
                })
                ->when($request->filled('merchant_id') && $user->type !== User::MERCHANT, function ($query) use ($request) {
                    return $query->where('merchant_id', $request->merchant_id);
                })
                ->when($request->filled('search'), function ($query) use ($request) {
                    return $query->where('name', 'like', '%' . $request->search . '%')
                        ->orWhere('number', 'like', '%' . $request->search . '%');
                })
                ->paginate($request->per_page ?? 10);

            return $merchantBankAccounts;
        }

        return inertia('Merchant/BankAccount');
    }

    public function store(Request $request)
    {
        $user = auth()->user();

        $request->validate([
            'bank_id' => 'required|exists:banks,id',
            'number' => 'required|string',
            'name' => 'required|string',
            'branch' => 'nullable|string',
        ]);

        $merchantBankAccount = MerchantBankAccount::create([
            'merchant_id' => $user->type === User::MERCHANT ? $user->merchant->id : $request->merchant_id,
            'bank_id' => $request->bank_id,
            'number' => $request->number,
            'name' => $request->name,
            'branch' => $request->branch,
        ]);

        return CommonResponse::success($merchantBankAccount);
    }

    public function update(Request $request, $id)
    {
        $user = auth()->user();

        $request->validate([
            'bank_id' => 'sometimes|required|exists:banks,id',
            'number' => 'sometimes|required|string',
            'name' => 'sometimes|required|string',
            'branch' => 'nullable|string',
        ]);

        $merchantBankAccount = MerchantBankAccount::findOrFail($id);

        if ($user->type === User::MERCHANT && $merchantBankAccount->merchant_id !== $user->merchant->id) {
            return CommonResponse::error('Unauthorized', 403);
        }

        $merchantBankAccount->update($request->only([
            'bank_id',
            'number',
            'name',
            'branch',
        ]));

        return CommonResponse::success($merchantBankAccount);
    }

    public function destroy($id)
    {
        $user = auth()->user();

        $merchantBankAccount = MerchantBankAccount::findOrFail($id);

        if ($user->type === User::MERCHANT && $merchantBankAccount->merchant_id !== $user->merchant->id) {
            return CommonResponse::error('Unauthorized', 403);
        }

        $merchantBankAccount->delete();

        return CommonResponse::success(null, 'Account deleted successfully');
    }
}
