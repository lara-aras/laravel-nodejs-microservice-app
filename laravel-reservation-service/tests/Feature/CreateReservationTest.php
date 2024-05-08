<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class CreateReservationTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    private string $route;

    private User $user;

    private array $reservationData;

    public function setUp(): void
    {
        parent::setUp();

        $this->route = '/api/reservations';

        $this->user = User::factory()->create();

        $this->reservationData = [
            'email' => $this->user->email,
            'parking_space_id' => $this->faker->randomNumber(),
            'reservation_start' => $this->faker->dateTime->format('Y-m-d H:i:s'),
            'reservation_end' => $this->faker->dateTime->format('Y-m-d H:i:s'),
        ];
    }

    public function testReservationCanBeSuccessfullyCreated(): void
    {
        $response = $this->actingAs($this->user)->postJson($this->route, $this->reservationData);

        $response->assertStatus(200);

        $this->assertDatabaseHas('reservations', [
                'user_id' => $this->user->id,
                'parking_space_id' => $this->reservationData['parking_space_id'],
                'reservation_start' => $this->reservationData['reservation_start'],
                'reservation_end' => $this->reservationData['reservation_end'],
            ]);
    }

    public function testReservationCannotBeCreatedWithoutParkingSpaceId(): void
    {
        unset($this->reservationData['parking_space_id']);

        $response = $this->actingAs($this->user)->postJson($this->route, $this->reservationData);

        $response->assertStatus(422);
    }

    public function testReservationCannotBeCreatedWithoutEmail(): void
    {
        unset($this->reservationData['email']);

        $response = $this->actingAs($this->user)->postJson($this->route, $this->reservationData);

        $response->assertStatus(403);
    }
}
