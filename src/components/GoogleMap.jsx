import React, { useEffect, useRef, useState, memo, useCallback } from 'react';
import styled from 'styled-components';
import { OFFICE_LOCATIONS } from '../utils/mapUtils';
import { GOOGLE_MAPS_CONFIG } from '../config/mapConfig';
import { Navigation, MapPin, Clock, Route } from 'lucide-react';

// Dynamic import for Google Maps Loader
let Loader;

const MapContainer = styled.div`
  height: 400px;
  width: 100%;
  border-radius: 0;
  border: 1px solid #212529;
  position: relative;
  overflow: hidden;
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: auto;
  }
`;

const MapWrapper = styled.div`
  height: 400px;
  width: 100%;
  position: relative;
  
  @media (max-width: 768px) {
    height: 300px;
  }
`;

const LoadingContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  color: #6c757d;
  font-size: 1.125rem;
`;

const ErrorContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8f9fa;
  color: #dc3545;
  font-size: 1.125rem;
  text-align: center;
  padding: 2rem;
`;

const DirectionsOverlay = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: #ffffff;
  border: 1px solid #212529;
  border-radius: 0;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 250px;
`;

const MapInfoPanel = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 0.75rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  backdrop-filter: blur(10px);
  min-width: 350px;
  max-width: 450px;
  
  @media (max-width: 768px) {
    left: 0.5rem;
    right: 0.5rem;
    bottom: 0.5rem;
    min-width: auto;
    max-width: none;
    padding: 0.5rem;
  }
  
  @media (max-width: 480px) {
    left: 0.25rem;
    right: 0.25rem;
    bottom: 0.25rem;
    padding: 0.5rem;
    border-radius: 6px;
  }
`;

const MapControls = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  z-index: 1000;
`;

const DirectionsButton = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: #212529;
  color: #ffffff;
  border: none;
  border-radius: 0;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  
  &:hover {
    background: #343a40;
    transform: translateY(-1px);
  }
`;

// Removed duplicate DistanceInfo and DistanceValue - using DistanceInfoContainer and DistanceValueLarge instead

const LocationInfo = styled.div`
  font-size: 0.75rem;
  color: #6c757d;
  text-align: center;
  margin-top: 0.5rem;
`;

const DirectionsService = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
`;

const ServiceButton = styled.a`
  flex: 1;
  padding: 0.5rem;
  background: #ffffff;
  color: #212529;
  border: 1px solid #212529;
  border-radius: 0;
  text-decoration: none;
  font-size: 0.75rem;
  font-weight: 500;
  text-align: center;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  
  &:hover {
    background: #212529;
    color: #ffffff;
  }
`;

const ControlButton = styled.button`
  padding: 0.75rem;
  background: #ffffff;
  color: #212529;
  border: 1px solid #212529;
  border-radius: 0;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-width: 120px;
  
  &:hover {
    background: #212529;
    color: #ffffff;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const DistanceDisplay = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const DistanceInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const DistanceValueLarge = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: #212529;
`;

const DistanceLabel = styled.span`
  font-size: 0.875rem;
  color: #6c757d;
`;

const LocationDisplay = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.75rem;
`;

const LocationName = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: #212529;
`;

const LocationAddress = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #6c757d;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  
  @media (max-width: 480px) {
    flex-direction: column;
    gap: 0.25rem;
  }
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 0.5rem 1rem;
  background: #212529;
  color: #ffffff;
  border: none;
  border-radius: 0;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  
  &:hover {
    background: #000000;
  }
  
  @media (max-width: 480px) {
    padding: 0.4rem 0.75rem;
    font-size: 0.7rem;
    border-radius: 4px;
  }
`;

const GoogleMap = memo(({ 
  center = OFFICE_LOCATIONS.EGYPT, // Default to Egypt office
  zoom = GOOGLE_MAPS_CONFIG.DEFAULT_ZOOM,
  apiKey = GOOGLE_MAPS_CONFIG.API_KEY,
  className
}) => {
  const mapRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [distance, setDistance] = useState(null);
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [showDirections, setShowDirections] = useState(false);
  const [travelTime, setTravelTime] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);
  const [userLocationMarker, setUserLocationMarker] = useState(null);

  // Function to get user's current location
  const getUserLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by this browser.');
      return;
    }

    setIsGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userPos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setUserLocation(userPos);
        calculateDistance(userPos, center);
        setIsGettingLocation(false);
      },
      (error) => {
        console.error('Error getting location:', error);
        alert('Unable to get your location. Please check your browser permissions.');
        setIsGettingLocation(false);
      }
    );
  };

  // Function to calculate distance between two points
  const calculateDistance = (point1, point2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c;
    setDistance(distance);
  };

  // Function to open directions in Google Maps
  const openDirections = () => {
    const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${center.lat},${center.lng}`;
    window.open(directionsUrl, '_blank');
  };

  // Function to open directions with user's current location
  const openDirectionsFromCurrentLocation = () => {
    if (userLocation) {
      const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${center.lat},${center.lng}`;
      window.open(directionsUrl, '_blank');
    } else {
      getUserLocation();
    }
  };

  // Function to get location and show directions on the map
  const showDirectionsOnMap = () => {
    if (!userLocation) {
      // Get user location first
      if (!navigator.geolocation) {
        alert('Geolocation is not supported by this browser.');
        return;
      }

      setIsGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          calculateDistance(userPos, center);
          setIsGettingLocation(false);
          
          // Show directions after getting location
          displayDirections(userPos);
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please check your browser permissions.');
          setIsGettingLocation(false);
        }
      );
    } else {
      displayDirections(userLocation);
    }
  };

  // Helper function to show directions
  const displayDirections = (userPos) => {
    if (!directionsService || !directionsRenderer) {
      alert('Directions service not available');
      return;
    }

    const request = {
      origin: userPos,
      destination: center,
      travelMode: 'DRIVING'
    };

    directionsService.route(request, async (result, status) => {
      if (status === 'OK') {
        directionsRenderer.setDirections(result);
        setShowDirections(true);
        
        // Add custom marker for user location
        await addUserLocationMarker(userPos);
        
        // Get travel time
        const route = result.routes[0];
        const leg = route.legs[0];
        setTravelTime(leg.duration.text);
      } else {
        alert('Directions request failed: ' + status);
      }
    });
  };

  // Function to add a circle marker at user's location
  const addUserLocationMarker = async (userPos) => {
    if (!mapInstance) return;

    // Remove existing user location marker if any
    if (userLocationMarker) {
      userLocationMarker.setMap(null);
    }

    try {
      // Import Circle from Google Maps API
      const { Circle } = await Loader.importLibrary('maps');
      
      // Create a circle marker for user location
      const circle = new Circle({
        strokeColor: '#000000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#000000',
        fillOpacity: 0.3,
        map: mapInstance,
        center: userPos,
        radius: 100 // 100 meters radius
      });
      
      setUserLocationMarker(circle);
    } catch (error) {
      console.error('Error creating user location marker:', error);
    }
  };

  // Function to clear directions
  const clearDirections = () => {
    if (directionsRenderer) {
      directionsRenderer.setDirections({ routes: [] });
      setShowDirections(false);
      setTravelTime(null);
    }
    
    // Remove user location marker
    if (userLocationMarker) {
      userLocationMarker.setMap(null);
      setUserLocationMarker(null);
    }
  };

  useEffect(() => {
    const initMap = async () => {
      if (!apiKey) {
        setError('Google Maps API key is required');
        setIsLoading(false);
        return;
      }

      try {
        // Dynamic import of Google Maps Loader
        const { Loader: GoogleMapsLoader } = await import('@googlemaps/js-api-loader');
        Loader = GoogleMapsLoader;
        
        const loader = new Loader({
          apiKey: apiKey,
          version: 'weekly',
          libraries: ['places']
        });

        const { Map } = await loader.importLibrary('maps');
        const { Marker } = await loader.importLibrary('marker');
        const { DirectionsService } = await loader.importLibrary('routes');
        const { DirectionsRenderer } = await loader.importLibrary('routes');

        // Create the map
        const map = new Map(mapRef.current, {
          center: center,
          zoom: zoom,
          mapTypeId: 'roadmap',
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry.fill',
              stylers: [{ weight: '2.00' }]
            },
            {
              featureType: 'all',
              elementType: 'geometry.stroke',
              stylers: [{ color: '#9c9c9c' }]
            },
            {
              featureType: 'all',
              elementType: 'labels.text',
              stylers: [{ visibility: 'on' }]
            },
            {
              featureType: 'landscape',
              elementType: 'all',
              stylers: [{ color: '#f2f2f2' }]
            },
            {
              featureType: 'landscape',
              elementType: 'geometry.fill',
              stylers: [{ color: '#ffffff' }]
            },
            {
              featureType: 'landscape.man_made',
              elementType: 'geometry.fill',
              stylers: [{ color: '#ffffff' }]
            },
            {
              featureType: 'poi',
              elementType: 'all',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'road',
              elementType: 'all',
              stylers: [{ saturation: -100 }, { lightness: 45 }]
            },
            {
              featureType: 'road',
              elementType: 'geometry.fill',
              stylers: [{ color: '#eeeeee' }]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#7b7b7b' }]
            },
            {
              featureType: 'road',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#ffffff' }]
            },
            {
              featureType: 'road.highway',
              elementType: 'all',
              stylers: [{ visibility: 'simplified' }]
            },
            {
              featureType: 'road.arterial',
              elementType: 'labels.icon',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'transit',
              elementType: 'all',
              stylers: [{ visibility: 'off' }]
            },
            {
              featureType: 'water',
              elementType: 'all',
              stylers: [{ color: '#46bcec' }, { visibility: 'on' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry.fill',
              stylers: [{ color: '#c8d7d4' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.fill',
              stylers: [{ color: '#070707' }]
            },
            {
              featureType: 'water',
              elementType: 'labels.text.stroke',
              stylers: [{ color: '#ffffff' }]
            }
          ]
        });

        // Add a marker
        new Marker({
          position: center,
          map: map,
          title: center.title || 'LA Marketing Office'
        });

        // Initialize directions service
        const dirService = new DirectionsService();
        const dirRenderer = new DirectionsRenderer({
          map: map,
          suppressMarkers: true, // Don't show default markers
          polylineOptions: {
            strokeColor: '#000000', // Black color
            strokeWeight: 4,
            strokeOpacity: 0.8
          }
        });

        setDirectionsService(dirService);
        setDirectionsRenderer(dirRenderer);
        setMapInstance(map);

        setIsLoading(false);
      } catch (err) {
        console.error('Error loading Google Maps:', err);
        setError('Failed to load Google Maps. Please check your API key and internet connection.');
        setIsLoading(false);
      }
    };

    initMap();
  }, [apiKey, center, zoom]);

  if (error) {
    return (
      <MapContainer className={className}>
        <ErrorContainer>
          <div>
            <p>{error}</p>
            <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
              Please contact support if this issue persists.
            </p>
          </div>
        </ErrorContainer>
      </MapContainer>
    );
  }

  return (
    <MapContainer className={className}>
      <MapWrapper>
        {isLoading && (
          <LoadingContainer>
            <div>
              <p>Loading map...</p>
              <p style={{ fontSize: '0.875rem', marginTop: '0.5rem' }}>
                Please wait while we load the interactive map.
              </p>
            </div>
          </LoadingContainer>
        )}
        <div ref={mapRef} style={{ height: '100%', width: '100%' }} />
        
        {/* No control button needed - functionality moved to Show Route */}
      </MapWrapper>
      
      {!isLoading && !error && (
        <MapInfoPanel>
          <div style={{ marginBottom: '0.75rem', fontSize: '0.875rem', color: '#495057' }}>
            <strong>{center.title || 'LA Marketing Office'}</strong>
            <div style={{ marginTop: '0.25rem', fontSize: '0.8rem', color: '#6c757d' }}>
              {center.address || 'Hady street - Giza, Egypt'}
            </div>
            {distance && (
              <div style={{ marginTop: '0.25rem' }}>
                Distance: <strong>{distance.toFixed(1)} km</strong>
                {travelTime && <span> • {travelTime}</span>}
              </div>
            )}
          </div>
          
          <ActionButtons>
            {!showDirections ? (
              <ActionButton onClick={showDirectionsOnMap} disabled={isGettingLocation}>
                {isGettingLocation ? (
                  <>
                    <Clock size={14} />
                    Getting Location...
                  </>
                ) : (
                  <>
                    <Route size={14} />
                    Show Route
                  </>
                )}
              </ActionButton>
            ) : (
              <ActionButton onClick={clearDirections}>
                <Navigation size={14} />
                Clear Route
              </ActionButton>
            )}
            <ActionButton onClick={openDirections}>
              <Route size={14} />
              Open in Maps
            </ActionButton>
          </ActionButtons>
        </MapInfoPanel>
      )}
    </MapContainer>
  );
});

export default GoogleMap;
