<?php

namespace App\Http\Controllers;

use App\Actions\CreateResevationAction;
use App\Http\Requests\CreateReservationRequest;
use App\Http\Resources\ReservationResource;

class ReservationController extends Controller
{
    public function create(CreateReservationRequest $request, CreateResevationAction $action)
    {
        return response()->json([
            'status' => 'success',
            'data' => new ReservationResource($action($request->validated())),
        ]);
    }
}
