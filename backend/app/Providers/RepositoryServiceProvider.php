<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Interfaces\SessionRepositoryInterface;
use App\Repositories\SessionRepository;
use App\Interfaces\UserRepositoryInterface;
use App\Repositories\UserRepository;

class RepositoryServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->bind(SessionRepositoryInterface::class, SessionRepository::class);
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
    }
}
