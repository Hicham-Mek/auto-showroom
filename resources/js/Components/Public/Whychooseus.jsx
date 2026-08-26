import SectionHeader from '../../Components/Public/Sectionheader';

const FEATURES = [
    {
        icon: 'verified_user',
        title: 'Confiance',
        text: 'Chaque véhicule est inspecté avant sa mise en vente. Historique et état communiqués sans détour.',
    },
    {
        icon: 'payments',
        title: 'Prix négociables',
        text: 'Des prix affichés en dinars, ouverts à la discussion directement avec le concessionnaire.',
    },
    {
        icon: 'location_on',
        title: 'Concessionnaire local',
        text: 'Une présence en Algérie, avec une connaissance concrète du marché et des documents locaux.',
    },
];

export default function WhyChooseUs() {
    return (
        <section className="w-full h-220 bg-asphalt py-xl lg:py-24 md:h-150 text-on-tertiary bg-grid-line">
            <div className="max-w-7xl mx-auto px-margin-mobile lg:px-lg">
                <div className="mb-16">
                    <SectionHeader eyebrow="Pourquoi nous choisir" title="Une approche directe" tone="dark" align="center" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
                    {FEATURES.map((feature) => (
                        <div key={feature.title} className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 rounded-full border border-outline-variant/30 flex items-center justify-center mb-6">
                                <span className="material-symbols-outlined text-[28px] text-phare">
                                    {feature.icon}
                                </span>
                            </div>
                            <h3 className="font-headline-md text-headline-md uppercase tracking-wide mb-3">
                                {feature.title}
                            </h3>
                            <p className="font-body-sm text-body-sm text-tertiary-fixed-dim   leading-relaxed">
                                {feature.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}