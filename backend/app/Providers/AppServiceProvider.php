<?php

declare(strict_types=1);

namespace App\Providers;

use App\Interfaces\SessionRepositoryInterface;
use App\Repositories\SessionRepository;
use Illuminate\Support\ServiceProvider;
use App\Events\UserRegistered;
use App\Listeners\SendUserEmailVerificationEmail;
use Illuminate\Support\Facades\Event;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // Register any bindings here
        $this->app->bind(SessionRepositoryInterface::class, SessionRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {

    }
}
