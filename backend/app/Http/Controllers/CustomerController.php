<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function login(Request $request)
    {
        $request->validate([
            'email'=>'required|string|email',
            'password'=>'required|string',
        ]);

        if (!$token=Auth::guard('customer')->attempt(
            ['email'=>$request->email,
                'password'=>$request->password,
            ]
        ))
        {
            return response()->json([
                'status'=>'error',
                'message'=>'Unauthorized'
            ]);
        }
        $user=Customer::where('email','=',$request->email)->get();
        return response()->json([
            'status'=>'success',
            'user'=>$user,
            'authorization'=>[
                'token'=>$token,
                'type'=>'bearer',
            ]
        ]);


    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validate=$request->validate([
            'email'=>'required',
            'name'=>'required|max:250',
            'password'=>'required'
        ]);

        $data=new Customer();
        $data->name=$request->name;
        $data->email=$request->email;
        $data->password=bcrypt($request->password);
        $data->save();

        return response()->json(['message'=>'Signup Successfully , Sign In now']);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
