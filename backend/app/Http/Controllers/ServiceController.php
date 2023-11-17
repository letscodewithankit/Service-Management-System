<?php

namespace App\Http\Controllers;
use App\Models\ServiceDetailsModel;
use App\Models\ServiceModel;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class ServiceController extends Controller
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

        $credencials=$request->only('email','password');

        $token=Auth::attempt($credencials);
        if (!$token)
        {
            return response()->json([
                'status'=>'error',
                'message'=>'Unauthorized'
            ],401);
        }

        $user=Auth::user();
        return response()->json([
            'status'=>'success',
            'user'=>$user,
            'authorization'=>[
                'token'=>$token,
                'type'=>'bearer',
            ]
        ]);
    }

    public function index()
    {
        $data=ServiceModel::all();
        return response()->json($data);
    }

    /**
     * Show the form for creating a new resource.
     */

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated=$request->validate([
            'title'=>'required|max:100',
            'image'=>'required|mimes:jpeg,png,jpg,gif'
        ]);
        $data=new ServiceModel();
        $data->title=$request->title;
        if($request->has('image'))
        {
            $image= $request->file('image') ;
            $filename=time().'.'.$image->getClientOriginalExtension();
            $image->move('uploads/',$filename);
            $data->image=$filename;
        }
        $data->status=1;
        $data->save();
        return response()->json(['message'=>'Service data store successfully']);
    }

    /**
     * Display the specified resource.
     */

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request)
    {
        $validated=$request->validate([
            'id'=>'required|max:50',
            'value'=>'required|max:100'
        ]);
        $data=ServiceModel::where('id','=',$request->id)->first();
        $data->title=$request->value;
        $data->save();
        return response()->json('Service data Updated Successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $validated=$request->validate(['id'=>'required']);
        ServiceModel::where('id','=',$request->id)->first()->delete();
        $data=ServiceDetailsModel::where('service_id','=',$request->id)->get();
        foreach ($data as $data2)
        {
            $data2->delete();
        }
        return response()->json(['message'=>'Service data deleted successfully']);
    }
}
