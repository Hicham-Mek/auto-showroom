/**
 * The dealership model only has a single `hours` field — there's no
 * per-day column in the schema. Laravel might store that as a plain text
 * block ("Dim - Jeu : 08:00-18:00\nVen : Fermé") or, if a future version
 * structures it, as an array of { day, time }. Both are handled here so
 * neither shape breaks the layout.
 */
export default function BusinessHours({ hours }) {
  const isStructured = Array.isArray(hours) && hours.length > 0;
  const isText = typeof hours === 'string' && hours.trim().length > 0;

  return (
    <div className="flex items-start gap-md">
      <div className="w-12 h-12 rounded-full bg-surface-container flex items-center justify-center shrink-0">
        <span className="material-symbols-outlined text-on-surface-variant" aria-hidden="true">
          schedule
        </span>
      </div>
      <div className="w-full">
        <span className="font-spec-label text-spec-label text-on-surface-variant block mb-2">
          HORAIRES
        </span>

        {isStructured && (
          <ul className="font-body-sm text-body-sm text-on-surface space-y-2 w-full">
            {hours.map((entry) => (
              <li
                key={entry.day}
                className="flex justify-between items-center gap-4 bg-surface-container-low p-2 rounded"
              >
                <span>{entry.day}</span>
                <span className="font-spec-value text-spec-value bg-surface-container px-2 py-1 rounded">
                  {entry.time || 'Fermé'}
                </span>
              </li>
            ))}
          </ul>
        )}

        {!isStructured && isText && (
          <p className="font-body-sm text-body-sm text-on-surface whitespace-pre-line bg-surface-container-low p-3 rounded">
            {hours}
          </p>
        )}

        {!isStructured && !isText && (
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Horaires non communiqués — contactez-nous directement.
          </p>
        )}
      </div>
    </div>
  );
}
