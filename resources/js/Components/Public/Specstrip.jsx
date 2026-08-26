/**
 * A row of technical specs styled like a data plate: light background,
 * thin dividers, IBM Plex Mono. Used on the vehicle card, but kept generic
 * so any page can show "LABEL / value" pairs the same way.
 *
 * `specs` is an array of { label, value }. Entries with an empty value are
 * skipped so we never render "FUEL: —" just because the backend didn't
 * send that field yet.
 *
 * By default specs sit in a single row (what the vehicle card needs). Pass
 * `columns` (e.g. 2) to wrap into a grid instead — useful on pages like
 * Vehicle details that show more specs than comfortably fit in one row.
 */
export default function SpecStrip({ specs = [], className = '', columns = null }) {
    const items = specs.filter((spec) => spec.value !== null && spec.value !== undefined && spec.value !== '');

    if (items.length === 0) {
        return null;
    }

    if (columns) {
        const gridColsClass = columns === 3 ? 'grid-cols-3' : columns === 4 ? 'grid-cols-4' : 'grid-cols-2';
        return (
            <div
                className={`grid ${gridColsClass} border border-outline-variant/60 rounded bg-surface-container-low overflow-hidden ${className}`}
            >
                {items.map((spec) => (
                    <div
                        key={spec.label}
                        className="flex flex-col gap-0.5 px-3 py-2 border border-outline-variant/60"
                    >
                        <span className="font-spec-label text-spec-label text-on-surface-variant uppercase truncate">
                            {spec.label}
                        </span>
                        <span className="font-spec-value text-spec-value text-on-surface truncate">
                            {spec.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div
            className={`flex items-stretch divide-x divide-outline-variant/60 border border-outline-variant/60 rounded bg-surface-container-low ${className}`}
        >
            {items.map((spec) => (
                <div key={spec.label} className="flex-1 min-w-0 flex flex-col gap-0.5 px-3 py-2">
                    <span className="font-spec-label text-spec-label text-on-surface-variant uppercase truncate">
                        {spec.label}
                    </span>
                    <span className="font-spec-value text-spec-value text-on-surface truncate">
                        {spec.value}
                    </span>
                </div>
            ))}
        </div>
    );
}