// One entry per possible `vehicle.status` value coming from the database.
// Shared between VehicleCard and VehicleDetails so the label/color mapping
// only lives in one place.
export const VEHICLE_STATUS = {
    disponible: { label: 'Disponible', dot: 'bg-disponible' },
    reserve: { label: 'Réservé', dot: 'bg-reserve' },
    vendu: { label: 'Vendu', dot: 'bg-vendu' },
};

export function getVehicleStatus(status) {
    return VEHICLE_STATUS[status] ?? VEHICLE_STATUS.disponible;
}