import { useState } from 'react';
import { router } from '@inertiajs/react';

export default function FilterSidebar({ initialFilters, onClose }) {
    // Initialize form state with current URL parameters
    const [values, setValues] = useState({
        brand: initialFilters?.brand || '',
        min_price: initialFilters?.min_price || '',
        max_price: initialFilters?.max_price || '',
        year: initialFilters?.year || '',
        fuel_type: initialFilters?.fuel_type || '',
        transmission: initialFilters?.transmission || '',
    });

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleApplyFilters = (e) => {
        e.preventDefault();

        // Remove empty values to keep the URL clean
        const cleanValues = Object.fromEntries(
            Object.entries(values).filter(([_, v]) => v !== '')
        );

        // Keep current sorting if it exists, apply new filters
        router.get('/vehicules', { ...cleanValues, sort: initialFilters?.sort }, {
            preserveState: true,
            preserveScroll: true,
            onSuccess: () => {
                if (onClose) onClose(); // Close mobile sidebar on success
            }
        });
    };

    const handleReset = () => {
        setValues({
            brand: '', min_price: '', max_price: '', year: '', fuel_type: '', transmission: ''
        });
        router.get('/vehicules', { sort: initialFilters?.sort }, { preserveScroll: true });
        if (onClose) onClose();
    };

    return (
        <form onSubmit={handleApplyFilters} className="flex flex-col gap-6">

            {/* Brand Filter */}
            <div className="flex flex-col gap-2">
                <label className="font-body font-bold text-asphalt">Marque</label>
                <input
                    type="text"
                    name="brand"
                    value={values.brand}
                    onChange={handleChange}
                    placeholder="Ex: Renault, Peugeot..."
                    className="w-full border border-acier rounded-md p-2 font-body text-asphalt focus:ring-2 focus:ring-phare focus:border-phare outline-none"
                />
            </div>

            {/* Price Range */}
            <div className="flex flex-col gap-2">
                <label className="font-body font-bold text-asphalt">Prix (DA)</label>
                <div className="flex items-center gap-2">
                    <input
                        type="number"
                        name="min_price"
                        value={values.min_price}
                        onChange={handleChange}
                        placeholder="Min"
                        className="w-full border border-acier rounded-md p-2 font-data text-sm outline-none focus:ring-2 focus:ring-phare"
                    />
                    <span className="text-acier font-bold">-</span>
                    <input
                        type="number"
                        name="max_price"
                        value={values.max_price}
                        onChange={handleChange}
                        placeholder="Max"
                        className="w-full border border-acier rounded-md p-2 font-data text-sm outline-none focus:ring-2 focus:ring-phare"
                    />
                </div>
            </div>

            {/* Year */}
            <div className="flex flex-col gap-2">
                <label className="font-body font-bold text-asphalt">Année minimum</label>
                <input
                    type="number"
                    name="year"
                    value={values.year}
                    onChange={handleChange}
                    placeholder="Ex: 2018"
                    className="w-full border border-acier rounded-md p-2 font-data text-sm outline-none focus:ring-2 focus:ring-phare"
                />
            </div>

            {/* Fuel Type */}
            <div className="flex flex-col gap-2">
                <label className="font-body font-bold text-asphalt">Carburant</label>
                <select
                    name="fuel_type"
                    value={values.fuel_type}
                    onChange={handleChange}
                    className="w-full border border-acier rounded-md p-2 font-body text-asphalt outline-none focus:ring-2 focus:ring-phare bg-white"
                >
                    <option value="">Tous les carburants</option>
                    <option value="Essence">Essence</option>
                    <option value="Diesel">Diesel</option>
                    <option value="GPL">GPL</option>
                    <option value="Hybride">Hybride</option>
                </select>
            </div>

            {/* Transmission */}
            <div className="flex flex-col gap-2">
                <label className="font-body font-bold text-asphalt">Boîte de vitesse</label>
                <select
                    name="transmission"
                    value={values.transmission}
                    onChange={handleChange}
                    className="w-full border border-acier rounded-md p-2 font-body text-asphalt outline-none focus:ring-2 focus:ring-phare bg-white"
                >
                    <option value="">Toutes</option>
                    <option value="Manuelle">Manuelle</option>
                    <option value="Automatique">Automatique</option>
                </select>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3 mt-4">
                <button
                    type="submit"
                    className="w-full bg-phare text-white font-body font-bold py-3 rounded-md transition-opacity hover:opacity-90"
                >
                    Appliquer les filtres
                </button>
                <button
                    type="button"
                    onClick={handleReset}
                    className="w-full bg-transparent border border-acier text-asphalt font-body font-bold py-3 rounded-md transition-colors hover:bg-beton"
                >
                    Réinitialiser
                </button>
            </div>
        </form>
    );
}