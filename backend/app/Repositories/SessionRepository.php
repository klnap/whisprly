<?php

declare(strict_types=1);

namespace App\Repositories;

use App\Interfaces\SessionRepositoryInterface;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
class SessionRepository implements SessionRepositoryInterface
{
    public function getAllUserSessions(int $userId): array
    {
        $sessions = DB::table('sessions')
            ->where('user_id', $userId)
            ->orderBy('last_activity', 'desc')
            ->get();

        return $sessions->all();
    }

    public function terminateUserSessionById(string $sessionId, int $userId): bool
    {
        return DB::table('sessions')
            ->where('id', $sessionId)
            ->where('user_id', $userId)
            ->delete() > 0;
    }

    public function terminateAllUserSessions(int $userId): bool
    {
        return DB::table('sessions')
            ->where('user_id', $userId)
            ->delete() > 0;
    }

    public function createNewUserSession(int $userId): bool
    {
        $request = request();

        return DB::table('sessions')->insert([
            'id' => Str::random(40),
            'user_id' => $userId,
            'payload' => json_encode($request->payload ?? []),
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'last_activity' => now()->timestamp,
        ]);
    }
}

