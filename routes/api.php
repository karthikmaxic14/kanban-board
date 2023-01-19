<?php

use App\Http\Controllers\api\AuthController;
use App\Http\Controllers\BoardController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\TaskStatusController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/login', [AuthController::class, 'login']);

Route::post('/auth/register', [AuthController::class, 'createUser']);
Route::post('/auth/login', [AuthController::class, 'loginUser']);
Route::post('/auth/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');


Route::prefix('task')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [TaskController::class, 'index']);
    Route::post('/', [TaskController::class, 'store']);
    Route::get('/{id}', [TaskController::class, 'show']);
    Route::put('/{id}', [TaskController::class, 'update']);
    Route::delete('/{id}', [TaskController::class, 'destroy']);
});

Route::prefix('task-status')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [TaskStatusController::class, 'index']);
    Route::post('/', [TaskStatusController::class, 'store']);
    Route::delete('/{id}', [TaskStatusController::class, 'delete']);
});



# list print 
# kanbanboard
# create board
# edit board
# edite board
# task create
# task edit
# task delete
# task update
# task status create
# task status edit 
# task status delete 
# task status updated
