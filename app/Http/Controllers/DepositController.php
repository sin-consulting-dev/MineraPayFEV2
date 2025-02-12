<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class DepositController extends Controller
{
    public function index(Request $request)
    {
        $data = [];

        // Code to display a listing of the resource
        return inertia('Deposit/Index');
    }

    public function create()
    {
        // Code to show form for creating a new resource
    }

    public function store(Request $request)
    {
        // Code to store a newly created resource in storage
    }

    public function show($id)
    {
        // Code to display a specific resource
    }

    public function edit($id)
    {
        // Code to show form for editing a specific resource
    }

    public function update(Request $request, $id)
    {
        // Code to update a specific resource in storage
    }

    public function destroy($id)
    {
        // Code to remove a specific resource from storage
    }
}
