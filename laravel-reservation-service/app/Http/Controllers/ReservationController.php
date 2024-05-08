<?php

namespace App\Http\Controllers;

use App\Actions\CreateReservationAction;
use App\Http\Requests\CreateReservationRequest;
use App\Http\Resources\ReservationResource;

class ReservationController extends Controller
{
    public function store(CreateReservationRequest $request, CreateReservationAction $action)
    {
        return response()->json([
            'status' => 'success',
            'data' => new ReservationResource($action($request->validated(), $request->user())),
        ]);
    }
}
