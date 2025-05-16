<?php

declare(strict_types=1);

namespace App\Interfaces;

interface SessionRepositoryInterface
{
    /**
     * Get all sessions for a user
     *
     * @param int $userId
     * @return array
     */
    public function getAllUserSessions(int $userId): array;

    /**
     * Terminate a specific session for a user
     *
     * @param string $sessionId
     * @param int $userId
     * @return bool
     */
    public function terminateUserSessionById(string $sessionId, int $userId): bool;

    /**
     * Terminate all sessions for a user
     *
     * @param int $userId
     * @return bool
     */
    public function terminateAllUserSessions(int $userId): bool;

    public function createNewUserSession(int $userId): bool;
}
