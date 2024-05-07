<?php

namespace App\Actions;

use App\Models\Reservation;

class CreateResevationAction
{
    public function __invoke(array $reservationData)
    {
        return Reservation::create($reservationData);
    }
}
