import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';
import AboutHero from './AboutHero';
import ContactInformation from './ContactInformation';
import BusinessHours from './BusinessHours';
import LocationSection from './LocationSection';
import SocialLinks from './SocialLinks';

export default function Index({ dealership: propDealership }) {
  const { dealership: pageDealership } = usePage().props;
  const dealership = propDealership || pageDealership || {};

  const {
    name,
    logo_path: logoPath,
    phone,
    email,
    address,
    hours,
    latitude,
    longitude,
    facebook_url: facebookUrl,
    instagram_url: instagramUrl,
    tiktok_url: tiktokUrl,
  } = dealership;

  const cleanWhatsapp = dealership?.whatsapp ? dealership.whatsapp.replace(/[^0-9]/g, '') : '';
  const hasContactCta = Boolean(cleanWhatsapp || phone);

  return (
    <PublicLayout>
      <Head title="À propos" />

      <div className="flex flex-col w-full">
        <AboutHero name={name} logoPath={logoPath} />

        <section className="w-full bg-surface px-margin-mobile lg:px-lg py-xl relative z-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-lg lg:gap-xl">
              <LocationSection address={address} latitude={latitude} longitude={longitude} />

              <div className="lg:col-span-5 flex flex-col gap-lg bg-surface-container-lowest rounded-xl shadow-xl p-md lg:p-lg">
                <div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface mb-6 flex items-center gap-2 tracking-wide">
                    <span className="material-symbols-outlined text-primary" aria-hidden="true">
                      contacts
                    </span>
                    Contact &amp; Infos
                  </h2>

                  <div className="space-y-6">
                    <ContactInformation address={address} phone={phone} email={email} />
                    <BusinessHours hours={hours} />
                  </div>
                </div>

                {hasContactCta && (
                  <div className="mt-auto pt-8 border-t border-surface-variant flex flex-col sm:flex-row gap-4">
                    {cleanWhatsapp && (
                      <a
                        className="flex-1 bg-primary text-asphalt font-headline-md text-headline-md py-4 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-primary-fixed-dim transition-colors shadow-md"
                        href={`https://wa.me/${cleanWhatsapp}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <span className="material-symbols-outlined" aria-hidden="true">
                          chat
                        </span>
                        WhatsApp
                      </a>
                    )}
                    {phone && (
                      <a
                        className="flex-1 bg-transparent text-on-surface border-2 border-acier font-body-md font-medium py-4 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-surface-container transition-colors"
                        href={`tel:${phone}`}
                      >
                        <span className="material-symbols-outlined" aria-hidden="true">
                          call
                        </span>
                        Appeler
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <SocialLinks facebookUrl={facebookUrl} instagramUrl={instagramUrl} tiktokUrl={tiktokUrl} />
      </div>
    </PublicLayout>
  );
}
