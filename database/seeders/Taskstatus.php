<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class Taskstatus extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('taskstatuses')->insert([[
            'title' => 'To - Do',
            'default_status' => 1,
            'order' =>1
        ], 
        [
            'title' => 'In - Progress',
            'default_status' => 0,
            'order' =>2
        ],
        [
            'title' => 'Completed',
            'default_status' => 0,
            'order' =>3
        ] ]);
    }
}
