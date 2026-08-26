import { Link } from '@inertiajs/react';

export default function Pagination({ links }) {
    if (!links || links.length <= 3) return null; // Don't show pagination if there's only 1 page

    return (
        <div className="flex flex-wrap justify-center items-center gap-2 mt-12 font-data">
            {links.map((link, index) => {
                const isActive = link.active;
                const isNull = link.url === null;

                if (isNull) {
                    return (
                        <span
                            key={index}
                            className="px-4 py-2 border border-acier text-acier opacity-50 bg-white rounded-md text-sm"
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    );
                }

                return (
                    <Link
                        key={index}
                        href={link.url}
                        preserveScroll
                        className={`px-4 py-2 border rounded-md text-sm transition-colors duration-200 ${isActive
                                ? 'bg-phare border-phare text-white font-bold'
                                : 'bg-white border-acier text-asphalt hover:bg-beton'
                            }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </div>
    );
}