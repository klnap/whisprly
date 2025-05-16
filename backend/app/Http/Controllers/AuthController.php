<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Actions\Auth\RegisterAction;
use App\Actions\Auth\LoginAction;
use App\Actions\Auth\GetUserAction;

use App\Actions\Auth\GetUserSessionsAction;
use App\Actions\Auth\TerminateSessionByIdAction;
use App\Actions\Auth\TerminateAllSessionsAction;

use App\Actions\Auth\TerminateAllUserSessionsAction;

use App\Actions\Auth\LogoutAction;

use App\Http\Requests\Auth\LogoutRequest;
use App\Http\Requests\Auth\GetUserRequest;
use App\Http\Requests\Auth\GetUserSessionsRequest;
use App\Http\Requests\Auth\TerminateSessionByIdRequest;
use App\Http\Requests\Auth\TerminateAllUserSessionsRequest;
use App\Http\Requests\Auth\RegisterRequest;
use App\Http\Requests\Auth\LoginRequest;
use App\Interfaces\SessionRepositoryInterface;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\UserResource;

class AuthController extends Controller
{
    public function register(RegisterRequest $request, RegisterAction $action)
    {
        $user = $action->execute($request->validated());

        return response()->json([
            'message' => 'User registered successfully',
            'user' => new UserResource($user)->auth(),
        ], 201);
    }

    public function login(LoginRequest $request, LoginAction $action)
    {
        $user = $action->execute($request->validated());

        if (!$user) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        return response()->json([
            'message' => 'User logged in successfully',
            'user' => new UserResource($user)->auth(),
        ], 200);
    }

    public function logout(LogoutRequest $request, LogoutAction $action)
    {
        $logout = $action->execute($request->validated());

        return response()->json([
            'message' => 'User logged out successfully',
        ], 200);
    }

    public function getUser(GetUserRequest $request, GetUserAction $action)
    {
        $user = $action->execute($request->validated());

        $userResource = new UserResource($user);

        return response()->json([
            'message' => 'User retrieved successfully',
            'user' => $userResource->auth(),
        ], 200);
    }

    public function getUserSessions(GetUserSessionsRequest $request, GetUserSessionsAction $action, SessionRepositoryInterface $sessionRepository)
    {
        $sessions = $action->execute($sessionRepository);

        return response()->json([
            'message' => 'Sessions retrieved successfully',
            'sessions' => $sessions,
        ], 200);
    }

    public function terminateSessionById(TerminateUserSessionByIdRequest $request, TerminateUserSessionByIdAction $action)
    {
        $action->execute($request->validated());

        return response()->json([
            'message' => 'Session terminated successfully',
        ], 200);
    }

    public function terminateAllSessions(TerminateAllUserSessionsRequest $request, TerminateAllUserSessionsAction $action)
    {
        $action->execute();

        return response()->json([
            'message' => 'All sessions terminated successfully',
        ], 200);
    }
}


