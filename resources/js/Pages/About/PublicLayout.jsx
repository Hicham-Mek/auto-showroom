import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

const NAV_LINKS = [
  { label: 'Accueil', href: '/' },
  { label: 'Inventaire', href: '/inventaire' },
  { label: 'À propos', href: '/a-propos' },
  { label: 'Contact', href: '/contact' },
];

export default function PublicLayout({ children }) {
  // `dealership` is shared from a Laravel middleware (HandleInertiaRequests) so every
  // page can show the phone number / WhatsApp link without passing it manually each time.
  const { dealership } = usePage().props;
  const currentPath = usePage().url;
  const [menuOpen, setMenuOpen] = useState(false);

  const rawWhatsApp = dealership?.whatsapp ? dealership.whatsapp.replace(/[^0-9]/g, '') : '';
  const whatsappNumber = rawWhatsApp.startsWith('0') && rawWhatsApp.length === 10 ? `213${rawWhatsApp.slice(1)}` : rawWhatsApp;
  const phoneNumber = dealership?.phone ?? '';

  return (
    <div className="bg-beton font-body-md text-on-surface antialiased">
      <header className="fixed top-0 w-full z-50 bg-beton border-b border-outline-variant">
        <div className="h-16 w-full px-margin-mobile lg:px-lg flex items-center justify-between mx-auto">
          <Link href="/" className="flex items-center gap-base">
            {dealership?.logo_path ? (
              <img
                alt={`Logo ${dealership?.name ?? 'AutoShowroom'}`}
                className="h-8 w-auto object-contain"
                src={dealership.logo_path}
              />
            ) : (
              <span className="material-symbols-outlined text-primary text-2xl" aria-hidden="true">
                directions_car
              </span>
            )}
            <span className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              {dealership?.name ?? 'AutoShowroom'}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-lg">
            {NAV_LINKS.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`font-body-sm text-body-sm transition-colors uppercase tracking-widest ${
                    isActive
                      ? 'text-phare font-bold'
                      : 'text-on-surface-variant hover:text-phare'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-md">
            <div className="w-8 h-8 rounded-full bg-asphalt flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-lg">
                person
              </span>
            </div>
            {/* Simple show/hide toggle — no router or animation library needed for one panel */}
            <button
              type="button"
              className="md:hidden text-on-surface"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Ouvrir le menu"
            >
              <span className="material-symbols-outlined">
                {menuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <nav className="md:hidden flex flex-col bg-beton border-t border-outline-variant px-margin-mobile py-sm">
            {NAV_LINKS.map((link) => {
              const isActive = currentPath === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`py-sm font-body-sm uppercase tracking-widest ${
                    isActive ? 'text-phare font-bold' : 'text-on-surface-variant'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        )}
      </header>

      <main className="w-full pt-16">{children}</main>

      <footer className="w-full bg-asphalt text-on-tertiary py-xl mt-xl">
        <div className="w-full px-margin-mobile lg:px-lg mx-auto flex flex-col md:flex-row justify-between gap-xl">
          <div className="max-w-xs">
            <div className="flex items-center gap-base mb-md">
              {dealership?.logo_path ? (
                <img
                  alt={`Logo ${dealership?.name ?? 'AutoShowroom'}`}
                  className="h-6 w-auto object-contain brightness-0 invert"
                  src={dealership.logo_path}
                />
              ) : (
                <span className="material-symbols-outlined text-primary text-xl" aria-hidden="true">
                  directions_car
                </span>
              )}
              <span className="font-headline-md text-headline-md">{dealership?.name ?? 'AutoShowroom'}</span>
            </div>
            <p className="font-body-sm text-body-sm text-tertiary-fixed-dim">
              L'excellence automobile en Algérie. Performance, fiabilité et service premium
              pour votre prochain véhicule.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-lg">
            <div className="flex flex-col gap-sm">
              <span className="font-spec-label text-spec-label text-on-tertiary/60">
                EXPLORER
              </span>
              <Link className="text-body-sm" href="/">
                Accueil
              </Link>
              <Link className="text-body-sm" href="/inventaire">
                Inventaire
              </Link>
              <Link className="text-body-sm" href="/a-propos">
                À propos
              </Link>
            </div>
            <div className="flex flex-col gap-sm">
              <span className="font-spec-label text-spec-label text-on-tertiary/60">INFO</span>
              <Link className="text-body-sm" href="/contact">
                Contact
              </Link>
              <Link className="text-body-sm" href="/mentions-legales">
                Mentions Légales
              </Link>
            </div>
            <div className="flex flex-col gap-sm">
              <span className="font-spec-label text-spec-label text-on-tertiary/60">
                SOCIAL
              </span>
              {dealership?.facebook_url && (
                <a className="text-body-sm" href={dealership.facebook_url} target="_blank" rel="noreferrer">
                  Facebook
                </a>
              )}
              {dealership?.instagram_url && (
                <a className="text-body-sm" href={dealership.instagram_url} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              )}
              {dealership?.tiktok_url && (
                <a className="text-body-sm" href={dealership.tiktok_url} target="_blank" rel="noreferrer">
                  TikTok
                </a>
              )}
              {!dealership?.facebook_url && !dealership?.instagram_url && !dealership?.tiktok_url && (
                <span className="text-body-sm text-on-tertiary/40">Bientôt disponible</span>
              )}
            </div>
          </div>

          <div className="flex flex-col items-start gap-md">
            <span className="font-spec-label text-spec-label text-on-tertiary/60 uppercase">
              Assistance Directe
            </span>
            {whatsappNumber ? (
              <a
                className="flex items-center gap-sm bg-surface-tint px-lg py-sm rounded-lg hover:bg-on-primary-container transition-all text-on-primary font-headline-md text-headline-md"
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
              >
                <span className="material-symbols-outlined">chat</span> WhatsApp
              </a>
            ) : (
              <span className="font-body-sm text-body-sm text-on-tertiary/40">Bientôt disponible</span>
            )}
          </div>
        </div>

        <div className="w-full px-margin-mobile lg:px-lg mx-auto mt-xl pt-lg border-t border-on-tertiary/10 flex flex-col md:flex-row justify-between items-center gap-md">
          <span className="font-spec-value text-spec-value text-on-tertiary/40">
            © {new Date().getFullYear()} AUTOSHOWROOM. ALGERIA.
          </span>
          <span className="font-spec-value text-spec-value text-on-tertiary/40">
            CONSTRUIT POUR LA ROUTE.
          </span>
        </div>
      </footer>
    </div>
  );
}
