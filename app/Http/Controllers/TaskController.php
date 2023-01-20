<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTask;
use App\Models\Task;
use App\Http\Controllers\BaseController;
use App\Http\Requests\UpdateTask;
use App\Models\TaskStatus;
use Auth;
use Exception;
use GuzzleHttp\Promise\Create;
use Illuminate\Http\Request;

class TaskController extends BaseController
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $taskData = Task::all();
        return $this->sendResponse("", $taskData);
    }

     /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store( StoreTask $request)
    {
        try {
             
            $input = $request->all(); 
            $input['task_type'] = TaskStatus::default ()->first()->id;
            $data = Task::create( $input);
            return $this->sendResponse("",$data);
        } catch(\Exception $e) {
            return $this->sendResponse("Some thing went . ",null,400);
        }
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
            return  Task::findOrFail($id);
    }

     /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTask $request, $id)
    {

        try { 
            $task = Task::findOrFail($id);
            $task->update($request->all());
            return $this->sendResponse("Task Updated Successfully", $task);

        } catch (Exception $e) {
            
            return $this->sendResponse("Record not found",$e->getMessage(),false, 404  );
        }
        
        // return $this->sendResponse("",$data);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Task  $task
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        try {
            $task = Task::findOrFail($id);
            $task->delete();
            return $this->sendResponse("Task Successfully deleted", null);
        } catch (Exception $e) {
            return $this->sendResponse("Record not found", null, false);
        }
    }
    public function statusUpdate(Request $request, $id){
    
        try { 
            $task = Task::findOrFail($id);
            $task->update($request->all());
            return $this->sendResponse("Task Status  Updated Successfully", $task);

        } catch (Exception $e) {
            
            return $this->sendResponse("Record not found",$e->getMessage(),false, 404  );
        } 
    }

    
}
