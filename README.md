<div align="center">

# 🚘 AutoShowroom

**A full-stack automotive dealership platform built with Laravel 13, Inertia.js, React 19, and Filament 5 — pairing an industrial public showroom with a streamlined inventory management panel.**

[![PHP](https://img.shields.io/badge/PHP-8.3%2B-777BB4?style=for-the-badge&logo=php&logoColor=white)](https://www.php.net/)
[![Laravel](https://img.shields.io/badge/Laravel-13.x-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=14171A)](https://react.dev/)
[![Inertia.js](https://img.shields.io/badge/Inertia.js-3.x-9553E9?style=for-the-badge&logo=inertia&logoColor=white)](https://inertiajs.com/)
[![Filament](https://img.shields.io/badge/Filament-5.x-F2A93B?style=for-the-badge&logo=laravel&logoColor=14171A)](https://filamentphp.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=for-the-badge&logo=docker&logoColor=white)](./Dockerfile)
[![License: MIT](https://img.shields.io/badge/License-MIT-2E9E6D?style=for-the-badge)](./composer.json)
[![Live Demo](https://img.shields.io/badge/Live_Demo-Render-F2A93B?style=for-the-badge&logo=render&logoColor=14171A)](https://auto-showroom-ewsz.onrender.com/)

### 🌐 [View Live Demo](https://auto-showroom-ewsz.onrender.com/)

</div>

---

## Overview

**AutoShowroom** is a purpose-built automotive dealership web application tailored for the Algerian car market. Instead of relying on cluttered classifieds or generic templates, it implements the **Asphalt & Béton** design system (`#14171A` dark asphalt surfaces, `#F2F3F0` concrete backgrounds, `#F2A93B` amber calls to action, and monospace spec strips) to present vehicles with technical clarity and trust.

### What Problem Does It Solve?

- **Transparent Local Vehicle Listings:** Presents Algerian-market specifics out of the box — prices in Algerian Dinars (**DZD / DA**) with negotiability flags, *carte grise* notes, paint condition (*Originale*, *Retouchée*, *Repeinte*), accident history, and previous owner count.
- **Zero-Friction Buyer Contact:** Replaces complex lead-capture forms with pre-filled WhatsApp inquiry links (`https://wa.me/...`) and one-tap `tel:` actions across desktop sidebars and mobile sticky bars.
- **Turnkey Dealership Operations:** Gives dealership staff a centralized **Filament v5** admin panel (`/admin`) to publish vehicles, manage multi-photo galleries on S3-compatible storage, update sale statuses, and edit dealership details without touching code.

---

## Key Features

### Public Storefront (Inertia.js + React)
- **Home Showcase (`/`):** Features dealership branding, live stock & brand counters, the 6 most recent *Available* or *Reserved* vehicles, and dealership value propositions.
- **Filterable & Sortable Inventory (`/vehicules`):** Server-backed filtering by brand, minimum/maximum price, minimum year, fuel type, and transmission, combined with sorting (`newest`, `price_asc`, `price_desc`), 12-item pagination, and a responsive mobile filter drawer.
- **Vehicle Detail Pages (`/vehicules/{slug}`):**
  - Human-readable slug URLs (`{brand}-{model}-{year}-{6-char-id}`).
  - Full-bleed spotlight image, interactive thumbnail grid, and keyboard-navigable fullscreen lightbox (`Escape`, `ArrowLeft`, `ArrowRight`).
  - Technical spec strip, complete vehicle condition & *carte grise* breakdown, equipment badges, and sticky WhatsApp/phone contact CTAs.
- **About & Location Page (`/a-propos`):** Displays business hours, physical address, social media links (Facebook, Instagram, TikTok), direct contact actions, and an embedded Google Map driven by dealership coordinates.
- **SEO & Discovery:** Dynamic per-vehicle Open Graph & Twitter Card meta tags (`resources/views/app.blade.php`), `robots.txt`, and an automatically generated XML sitemap (`/sitemap.xml`).

### Admin Panel (`/admin` via Filament v5)
- **Live Inventory Metrics (`VehicleStatsWidget`):** At-a-glance counts for *Disponible*, *Réservé*, *Vendu*, and *Masqué* vehicles.
- **Tabbed Vehicle Editor (`VehicleForm`):** Organizes fields into 8 dedicated tabs (*Informations générales*, *Prix*, *Caractéristiques techniques*, *État*, *Documentation*, *Description & Options*, *Photos*, *Publication*) using `Vehicle::rules()` as a single source of truth.
- **Smart Media & Publishing Rules:**
  - Drag-and-drop photo repeater (`sort_order`) with automatic cover resizing (`1600×1200`), 4 MB file size cap, and S3-compatible disk uploads.
  - Automatic primary-image fallback on create/edit and a validation rule preventing an *Available* vehicle from being published without at least one photo.
  - Bulk hide action (*Masquer la sélection*) and table filtering by status and brand.
- **Dealership Configuration (`DealershipSettings`):** Single-record settings page for name, logo, phone, WhatsApp, email, opening hours, social links, and Google Maps latitude/longitude — shared globally to every React page via `HandleInertiaRequests`.

> [!NOTE]
> **Vehicle Visibility Lifecycle:** Default public listings (`/` and `/vehicules`) display **Available** (`available`) and **Reserved** (`reserved`) vehicles. **Sold** (`sold`) vehicles remain reachable via direct `/vehicules/{slug}` links and `/sitemap.xml`, while **Hidden** (`hidden`) vehicles return `404` across all public endpoints.

---

## Tech Stack

| Category | Technologies & Packages |
| :--- | :--- |
| **Backend** | PHP `^8.3` (`8.4` in Docker), Laravel Framework `^13.17`, Inertia.js Laravel `^3.3` |
| **Admin Panel** | Filament `^5.7` (Resources, Custom Pages, Stats Widgets, Livewire) |
| **Frontend** | React `^19.2.8`, Inertia.js React `^3.6.1`, Tailwind CSS `^4.3.3` (`@tailwindcss/vite`) |
| **Build Tooling** | Vite `^8.0.0`, `laravel-vite-plugin` `^3.1`, `@vitejs/plugin-react` `^6.0.5`, `concurrently` `^10.0.3` |
| **Database** | SQLite (local default), MySQL / MariaDB (with optional SSL CA via `certs/ca.pem`), PostgreSQL |
| **Object Storage** | S3-compatible storage via `league/flysystem-aws-s3-v3` `3.0` (AWS S3, Cloudflare R2, MinIO, Supabase Storage) |
| **Typography & Icons** | Google Fonts (`Archivo Narrow`, `Inter`, `IBM Plex Mono`, `Material Symbols Outlined`) |
| **Testing & Quality** | PHPUnit `^12.5.12`, Laravel Pint `^1.27`, FakerPHP `^1.23`, Mockery `^1.6`, Laravel Pail `^1.2.5` |
| **Deployment** | Multi-stage Docker (`node:20-alpine`, `composer:2`, `php:8.4-apache`), `build.sh` |

---

## Project Structure

```text
car-showroom/
├── app/
│   ├── Enums/
│   │   └── VehicleStatus.php           # Backed enum: available, reserved, sold, hidden
│   ├── Filament/
│   │   ├── Pages/
│   │   │   └── DealershipSettings.php  # Singleton dealership configuration form
│   │   ├── Resources/Vehicles/         # Filament VehicleResource, Form tabs, Table & Pages
│   │   └── Widgets/
│   │       └── VehicleStatsWidget.php  # Dashboard status overview stats
│   ├── Http/
│   │   ├── Controllers/Public/         # HomeController, VehicleController, PageController
│   │   └── Middleware/
│   │       └── HandleInertiaRequests.php # Shares global dealership props to React
│   ├── Models/                         # Vehicle, VehicleImage, DealershipSetting, User
│   └── Providers/
│       ├── AppServiceProvider.php      # Production HTTPS scheme enforcement
│       └── Filament/AdminPanelProvider.php # Admin panel branding, theme & discovery
├── bootstrap/                          # Application bootstrap & middleware registration
├── certs/
│   └── ca.pem                          # SSL CA certificate fallback for remote MySQL/MariaDB
├── config/                             # Laravel, database (SSL CA), filesystems (s3), Livewire configs
├── database/
│   ├── factories/                      # VehicleFactory & VehicleImageFactory (Algerian catalog)
│   ├── migrations/                     # Users, cache, jobs, dealership_settings, vehicles, vehicle_images
│   └── seeders/
│       └── DatabaseSeeder.php          # Admin account, Tlemcen showroom defaults & local sample cars
├── public/                             # Entrypoint (index.php), robots.txt, compiled Vite assets
├── resources/
│   ├── css/
│   │   ├── app.css                     # Tailwind v4 @theme tokens (Asphalt & Béton palette)
│   │   └── filament-custom.css         # Custom Filament stat widget styling
│   ├── js/
│   │   ├── Components/
│   │   │   ├── About/                  # AboutHero, BusinessHours, ContactInformation, LocationSection, SocialLinks
│   │   │   ├── Common/                 # PageHeader, Pagination, SectionHeader
│   │   │   ├── Home/                   # HeroSection, FeaturedVehicles, StatsStrip, WhyChooseUs
│   │   │   └── Vehicles/               # FilterSidebar, SpecStrip, VehicleCard
│   │   ├── Layouts/PublicLayout.jsx    # Sticky navbar, mobile drawer & footer with WhatsApp CTA
│   │   ├── Pages/Public/               # Home.jsx, About.jsx, Vehicles/Vehicules.jsx, VehicleDetails.jsx
│   │   ├── Utils/vehicleStatus.js      # Shared status label & dot color helper
│   │   └── app.jsx                     # Inertia React entrypoint
│   └── views/
│       ├── app.blade.php               # Root HTML template with dynamic Open Graph meta tags
│       ├── sitemap.blade.php           # XML sitemap Blade template
│       └── filament/                   # Custom Filament brand logo & settings page view
├── routes/
│   ├── web.php                         # Public storefront & sitemap routes
│   └── console.php                     # Artisan console commands
├── tests/                              # PHPUnit Feature & Unit test suites
├── DESIGN.md                           # "Asphalt & Béton" design system specification
├── Dockerfile                          # Multi-stage production build (Node 20 + Composer 2 + PHP 8.4 Apache)
├── build.sh                            # Render/CI build & migration script
├── composer.json                       # PHP dependencies & Composer scripts (setup, dev, test)
├── package.json                        # Node dependencies & Vite build scripts
├── phpunit.xml                         # PHPUnit in-memory SQLite test configuration
└── vite.config.js                      # Vite + Laravel + React + Tailwind v4 configuration
```

---

## Getting Started

### Prerequisites

- **PHP** `>= 8.3` with `pdo_sqlite` or `pdo_mysql`, `intl`, `gd` (with FreeType/JPEG/WebP), `zip`, `bcmath`, and `mbstring` extensions
- **Composer** `2.x`
- **Node.js** `>= 20` and **npm**
- **S3-compatible object storage** (AWS S3, Cloudflare R2, MinIO, or Supabase Storage) for uploading vehicle photos and the dealership logo

### Local Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/Hicham-Mek/auto-showroom.git
   cd auto-showroom
   ```

2. **Quick setup (or run step-by-step below)**

   `composer.json` ships a `setup` script that installs PHP dependencies, copies `.env.example`, generates the app key, runs migrations, installs Node dependencies, and builds assets:

   ```bash
   composer run setup
   ```

   <details>
   <summary>Manual step-by-step installation</summary>

   ```bash
   # Install PHP dependencies
   composer install

   # Create environment file and generate application key
   cp .env.example .env
   php artisan key:generate

   # Create SQLite file (if using SQLite) and run migrations
   touch database/database.sqlite
   php artisan migrate

   # Install frontend dependencies and compile Vite assets
   npm install
   npm run build
   ```

   </details>

3. **Seed initial data (recommended for local development)**

   ```bash
   php artisan db:seed
   ```

   This creates the default Filament admin account, initializes the `DealershipSetting` record (`AutoShowroom Tlemcen`), and—when `APP_ENV=local`—generates **10 sample vehicles** with 3–6 placeholder images each.

> [!WARNING]
> `DatabaseSeeder` creates a default admin account (`admin@example.com` / `TDIHDI26`). Change this password immediately via `/admin` or `php artisan tinker` before deploying to any shared or production environment.

### Environment Variables

Configure your `.env` file based on the settings referenced across `config/*.php`:

| Variable | Description | Default / Example |
| :--- | :--- | :--- |
| `APP_NAME` | Application display name | `Laravel` (or `AutoShowroom`) |
| `APP_ENV` | Runtime environment (`production` forces HTTPS via `AppServiceProvider`) | `local` |
| `APP_KEY` | Encryption key generated by `php artisan key:generate` | `base64:...` |
| `APP_DEBUG` | Enable detailed error traces (`false` in production) | `true` |
| `APP_URL` | Base URL used for asset and sitemap generation | `http://localhost:8000` |
| `APP_LOCALE` | Application locale (`app.blade.php` renders `lang="fr"`) | `fr` |
| `DB_CONNECTION` | Database driver (`sqlite`, `mysql`, `mariadb`, `pgsql`) | `sqlite` |
| `DB_HOST` / `DB_PORT` | Database host and port (for MySQL/MariaDB/PostgreSQL) | `127.0.0.1` / `3306` |
| `DB_DATABASE` | Database name or path to SQLite file | `database/database.sqlite` |
| `DB_USERNAME` / `DB_PASSWORD` | Database credentials (when not using SQLite) | `root` / `""` |
| `MYSQL_ATTR_SSL_CA` | Optional path to MySQL/MariaDB SSL CA certificate | Falls back to `certs/ca.pem` for remote hosts |
| `FILESYSTEM_DISK` | Default Laravel filesystem disk | `local` |
| `AWS_ACCESS_KEY_ID` | S3-compatible access key (required for Filament image uploads) | — |
| `AWS_SECRET_ACCESS_KEY` | S3-compatible secret key | — |
| `AWS_DEFAULT_REGION` | Bucket region | `us-east-1` |
| `AWS_BUCKET` | Bucket name for `vehicles/` and `settings/` uploads | — |
| `AWS_URL` | Public base URL for serving uploaded assets | — |
| `AWS_ENDPOINT` | Custom S3-compatible endpoint (e.g., R2, MinIO, Supabase) | — |
| `AWS_USE_PATH_STYLE_ENDPOINT` | Enable path-style S3 URLs if required by provider | `false` |
| `LIVEWIRE_TEMPORARY_FILE_UPLOAD_DISK` | Disk used by Filament/Livewire for temporary uploads | `local` |
| `SESSION_DRIVER` / `CACHE_STORE` / `QUEUE_CONNECTION` | Session, cache, and queue backends | `database` |

> [!TIP]
> **Remote MySQL/MariaDB SSL:** In `config/database.php`, whenever `DB_HOST` is not `127.0.0.1` or `localhost` and `MYSQL_ATTR_SSL_CA` is unset, Laravel automatically uses `certs/ca.pem` if present.

### Running Locally

Start the Laravel development environment (uses `php artisan dev` via `composer.json`):

```bash
composer run dev
```

Or run the backend server and Vite HMR server in separate terminals:

```bash
php artisan serve
npm run dev
```

- **Public Showroom:** `http://localhost:8000`
- **Admin Dashboard:** `http://localhost:8000/admin`

### Running with Docker (Production)

The multi-stage `Dockerfile` compiles frontend assets with Node 20, installs production Composer dependencies, and serves the app via PHP 8.4 + Apache on port `80`:

```bash
docker build -t auto-showroom .
docker run -d -p 8080:80 --env-file .env --name auto-showroom auto-showroom
```

On startup, the container entrypoint (`/start.sh`) runs `package:discover`, `filament:upgrade`, `migrate --force`, caches config/routes/views, sets writable permissions on `storage/` and `bootstrap/cache/`, and launches `apache2-foreground`.

---

## Usage

### Application Routes

| Method | Route | Controller / Handler | Purpose |
| :--- | :--- | :--- | :--- |
| `GET` | `/` | `HomeController@index` | Public landing page with hero, 6 latest vehicles & dealership stats |
| `GET` | `/vehicules` | `VehicleController@index` | Paginated inventory (12/page) with filter & sort query parameters |
| `GET` | `/vehicules/{vehicle:slug}` | `VehicleController@show` | Vehicle specifications, photo lightbox & WhatsApp/phone CTAs |
| `GET` | `/a-propos` | `PageController@about` | Dealership hours, address, social links & Google Maps embed |
| `GET` | `/sitemap.xml` | `PageController@sitemap` | Dynamic XML sitemap of all non-hidden vehicles |
| `GET` | `/up` | Laravel Health Check | Application health probe endpoint (`bootstrap/app.php`) |
| `GET/POST` | `/admin` | `AdminPanelProvider` | Filament v5 admin dashboard, vehicle CRUD & dealership settings |

### Filtering Inventory via URL Query Parameters

`VehicleController::index` accepts query parameters directly in the URL so filtered searches are shareable and bookmarkable:

```bash
# Example: Diesel Renault vehicles from 2018+ priced between 1.5M and 4.0M DZD, lowest price first
curl -G "http://localhost:8000/vehicules" \
  --data-urlencode "brand=Renault" \
  --data-urlencode "min_price=1500000" \
  --data-urlencode "max_price=4000000" \
  --data-urlencode "year=2018" \
  --data-urlencode "fuel_type=diesel" \
  --data-urlencode "transmission=manuelle" \
  --data-urlencode "sort=price_asc"
```

Supported `sort` values: `newest` (default), `price_asc`, `price_desc`.

### Common Development & Maintenance Commands

```bash
# Run the PHPUnit test suite (uses in-memory SQLite per phpunit.xml)
composer run test

# Check PHP code formatting with Laravel Pint
./vendor/bin/pint --test

# Auto-fix PHP code formatting
./vendor/bin/pint

# Create a new admin user interactively via Tinker
php artisan tinker --execute="App\Models\User::create(['name' => 'Manager', 'email' => 'manager@showroom.dz', 'password' => bcrypt('change-me')])"

# Build optimized production frontend assets
npm run build
```

---

## Contributing & License

### Contributing

Contributions are welcome! To propose a change:

1. Fork the repository and create a feature branch from `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. Implement your changes following the **Asphalt & Béton** design guidelines in [`DESIGN.md`](./DESIGN.md) for UI work and Laravel/Filament conventions for backend code.
3. Verify formatting and tests before opening a pull request:
   ```bash
   ./vendor/bin/pint --test
   composer run test
   npm run build
   ```
4. Submit a clear Pull Request describing the motivation, changes made, and any new environment variables or migrations.

### License

This project is open-sourced software licensed under the **MIT License** (as declared in [`composer.json`](./composer.json)).
