#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "Installing PHP dependencies..."
composer install --no-dev --optimize-autoloader

echo "Installing Node dependencies..."
npm install

echo "Building React/Vite assets..."
npm run build

echo "Clearing caches..."
php artisan optimize:clear

echo "Running migrations..."
php artisan migrate --force