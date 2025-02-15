<?php

namespace App\Http\Controllers;

use App\Models\Bank;
use App\Responses\CommonResponse;
use DB;
use Illuminate\Http\Request;

class BankController extends Controller
{
    public function index(Request $request)
    {
        $banks = Bank::query()
            ->when($request->filled('search'), function ($query) use ($request) {
                return $query->where(DB::raw('LOWER(name)'), 'like', "%" . strtolower($request->search) . "%");
            })
            ->paginate($request->per_page ?? 25);

        return $banks;
    }
}
