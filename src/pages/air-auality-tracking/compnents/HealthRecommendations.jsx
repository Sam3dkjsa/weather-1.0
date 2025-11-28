import React from 'react';
import Icon from '../../../components/AppIcon';

const HealthRecommendations = ({ recommendations }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'outdoor':
        return 'TreePine';
      case 'exercise':
        return 'Dumbbell';
      case 'mask':
        return 'Shield';
      case 'window':
        return 'Wind';
      default:
        return 'Info';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'safe':
        return 'bg-success/10 text-success border-success/20';
      case 'caution':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'warning':
        return 'bg-error/10 text-error border-error/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Heart" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Health Recommendations</h3>
      </div>
      <div className="space-y-3">
        {recommendations?.map((rec) => (
          <div
            key={rec?.id}
            className={`border rounded-lg p-4 ${getSeverityColor(rec?.severity)}`}
          >
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center flex-shrink-0">
                <Icon name={getActivityIcon(rec?.type)} size={20} />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold mb-1">{rec?.title}</h4>
                <p className="text-xs opacity-90 leading-relaxed">{rec?.description}</p>
                {rec?.groups && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {rec?.groups?.map((group, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 rounded-full text-xs font-medium bg-background/50"
                      >
                        {group}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HealthRecommendations;