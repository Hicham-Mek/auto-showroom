import React from 'react';
import { Link } from '@inertiajs/react';

export default function VehicleCard({ vehicle }) {
    // Enum values are lowercase 'available', 'reserved'
    const statusBg = vehicle.status === 'reserved' ? 'bg-reserve' : 'bg-disponible';
    const statusLabel = vehicle.status === 'reserved' ? 'Réservé' : 'Disponible';

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden flex flex-col group border border-gray-100 hover:shadow-xl hover:border-gray-300 transition-all duration-300">
            {/* Top Half: Image */}
            <div className="relative h-56 bg-gray-100 overflow-hidden">
                {vehicle.primary_image ? (
                    <img 
                        src={`/storage/${vehicle.primary_image}`} 
                        alt={`${vehicle.brand} ${vehicle.model}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                    />
                ) : (
                    <div className="flex items-center justify-center w-full h-full text-gray-400 font-medium">Pas d'image</div>
                )}
                
                {/* Status Badge */}
                <div className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold text-white rounded-md shadow-sm ${statusBg}`}>
                    {statusLabel}
                </div>
            </div>

            {/* Bottom Half: Details */}
            <div className="p-5 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="font-display font-bold text-xl text-asphalt line-clamp-1 group-hover:text-phare transition-colors">
                        {vehicle.brand} {vehicle.model}
                    </h3>
                    
                    {/* Plaque Strip */}
                    <div className="mt-4 py-2 px-3 bg-asphalt border border-acier text-white font-data text-xs uppercase text-center rounded">
                        {vehicle.year} &middot; {new Intl.NumberFormat('fr-FR').format(vehicle.mileage)} KM &middot; {vehicle.fuel_type} &middot; {vehicle.transmission}
                    </div>
                </div>

                <div className="mt-6 flex items-end justify-between">
                    <div>
                        {vehicle.price ? (
                            <span className="font-bold text-xl text-asphalt">
                                {new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'DZD', maximumFractionDigits: 0 }).format(vehicle.price)}
                            </span>
                        ) : (
                            <span className="text-sm font-medium text-acier italic">Contactez-nous pour le prix</span>
                        )}
                    </div>
                    <Link 
                        href={`/vehicules/${vehicle.slug}`} 
                        className="inline-flex items-center text-asphalt font-semibold text-sm hover:text-phare transition-colors"
                    >
                        Détails
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}
