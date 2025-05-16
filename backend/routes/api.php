<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redis;

Route::middleware(['web'])->group(function () {

    Route::get('/test', function () {
        Redis::set('test', 'test');
        return response()->json(['message' => 'Hello, World!']);
    });

    Route::prefix('auth')->controller(AuthController::class)->group(function () {
        // Public routes
        Route::post('/register', 'register');
        Route::post('/login', 'login');

        // Protected routes
        Route::middleware('auth')->group(function () {
            Route::post('/logout', 'logout');

            Route::prefix('user')->group(function () {
                Route::get('/', 'getUser');

                Route::prefix('sessions')->group(function () {
                    Route::get('/', 'getUserSessions');
                    Route::delete('/{id}', 'terminateSessionById');
                    Route::delete('/', 'terminateAllSessions');
                });
            });
        });
    });
});
