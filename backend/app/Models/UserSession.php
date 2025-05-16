<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class UserSession extends Model
{
    protected $fillable = [
        'id',
        'user_id',
        'ip',
        'user_agent',
        'last_activity',
        'is_current',
        'login_time',
    ];

    protected $casts = [
        'last_activity' => 'integer',
        'is_current' => 'boolean',
        'login_time' => 'datetime',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
