import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const AddLocationModal = ({ isOpen, onClose, onAddLocation }) => {
  const [locationName, setLocationName] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);

  const handleSearchByName = async () => {
    if (!locationName?.trim()) {
      setSearchError('Please enter a location name');
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      // Using OpenStreetMap Nominatim API for geocoding
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}&limit=1`
      );
      const data = await response?.json();

      if (data?.length > 0) {
        const result = data?.[0];
        setLatitude(parseFloat(result?.lat)?.toFixed(4));
        setLongitude(parseFloat(result?.lon)?.toFixed(4));
        setSearchError(null);
      } else {
        setSearchError('Location not found. Please try a different name or enter coordinates manually.');
      }
    } catch (error) {
      console.error('Geocoding error:', error);
      setSearchError('Failed to search location. Please try again or enter coordinates manually.');
    } finally {
      setIsSearching(false);
    }
  };

  const handleSubmit = (e) => {
    e?.preventDefault();

    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);

    if (!locationName?.trim()) {
      setSearchError('Please enter a location name');
      return;
    }

    if (isNaN(lat) || isNaN(lng)) {
      setSearchError('Please enter valid coordinates');
      return;
    }

    if (lat < -90 || lat > 90) {
      setSearchError('Latitude must be between -90 and 90');
      return;
    }

    if (lng < -180 || lng > 180) {
      setSearchError('Longitude must be between -180 and 180');
      return;
    }

    const newLocation = {
      value: `custom-${Date.now()}`,
      label: locationName?.trim(),
      coordinates: { lat, lng },
      isCustom: true
    };

    onAddLocation(newLocation);
    handleClose();
  };

  const handleClose = () => {
    setLocationName('');
    setLatitude('');
    setLongitude('');
    setSearchError(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animation-fade-in">
      <div className="bg-card border border-border rounded-lg shadow-xl max-w-md w-full animation-slide-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="MapPin" size={20} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground">Add Custom Location</h2>
          </div>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg hover:bg-muted transition-colors flex items-center justify-center"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Location Name
            </label>
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="e.g., Seattle, WA or Paris, France"
                value={locationName}
                onChange={(e) => setLocationName(e?.target?.value)}
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleSearchByName}
                disabled={isSearching || !locationName?.trim()}
                iconName={isSearching ? "Loader2" : "Search"}
                iconPosition="left"
              >
                {isSearching ? 'Searching...' : 'Search'}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Search for a location to auto-fill coordinates
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Latitude
              </label>
              <Input
                type="number"
                step="0.0001"
                placeholder="e.g., 40.7128"
                value={latitude}
                onChange={(e) => setLatitude(e?.target?.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">-90 to 90</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Longitude
              </label>
              <Input
                type="number"
                step="0.0001"
                placeholder="e.g., -74.0060"
                value={longitude}
                onChange={(e) => setLongitude(e?.target?.value)}
              />
              <p className="text-xs text-muted-foreground mt-1">-180 to 180</p>
            </div>
          </div>

          {searchError && (
            <div className="flex items-start gap-2 p-3 bg-error/10 border border-error/20 rounded-lg">
              <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
              <p className="text-sm text-error">{searchError}</p>
            </div>
          )}

          <div className="flex items-center gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="default"
              disabled={!locationName?.trim() || !latitude || !longitude}
              className="flex-1"
            >
              Add Location
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddLocationModal;