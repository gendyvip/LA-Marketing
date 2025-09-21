// Utility functions for Google Maps integration

// Default coordinates for LA Marketing office locations
// These are approximate coordinates - you may need to adjust based on the actual location
export const OFFICE_LOCATIONS = {
    EGYPT: {
        lat: 30.067277897892097,
        lng: 31.20153468541106,
        address: '22 El Hady الهادى, Madinet Al Eelam, Agouza, Giza Governorate 3755110',
        title: 'LA Marketing - Egypt Office'
    },
    UAE: {
        lat: 25.2048,
        lng: 55.2708,
        address: 'Dira - Dubai, UAE',
        title: 'LA Marketing - UAE Office'
    }
};

// Function to get coordinates from Google Maps short URL
// Note: This is a simplified approach. In production, you might want to use
// a service to resolve the short URL to get exact coordinates
export const getCoordinatesFromShortUrl = (shortUrl) => {
    // For now, we'll use the Egypt office coordinates as default
    // You can manually update these coordinates based on the actual location
    return OFFICE_LOCATIONS.EGYPT;
};

// Function to create a Google Maps embed URL
export const createEmbedUrl = (coordinates, zoom = 15) => {
    const { lat, lng } = coordinates;
    return `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${lat},${lng}&zoom=${zoom}`;
};

// Function to create a Google Maps directions URL
export const createDirectionsUrl = (coordinates) => {
    const { lat, lng } = coordinates;
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
};
