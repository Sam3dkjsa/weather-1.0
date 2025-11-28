import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationComparison = ({ locations }) => {
  const [activeLocation, setActiveLocation] = useState(locations?.[0]?.id);

  const getAQIColor = (aqi) => {
    if (aqi <= 50) return 'text-success bg-success/10';
    if (aqi <= 100) return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  const getAQILabel = (aqi) => {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
    if (aqi <= 200) return 'Unhealthy';
    return 'Very Unhealthy';
  };

  const activeLocationData = locations?.find(loc => loc?.id === activeLocation);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="MapPin" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Location Comparison</h3>
      </div>
      <div className="flex flex-wrap gap-2 mb-6">
        {locations?.map((location) => (
          <Button
            key={location?.id}
            variant={activeLocation === location?.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveLocation(location?.id)}
          >
            {location?.name}
          </Button>
        ))}
      </div>
      {activeLocationData && (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Air Quality Index</h4>
              <p className="text-xs text-muted-foreground">{getAQILabel(activeLocationData?.aqi)}</p>
            </div>
            <div className={`px-4 py-2 rounded-lg font-bold text-2xl ${getAQIColor(activeLocationData?.aqi)}`}>
              {activeLocationData?.aqi}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {activeLocationData?.pollutants?.map((pollutant, index) => (
              <div key={index} className="p-3 border border-border rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Wind" size={14} className="text-muted-foreground" />
                  <span className="text-xs font-medium text-foreground">{pollutant?.name}</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-foreground">{pollutant?.value}</span>
                  <span className="text-xs text-muted-foreground">{pollutant?.unit}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-start gap-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <p className="text-xs text-foreground leading-relaxed">
                {activeLocationData?.recommendation}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationComparison;