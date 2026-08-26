import { Head, Link } from '@inertiajs/react';
import PublicLayout from '../../../Layouts/PublicLayout';
import PageHeader from '../../../Components/Public/PageHeader';
import VehicleCard from '../../../Components/VehicleCard';

export default function Vehicles({ vehicles, filters = {}, makes = [] }) {
    // `vehicles` may arrive as a plain array, or as a Laravel paginator object
    // ({ data, links, meta }) if the backend uses ->paginate(). Support both
    // instead of assuming one shape.
    const items = Array.isArray(vehicles) ? vehicles : vehicles?.data ?? [];
    const paginationLinks = Array.isArray(vehicles) ? null : vehicles?.links ?? null;
    const total = vehicles?.meta?.total ?? items.length;

    return (
        <PublicLayout>
            <Head title="Inventaire" />

            <PageHeader
                eyebrow="Inventaire"
                title="Tous nos véhicules"
                subtitle="Parcourez le stock disponible et filtrez par marque ou budget."
            />

            <section className="w-full bg-beton py-xl lg:py-24">
                <div className="max-w-7xl mx-auto px-margin-mobile lg:px-lg flex flex-col gap-8">

                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                        {total} véhicule{total > 1 ? 's' : ''} trouvé{total > 1 ? 's' : ''}
                    </p>

                    {items.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {items.map((vehicle) => (
                                <VehicleCard key={vehicle.id} vehicle={vehicle} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center gap-3 text-center py-16 border border-outline-variant/60 rounded-lg">
                            <span className="material-symbols-outlined text-on-surface-variant text-3xl">
                                search_off
                            </span>
                            <p className="font-body-md text-body-md text-on-surface-variant">
                                Aucun véhicule ne correspond à votre recherche.
                            </p>
                            <Link
                                href="/vehicules"
                                className="font-body-sm text-body-sm font-semibold text-phare hover:underline"
                            >
                                Réinitialiser les filtres
                            </Link>
                        </div>
                    )}

                    {/* Laravel's default paginator sends 3+ link entries (Previous, page
              numbers, Next) even with a single page, so only render when
              there's something meaningful to paginate through. */}
                    {paginationLinks && paginationLinks.length > 3 && (
                        <nav aria-label="Pagination" className="flex flex-wrap items-center justify-center gap-2 pt-4">
                            {paginationLinks.map((link, index) =>
                                link.url ? (
                                    <Link
                                        key={index}
                                        href={link.url}
                                        preserveScroll
                                        aria-current={link.active ? 'page' : undefined}
                                        className={`px-3 py-2 rounded-lg border font-spec-value text-spec-value ${link.active
                                            ? 'bg-phare border-phare text-asphalt'
                                            : 'border-outline-variant text-on-surface hover:bg-surface-container-highest'
                                            }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                ) : (
                                    <span
                                        key={index}
                                        className="px-3 py-2 font-spec-value text-spec-value text-on-surface-variant/50"
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                )
                            )}
                        </nav>
                    )}
                </div>
            </section>
        </PublicLayout>
    );
}