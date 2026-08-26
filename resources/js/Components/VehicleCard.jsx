import { Link } from '@inertiajs/react';
import SpecStrip from '../Components/Public/Specstrip';
import { getVehicleStatus } from '../Components/Public/vehicleStatus';

export default function VehicleCard({ vehicle }) {
    const status = getVehicleStatus(vehicle.status);
    const isAvailable = vehicle.status === 'disponible';

    const specs = [
        { label: 'Année', value: vehicle.year },
        { label: 'Km', value: vehicle.mileage != null ? `${Number(vehicle.mileage).toLocaleString('fr-FR')}` : null },
        { label: 'Carburant', value: vehicle.fuel },
        { label: 'Boîte', value: vehicle.transmission },
    ];

    return (
        // Flat surface + border instead of a drop shadow — the spec calls for
        // borders/tonal surfaces to carry hierarchy, not elevation shadows.
        <article className="flex flex-col bg-surface-container-lowest group rounded-lg overflow-hidden border border-outline-variant/40 hover:border-outline transition-colors duration-300">
            <div className="w-full h-56 relative overflow-hidden bg-asphalt">
                <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out opacity-90 group-hover:opacity-100"
                    style={{ backgroundImage: vehicle.image ? `url('${vehicle.image}')` : undefined }}
                />
                <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center px-2 py-1 bg-acier/90 text-on-tertiary font-spec-label text-[10px] uppercase tracking-wider rounded">
                        <span
                            className={`w-1.5 h-1.5 rounded-full ${status.dot} mr-2 ${isAvailable ? 'animate-pulse' : ''}`}
                        />
                        {status.label}
                    </span>
                </div>
                {vehicle.price != null && (
                    <div className="absolute bottom-4 right-4 bg-surface/95 px-3 py-1.5 rounded font-spec-value text-[16px] font-bold text-on-surface shadow-none">
                        {/* Algerian dealerships price in DZD, not EUR — formatted with fr-DZ thousand separators */}
                        {new Intl.NumberFormat('fr-DZ').format(vehicle.price)} DA
                    </div>
                )}
            </div>

            <div className="p-6 flex flex-col gap-4 relative z-10">
                <h3 className="font-headline-md text-headline-md text-on-surface truncate">
                    {vehicle.title}
                </h3>

                <SpecStrip specs={specs} />

                {isAvailable ? (
                    <Link
                        href={`/inventaire/${vehicle.id}`}
                        className="w-full py-3 mt-1 bg-transparent border-[1.5px] border-acier text-on-surface font-body-sm font-medium hover:bg-surface-container-highest transition-colors rounded-lg text-center"
                    >
                        Détails
                    </Link>
                ) : (
                    <button
                        type="button"
                        disabled
                        className="w-full py-3 mt-1 bg-transparent border-[1.5px] border-acier text-on-surface font-body-sm font-medium transition-colors rounded-lg opacity-50 cursor-not-allowed"
                    >
                        Indisponible
                    </button>
                )}
            </div>
        </article>
    );
}