// Google Maps Configuration
// To use Google Maps, you need to:
// 1. Get a Google Maps API key from: https://console.cloud.google.com/google/maps-apis
// 2. Enable the following APIs:
//    - Maps JavaScript API
//    - Places API (optional, for enhanced functionality)
// 3. Set the API key as an environment variable: VITE_GOOGLE_MAPS_API_KEY
// 4. Or replace the value below with your actual API key

export const GOOGLE_MAPS_CONFIG = {
    // You can set your API key here directly, or use environment variable
    API_KEY: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'your_google_maps_api_key_here',

    // Default map settings
    DEFAULT_ZOOM: 15,
    DEFAULT_CENTER: {
        lat: 30.0444,
        lng: 31.2357
    }
};

// Instructions for setting up Google Maps API:
// 1. Go to https://console.cloud.google.com/
// 2. Create a new project or select an existing one
// 3. Enable the Maps JavaScript API
// 4. Create credentials (API Key)
// 5. Restrict the API key to your domain for security
// 6. Set the API key in your environment variables or replace the value above
