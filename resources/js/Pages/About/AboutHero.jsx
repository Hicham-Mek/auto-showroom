/**
 * Dark hero banner at the top of the About page. Mirrors the Stitch mockup's
 * logo + title treatment, but:
 * - uses the existing `.bg-grid-line` utility instead of the mockup's inline
 *   SVG background-image (no inline styles allowed here)
 * - shows a fallback badge when `logoPath` is null, instead of a broken image
 */
export default function AboutHero({ dealership, name, logoPath }) {
  const dealershipName = dealership?.name || name || 'Notre Showroom';
  const logo = dealership?.logo_path || logoPath;

  return (
    <section className="w-full bg-asphalt text-on-tertiary px-margin-mobile lg:px-lg py-xl flex flex-col items-center justify-center text-center relative overflow-hidden -mt-16 pt-32 pb-24 shadow-md bg-grid-line">
      <div className="relative flex flex-col items-center">
        <div className="bg-surface-container-lowest p-md rounded-xl shadow-lg mb-8">
          <img
            alt={dealership?.name || dealershipName}
            className="h-24 w-24 md:h-32 md:w-32 object-contain"
            src={logo ? logo : '/images/default-logo.png'}
            onError={(e) => {
              // If default image fails to load, gracefully fallback to styling
              e.target.src = '/images/default-logo.png';
            }}
          />
        </div>

        <h1 className="font-headline-xl text-headline-xl md:text-5xl lg:text-6xl text-on-tertiary mb-xs tracking-tighter uppercase">
          {dealershipName}
        </h1>
        <div className="h-1 w-16 bg-primary mb-md mx-auto rounded-full" />
        <p className="font-body-lg text-body-lg text-tertiary-fixed-dim max-w-2xl mx-auto font-light tracking-wide">
          L'excellence automobile. Performance, fiabilité et service premium en Algérie.
        </p>
      </div>
    </section>
  );
}
