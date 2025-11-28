import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PlantPerformanceCard = ({
  plantName,
  plantImage,
  plantImageAlt,
  co2Absorbed,
  o2Released,
  efficiency,
  location,
  status,
  onClick
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'excellent':
        return 'text-success bg-success/10';
      case 'good':
        return 'text-primary bg-primary/10';
      case 'moderate':
        return 'text-warning bg-warning/10';
      default:
        return 'text-muted-foreground bg-muted';
    }
  };

  return (
    <div
      onClick={onClick}
      className={`bg-card border border-border rounded-lg overflow-hidden transition-all duration-200 ${onClick ? 'cursor-pointer hover:shadow-md hover:border-primary/30' : ''}`}
    >
      <div className="relative h-40 overflow-hidden">
        <Image
          src={plantImage}
          alt={plantImageAlt}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
          {status}
        </div>
      </div>

      <div className="p-4">
        <h4 className="text-base font-semibold text-foreground mb-1">{plantName}</h4>
        <div className="flex items-center gap-1 text-sm text-muted-foreground mb-4">
          <Icon name="MapPin" size={14} />
          <span>{location}</span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Wind" size={16} className="text-primary" />
              <span>CO₂ Absorbed</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{co2Absorbed}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Icon name="Leaf" size={16} className="text-success" />
              <span>O₂ Released</span>
            </div>
            <span className="text-sm font-semibold text-foreground">{o2Released}</span>
          </div>

          <div className="pt-2 border-t border-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Efficiency</span>
              <span className="text-sm font-semibold text-foreground">{efficiency}%</span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-primary to-success rounded-full transition-all duration-300"
                style={{ width: `${efficiency}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantPerformanceCard;