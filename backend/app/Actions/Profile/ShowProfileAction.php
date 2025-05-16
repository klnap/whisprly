<?php

declare(strict_types=1);

namespace App\Actions\Profile;

use App\Models\User;

class ShowProfileAction
{
    public function execute(array $data): User
    {
        return User::find($data['id']);
    }
}
    