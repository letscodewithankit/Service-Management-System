<?php

namespace App\Http\Controllers;

use App\Models\AppointmentModel;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    public function store(Request $request)
    {
        $validated=$request->validate(
            ['customer_id'=>'required|max:50',
                'data'=>'required',
                'date'=>'required',
                'time_id'=>'required'
            ]
        );
        $data=new AppointmentModel();
        $data->customer_id=$request->customer_id;
        $data->ser_details_id=$request->data['id'];
        $data->time_id=$request->time_id;
        $data->date=$request->date;
        $data->status="1";
        $data->save();
        return response()->json(['message'=>'Appointment Booked Successfully']);


    }

    public function index()
    {
        $data=AppointmentModel::all();
        return response()->json($data);
    }
    public function index_user_wise(Request $request)
    {
        $validate=$request->validate([
            'id'=>'required'
        ]);
        $data=AppointmentModel::where('customer_id','=',$request->id)->get();
        return response()->json($data);
    }
}
