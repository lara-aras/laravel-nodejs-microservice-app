<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class CreateReservationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        $email = $this->input('email');

        return User::where('email', $email)->exists();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => ['required', 'email'],
            'parking_space_id' => ['required', 'integer', 'exists:parking_spaces,id'],
            'reservation_start' => ['required', 'string', 'date_format:Y-m-d H:i:s', 'after:today'],
            'reservation_end' => ['required', 'string', 'date_format:Y-m-d H:i:s', 'after:reservation_start'],
        ];
    }
}
