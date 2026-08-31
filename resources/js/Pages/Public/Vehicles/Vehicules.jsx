import { useState } from 'react';
import { router, Head } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import VehicleCard from '../../../Components/Vehicles/VehicleCard';
import Pagination from '../../../Components/Common/Pagination';
import FilterSidebar from '../../../Components/Vehicles/FilterSidebar';

export default function Vehicules({ vehicles = { data: [], links: [], total: 0 }, filters }) {
    const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

    // Handle instant sorting
    const handleSortChange = (e) => {
        router.get('/vehicules', { ...filters, sort: e.target.value }, {
            preserveState: true,
            preserveScroll: true
        });
    };

    return (
        <PublicLayout>
            <Head>
                <title>Inventaire</title>
                <meta name="description" content="Explorez notre inventaire complet de véhicules d'occasion. Utilisez nos filtres pour trouver la voiture qui correspond à vos besoins et à votre budget." />
            </Head>

            {/* Header Section */}
            <div className="bg-asphalt text-white py-12">
                <div className="container mx-auto px-4 max-w-7xl">
                    <h1 className="font-display text-3xl md:text-5xl font-bold uppercase tracking-wide">
                        Notre Stock
                    </h1>
                    <p className="font-body text-beton mt-4 max-w-2xl text-lg opacity-90">
                        Trouvez le véhicule parfait parmi notre sélection rigoureuse.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="container mx-auto px-4 py-12 max-w-7xl">

                {/* Mobile Filter Toggle & Global Sort Bar */}
                <div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-sm mb-8 gap-4 border border-beton">

                    {/* Mobile Button - Hidden on Desktop */}
                    <button
                        onClick={() => setMobileFiltersOpen(true)}
                        className="w-full sm:w-auto lg:hidden bg-asphalt text-white font-body font-bold py-3 px-6 rounded-md flex justify-center items-center gap-2"
                    >
                        {/* SVG Filter Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filtres
                    </button>

                    <div className="font-body text-acier text-sm w-full sm:w-auto text-center sm:text-left">
                        <span className="font-bold text-asphalt">{vehicles?.total ?? 0}</span> véhicule(s) disponible(s)
                    </div>

                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <label className="font-body font-bold text-asphalt whitespace-nowrap">Trier par</label>
                        <select
                            value={filters?.sort || 'newest'}
                            onChange={handleSortChange}
                            className="w-full sm:w-auto border border-acier rounded-md p-2 font-body text-asphalt outline-none focus:ring-2 focus:ring-phare bg-white"
                        >
                            <option value="newest">Les plus récents</option>
                            <option value="price_asc">Prix : Croissant</option>
                            <option value="price_desc">Prix : Décroissant</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-8">

                    {/* Desktop Sidebar (Hidden on mobile, block on lg) */}
                    <aside className="hidden lg:block w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-sm border border-beton h-fit sticky top-6">
                        <h2 className="font-display font-bold text-xl text-asphalt uppercase mb-6 border-b border-beton pb-4">
                            Filtres
                        </h2>
                        <FilterSidebar initialFilters={filters} />
                    </aside>

                    {/* Mobile Filter Overlay (Visible only when mobileFiltersOpen is true) */}
                    {mobileFiltersOpen && (
                        <div className="fixed inset-0 z-50 bg-asphalt bg-opacity-80 flex justify-end lg:hidden">
                            <div className="w-full max-w-sm bg-white h-full overflow-y-auto p-6 shadow-xl animate-fade-in-right">
                                <div className="flex justify-between items-center mb-6 border-b border-beton pb-4">
                                    <h2 className="font-display font-bold text-xl text-asphalt uppercase">Filtres</h2>
                                    <button onClick={() => setMobileFiltersOpen(false)} className="text-acier hover:text-asphalt p-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                                <FilterSidebar initialFilters={filters} onClose={() => setMobileFiltersOpen(false)} />
                            </div>
                        </div>
                    )}

                    {/* Vehicle Grid */}
                    <main className="w-full lg:w-3/4">
                        {(vehicles?.data?.length ?? 0) > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                                    {vehicles?.data?.map((vehicle) => (
                                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                                    ))}
                                </div>

                                {/* Pagination */}
                                <Pagination links={vehicles?.links ?? []} />
                            </>
                        ) : (
                            <div className="bg-white p-12 text-center rounded-lg border border-beton flex flex-col items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-acier opacity-50 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                                <h3 className="font-display font-bold text-xl text-asphalt">Aucun véhicule trouvé</h3>
                                <p className="font-body text-acier mt-2">
                                    Essayez de modifier vos filtres pour voir plus de résultats.
                                </p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </PublicLayout>
    );
}