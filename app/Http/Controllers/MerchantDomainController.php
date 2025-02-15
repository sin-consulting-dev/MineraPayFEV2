<?php

namespace App\Http\Controllers;

use App\Models\MerchantDomain;
use App\Models\User;
use App\Responses\CommonResponse;
use Illuminate\Http\Request;

class MerchantDomainController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();

        $data = MerchantDomain::query()
            ->when($user->type === User::MERCHANT, function ($query) use ($user) {
                return $query->where('merchant_id', $user->merchant->id);
            })
            ->latest('updated_at')
            ->paginate($request->input('per_page', 10));

        // Code to display a listing of the resource
        return inertia('Merchant/Domain/Index', $data);
    }

    public function store(Request $request)
    {
        $data = MerchantDomain::create([
            'merchant_id' => auth()->user()->merchant->id,
            'domain' => $request->input('domain'),
        ]);

        return to_route('merchant.domain.index')->with('success', 'Domain created successfully.');
    }

    public function show($id)
    {
        $data = MerchantDomain::findOrFail($id);

        return CommonResponse::success($data);
    }

    public function update(Request $request, $id)
    {
        $data = MerchantDomain::findOrFail($id);

        $data->update([
            'domain' => $request->input('domain'),
        ]);

        return to_route('merchant.domain.index')->with('success', 'Domain updated successfully.');
    }

    public function destroy($id)
    {
        $data = MerchantDomain::findOrFail($id);

        $data->delete();

        return CommonResponse::success(null, 'Domain deleted successfully.', 204);
    }
}
