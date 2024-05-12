<?php

namespace App\Actions;

use App\Models\Reservation;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CreateReservationAction
{
    public function __invoke(array $reservationData, User $user)
    {
        $this->prepareData($reservationData, $user);

        $reservation = Reservation::create($reservationData);

        $this->sendReservationConfirmationEmail($reservation->load(['user', 'parkingSpace']));

        return $reservation;
    }

    private function prepareData(array &$reservationData, User $user): void
    {
        $reservationData['reservation_start'] = Carbon::parse($reservationData['reservation_start']);
        $reservationData['reservation_end'] = Carbon::parse($reservationData['reservation_end']);
        $reservationData['user_id'] = $user->id;
        unset($reservationData['email']);
    }

    private function sendReservationConfirmationEmail(Reservation $reservation): void
    {
        try {
            $response = Http::post('http://localhost:4001/send-email', [
                'template' => 'reservation-confirmation',
                'recipient' => $reservation->user->email,
                'subject' => 'Reservation Confirmation',
                'parameters' => [
                    'reservation' => $reservation,
                ],
            ]);

            if ($response->failed()) {
                throw new \Exception('Failed to send reservation confirmation email: ' . $response->body());
            }

            Log::info($response);
        } catch (\Exception $e) {
            Log::error('Exception caught while sending reservation confirmation email', [
                'reservation_id' => $reservation->getKey(),
                'error' => $e->getMessage(),
            ]);
        }
    }
}
