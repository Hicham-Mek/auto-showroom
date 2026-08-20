import React from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import VehicleCard from '@/Components/VehicleCard';

export default function Vehicles({ vehicles }) {
    return (
        <PublicLayout>
            <Head title="Tous nos véhicules | Showroom" />

            <div className="bg-asphalt py-16 border-b-4 border-phare">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl font-display font-bold mb-4">Notre Stock</h1>
                    <p className="text-xl text-gray-300">Découvrez l'ensemble de nos véhicules disponibles.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {vehicles.data.length > 0 ? (
                        vehicles.data.map(vehicle => (
                            <VehicleCard key={vehicle.id} vehicle={vehicle} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-sm border border-gray-100">
                            <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            <p className="text-gray-500 font-medium text-lg">Aucun véhicule n'est disponible pour le moment.</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {vehicles.links && vehicles.links.length > 3 && (
                    <div className="mt-16 flex justify-center flex-wrap gap-2">
                        {vehicles.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                className={`px-4 py-2 border rounded font-medium transition-colors ${
                                    link.active
                                        ? 'bg-asphalt text-white border-asphalt shadow'
                                        : link.url
                                            ? 'bg-white text-asphalt border-gray-300 hover:bg-gray-50'
                                            : 'bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed'
                                }`}
                                preserveScroll
                            />
                        ))}
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
