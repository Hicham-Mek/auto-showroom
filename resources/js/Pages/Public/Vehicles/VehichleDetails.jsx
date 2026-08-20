import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function VehichleDetails({ vehicle }) {
    const { dealership } = usePage().props;

    const message = `Bonjour, je suis intéressé par votre ${vehicle.brand} ${vehicle.model} (${vehicle.year}). Est-elle toujours disponible ?`;
    const whatsappUrl = dealership?.whatsapp 
        ? `https://wa.me/${dealership.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`
        : '#';

    return (
        <PublicLayout>
            <Head title={`${vehicle.brand} ${vehicle.model} | Showroom`} />

            <div className="bg-gray-50 min-h-screen py-10 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    
                    {/* Breadcrumb */}
                    <div className="text-sm text-gray-500 mb-8 font-medium">
                        <a href="/" className="hover:text-asphalt transition">Accueil</a>
                        <span className="mx-2 text-gray-400">&gt;</span>
                        <a href="/vehicules" className="hover:text-asphalt transition">Véhicules</a>
                        <span className="mx-2 text-gray-400">&gt;</span>
                        <span className="text-asphalt font-bold">{vehicle.brand} {vehicle.model}</span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-16">
                        
                        {/* Image Gallery */}
                        <div className="space-y-4">
                            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-[400px] md:h-[550px]">
                                {vehicle.images && vehicle.images.length > 0 ? (
                                    <img 
                                        src={`/storage/${vehicle.images.find(img => img.is_primary)?.path || vehicle.images[0].path}`} 
                                        alt={`${vehicle.brand} ${vehicle.model}`}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 bg-gray-100 font-medium">
                                        <svg className="w-16 h-16 mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                        Pas d'image disponible
                                    </div>
                                )}
                            </div>
                            
                            {/* Thumbnails */}
                            {vehicle.images && vehicle.images.length > 1 && (
                                <div className="grid grid-cols-5 gap-3">
                                    {vehicle.images.map((img) => (
                                        <div key={img.id} className="h-20 bg-gray-100 rounded-lg overflow-hidden border border-gray-200 cursor-pointer hover:border-phare transition">
                                            <img src={`/storage/${img.path}`} alt="thumbnail" className="w-full h-full object-cover" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Details & CTAs */}
                        <div>
                            <div className="mb-10">
                                <h1 className="text-4xl font-display font-bold text-asphalt mb-2">
                                    {vehicle.brand} {vehicle.model}
                                </h1>
                                <p className="text-gray-500 font-data uppercase tracking-wider text-sm mb-6 border-b border-gray-200 pb-5">
                                    {vehicle.condition} &middot; Ajouté récemment
                                </p>
                                
                                <div className="text-4xl font-bold text-asphalt mb-3">
                                    {vehicle.price ? (
                                        new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'DZD', maximumFractionDigits: 0 }).format(vehicle.price)
                                    ) : (
                                        <span className="text-2xl text-gray-500 font-normal italic">Contactez-nous pour le prix</span>
                                    )}
                                </div>
                                {vehicle.negotiable && (
                                    <span className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded font-bold uppercase tracking-wide">Prix négociable</span>
                                )}
                            </div>

                            {/* CTAs */}
                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                {dealership?.whatsapp && (
                                    <a 
                                        href={whatsappUrl} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="flex-1 bg-phare hover:bg-yellow-500 text-asphalt font-bold text-lg py-4 px-6 rounded-xl text-center transition-all duration-200 shadow-sm flex justify-center items-center group"
                                    >
                                        <svg className="w-6 h-6 mr-2 transform group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.125-.345-.156-.816-.36-1.524-.766-1.59-1.332-2.73-3.197-2.825-3.328-.095-.132-.676-.902-.676-1.72 0-.817.427-1.22.577-1.378.148-.158.324-.197.433-.197.108 0 .216 0 .304.004.095.004.225-.037.351.268.132.321.455 1.112.497 1.196.042.084.071.182.02.287-.049.102-.075.165-.148.246-.073.083-.153.171-.215.226-.073.064-.149.131-.067.273.082.14 3.619.646.611 1.042.247.382.527.76.713.843.186.082.3.066.417-.067.118-.135.508-.592.645-.794.137-.202.271-.168.441-.104.17.064 1.077.508 1.261.6.184.092.308.14.353.218.046.078.046.452-.098.857z" />
                                        </svg>
                                        WhatsApp
                                    </a>
                                )}
                                {dealership?.phone && (
                                    <a 
                                        href={`tel:${dealership.phone}`} 
                                        className="flex-1 bg-asphalt hover:bg-acier text-white border border-acier font-bold text-lg py-4 px-6 rounded-xl text-center transition-all duration-200 shadow-sm flex justify-center items-center group"
                                    >
                                        <svg className="w-5 h-5 mr-2 transform group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                        Appeler
                                    </a>
                                )}
                            </div>

                            {/* Specs Grid */}
                            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                                <h3 className="font-display font-bold text-xl mb-6 text-asphalt flex items-center">
                                    <svg className="w-6 h-6 mr-2 text-phare" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Caractéristiques
                                </h3>
                                <div className="grid grid-cols-2 gap-y-5 gap-x-8 text-sm">
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Année</span>
                                        <span className="font-bold text-gray-900">{vehicle.year}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Kilométrage</span>
                                        <span className="font-bold text-gray-900">{new Intl.NumberFormat('fr-FR').format(vehicle.mileage)} km</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Carburant</span>
                                        <span className="font-bold text-gray-900 capitalize">{vehicle.fuel_type}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Boîte</span>
                                        <span className="font-bold text-gray-900 capitalize">{vehicle.transmission}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Carrosserie</span>
                                        <span className="font-bold text-gray-900 capitalize">{vehicle.body_type}</span>
                                    </div>
                                    <div className="flex justify-between border-b border-gray-100 pb-2">
                                        <span className="text-gray-500">Moteur</span>
                                        <span className="font-bold text-gray-900">{vehicle.engine_power || '-'}</span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-100">
                                        <span className="text-gray-500">Couleur ext.</span>
                                        <span className="font-bold text-gray-900 capitalize">{vehicle.exterior_color || '-'}</span>
                                    </div>
                                    <div className="flex justify-between pb-2 border-b border-gray-100">
                                        <span className="text-gray-500">Couleur int.</span>
                                        <span className="font-bold text-gray-900 capitalize">{vehicle.interior_color || '-'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Description */}
                            {vehicle.description && (
                                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                                    <h3 className="font-display font-bold text-xl mb-4 text-asphalt flex items-center">
                                        <svg className="w-6 h-6 mr-2 text-phare" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                                        Description du vendeur
                                    </h3>
                                    <div className="text-gray-700 whitespace-pre-wrap leading-relaxed text-sm">
                                        {vehicle.description}
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
