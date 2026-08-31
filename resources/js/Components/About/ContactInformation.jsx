/**
 * Address / phone / email block. Every field on the dealership model is
 * nullable, so each row only renders when its value is actually present —
 * we never show an empty "TÉLÉPHONE" label with nothing under it.
 */
function ContactRow({ icon, label, children }) {
  return (
    <div className="flex items-start gap-md">
      <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-on-surface-variant" aria-hidden="true">
          {icon}
        </span>
      </div>
      <div>
        <span className="font-spec-label text-spec-label text-on-surface-variant block mb-1">
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

export default function ContactInformation({ address, phone, email }) {
  const hasAnyField = address || phone || email;

  if (!hasAnyField) {
    return (
      <p className="font-body-sm text-body-sm text-on-surface-variant">
        Coordonnées à venir.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {address && (
        <ContactRow icon="location_on" label="ADRESSE">
          <p className="font-body-md text-body-md text-on-surface font-medium whitespace-pre-line">
            {address}
          </p>
        </ContactRow>
      )}

      {phone && (
        <ContactRow icon="call" label="TÉLÉPHONE">
          <a
            className="font-headline-md text-headline-md text-on-surface hover:text-primary transition-colors block"
            href={`tel:${phone}`}
          >
            {phone}
          </a>
          <span className="font-body-sm text-body-sm text-on-surface-variant">Ligne directe</span>
        </ContactRow>
      )}

      {email && (
        <ContactRow icon="mail" label="EMAIL">
          <a
            className="font-body-md text-body-md text-on-surface hover:text-primary transition-colors break-all"
            href={`mailto:${email}`}
          >
            {email}
          </a>
        </ContactRow>
      )}
    </div>
  );
}
