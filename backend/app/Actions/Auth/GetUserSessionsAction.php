<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\Actions\BaseAction;
use App\Interfaces\SessionRepositoryInterface;

class GetUserSessionsAction extends BaseAction
{
    public function __construct(
        private readonly SessionRepositoryInterface $sessionRepository
    ) {
    }

    protected function execute(): array
    {
        $userId = auth()->id();
        $currentSessionId = request()->session()->getId();

        $sessions = $this->sessionRepository->getAllUserSessions($userId);

        return collect($sessions)->map(function ($session) use ($currentSessionId) {
            $payload = null;
            if ($session->payload) {
                try {
                    $decoded = base64_decode($session->payload);
                    if ($decoded !== false) {
                        $payload = json_decode($decoded, true);
                        if ($payload === null && json_last_error() !== JSON_ERROR_NONE) {
                            // If JSON decode fails, try unserialize
                            $payload = unserialize($decoded);
                        }
                    }
                } catch (\Exception $e) {
                    $payload = null;
                }
            }

            return [
                'id' => $session->id,
                'last_activity' => $session->last_activity,
                'is_current' => $session->id === $currentSessionId,
                'ip' => $session->ip_address,
                'user_agent' => $session->user_agent,
                'login_time' => $payload['_loginTime'] ?? $payload['login_time'] ?? null,
            ];
        })->values()->all();
    }
}
