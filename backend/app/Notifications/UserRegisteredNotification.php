<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;
use App\Models\User;

class UserRegisteredNotification extends Notification
{
    use Queueable;

    public function via(object $notifiable): array
    {
        return ['mail'];
    }


    public function toMail(object $notifiable): MailMessage
    {
        // return (new MailMessage)
        //     ->subject('Welcome to our platform')
        //     ->greeting('Hello ' . $notifiable->name)
        //     ->view('mail.verify-email-after-register', [
        //         'user' => $notifiable,
        //     ]);

        return (new MailMessage)
        ->subject('Welcome to Whisprly!')
        ->greeting('Hello, ' . $notifiable->name . '!')
        ->line('Thank you for registering at Whisprly.')
        ->line('Please verify your email address to activate your account.')
        ->action('Verify Email', url('/verify?token=123'))
        ->salutation('Best regards, Whisprly Team');

    }


    public function toArray(object $notifiable): array
    {
        return [
            //
        ];
    }
}
