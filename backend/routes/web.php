<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Redis;

// Endpoint Sanctum CSRF token
Route::get('/sanctum/csrf-cookie', '\Laravel\Sanctum\Http\Controllers\CsrfCookieController@show');


