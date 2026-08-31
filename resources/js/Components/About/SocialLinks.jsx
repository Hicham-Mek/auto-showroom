/**
 * Facebook / Instagram / TikTok icon row. Material Symbols has no brand
 * icons, so these are small inline SVGs (the existing project convention —
 * PublicLayout's footer already does the same for Facebook/Instagram).
 *
 * The mockup used each brand's own hex color on hover (Facebook blue,
 * Instagram gradient...). Since arbitrary hex values aren't allowed here,
 * every icon shares one hover treatment built from existing tokens instead.
 */
const ICONS = {
  facebook: (
    <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
      />
    </svg>
  ),
  instagram: (
    <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
      />
    </svg>
  ),
  tiktok: (
    <svg aria-hidden="true" className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16.6 5.82c-1.36-1.57-3.24-1.48-3.24-1.48h-3.09v12.4a2.592 2.592 0 0 1-2.59 2.5c-1.42 0-2.6-1.16-2.6-2.6 0-1.72 1.66-3.01 3.37-2.48V11.6c-3.45-.46-6.47 2.22-6.47 5.64 0 3.33 2.76 5.7 5.69 5.7 3.14 0 5.69-2.55 5.69-5.7v-6.25a7.35 7.35 0 0 0 4.3 1.38V9.36s-1.88.09-3.24-1.48z" />
    </svg>
  ),
};

const PLATFORMS = [
  { key: 'facebook', label: 'Facebook' },
  { key: 'instagram', label: 'Instagram' },
  { key: 'tiktok', label: 'TikTok' },
];

export default function SocialLinks({ facebookUrl, instagramUrl, tiktokUrl }) {
  const urls = {
    facebook: facebookUrl || '#',
    instagram: instagramUrl || '#',
    tiktok: tiktokUrl || '#',
  };

  return (
    <section className="w-full bg-surface px-margin-mobile lg:px-lg py-xl">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-6">
        <span className="font-spec-label text-spec-label text-on-surface-variant uppercase tracking-widest">
          Rejoignez-nous
        </span>

        <div className="flex items-center gap-6">
          {PLATFORMS.map((platform) => (
            <a
              key={platform.key}
              href={urls[platform.key]}
              target={urls[platform.key] !== '#' ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={`Suivez-nous sur ${platform.label}`}
              className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-primary hover:text-on-primary transition-colors shadow-sm hover:shadow-md"
            >
              {ICONS[platform.key]}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
