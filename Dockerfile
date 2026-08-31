# ==============================================================================
# 1. Compile React / Vite / Tailwind Assets
# ==============================================================================
FROM node:20-alpine AS node-build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ==============================================================================
# 2. Install PHP Dependencies (Composer)
# ==============================================================================
FROM composer:2 AS vendor-build
WORKDIR /app
COPY composer*.json ./
RUN composer install --no-dev --no-interaction --prefer-dist --ignore-platform-reqs --optimize-autoloader
COPY . .
RUN composer dump-autoload --optimize --no-dev

# ==============================================================================
# 3. Final Production Server (PHP 8.3 + Apache)
# ==============================================================================
FROM php:8.3-apache

# Install required system libraries and PHP extensions (including intl & gd for Filament)
RUN apt-get update && apt-get install -y \
    libzip-dev \
    zip \
    libicu-dev \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libwebp-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        zip \
        intl \
        gd \
        bcmath \
        opcache \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# Enable Apache mod_rewrite for Laravel routes
RUN a2enmod rewrite

# Configure Apache Document Root to /var/www/html/public & enable AllowOverride
ENV APACHE_DOCUMENT_ROOT /var/www/html/public
RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf \
    && sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# Set working directory & copy code
WORKDIR /var/www/html
COPY . /var/www/html
COPY --from=vendor-build /app/vendor /var/www/html/vendor
COPY --from=node-build /app/public/build /var/www/html/public/build

# Set permissions for storage & cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache \
    && chmod -R 775 /var/www/html/storage /var/www/html/bootstrap/cache

# Create safe start script using printf
RUN printf '#!/bin/bash\nset -e\nphp artisan migrate --force || true\nphp artisan config:cache || true\nphp artisan route:cache || true\nphp artisan view:cache || true\nexec apache2-foreground\n' > /start.sh \
    && chmod +x /start.sh

EXPOSE 80

CMD ["/start.sh"]
