<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceModel extends Model
{
    use HasFactory;
    protected $table="service";

    public function get_service_details()
    {
      return  $this->hasMany(ServiceDetailsModel::class,'service_id');
    }
}
