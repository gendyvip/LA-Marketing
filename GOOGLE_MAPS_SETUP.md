# Google Maps Setup Instructions

This project now includes Google Maps integration in the Contact page. Follow these steps to set up the Google Maps API:

## 1. Get a Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - **Maps JavaScript API** (required)
   - **Places API** (optional, for enhanced functionality)
4. Go to "Credentials" and create an API Key
5. (Recommended) Restrict the API key to your domain for security

## 2. Configure the API Key

### Option A: Environment Variable (Recommended)
Create a `.env` file in the project root and add:
```
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

### Option B: Direct Configuration
Edit `src/config/mapConfig.js` and replace `'your_google_maps_api_key_here'` with your actual API key.

## 3. Location Configuration

The map is currently configured to show the Egypt office location. To change the location:

1. Edit `src/utils/mapUtils.js`
2. Update the `OFFICE_LOCATIONS` object with your desired coordinates
3. The coordinates are in the format: `{ lat: latitude, lng: longitude }`

## 4. Testing

1. Start the development server: `npm run dev`
2. Navigate to the Contact page
3. The map should load with your specified location

## Troubleshooting

- **Map not loading**: Check that your API key is correct and the Maps JavaScript API is enabled
- **"For development purposes only" watermark**: This appears when using an unrestricted API key. Add domain restrictions in the Google Cloud Console
- **Console errors**: Check the browser console for specific error messages

## Security Notes

- Never commit your actual API key to version control
- Use environment variables for production deployments
- Restrict your API key to specific domains/IPs in production
- Monitor your API usage in the Google Cloud Console

## Current Location

The map is currently set to show the Egypt office location (Cairo, Egypt). You can update this in `src/utils/mapUtils.js` if needed.
