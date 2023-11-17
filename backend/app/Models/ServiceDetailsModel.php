<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceDetailsModel extends Model
{
    use HasFactory;
    protected $table="service_details";

    public function get_service_data()
    {
        return $this->belongsTo(ServiceModel::class,'service_id');
    }
}
