<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\Actions\BaseAction;
use App\Interfaces\SessionRepositoryInterface;
use Illuminate\Support\Facades\Log;

class TerminateUserSessionByIdAction extends BaseAction
{
    protected function execute(array $data, SessionRepositoryInterface $sessionRepository): bool
    {
        $sessionId = $data['id'];
        $user = auth()->user();


        $sessionRepository->terminateUserSessionById($sessionId, $user->id);

        return true;
    }
}

