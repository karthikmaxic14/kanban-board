<?php
use Illuminate\Http\JsonResponse;
function apiResponse($message,  $inputdata =null, $type=true, $status=200 ){
    $data = [ "success" =>$type,
              "message" => $message ];
    if (isset($inputdata)){
        $data['data'] = $inputdata;
    }
    return response()->json($data,$status);
}