/**
 * Compact dark banner reused at the top of secondary pages (Vehicles, About).
 * Deliberately smaller than the Home hero — that page keeps its own large
 * display headline, this one just orients the visitor on where they are.
 */
export default function PageHeader({ eyebrow, title, subtitle }) {
    return (
        <section className="w-full bg-asphalt -mt-16 pt-28 pb-12 md:pt-32 md:pb-16 bg-grid-line">
            <div className="max-w-7xl mx-auto px-margin-mobile lg:px-lg text-center">
                {eyebrow && (
                    <span className="font-spec-label text-spec-label text-tertiary-fixed-dim uppercase tracking-widest mb-4 block">
                        {eyebrow}
                    </span>
                )}
                <h1 className="font-headline-xl text-4xl md:text-5xl text-on-tertiary uppercase tracking-tight mb-4">
                    {title}
                </h1>
                {subtitle && (
                    <p className="font-body-lg text-body-lg text-tertiary-fixed-dim max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                )}
            </div>
        </section>
    );
}