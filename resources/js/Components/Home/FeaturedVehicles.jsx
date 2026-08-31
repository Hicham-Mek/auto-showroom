import { Link } from '@inertiajs/react';
import VehicleCard from '../../Components/Vehicles/VehicleCard';
import SectionHeader from '../../Components/Common/SectionHeader';

export default function FeaturedVehicles({ vehicles = [] }) {
    return (
        <section className="w-full bg-beton py-xl lg:py-24">
            <div className="max-w-7xl mx-auto px-margin-mobile lg:px-lg">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                    <SectionHeader eyebrow="Véhicules en vedette" title="Sélection premium" />

                    <Link
                        href="/vehicules"
                        className="hidden md:flex items-center gap-2 text-on-surface font-body-sm hover:text-phare transition-colors group"
                    >
                        <span className="uppercase tracking-widest font-semibold">Tout l'inventaire</span>
                        <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform text-phare">
                            arrow_forward
                        </span>
                    </Link>
                </div>

                {vehicles.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {vehicles.map((vehicle) => (
                            <VehicleCard key={vehicle.id} vehicle={vehicle} />
                        ))}
                    </div>
                ) : (
                    <p className="font-body-md text-body-md text-on-surface-variant">
                        Aucun véhicule en vedette pour le moment.
                    </p>
                )}

                <div className="mt-8 md:hidden">
                    <Link
                        href="/vehicules"
                        className="flex items-center justify-center w-full py-4 border-[1.5px] border-acier text-on-surface font-body-sm font-medium hover:bg-surface-container-highest transition-colors rounded-lg uppercase tracking-widest"
                    >
                        Voir tout l'inventaire
                    </Link>
                </div>
            </div>
        </section>
    );
}