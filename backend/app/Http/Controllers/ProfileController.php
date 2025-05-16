<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Http\Requests\Profile\UpdateProfileRequest;
use App\Http\Requests\Profile\UpdatePasswordRequest;
use App\Http\Requests\Profile\UpdateEmailRequest;
use App\Http\Requests\Profile\UpdateUsernameRequest;
use App\Http\Requests\Profile\GetUserRequest;
use App\Actions\Profile\GetUserAction;

class ProfileController extends Controller
{


    public function showProfile(GetUserRequest $request, GetUserAction $action)
    {
        $user = $action->execute($request->validated());

        return response()->json([
            'user' => $user,
        ]);
    }

    public function updatePassword(UpdatePasswordRequest $request)
    {
        $user = $request->user();


        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Password updated successfully',
        ]);
    }

    public function updateEmail(UpdateEmailRequest $request)
    {
        $user = $request->user();
    }

}
