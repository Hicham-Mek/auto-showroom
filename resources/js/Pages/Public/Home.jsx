import { Head } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';
import HeroSection from '../../Components/Public/Herosection';
import FeaturedVehicles from '../../Components/Public/Featuredvehicles';
import StatsStrip from '../../Components/Public/Statsstrip';
import WhyChooseUs from '../../Components/Public/Whychooseus';

export default function Home({ dealership, vehicles = [], featuredVehicles, stats = [], filters = {}, makes = [] }) {
    // The backend may send a dedicated `featuredVehicles` list, or just
    // `vehicles`. Support either without guessing at a shape that isn't there.
    const vehiclesToShow = featuredVehicles ?? vehicles ?? [];

    return (
        <PublicLayout>
            <Head title="Accueil" />

            <HeroSection dealership={dealership} makes={makes} filters={filters} />
            <FeaturedVehicles vehicles={vehiclesToShow} />
            <StatsStrip stats={stats} />
            <WhyChooseUs />
        </PublicLayout>
    );
}