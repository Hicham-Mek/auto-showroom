import { Link } from '@inertiajs/react';

export default function HeroSection({ dealership, makes = [], filters = {} }) {
    const phoneNumber = dealership?.phone ?? '';

    return (
        <section className="w-full min-h-[calc(100dvh-4rem)] relative bg-asphalt py-12 md:py-16 flex flex-col bg-grid-line">
            <div className="relative z-10 w-full max-w-7xl mx-auto px-margin-mobile lg:px-lg my-auto flex flex-col items-center text-center">
                {dealership?.logo_path && (
                    <div className="bg-surface-container-lowest/10 p-3 rounded-xl backdrop-blur-md mb-6 border border-white/10 shadow-lg">
                        <img
                            src={dealership.logo_path}
                            alt={dealership?.name || 'Logo'}
                            className="h-16 md:h-20 w-auto object-contain"
                        />
                    </div>
                )}

                <span className="font-spec-label text-spec-label text-tertiary-fixed-dim uppercase tracking-widest mb-4">
                    {dealership?.name ? `${dealership.name} — Concessionnaire Automobile` : 'Concessionnaire automobile — Algérie'}
                </span>

                <h1 className="font-headline-xl text-[clamp(2.5rem,1.5rem+4vw,5rem)] text-on-tertiary tracking-tight leading-[1.04] uppercase mb-5 text-balance">
                    <span className="block text-phare">Trouvez votre</span>
                    <span className="block">prochaine voiture</span>
                </h1>

                <p className="font-body-lg text-body-lg text-tertiary-fixed-dim max-w-2xl mx-auto mb-8 text-pretty">
                    Une sélection de véhicules contrôlés, avec des prix affichés en dinars et négociables
                    directement avec le concessionnaire.
                </p>

                <div className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
                    <Link
                        href="/vehicules"
                        className="w-full sm:w-auto text-center px-8 py-3.5 bg-phare text-asphalt font-headline-md text-[1rem] font-bold uppercase tracking-wide rounded-lg hover:bg-primary-fixed-dim transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phare"
                    >
                        Voir tout le stock
                    </Link>

                    {phoneNumber && (
                        <a
                            href={`tel:${phoneNumber}`}
                            className="w-full sm:w-auto text-center px-8 py-3.5 bg-asphalt border-[1.5px] border-acier text-on-tertiary font-body-md text-[1rem] font-medium rounded-lg hover:bg-black/40 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-phare"
                        >
                            Appeler le concessionnaire
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}