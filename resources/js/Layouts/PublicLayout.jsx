import React, { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';

export default function PublicLayout({ children }) {
    const { dealership } = usePage().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col font-body bg-beton text-asphalt">
            <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                    <div className="flex-shrink-0">
                        <Link href="/" className="font-display font-bold text-xl flex items-center">
                            {dealership?.logo_path ? (
                                <img src={`/storage/${dealership.logo_path}`} alt={dealership.name} className="h-10 w-auto" />
                            ) : (
                                <span>{dealership?.name || 'Dealership'}</span>
                            )}
                        </Link>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/" className="text-acier hover:text-asphalt font-medium">Accueil</Link>
                        <Link href="/vehicules" className="text-acier hover:text-asphalt font-medium">Véhicules</Link>
                        <Link href="/a-propos" className="text-acier hover:text-asphalt font-medium">À Propos</Link>
                        {dealership?.phone && (
                            <a href={`tel:${dealership.phone}`} className="bg-asphalt text-white px-4 py-2 rounded font-medium hover:bg-acier transition shadow-sm">
                                Appeler: {dealership.phone}
                            </a>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-asphalt p-2">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </nav>
                
                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-white border-t border-gray-100 shadow-md">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            <Link href="/" className="block px-3 py-2 text-asphalt font-medium" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
                            <Link href="/vehicules" className="block px-3 py-2 text-asphalt font-medium" onClick={() => setIsMenuOpen(false)}>Véhicules</Link>
                            <Link href="/a-propos" className="block px-3 py-2 text-asphalt font-medium" onClick={() => setIsMenuOpen(false)}>À Propos</Link>
                            {dealership?.phone && (
                                <a href={`tel:${dealership.phone}`} className="block px-3 py-2 text-phare font-medium">
                                    Appeler: {dealership.phone}
                                </a>
                            )}
                        </div>
                    </div>
                )}
            </header>

            <main className="flex-grow">
                {children}
            </main>

            <footer className="bg-asphalt text-white mt-12 py-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <span className="font-display font-bold text-xl">{dealership?.name || 'Dealership'}</span>
                        {dealership?.address && <p className="text-gray-400 mt-3 text-sm leading-relaxed">{dealership.address}</p>}
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-3">Contact</h4>
                        {dealership?.phone && <p className="text-gray-400 text-sm">Tél: {dealership.phone}</p>}
                        {dealership?.email && <p className="text-gray-400 text-sm">Email: {dealership.email}</p>}
                    </div>
                    <div>
                        <h4 className="font-bold text-lg mb-3">Réseaux Sociaux</h4>
                        <div className="flex space-x-4">
                            {dealership?.facebook_url && <a href={dealership.facebook_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">Facebook</a>}
                            {dealership?.instagram_url && <a href={dealership.instagram_url} target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition">Instagram</a>}
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} {dealership?.name}. Tous droits réservés.
                </div>
            </footer>
        </div>
    );
}
