// One entry per possible `vehicle.status` value coming from the database.
// Shared between VehicleCard and VehicleDetails so the label/color mapping
// only lives in one place.
export const VEHICLE_STATUS = {
    available: { label: 'Disponible', dot: 'bg-disponible' },
    disponible: { label: 'Disponible', dot: 'bg-disponible' },
    reserved: { label: 'Réservé', dot: 'bg-reserve' },
    reserve: { label: 'Réservé', dot: 'bg-reserve' },
    sold: { label: 'Vendu', dot: 'bg-vendu' },
    vendu: { label: 'Vendu', dot: 'bg-vendu' },
};

export function getVehicleStatus(status) {
    const raw = typeof status === 'object' ? status?.value : status;
    return VEHICLE_STATUS[raw] ?? VEHICLE_STATUS.available;
}