<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\Actions\BaseAction;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Interfaces\UserRepositoryInterface;
use App\Actions\Auth\LoginAction;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmailAfterRegister;
use App\Events\UserRegistered;

class RegisterAction
{
    public function __construct(
        private readonly UserRepositoryInterface $userRepository,
        private readonly loginAction $loginAction
    ) {
    }

    public function execute(array $data): User
    {

            $user = $this->userRepository->create([
                'name' => $data['name'],
                'email' => $data['email'],
                'password' => Hash::make($data['password']),
            ]);


            $this->loginAction->execute($data);

            UserRegistered::dispatch($user);

            return $user;



    }
}
