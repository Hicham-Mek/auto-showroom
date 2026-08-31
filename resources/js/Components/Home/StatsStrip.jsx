/**
 * Renders nothing unless the backend actually sends `stats`
 * (e.g. [{ label: 'Véhicules en stock', value: '120+' }]).
 * We never invent numbers here — this section simply disappears
 * until the controller provides real ones.
 */
export default function StatsStrip({ stats = [] }) {
    if (!stats || stats.length === 0) {
        return null;
    }

    return (
        <section className="w-full bg-beton border-y border-outline-variant/50">
            <div className="max-w-7xl mx-auto  px-margin-mobile lg:px-lg py-lg grid grid-cols-2 md:grid-cols-4 divide-x divide-outline-variant/50">
                {stats.map((stat) => (
                    <div key={stat.label} className="flex flex-col items-center gap-1 px-4 py-3 text-center">
                        <span className="font-headline-lg text-headline-lg text-on-surface">{stat.value}</span>
                        <span className="font-spec-label text-spec-label text-on-surface-variant uppercase">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}