<?php

declare(strict_types=1);

namespace App\Actions\Auth;

use App\Actions\BaseAction;
use App\Models\User;
use Illuminate\Support\Facades\Cache;

class GetUserAction extends BaseAction
{
    protected function execute(): User
    {
        $user = auth()->user();

        return $user;
    }
}
