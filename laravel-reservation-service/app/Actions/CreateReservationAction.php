<?php

namespace App\Actions;

use App\Models\Reservation;
use App\Models\User;
use Carbon\Carbon;
class CreateReservationAction
{
    public function __invoke(array $reservationData, User $user)
    {
        // Convert reservation_start and reservation_end to DateTime instances
        $reservationData['reservation_start'] = Carbon::parse($reservationData['reservation_start']);
        $reservationData['reservation_end'] = Carbon::parse($reservationData['reservation_end']);

        // Remove email from reservation data and add user_id
        unset($reservationData['email']);
        $reservationData['user_id'] = $user->id;

        // Create a new reservation and return it
        return Reservation::create($reservationData);
    }
}
