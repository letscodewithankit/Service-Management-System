<?php

namespace App\Http\Controllers;

use App\Models\ServiceDetailsModel;
use Illuminate\Http\Request;

class ServiceDetailsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data=ServiceDetailsModel::all();
        return response()->json($data);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated=$request->validate([
            'service_id'=>'required',
            'category'=>'required|max:100',
            'price'=>'required|max:50',
            'duration'=>'required|max:50',
            'image_file'=>'required|mimes:jpeg,png,jpg,gif'
        ]);
        $data=new ServiceDetailsModel();
        $data->service_id=$request->service_id;
        $data->category=$request->category;
        $data->price=$request->price;
        $data->duration=$request->duration;
        if($request->has('image_file'))
        {
            $image= $request->file('image_file') ;
            $filename=time().'.'.$image->getClientOriginalExtension();
            $image->move('uploads/',$filename);
            $data->image=$filename;
        }
        $data->status=1;
        $data->save();
        return response()->json(['message'=>'Service details store successfully']);
    }


    public function update(Request $request)
    {
        $validated=$request->validate([
            'id'=>'required|max:100',
            'category'=>'required|max:256',
            'price'=>'required|max:200',
            'duration'=>'required|max:200'
        ]);

        $data=ServiceDetailsModel::where('id','=',$request->id)->first();
        $data->category=$request->category;
        $data->price=$request->price;
        $data->duration=$request->duration;
        $data->save();

        return response()->json(['message'=>'Service details data updated successfully']);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request)
    {
        $validated=$request->validate(['id'=>'required']);
        ServiceDetailsModel::where('id','=',$request->id)->first()->delete();
        return response()->json(['message'=>'Service details data deleted successfully']);
    }
}
