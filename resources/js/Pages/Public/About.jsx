import React from 'react';
import { Head, usePage } from '@inertiajs/react';
import PublicLayout from '@/Layouts/PublicLayout';

export default function About() {
    const { dealership } = usePage().props;

    return (
        <PublicLayout>
            <Head title={`À Propos | ${dealership?.name || 'Showroom'}`} />

            <div className="bg-asphalt py-16 border-b-4 border-phare">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-4xl font-display font-bold mb-4">À Propos de Nous</h1>
                    <p className="text-xl text-gray-300">Découvrez qui nous sommes et comment nous contacter.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    
                    {/* Infos */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        <h2 className="text-2xl font-display font-bold text-asphalt mb-6">Nos Coordonnées</h2>
                        
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-bold text-lg text-acier mb-2 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                    Adresse
                                </h3>
                                <p className="text-gray-700">{dealership?.address || 'Non spécifié'}</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg text-acier mb-2 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                    Horaires d'ouverture
                                </h3>
                                <p className="text-gray-700 whitespace-pre-wrap">{dealership?.hours || 'Non spécifié'}</p>
                            </div>

                            <div>
                                <h3 className="font-bold text-lg text-acier mb-2 flex items-center">
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                    Contact
                                </h3>
                                {dealership?.phone && <p className="text-gray-700">Tél: <a href={`tel:${dealership.phone}`} className="text-phare hover:underline font-medium">{dealership.phone}</a></p>}
                                {dealership?.email && <p className="text-gray-700 mt-1">Email: <a href={`mailto:${dealership.email}`} className="text-phare hover:underline font-medium">{dealership.email}</a></p>}
                                {dealership?.whatsapp && (
                                    <p className="text-gray-700 mt-3">
                                        <a 
                                            href={`https://wa.me/${dealership.whatsapp.replace(/[^0-9]/g, '')}`} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="inline-flex items-center text-green-600 font-bold hover:underline"
                                        >
                                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.125-.345-.156-.816-.36-1.524-.766-1.59-1.332-2.73-3.197-2.825-3.328-.095-.132-.676-.902-.676-1.72 0-.817.427-1.22.577-1.378.148-.158.324-.197.433-.197.108 0 .216 0 .304.004.095.004.225-.037.351.268.132.321.455 1.112.497 1.196.042.084.071.182.02.287-.049.102-.075.165-.148.246-.073.083-.153.171-.215.226-.073.064-.149.131-.067.273.082.14 3.619.646.611 1.042.247.382.527.76.713.843.186.082.3.066.417-.067.118-.135.508-.592.645-.794.137-.202.271-.168.441-.104.17.064 1.077.508 1.261.6.184.092.308.14.353.218.046.078.046.452-.098.857z" />
                                            </svg>
                                            Discuter sur WhatsApp
                                        </a>
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="bg-gray-200 rounded-xl overflow-hidden shadow-sm h-[400px] md:h-auto border border-gray-100 flex items-center justify-center">
                        <div className="text-gray-500 text-center p-6">
                            <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                            <p className="font-display font-medium text-lg">Carte non configurée</p>
                            <p className="font-body text-sm mt-2">L'intégration Google Maps peut être ajoutée ici ultérieurement.</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </PublicLayout>
    );
}
