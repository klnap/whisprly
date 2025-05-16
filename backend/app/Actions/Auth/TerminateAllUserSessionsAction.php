<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\Actions\BaseAction;
use App\Interfaces\SessionRepositoryInterface;

class TerminateAllUserSessionsAction extends BaseAction
{
    public function __construct(
        protected SessionRepositoryInterface $sessionRepository
    ) {}

    public function execute(): bool
    {
        $user = auth()->user();
        $this->sessionRepository->terminateAllUserSessions($user->id);
        return true;
    }
}

