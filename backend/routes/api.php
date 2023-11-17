<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/service_login',[\App\Http\Controllers\ServiceController::class,'login']);


Route::get('/service',function (){return \App\Models\ServiceModel::with('get_service_details')->get();});
Route::get('/service_details',function(){return \App\Models\ServiceDetailsModel::with('get_service_data')->get();});

Route::post('/add_data/service',[\App\Http\Controllers\ServiceController::class,'store']);
Route::post('/update_data/service',[\App\Http\Controllers\ServiceController::class,'update']);
Route::post('/delete_data/service',[\App\Http\Controllers\ServiceController::class,'destroy']);

Route::post('/update_data/service_details',[\App\Http\Controllers\ServiceDetailsController::class,'update']);
Route::post('/delete_data/service_details',[\App\Http\Controllers\ServiceDetailsController::class,'destroy']);

Route::post('/add_data/service_details',[\App\Http\Controllers\ServiceDetailsController::class,'store']);

Route::get('/get_data/time',[\App\Http\Controllers\TimeController::class,'index']);

Route::post('/customer/login',[\App\Http\Controllers\CustomerController::class,'login']);

Route::post('/add_data/appointment',[\App\Http\Controllers\AppointmentController::class,'store']);

Route::post('/customer/store',[\App\Http\Controllers\CustomerController::class,'store']);

Route::get('/get_data/orders',[\App\Http\Controllers\AppointmentController::class,'index']);
Route::post('/get_data/customer/appointment',[\App\Http\Controllers\AppointmentController::class,'index_user_wise']);
