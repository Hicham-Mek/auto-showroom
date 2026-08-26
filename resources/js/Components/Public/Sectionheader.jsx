/**
 * Eyebrow + title pair used above the vehicle grid and the trust section.
 * `tone="dark"` flips the colors for use on the Asphalt (dark) background.
 */
export default function SectionHeader({ eyebrow, title, tone = 'light', align = 'left' }) {
    const titleColor = tone === 'dark' ? 'text-on-tertiary' : 'text-on-surface';
    const eyebrowColor = tone === 'dark' ? 'text-tertiary-fixed-dim' : 'text-on-surface-variant';
    const alignClass = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left';

    return (
        <div className={`flex flex-col gap-2 ${alignClass}`}>
            {eyebrow && (
                <span
                    className={`font-spec-label text-spec-label uppercase tracking-widest flex items-center gap-4 ${eyebrowColor}`}
                >
                    <span className="w-8 h-[1px] bg-outline shrink-0" />
                    {eyebrow}
                </span>
            )}
            <h2 className={`font-headline-lg text-headline-lg md:text-[40px] uppercase tracking-tight ${titleColor}`}>
                {title}
            </h2>
        </div>
    );
}