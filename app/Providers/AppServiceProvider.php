<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\URL;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        if (class_exists(\Illuminate\Foundation\Console\ServeCommand::class)) {
            \Illuminate\Foundation\Console\ServeCommand::$passthroughVariables[] = 'TMP';
            \Illuminate\Foundation\Console\ServeCommand::$passthroughVariables[] = 'TEMP';
            \Illuminate\Foundation\Console\ServeCommand::$passthroughVariables[] = 'TMPDIR';
        }
        // Force HTTPS in production so Vite CSS/JS loads correctly on Render
        if (config('app.env') === 'production') {
            URL::forceScheme('https');
        }
    }
}

