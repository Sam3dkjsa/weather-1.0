import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecommendationCard = ({ plant, onAddPlant }) => {
  const getDifficultyColor = (level) => {
    if (level === 'Easy') return 'text-success bg-success/10';
    if (level === 'Moderate') return 'text-warning bg-warning/10';
    return 'text-error bg-error/10';
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-40 h-40 overflow-hidden flex-shrink-0">
          <Image
            src={plant?.image}
            alt={plant?.imageAlt}
            className="w-full h-full object-cover"
          />
          {plant?.recommended && (
            <div className="absolute top-2 left-2 bg-primary text-primary-foreground px-2 py-1 rounded-md text-xs font-medium">
              Recommended
            </div>
          )}
        </div>

        <div className="flex-1 p-4">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h4 className="text-base font-semibold text-foreground mb-1">{plant?.name}</h4>
              <p className="text-xs text-muted-foreground italic">{plant?.scientificName}</p>
            </div>
            <span className={`px-2 py-1 rounded-md text-xs font-medium ${getDifficultyColor(plant?.careLevel)}`}>
              {plant?.careLevel}
            </span>
          </div>

          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{plant?.benefits}</p>

          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="flex items-center gap-2 text-xs">
              <Icon name="Droplets" size={14} className="text-primary" />
              <span className="text-muted-foreground">{plant?.wateringFrequency}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Icon name="Sun" size={14} className="text-warning" />
              <span className="text-muted-foreground">{plant?.lightRequirement}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Icon name="Wind" size={14} className="text-secondary" />
              <span className="text-muted-foreground">{plant?.airPurification}</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Icon name="Maximize2" size={14} className="text-accent" />
              <span className="text-muted-foreground">{plant?.idealRoomSize}</span>
            </div>
          </div>

          <Button
            variant="default"
            size="sm"
            fullWidth
            iconName="Plus"
            iconPosition="left"
            onClick={() => onAddPlant(plant)}
          >
            Add to My Plants
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;