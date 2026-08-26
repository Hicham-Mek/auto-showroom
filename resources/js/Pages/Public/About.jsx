import { Head } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';
import PageHeader from '../../Components/Public/PageHeader';
import SectionHeader from '../../Components/Public/Sectionheader';
import WhyChooseUs from '../../Components/Public/Whychooseus';

export default function About({ dealership }) {
    const whatsappNumber = dealership?.whatsapp ?? '';
    const phoneNumber = dealership?.phone ?? '';

    return (
        <PublicLayout>
            <Head title="À propos" />

            <PageHeader
                eyebrow="À propos"
                title={dealership?.name ?? 'Notre concession'}
                subtitle="Une équipe locale, un stock choisi avec soin, des prix qui se discutent."
            />

            <section className="w-full bg-beton py-xl lg:py-24">
                <div className="max-w-3xl mx-auto px-margin-mobile lg:px-lg flex flex-col gap-6">
                    <SectionHeader eyebrow="Notre histoire" title="Qui sommes-nous" />
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                        {dealership?.about ??
                            "Nous sommes un concessionnaire automobile basé en Algérie. Chaque véhicule proposé est inspecté avant sa mise en vente, et les prix affichés se discutent directement avec nous — par téléphone ou WhatsApp, sans étape intermédiaire."}
                    </p>
                </div>
            </section>

            <WhyChooseUs />

            <section className="w-full bg-beton py-xl lg:py-24">
                <div className="max-w-3xl mx-auto px-margin-mobile lg:px-lg flex flex-col gap-6">
                    <SectionHeader eyebrow="Nous contacter" title="Discutons de votre véhicule" />

                    <div className="border border-outline-variant/60 rounded-lg p-6 flex flex-col gap-3">
                        {dealership?.address && (
                            <p className="font-body-md text-body-md text-on-surface">{dealership.address}</p>
                        )}
                        {phoneNumber && (
                            <p className="font-spec-value text-spec-value text-on-surface-variant">{phoneNumber}</p>
                        )}
                        {dealership?.email && (
                            <p className="font-body-sm text-body-sm text-on-surface-variant">{dealership.email}</p>
                        )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {whatsappNumber && (
                            <a
                                href={`https://wa.me/${whatsappNumber}`}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-phare text-asphalt font-headline-md text-base font-bold uppercase tracking-wide rounded-lg hover:bg-primary-fixed-dim transition-colors"
                            >
                                <span className="material-symbols-outlined text-xl" aria-hidden="true">
                                    chat
                                </span>
                                WhatsApp
                            </a>
                        )}
                        {phoneNumber && (
                            <a
                                href={`tel:${phoneNumber}`}
                                className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border-2 border-acier text-on-surface font-body-md text-base font-medium rounded-lg hover:bg-surface-container-highest transition-colors"
                            >
                                <span className="material-symbols-outlined text-xl" aria-hidden="true">
                                    call
                                </span>
                                Appeler
                            </a>
                        )}
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}