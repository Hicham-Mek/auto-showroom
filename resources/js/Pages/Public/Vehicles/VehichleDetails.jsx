import { useState, useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';

export default function VehicleDetails({ vehicle, dealership }) {
    const [activeImage, setActiveImage] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [lightboxIndex, setLightboxIndex] = useState(0);

    if (!vehicle) {
        return (
            <PublicLayout>
                <Head title="Véhicule introuvable" />
                <div className="max-w-3xl mx-auto px-4 py-24 text-center">
                    <h1 className="font-headline-xl text-headline-xl text-on-surface mb-4">Véhicule introuvable</h1>
                    <Link
                        href="/vehicules"
                        className="inline-block px-6 py-3 bg-primary text-on-primary font-body-md font-bold rounded hover:bg-primary/90 transition-colors"
                    >
                        Retour à l'inventaire
                    </Link>
                </div>
            </PublicLayout>
        );
    }

    // Safely extract images
    const images = vehicle?.images?.length > 0
        ? vehicle.images.map(img => img.path.startsWith('http') || img.path.startsWith('/') ? img.path : `/storage/${img.path}`)
        : vehicle?.image ? [vehicle.image.startsWith('http') || vehicle.image.startsWith('/') ? vehicle.image : `/storage/${vehicle.image}`]
        : ['/placeholder-car.jpg'];

    const totalSlides = images.length;

    const openLightbox = (index) => {
        setLightboxIndex(index);
        setLightboxOpen(true);
    };

    const nextLightbox = () => {
        setLightboxIndex((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
    };

    const prevLightbox = () => {
        setLightboxIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
    };

    // Keyboard navigation for lightbox
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!lightboxOpen) return;
            if (e.key === 'Escape') setLightboxOpen(false);
            if (e.key === 'ArrowRight') nextLightbox();
            if (e.key === 'ArrowLeft') prevLightbox();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [lightboxOpen, totalSlides]);

    const formatPrice = (price) => {
        if (!price) return 'Contactez-nous';
        return new Intl.NumberFormat('fr-DZ').format(price) + ' DZD';
    };

    const getStatusLabel = (status) => {
        switch (status?.toLowerCase()) {
            case 'available': return 'En Stock';
            case 'reserved': return 'Réservé';
            case 'sold': return 'Vendu';
            default: return status || 'En Stock';
        }
    };

    const rawWhatsapp = dealership?.whatsapp ? dealership.whatsapp.replace(/[^0-9]/g, '') : '';
    const whatsappBase = rawWhatsapp.startsWith('0') && rawWhatsapp.length === 10 ? `213${rawWhatsapp.slice(1)}` : rawWhatsapp;
    const whatsappMessage = encodeURIComponent(`Bonjour, je suis intéressé(e) par le véhicule "${vehicle.brand} ${vehicle.model}" à ${formatPrice(vehicle.price)}.`);
    const whatsappLink = `https://wa.me/${whatsappBase}?text=${whatsappMessage}`;
    const phoneLink = dealership?.phone ? `tel:${dealership.phone.replace(/[^0-9+]/g, '')}` : '#';

    return (
        <PublicLayout>
            <Head>
                <title>{`${vehicle.brand} ${vehicle.model} - ${dealership?.name || 'Showroom'}`}</title>
                <meta name="description" content={`Découvrez cette magnifique ${vehicle.brand} ${vehicle.model} à ${formatPrice(vehicle.price)}. Véhicule d'occasion disponible chez ${dealership?.name || 'Showroom'}.`} />
            </Head>

            <main className="w-full pb-32">
                {/* 1. TOP PREMIUM SPOTLIGHT HERO (Full-Bleed Cover Image) */}
                <section
                    className="relative w-full h-[70vh] min-h-[400px] md:h-[80vh] bg-on-background group overflow-hidden cursor-pointer"
                    style={{ backgroundColor: 'rgb(20, 23, 26)' }}
                    onClick={() => openLightbox(activeImage)}
                >
                    <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-700 hover:scale-105"
                        style={{ backgroundImage: `url('${images[activeImage]}')` }}
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

                    {/* Status Badge (Top-Left) */}
                    <div className="absolute top-md left-margin-mobile md:left-lg bg-surface-container-lowest px-sm py-xs rounded flex items-center shadow-md z-20">
                        <span className="font-spec-label text-spec-label text-on-surface uppercase tracking-widest font-bold">
                            {getStatusLabel(vehicle.status)}
                        </span>
                    </div>

                    {/* Fullscreen / Photo Count Action (Top-Right) */}
                    <div className="absolute top-4 right-4 md:top-6 md:right-8 z-20 flex items-center gap-2">
                        {totalSlides > 1 && (
                            <span className="bg-black/60 backdrop-blur-md text-white text-xs font-mono px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-1.5 shadow">
                                <span className="material-symbols-outlined text-[16px] text-primary">photo_camera</span>
                                {activeImage + 1} / {totalSlides}
                            </span>
                        )}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                openLightbox(activeImage);
                            }}
                            className="bg-black/60 hover:bg-black/80 backdrop-blur-md text-white p-2 rounded-lg border border-white/10 transition-all flex items-center justify-center shadow"
                            title="Plein écran"
                            aria-label="Agrandir la photo"
                        >
                            <span className="material-symbols-outlined text-[20px]">fullscreen</span>
                        </button>
                    </div>
                </section>

                {/* 2. Floating Title & Price Card */}
                <section className="w-full px-margin-mobile lg:px-lg max-w-7xl mx-auto -mt-8 relative z-20">
                    <div className="bg-surface-container-lowest rounded-2xl shadow-2xl p-md md:p-xl flex flex-col md:flex-row justify-between items-start gap-lg border border-outline-variant/30">
                        <div className="flex flex-col gap-sm">
                            <h1 className="font-headline-xl text-headline-xl md:text-3xl text-on-surface font-extrabold tracking-tight">
                                {vehicle.brand} {vehicle.model} {vehicle.year}
                            </h1>
                            <div className="flex items-center gap-sm flex-wrap">
                                <span className="font-spec-value text-[28px] md:text-[38px] font-extrabold text-on-surface tracking-tighter text-phare">
                                    {formatPrice(vehicle.price)}
                                </span>
                                {vehicle.negotiable && (
                                    <span className="bg-primary/15 text-primary border border-primary/30 font-spec-label text-xs px-2.5 py-1 rounded-md font-semibold uppercase tracking-wider">
                                        Négociable
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex gap-sm w-full md:w-auto">
                            {dealership?.whatsapp && (
                                <a
                                    href={whatsappLink}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-[#f2a93b] text-[#14171a] px-8 py-3.5 rounded-xl shadow-md hover:bg-[#e0982c] transition-all font-headline-md font-bold text-[16px] h-12"
                                >
                                    <span className="material-symbols-outlined text-[20px]">chat</span> WhatsApp
                                </a>
                            )}
                            {dealership?.phone && (
                                <a
                                    href={phoneLink}
                                    className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-transparent border-2 border-[#14171a] text-[#14171a] px-8 py-3.5 rounded-xl hover:bg-[#14171a] hover:text-white transition-all font-body-md font-semibold text-[15px] h-12"
                                >
                                    <span className="material-symbols-outlined text-[20px]">call</span> Appeler
                                </a>
                            )}
                        </div>
                    </div>
                </section>

                {/* 3. Key Specs Strip */}
                <section className="w-full px-margin-mobile lg:px-lg max-w-7xl mx-auto mt-8">
                    <div
                        className="p-md md:p-lg rounded-2xl flex flex-wrap gap-y-md md:gap-y-0 justify-between items-center relative shadow-lg"
                        style={{ backgroundColor: 'rgb(20, 23, 26)', border: '1px solid rgb(214, 195, 175, 0.2)', color: 'rgb(255, 255, 255)' }}
                    >
                        <div className="flex flex-col gap-xs w-1/2 md:w-auto md:border-r md:border-white/15 md:pr-8">
                            <span className="font-spec-label text-xs text-on-surface-variant uppercase tracking-wider text-white/60">Année</span>
                            <span className="font-spec-value text-lg font-bold text-white">{vehicle.year}</span>
                        </div>
                        <div className="flex flex-col gap-xs w-1/2 md:w-auto md:border-r md:border-white/15 md:px-8">
                            <span className="font-spec-label text-xs text-on-surface-variant uppercase tracking-wider text-white/60">Kilométrage</span>
                            <span className="font-spec-value text-lg font-bold text-white">{vehicle.mileage != null ? `${new Intl.NumberFormat('fr-DZ').format(vehicle.mileage)} km` : '-'}</span>
                        </div>
                        <div className="flex flex-col gap-xs w-1/2 md:w-auto md:border-r md:border-white/15 md:px-8">
                            <span className="font-spec-label text-xs text-on-surface-variant uppercase tracking-wider text-white/60">Carburant</span>
                            <span className="font-spec-value text-lg font-bold text-white">{vehicle.fuel_type || '-'}</span>
                        </div>
                        <div className="flex flex-col gap-xs w-1/2 md:w-auto md:border-r md:border-white/15 md:px-8">
                            <span className="font-spec-label text-xs text-on-surface-variant uppercase tracking-wider text-white/60">Boîte</span>
                            <span className="font-spec-value text-lg font-bold text-white">{vehicle.transmission || '-'}</span>
                        </div>
                        <div className="flex flex-col gap-xs w-full md:w-auto md:pl-8 mt-sm md:mt-0 pt-sm md:pt-0 border-t border-white/15 md:border-t-0">
                            <span className="font-spec-label text-xs text-on-surface-variant uppercase tracking-wider text-white/60">État</span>
                            <span className="font-spec-value text-lg font-bold flex items-center gap-2 text-white">
                                <span className={`w-2.5 h-2.5 rounded-full ${vehicle.condition?.toLowerCase().includes('neuf') ? 'bg-[#4CAF50]' : 'bg-[#f2a93b]'}`}></span>
                                {vehicle.condition || '-'}
                            </span>
                        </div>
                    </div>
                </section>

                {/* 4. MAIN CONTENT GRID */}
                <div className="w-full px-margin-mobile lg:px-lg max-w-7xl mx-auto mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Left Column (8 cols) */}
                    <div className="lg:col-span-8 flex flex-col gap-10">

                        {/* BEAUTIFUL GALLERY CONTAINER */}
                        {images.length > 1 && (
                            <section className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="font-headline-lg text-xl md:text-2xl text-on-surface font-bold border-l-4 border-primary pl-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-primary">photo_library</span>
                                        Galerie Photos ({totalSlides})
                                    </h2>
                                    <span className="text-xs text-on-surface-variant uppercase tracking-wider">
                                        Cliquez pour voir en grand
                                    </span>
                                </div>

                                <div className="bg-surface-container-lowest p-4 md:p-6 rounded-2xl shadow-sm border border-outline-variant/30">
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
                                        {images.map((img, idx) => (
                                            <div
                                                key={idx}
                                                onClick={() => {
                                                    setActiveImage(idx);
                                                    openLightbox(idx);
                                                }}
                                                className={`group relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer bg-[#14171a] border-2 transition-all duration-300 shadow-sm hover:shadow-lg ${
                                                    activeImage === idx
                                                        ? 'border-primary ring-2 ring-primary/30 scale-[1.02]'
                                                        : 'border-transparent hover:border-primary/50'
                                                }`}
                                            >
                                                <img
                                                    src={img}
                                                    alt={`${vehicle.brand} ${vehicle.model} - Photo ${idx + 1}`}
                                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                    loading="lazy"
                                                />
                                                
                                                {/* Hover Overlay */}
                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                                    <span className="w-9 h-9 rounded-full bg-primary text-black flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                                                        <span className="material-symbols-outlined text-[20px]">zoom_in</span>
                                                    </span>
                                                </div>

                                                {/* Active Badge */}
                                                {activeImage === idx && (
                                                    <div className="absolute bottom-1.5 left-1.5 bg-primary text-black text-[10px] font-bold px-2 py-0.5 rounded shadow">
                                                        Active
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </section>
                        )}

                        {/* Description */}
                        {vehicle.description && (
                            <section className="flex flex-col gap-4">
                                <h2 className="font-headline-lg text-xl md:text-2xl text-on-surface font-bold border-l-4 border-primary pl-3">
                                    Description
                                </h2>
                                <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-sm border border-outline-variant/30">
                                    <p className="font-body-md text-on-surface-variant leading-relaxed whitespace-pre-wrap">
                                        {vehicle.description}
                                    </p>
                                </div>
                            </section>
                        )}

                        {/* Detailed Specs */}
                        <section className="flex flex-col gap-4">
                            <h2 className="font-headline-lg text-xl md:text-2xl text-on-surface font-bold border-l-4 border-primary pl-3">
                                Caractéristiques Détaillées
                            </h2>
                            <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-outline-variant/30 overflow-hidden">
                                <div className="grid grid-cols-1 md:grid-cols-2">
                                    {vehicle.engine_power && (
                                        <div className="flex justify-between items-center p-4 border-b border-r border-surface-variant">
                                            <span className="font-spec-label text-xs text-on-surface-variant uppercase font-semibold">PUISSANCE (CH)</span>
                                            <span className="font-spec-value text-sm font-bold text-on-surface">{vehicle.engine_power} ch</span>
                                        </div>
                                    )}
                                    {vehicle.exterior_color && (
                                        <div className="flex justify-between items-center p-4 border-b border-surface-variant">
                                            <span className="font-spec-label text-xs text-on-surface-variant uppercase font-semibold">COULEUR EXT</span>
                                            <span className="font-spec-value text-sm font-bold text-on-surface">{vehicle.exterior_color}</span>
                                        </div>
                                    )}
                                    {vehicle.interior_color && (
                                        <div className="flex justify-between items-center p-4 border-b border-r border-surface-variant">
                                            <span className="font-spec-label text-xs text-on-surface-variant uppercase font-semibold">INTÉRIEUR</span>
                                            <span className="font-spec-value text-sm font-bold text-on-surface">{vehicle.interior_color}</span>
                                        </div>
                                    )}
                                    {vehicle.body_type && (
                                        <div className="flex justify-between items-center p-4 border-b border-surface-variant">
                                            <span className="font-spec-label text-xs text-on-surface-variant uppercase font-semibold">CARROSSERIE</span>
                                            <span className="font-spec-value text-sm font-bold text-on-surface">{vehicle.body_type}</span>
                                        </div>
                                    )}
                                    {vehicle.doors && (
                                        <div className="flex justify-between items-center p-4 border-b border-r border-surface-variant">
                                            <span className="font-spec-label text-xs text-on-surface-variant uppercase font-semibold">PORTES</span>
                                            <span className="font-spec-value text-sm font-bold text-on-surface">{vehicle.doors} portes</span>
                                        </div>
                                    )}
                                    {vehicle.paint_condition && (
                                        <div className="flex justify-between items-center p-4 border-b border-surface-variant">
                                            <span className="font-spec-label text-xs text-on-surface-variant uppercase font-semibold">PEINTURE</span>
                                            <span className="font-spec-value text-sm font-bold text-on-surface">{vehicle.paint_condition}</span>
                                        </div>
                                    )}
                                    {vehicle.has_accident_history !== null && vehicle.has_accident_history !== undefined && (
                                        <div className="flex justify-between items-center p-4 border-b border-r border-surface-variant">
                                            <span className="font-spec-label text-xs text-on-surface-variant uppercase font-semibold">ACCIDENTÉ</span>
                                            <span className="font-spec-value text-sm font-bold text-on-surface">{vehicle.has_accident_history ? 'Oui' : 'Non'}</span>
                                        </div>
                                    )}
                                    {vehicle.previous_owners && (
                                        <div className="flex justify-between items-center p-4 border-b border-surface-variant">
                                            <span className="font-spec-label text-xs text-on-surface-variant uppercase font-semibold">PROPRIÉTAIRES PRÉCÉDENTS</span>
                                            <span className="font-spec-value text-sm font-bold text-on-surface">{vehicle.previous_owners}</span>
                                        </div>
                                    )}
                                    {vehicle.carte_grise && (
                                        <div className="flex justify-between items-center p-4 border-b border-r border-surface-variant">
                                            <span className="font-spec-label text-xs text-on-surface-variant uppercase font-semibold">CARTE GRISE</span>
                                            <span className="font-spec-value text-sm font-bold text-on-surface">{vehicle.carte_grise}</span>
                                        </div>
                                    )}
                                </div>
                                {vehicle.document_notes && (
                                    <div className="p-4 bg-surface-variant/30">
                                        <span className="font-spec-label text-xs text-on-surface-variant font-semibold block mb-1 uppercase">NOTES SUR LES DOCUMENTS</span>
                                        <p className="font-body-sm text-on-surface-variant">{vehicle.document_notes}</p>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Equipment & Options */}
                        {vehicle.features && vehicle.features.length > 0 && (
                            <section className="flex flex-col gap-4">
                                <h2 className="font-headline-lg text-xl md:text-2xl text-on-surface font-bold border-l-4 border-primary pl-3">
                                    Équipements & Options
                                </h2>
                                <div className="flex flex-wrap gap-2.5">
                                    {vehicle.features.map((feature, idx) => (
                                        <span
                                            key={idx}
                                            className="bg-surface-container-lowest border border-outline-variant/40 text-on-surface font-body-sm px-4 py-2 rounded-xl shadow-sm flex items-center gap-1.5"
                                        >
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                            {feature}
                                        </span>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Right Sidebar (4 cols) */}
                    <aside className="lg:col-span-4 flex flex-col gap-6">
                        <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-md border border-outline-variant/30 flex flex-col gap-5 sticky top-24">
                            <div className="flex items-center gap-3.5 pb-4 border-b border-surface-variant">
                                <div className="w-14 h-14 rounded-xl bg-surface-container flex items-center justify-center p-1.5 border border-outline-variant/30">
                                    {dealership?.logo_path ? (
                                        <img
                                            src={dealership.logo_path.startsWith('http') || dealership.logo_path.startsWith('/') ? dealership.logo_path : `/storage/${dealership.logo_path}`}
                                            alt={dealership?.name || 'Logo'}
                                            className="w-full h-full object-contain mix-blend-multiply"
                                        />
                                    ) : (
                                        <span className="material-symbols-outlined text-primary text-3xl">directions_car</span>
                                    )}
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-headline-md text-lg font-bold text-on-surface">{dealership?.name || 'Notre Showroom'}</span>
                                    <span className="font-body-sm text-xs text-on-surface-variant flex items-center gap-1 text-[#4CAF50]">
                                        <span className="material-symbols-outlined text-[16px]">verified</span> Concessionnaire Vérifié
                                    </span>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 text-on-surface-variant text-sm">
                                {dealership?.address && (
                                    <div className="flex items-start gap-2.5">
                                        <span className="material-symbols-outlined text-[20px] text-primary mt-0.5">location_on</span>
                                        <span className="font-body-md text-on-surface">{dealership.address}</span>
                                    </div>
                                )}
                                {dealership?.hours && (
                                    <div className="flex items-start gap-2.5">
                                        <span className="material-symbols-outlined text-[20px] text-primary mt-0.5">schedule</span>
                                        <span className="font-body-md text-on-surface whitespace-pre-line">{dealership.hours}</span>
                                    </div>
                                )}
                            </div>

                            <div className="pt-2 flex flex-col gap-3">
                                {dealership?.whatsapp && (
                                    <a
                                        href={whatsappLink}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="w-full flex items-center justify-center gap-2 bg-[#f2a93b] text-[#14171a] px-6 py-3.5 rounded-xl hover:bg-[#e0982c] transition-all font-headline-md font-bold text-[15px] h-12 shadow-sm"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">chat</span> Discuter sur WhatsApp
                                    </a>
                                )}
                                {dealership?.phone && (
                                    <a
                                        href={phoneLink}
                                        className="w-full flex items-center justify-center gap-2 bg-transparent border-2 border-[#14171a] text-[#14171a] px-6 py-3.5 rounded-xl hover:bg-[#14171a] hover:text-white transition-all font-body-md font-semibold text-[15px] h-12"
                                    >
                                        <span className="material-symbols-outlined text-[20px]">call</span> Appeler ({dealership.phone})
                                    </a>
                                )}
                            </div>
                        </div>
                    </aside>
                </div>

                {/* 5. Mobile Fixed Bottom Action Bar */}
                <div className="fixed bottom-0 left-0 w-full bg-surface/95 backdrop-blur-md border-t border-outline-variant p-3 flex gap-3 md:hidden z-40 shadow-[0_-4px_12px_rgba(0,0,0,0.15)]">
                    {dealership?.whatsapp && (
                        <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 flex items-center justify-center gap-2 bg-[#f2a93b] text-[#14171a] px-4 py-2.5 rounded-xl font-headline-md font-bold text-[15px] h-12 shadow"
                        >
                            <span className="material-symbols-outlined text-[20px]">chat</span> WhatsApp
                        </a>
                    )}
                    {dealership?.phone && (
                        <a
                            href={phoneLink}
                            className="flex-1 flex items-center justify-center gap-2 bg-[#14171a] text-white px-4 py-2.5 rounded-xl font-body-md font-semibold text-[15px] h-12 shadow"
                        >
                            <span className="material-symbols-outlined text-[20px]">call</span> Appeler
                        </a>
                    )}
                </div>

                {/* 6. FULLSCREEN LIGHTBOX MODAL */}
                {lightboxOpen && (
                    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-between p-4 md:p-8 select-none">
                        {/* Lightbox Header */}
                        <div className="w-full flex items-center justify-between text-white z-10">
                            <span className="font-headline-md text-sm md:text-base text-white/80">
                                {vehicle.brand} {vehicle.model} ({lightboxIndex + 1} / {totalSlides})
                            </span>
                            <button
                                onClick={() => setLightboxOpen(false)}
                                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
                                aria-label="Fermer"
                            >
                                <span className="material-symbols-outlined text-[24px]">close</span>
                            </button>
                        </div>

                        {/* Main Lightbox Image View */}
                        <div className="relative w-full flex-1 flex items-center justify-center my-4 overflow-hidden">
                            <img
                                src={images[lightboxIndex]}
                                alt={`${vehicle.brand} ${vehicle.model} - Zoom`}
                                className="max-w-full max-h-[78vh] object-contain drop-shadow-2xl transition-all duration-300"
                            />

                            {/* Navigation Arrows */}
                            {totalSlides > 1 && (
                                <>
                                    <button
                                        onClick={prevLightbox}
                                        className="absolute left-2 md:left-6 w-12 h-12 rounded-full bg-black/60 hover:bg-primary hover:text-black text-white border border-white/20 flex items-center justify-center transition-all shadow-xl"
                                        aria-label="Image précédente"
                                    >
                                        <span className="material-symbols-outlined text-[28px]">chevron_left</span>
                                    </button>
                                    <button
                                        onClick={nextLightbox}
                                        className="absolute right-2 md:right-6 w-12 h-12 rounded-full bg-black/60 hover:bg-primary hover:text-black text-white border border-white/20 flex items-center justify-center transition-all shadow-xl"
                                        aria-label="Image suivante"
                                    >
                                        <span className="material-symbols-outlined text-[28px]">chevron_right</span>
                                    </button>
                                </>
                            )}
                        </div>

                        {/* Lightbox Thumbnails Strip */}
                        {totalSlides > 1 && (
                            <div className="w-full max-w-4xl flex items-center justify-center gap-2 overflow-x-auto py-2">
                                {images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setLightboxIndex(idx)}
                                        className={`w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all ${
                                            lightboxIndex === idx
                                                ? 'border-primary ring-2 ring-primary/40 scale-105'
                                                : 'border-white/20 opacity-60 hover:opacity-100'
                                        }`}
                                    >
                                        <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
        </PublicLayout>
    );
}
