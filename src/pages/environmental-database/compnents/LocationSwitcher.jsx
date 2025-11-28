import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const LocationSwitcher = ({ currentLocation, locations, onLocationChange, onDeleteLocation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDetecting, setIsDetecting] = useState(false);
  const [locationError, setLocationError] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLocationSelect = (location) => {
    onLocationChange(location);
    setIsOpen(false);
    setLocationError(null);
  };

  const getCityName = async (lat, lng) => {
    try {
      // Using OpenStreetMap Nominatim API for reverse geocoding (free, no API key required)
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`
      );
      const data = await response?.json();

      if (data?.address) {
        const city = data?.address?.city || data?.address?.town || data?.address?.village || 'Unknown City';
        const state = data?.address?.state || '';
        const country = data?.address?.country || '';

        return {
          label: state ? `${city}, ${state}` : `${city}, ${country}`,
          city,
          state,
          country
        };
      }
      return { label: 'Current Location', city: 'Unknown', state: '', country: '' };
    } catch (error) {
      console.error('Geocoding error:', error);
      return { label: 'Current Location', city: 'Unknown', state: '', country: '' };
    }
  };

  const handleUseMyLocation = () => {
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError('Geolocation is not supported by your browser');
      return;
    }

    setIsDetecting(true);

    navigator.geolocation?.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position?.coords;

        try {
          const locationInfo = await getCityName(latitude, longitude);

          const userLocation = {
            value: 'user-location',
            label: locationInfo?.label,
            coordinates: {
              lat: parseFloat(latitude?.toFixed(4)),
              lng: parseFloat(longitude?.toFixed(4))
            },
            isUserLocation: true
          };

          onLocationChange(userLocation);
          setIsOpen(false);
        } catch (error) {
          setLocationError('Failed to get location name');
        } finally {
          setIsDetecting(false);
        }
      },
      (error) => {
        setIsDetecting(false);
        switch (error?.code) {
          case error?.PERMISSION_DENIED:
            setLocationError('Location access denied. Please enable location permissions.');
            break;
          case error?.POSITION_UNAVAILABLE:
            setLocationError('Location information unavailable.');
            break;
          case error?.TIMEOUT:
            setLocationError('Location request timed out.');
            break;
          default:
            setLocationError('An unknown error occurred.');
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const handleDeleteLocation = (e, location) => {
    e?.stopPropagation();
    if (location?.isCustom && onDeleteLocation) {
      onDeleteLocation(location);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 py-3 bg-card border border-border rounded-lg text-foreground hover:bg-muted transition-all duration-150 w-full"
      >
        <Icon
          name={currentLocation?.isUserLocation ? "Navigation" : "MapPin"}
          size={20}
          className={currentLocation?.isUserLocation ? "text-success" : "text-primary"}
        />
        <div className="flex-1 text-left">
          <div className="text-sm font-medium flex items-center gap-2">
            {currentLocation?.label}
            {currentLocation?.isUserLocation && (
              <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded-full">
                Current
              </span>
            )}
          </div>
          <div className="text-xs text-muted-foreground">
            {currentLocation?.coordinates?.lat?.toFixed(4)}, {currentLocation?.coordinates?.lng?.toFixed(4)}
          </div>
        </div>
        <Icon name={isOpen ? 'ChevronUp' : 'ChevronDown'} size={16} />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-lg overflow-hidden animation-slide-in z-50">
          {/* Use My Location Button */}
          <button
            onClick={handleUseMyLocation}
            disabled={isDetecting}
            className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150 bg-primary/5 hover:bg-primary/10 border-b border-border disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isDetecting ? (
              <>
                <div className="animate-spin">
                  <Icon name="Loader2" size={16} className="text-primary" />
                </div>
                <span className="text-sm font-medium text-primary">Detecting location...</span>
              </>
            ) : (
              <>
                <Icon name="Navigation" size={16} className="text-primary" />
                <span className="text-sm font-medium text-primary">Use My Location</span>
              </>
            )}
          </button>

          {/* Error Message */}
          {locationError && (
            <div className="px-4 py-3 bg-error/10 border-b border-border">
              <div className="flex items-start gap-2">
                <Icon name="AlertCircle" size={14} className="text-error mt-0.5" />
                <p className="text-xs text-error">{locationError}</p>
              </div>
            </div>
          )}

          {/* Predefined Locations */}
          <div className="max-h-64 overflow-y-auto">
            {locations?.map((location) => (
              <button
                key={location?.value}
                onClick={() => handleLocationSelect(location)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors duration-150 group ${
                  location?.value === currentLocation?.value
                    ? 'bg-primary/10 text-primary' :'text-popover-foreground hover:bg-muted'
                }`}
              >
                <Icon
                  name={location?.isCustom ? "MapPinPlus" : "MapPin"}
                  size={16}
                  className={location?.isCustom ? "text-secondary" : ""}
                />
                <div className="flex-1">
                  <div className="text-sm font-medium flex items-center gap-2">
                    {location?.label}
                    {location?.isCustom && (
                      <span className="text-xs px-2 py-0.5 bg-secondary/10 text-secondary rounded-full">
                        Custom
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {location?.coordinates?.lat?.toFixed(4)}, {location?.coordinates?.lng?.toFixed(4)}
                  </div>
                </div>
                {location?.value === currentLocation?.value && (
                  <Icon name="Check" size={16} />
                )}
                {location?.isCustom && (
                  <button
                    onClick={(e) => handleDeleteLocation(e, location)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-error/10 rounded"
                    title="Delete location"
                  >
                    <Icon name="Trash2" size={14} className="text-error" />
                  </button>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSwitcher;