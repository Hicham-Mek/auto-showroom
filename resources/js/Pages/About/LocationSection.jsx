/**
 * The Stitch mockup showed a stock photo of a showroom here — but nothing in
 * the dealership model backs an image like that, so it would've been a fake
 * hardcoded URL. This shows the same visual weight (dark card, same height
 * as the contact card next to it) but is driven entirely by real data:
 * latitude/longitude when available, falling back to the address.
 */
export default function LocationSection({ address, latitude, longitude }) {
  const hasCoordinates = latitude != null && longitude != null;

  if (!hasCoordinates && !address) {
    return null;
  }

  const mapsUrl = hasCoordinates
    ? `https://www.google.com/maps?q=${latitude},${longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="lg:col-span-7 bg-asphalt rounded-xl shadow-xl overflow-hidden bg-grid-line flex flex-col items-center justify-center text-center gap-md p-lg">
      <span className="material-symbols-outlined text-primary text-5xl" aria-hidden="true">
        location_on
      </span>

      <div>
        <span className="font-headline-md text-headline-md text-on-tertiary block mb-2">
          Showroom Principal
        </span>
        {address && (
          <p className="font-body-sm text-body-sm text-tertiary-fixed-dim max-w-xs mx-auto whitespace-pre-line">
            {address}
          </p>
        )}
      </div>

      <a
        href={mapsUrl}
        target="_blank"
        rel="noreferrer"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-asphalt font-headline-md text-headline-md rounded-lg hover:bg-primary-fixed-dim transition-colors"
      >
        <span className="material-symbols-outlined" aria-hidden="true">
          directions
        </span>
        Itinéraire
      </a>
    </div>
  );
}
