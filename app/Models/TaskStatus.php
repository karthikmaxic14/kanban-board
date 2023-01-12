<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskStatus extends Model
{
    use HasFactory;
    protected $table = "taskstatuses";
    protected $fillable = ['title', 'default_status'];
    public function scopeDefault($query){
        $query->where("default_status", 1)->get();
    }
}
