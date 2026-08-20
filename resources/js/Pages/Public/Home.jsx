import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';
import VehicleCard from '@/Components/VehicleCard';

export default function Home({ vehicles }) {
    const { dealership } = usePage().props;

    return (
        <PublicLayout>
            <Head title={`Accueil | ${dealership?.name || 'Showroom'}`} />

            {/* Hero Section */}
            <section className="bg-asphalt text-white py-20 border-b-4 border-phare">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                        Trouvez le véhicule de vos rêves
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 font-body">
                        Découvrez notre sélection de voitures d'occasion et neuves, 
                        rigoureusement inspectées pour votre tranquillité d'esprit.
                    </p>
                    <Link 
                        href="/vehicules" 
                        className="inline-block bg-phare text-asphalt font-bold text-lg px-8 py-4 rounded-lg hover:bg-white transition-colors shadow-lg"
                    >
                        Voir notre stock
                    </Link>
                </div>
            </section>

            {/* Latest Vehicles Section */}
            <section className="py-16 bg-beton">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-display font-bold text-asphalt">Nos derniers arrivages</h2>
                            <p className="text-gray-600 mt-2">Découvrez les véhicules fraîchement ajoutés à notre catalogue.</p>
                        </div>
                        <Link href="/vehicules" className="hidden md:inline-flex items-center text-phare font-bold hover:underline mt-4 md:mt-0">
                            Tout voir 
                            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {vehicles.map(vehicle => (
                            <VehicleCard key={vehicle.id} vehicle={vehicle} />
                        ))}
                    </div>
                    
                    <div className="mt-10 text-center md:hidden">
                        <Link href="/vehicules" className="inline-block bg-asphalt text-white px-6 py-3 rounded hover:bg-acier transition-colors font-medium">
                            Voir tout notre stock
                        </Link>
                    </div>
                </div>
            </section>
        </PublicLayout>
    );
}
