import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PlantCard = ({ plant, onViewDetails, onAddCare }) => {
  const getEffectivenessColor = (rating) => {
    if (rating >= 4.5) return 'text-success';
    if (rating >= 3.5) return 'text-warning';
    return 'text-muted-foreground';
  };

  const getEffectivenessLabel = (rating) => {
    if (rating >= 4.5) return 'Excellent';
    if (rating >= 3.5) return 'Good';
    return 'Moderate';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={plant?.image}
          alt={plant?.imageAlt}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${plant?.isActive ? 'bg-success' : 'bg-muted-foreground'}`} />
          <span className="text-xs font-medium text-foreground">{plant?.isActive ? 'Active' : 'Inactive'}</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-1">{plant?.name}</h3>
            <p className="text-sm text-muted-foreground italic">{plant?.scientificName}</p>
          </div>
          <div className="flex items-center gap-1 ml-2">
            {[...Array(5)]?.map((_, index) => (
              <Icon
                key={index}
                name="Star"
                size={14}
                className={index < Math.floor(plant?.effectiveness) ? 'text-warning fill-warning' : 'text-muted'}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Room</span>
            <span className="font-medium text-foreground">{plant?.room}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">CO₂ Absorption</span>
            <span className="font-medium text-foreground">{plant?.co2Absorption}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">O₂ Emission</span>
            <span className="font-medium text-foreground">{plant?.o2Emission}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Carbon Sequestration</span>
            <span className="font-medium text-foreground">{plant?.carbonSequestration || '0.5 kg/year'}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Effectiveness</span>
            <span className={`font-medium ${getEffectivenessColor(plant?.effectiveness)}`}>
              {getEffectivenessLabel(plant?.effectiveness)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-4 p-3 bg-muted/50 rounded-md">
          <Icon name="Droplets" size={16} className="text-primary" />
          <span className="text-sm text-foreground">Next watering: {plant?.nextWatering}</span>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            fullWidth
            iconName="Calendar"
            iconPosition="left"
            onClick={() => onAddCare(plant)}
          >
            Schedule Care
          </Button>
          <Button
            variant="default"
            size="sm"
            fullWidth
            iconName="Eye"
            iconPosition="left"
            onClick={() => onViewDetails(plant)}
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;