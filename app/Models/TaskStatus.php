<?php

namespace App\Models;

use Iksaku\Laravel\MassUpdate\MassUpdatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaskStatus extends Model
{
    use HasFactory, MassUpdatable;
    protected $table = "taskstatuses";
    protected $fillable = ['title', 'default_status', 'order'];
    public function scopeDefault($query){
        $query->where("default_status", 1)->get();
    }
    public function scopeOrderlast($query){
        $query->orderBy('order', 'desc')->get();
    } 
    public function scopeOrderasc($query){
        $query->orderBy('order', 'asc')->get();
    } 
}
