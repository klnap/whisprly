<?php

declare(strict_types=1);

namespace App\Actions;

use Illuminate\Support\Facades\Log;
use Illuminate\Database\QueryException;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use RuntimeException;

abstract class BaseAction
{

    public function __call(string $name, array $args): mixed
    {
        if ($name !== 'execute') {
            throw new RuntimeException("Method {$name} does not exist");
        }

        try {
            return $this->execute(...$args);
        } catch (QueryException $e) {
            Log::error('Database error', [
                'action' => static::class,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
                'sql' => $e instanceof QueryException ? $e->getSql() ?? null : null,
                'bindings' => $e instanceof QueryException ? $e->getBindings() ?? [] : [],
            ]);
            throw new RuntimeException('Database error', 0, $e);
        } catch (\Throwable $e) {
            Log::error('Unexpected error', [
                'action' => static::class,
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            throw new RuntimeException('An unexpected error occurred', 0, $e);
        }
    }
}
