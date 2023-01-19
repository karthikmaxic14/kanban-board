<?php
 
namespace App\Http\Controllers;
use PhpParser\Node\Stmt\Return_;
 
Class BaseController extends Controller {
    protected $limit =15;
    public function sendResponse($message,  $inputdata =null, $type=true, $status=200 )  {
        $data = [ "success" =>$type,
                  "message" => $message ];
        if (isset($inputdata)){
            $data['data'] = $inputdata;
        }
        return response()->json($data,$status);
    }   
}