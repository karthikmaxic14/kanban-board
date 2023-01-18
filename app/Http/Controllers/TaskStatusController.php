<?php

namespace App\Http\Controllers;

;
use App\Http\Resources\TaskStatus as ResourcesTaskStatus;
use App\Models\Task;
use App\Models\TaskStatus;
use Illuminate\Http\Request;

class TaskStatusController extends BaseController
{
    public function index(TaskStatus $taskstatus)
    {
        
        return   ResourcesTaskStatus::collection(TaskStatus::all());
    }
    public function store (Request $request) {
        try {
            $input = $request->get("task-board-title");
            $default = $request->get("default_status") == true? 1:0;
            return TaskStatus::create(["title" => $input, "default_status"=>$default]);
             

        } catch (\Exception $e){
            return $this->sendResponse("Record not found".$e->getMessage()  );
        }
        
    }   
    public function delete(TaskStatus $taskstatus, $id){
        
        // return $task;
        try{
            $task =  $taskstatus::findOrFail($id);
            Task::where('task_type', $id)->delete();
            $task->delete();
            return $this->sendResponse("Task Status Deleted Successfully");
        } catch (\Exception $e){
            return $this->sendResponse("Record not found ".$e->getMessage()  );
        }

    }
}
