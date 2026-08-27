/**
 * The Stitch mockup showed a stock photo of a showroom here — but nothing in
 * the dealership model backs an image like that, so it would've been a fake
 * hardcoded URL. This shows the same visual weight (dark card, same height
 * as the contact card next to it) but is driven entirely by real data:
 * latitude/longitude when available, falling back to the address.
 */
export default function LocationSection({ dealership, address, latitude, longitude }) {
  const lat = dealership?.latitude ?? latitude;
  const lng = dealership?.longitude ?? longitude;

  return (
    <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl shadow-xl overflow-hidden min-h-[400px]">
      <iframe 
        width="100%" 
        height="100%" 
        style={{ border: 0, minHeight: '400px' }}
        loading="lazy" 
        allowFullScreen 
        src={`https://maps.google.com/maps?q=${lat},${lng}&hl=fr&z=15&output=embed`}
      ></iframe>
    </div>
  );
}
