<?php

namespace App\Http\Controllers;

;
use App\Http\Resources\TaskStatus as ResourcesTaskStatus;
use App\Models\Task;
use App\Models\TaskStatus;
use Illuminate\Http\Request;

use function GuzzleHttp\Promise\task;

class TaskStatusController extends BaseController
{
    public function index(TaskStatus $taskstatus)
    {
        // return (taskstatus::all());   
        // return ();
        return   ResourcesTaskStatus::collection(taskstatus::orderasc()->get());
    }
    public function store (Request $request) {
        try {
            $input = $request->get("task-board-title");
            $default = $request->get("default_status") == 'true'    ? 1:0;
            $order = TaskStatus::orderlast()->first()->order + 1;           
            if($default) {
                TaskStatus::default()->update([ "default_status" => 0]);
            }
            $task_status =  TaskStatus::create(["title" => $input, "default_status"=>$default, "order"=>$order]);
            
            return $this->sendResponse("Task Status added Successfully" ,   new ResourcesTaskStatus($task_status));
            
        } catch (\Exception $e){
            return $this->sendResponse("Record not found".$e->getMessage()  );
        }
        
    }   
    public function delete(TaskStatus $taskstatus, $id){
        try{
            $task =  $taskstatus::findOrFail($id);
            Task::where('task_type', $id)->delete();
            $task->delete();
            return $this->sendResponse("Task Status Deleted Successfully");
        } catch (\Exception $e){
            return $this->sendResponse("Record not found ".$e->getMessage()  );
        } 
    }
    public function updateOrder(Request $request){
        try { 
            TaskStatus::massUpdate(
                $request->all(),
                uniqueBy: "id"
            );

            return $this->sendResponse("Task Status order updated Successfully");
        } catch(\Exception $e){

        } 
    }
}
