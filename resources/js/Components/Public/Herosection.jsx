import { Link } from '@inertiajs/react';

export default function HeroSection({ dealership, makes = [], filters = {} }) {
    const phoneNumber = dealership?.phone ?? '';

    return (
        <section className="w-full h-[90vh] relative bg-asphalt -mt-16 pt-24 pb-16 md:pt-32 md:pb-20 bg-grid-line">
            <div className="relative z-10 w-full max-w-7xl mx-auto px-margin-mobile lg:px-lg flex flex-col items-center text-center">
                <span className="font-spec-label text-spec-label text-tertiary-fixed-dim uppercase tracking-widest mb-4">
                    Concessionnaire automobile — Algérie
                </span>

                <h1 className="font-headline-xl text-[40px] md:text-[64px] lg:text-[80px] text-on-tertiary tracking-tight leading-[1.02] uppercase mb-6">
                    <span className="block text-phare">Trouvez votre</span>
                    <span className="block">prochaine voiture</span>
                </h1>

                <p className="font-body-lg text-body-lg text-tertiary-fixed-dim max-w-2xl mx-auto mb-10">
                    Une sélection de véhicules contrôlés, avec des prix affichés en dinars et négociables
                    directement avec le concessionnaire.
                </p>



                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <Link
                        href="/vehicules"
                        className="px-8 py-3.5 bg-phare text-asphalt font-headline-md text-[16px] font-bold uppercase tracking-wide rounded-lg hover:bg-primary-fixed-dim transition-colors"
                    >
                        Voir tout le stock
                    </Link>

                    {phoneNumber && (
                        <a
                            href={`tel:${phoneNumber}`}
                            className="px-8 py-3.5 bg-asphalt border-[1.5px] border-acier text-on-tertiary font-body-md text-[16px] font-medium rounded-lg hover:bg-black/40 transition-colors"
                        >
                            Appeler le concessionnaire
                        </a>
                    )}
                </div>
            </div>
        </section>
    );
}