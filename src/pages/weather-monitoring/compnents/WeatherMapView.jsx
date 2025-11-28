import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const WeatherMapView = ({ location }) => {
  const [activeLayer, setActiveLayer] = useState('precipitation');
  const [mapZoom, setMapZoom] = useState(10);

  const mapLayers = [
    { id: 'precipitation', label: 'Precipitation', icon: 'CloudRain' },
    { id: 'temperature', label: 'Temperature', icon: 'Thermometer' },
    { id: 'wind', label: 'Wind', icon: 'Wind' },
    { id: 'clouds', label: 'Clouds', icon: 'Cloud' }
  ];

  const handleZoomIn = () => {
    if (mapZoom < 18) setMapZoom(mapZoom + 1);
  };

  const handleZoomOut = () => {
    if (mapZoom > 3) setMapZoom(mapZoom - 1);
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Map" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Weather Map</h3>
            <p className="text-sm text-muted-foreground">Interactive regional view</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {mapLayers?.map((layer) => (
            <button
              key={layer?.id}
              onClick={() => setActiveLayer(layer?.id)}
              className={`px-3 py-2 rounded-md text-xs font-medium transition-all duration-150 flex items-center gap-2 ${
                activeLayer === layer?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              <Icon name={layer?.icon} size={14} />
              <span className="hidden sm:inline">{layer?.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="relative w-full h-96 rounded-lg overflow-hidden bg-muted">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={`Weather map for ${location}`}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=40.7128,-74.0060&z=${mapZoom}&output=embed`}
          className="border-0"
        />

        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleZoomIn}
            className="w-10 h-10 rounded-lg bg-card border border-border shadow-sm flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-150"
            aria-label="Zoom in"
          >
            <Icon name="Plus" size={20} />
          </button>
          <button
            onClick={handleZoomOut}
            className="w-10 h-10 rounded-lg bg-card border border-border shadow-sm flex items-center justify-center text-foreground hover:bg-muted transition-colors duration-150"
            aria-label="Zoom out"
          >
            <Icon name="Minus" size={20} />
          </button>
        </div>

        <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-md">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Layers" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Active Layer</span>
          </div>
          <div className="text-xs text-muted-foreground capitalize">{activeLayer}</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Navigation" size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">Zoom Level</span>
          </div>
          <div className="text-sm font-semibold text-foreground">{mapZoom}x</div>
        </div>

        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="MapPin" size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">Location</span>
          </div>
          <div className="text-sm font-semibold text-foreground">{location}</div>
        </div>

        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="RefreshCw" size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">Updated</span>
          </div>
          <div className="text-sm font-semibold text-foreground">2m ago</div>
        </div>

        <div className="bg-muted/50 rounded-lg p-3">
          <div className="flex items-center gap-2 mb-1">
            <Icon name="Satellite" size={14} className="text-primary" />
            <span className="text-xs text-muted-foreground">Source</span>
          </div>
          <div className="text-sm font-semibold text-foreground">Satellite</div>
        </div>
      </div>
    </div>
  );
};

export default WeatherMapView;