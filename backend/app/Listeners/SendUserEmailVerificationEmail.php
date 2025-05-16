<?php

namespace App\Listeners;

use App\Events\UserRegistered;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Mail;
use App\Mail\VerifyEmailAfterRegister;
use Illuminate\Support\Facades\Notification;
use App\Notifications\UserRegisteredNotification;
use App\Models\User;

class SendUserEmailVerificationEmail
{

    public function handle(UserRegistered $event): void
    {
        Notification::send($event->user, new UserRegisteredNotification($event->user));
    }
}
