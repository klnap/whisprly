<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\Actions\BaseAction;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use App\Interfaces\SessionRepositoryInterface;

class LoginAction extends BaseAction
{


    public function execute(array $data): ?User
    {
        $request = request();
        Log::info('Login attempt', ['email' => $data['email']]);

        if(!auth()->attempt($data)) {
            Log::info('Login failed', ['email' => $data['email']]);
            return null;
        }

        Log::info('Login successful', ['user_id' => auth()->user()->id]);

        try {
            session()->regenerate();
            session()->put('user_id', auth()->user()->id);
            session()->put('payload', $data);
            session()->put('ip_address', $request->ip());
            session()->put('user_agent', $request->userAgent());
            session()->put('last_activity', now()->timestamp);

            Log::info('Session created successfully', ['user_id' => auth()->user()->id]);
        } catch (\Exception $e) {
            Log::error('Failed to create session: ' . $e->getMessage());
            throw $e;
        }

        return auth()->user();
    }
}
