<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\Actions\BaseAction;

class LogoutAction extends BaseAction
{
    protected function execute(): void
    {
        auth()->logout();
        session()->invalidate();
        session()->regenerateToken();
    }
}
