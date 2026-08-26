import { useState } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import SpecStrip from '../../../Components/Public/Specstrip';
import { getVehicleStatus } from '../../../Components/Public/vehicleStatus';

export default function VehicleDetails({ vehicle, dealership }) {
    // Support either a gallery (`vehicle.images`) or a single `vehicle.image`,
    // without assuming the backend already sends an array.
    const images = vehicle?.images?.length > 0 ? vehicle.images : vehicle?.image ? [vehicle.image] : [];
    const [activeImage, setActiveImage] = useState(0);

    if (!vehicle) {
        return (
            <PublicLayout>
                <Head title="Véhicule introuvable" />
                <div className="max-w-3xl mx-auto px-margin-mobile lg:px-lg py-24 text-center">
                    <h1 className="font-headline-lg text-headline-lg text-on-surface mb-4">
                        Véhicule introuvable
                    </h1>
                    <p className="font-body-md text-body-md text-on-surface-variant mb-8">
                        Ce véhicule n'est plus disponible ou a été retiré de l'inventaire.
                    </p>
                    <Link
                        href="/vehicules"
                        className="inline-block px-6 py-3 bg-phare text-asphalt font-headline-md text-base font-bold uppercase tracking-wide rounded-lg hover:bg-primary-fixed-dim transition-colors"
                    >
                        Retour à l'inventaire
                    </Link>
                </div>
            </PublicLayout>
        );
    }

    const status = getVehicleStatus(vehicle.status);
    const isAvailable = vehicle.status === 'disponible';
    const whatsappNumber = dealership?.whatsapp ?? '';
    const phoneNumber = dealership?.phone ?? '';
    const whatsappMessage = encodeURIComponent(
        `Bonjour, je suis intéressé(e) par le véhicule "${vehicle.title}" à ${vehicle.price != null ? `${new Intl.NumberFormat('fr-DZ').format(vehicle.price)} DA` : 'un prix à négocier'
        }.`
    );

    const specs = [
        { label: 'Année', value: vehicle.year },
        { label: 'Km', value: vehicle.mileage != null ? Number(vehicle.mileage).toLocaleString('fr-FR') : null },
        { label: 'Carburant', value: vehicle.fuel },
        { label: 'Boîte', value: vehicle.transmission },
        { label: 'Documents', value: vehicle.documentType },
        { label: 'Localisation', value: vehicle.location },
    ];

    return (
        <PublicLayout>
            <Head title={vehicle.title ?? 'Véhicule'} />

            <div className="max-w-7xl mx-auto px-margin-mobile lg:px-lg py-lg lg:py-xl">
                <Link
                    href="/vehicules"
                    className="inline-flex items-center gap-2 font-body-sm text-body-sm text-on-surface-variant hover:text-on-surface transition-colors mb-6"
                >
                    <span className="material-symbols-outlined text-lg" aria-hidden="true">
                        arrow_back
                    </span>
                    Retour à l'inventaire
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-12">
                    {/* Gallery */}
                    <div className="lg:col-span-3 flex flex-col gap-3">
                        <div className="w-full aspect-[4/3] bg-asphalt rounded-lg overflow-hidden">
                            {images.length > 0 && (
                                <img
                                    src={images[activeImage]}
                                    alt={`${vehicle.title ?? 'Véhicule'} — photo ${activeImage + 1}`}
                                    loading="lazy"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </div>

                        {images.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-1">
                                {images.map((image, index) => (
                                    <button
                                        key={image}
                                        type="button"
                                        onClick={() => setActiveImage(index)}
                                        aria-label={`Voir la photo ${index + 1}`}
                                        aria-current={index === activeImage}
                                        className={`shrink-0 w-20 aspect-[4/3] rounded overflow-hidden border-2 transition-colors ${index === activeImage ? 'border-phare' : 'border-transparent hover:border-outline-variant'
                                            }`}
                                    >
                                        <img src={image} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className="lg:col-span-2 flex flex-col gap-6">
                        <div className="flex items-start justify-between gap-4">
                            <h1 className="font-headline-lg text-headline-lg md:text-3xl text-on-surface">
                                {vehicle.title}
                            </h1>
                            <span className="shrink-0 inline-flex items-center px-2 py-1 bg-acier text-on-tertiary font-spec-label text-xs uppercase tracking-wider rounded">
                                <span className={`w-1.5 h-1.5 rounded-full ${status.dot} mr-2`} />
                                {status.label}
                            </span>
                        </div>

                        {vehicle.price != null && (
                            <p className="font-spec-value text-2xl font-bold text-on-surface">
                                {new Intl.NumberFormat('fr-DZ').format(vehicle.price)} DA
                            </p>
                        )}

                        <SpecStrip specs={specs} columns={2} />

                        {vehicle.description && (
                            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                                {vehicle.description}
                            </p>
                        )}

                        {isAvailable && (
                            <div className="flex flex-col gap-3 pt-2">
                                {whatsappNumber && (
                                    <a
                                        href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center gap-2 px-6 py-3.5 bg-phare text-asphalt font-headline-md text-base font-bold uppercase tracking-wide rounded-lg hover:bg-primary-fixed-dim transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-xl" aria-hidden="true">
                                            chat
                                        </span>
                                        Négocier sur WhatsApp
                                    </a>
                                )}
                                {phoneNumber && (
                                    <a
                                        href={`tel:${phoneNumber}`}
                                        className="flex items-center justify-center gap-2 px-6 py-3.5 bg-transparent border-2 border-acier text-on-surface font-body-md text-base font-medium rounded-lg hover:bg-surface-container-highest transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-xl" aria-hidden="true">
                                            call
                                        </span>
                                        Appeler le concessionnaire
                                    </a>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}