<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;
    protected $fillable = [
        "task_name",
        "task_type",
        "priority",
        "start_date",
        "end_date",
        "description",
        "sprint_id",
        "status"
    ];
    protected static function boot()
    {
        // Update user id for all creating
        parent::boot();
        self::creating(function ($sprint) {
            $sprint->user_id = auth()->id();
        });
        
    }
}
