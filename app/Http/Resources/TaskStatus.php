<?php

namespace App\Http\Resources;
use Illuminate\Http\Resources\Json\JsonResource;

class TaskStatus extends JsonResource
{    
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
                'name'=> $this->title,
                "id"=> $this->id,
                "order" => $this->order,
        ]; 
    }
}
