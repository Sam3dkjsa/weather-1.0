import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureHighlights = () => {
  const features = [
    {
      id: 1,
      icon: 'CloudRain',
      title: 'Accurate Weather Forecasts',
      description: 'Real-time predictions with historical data comparison and hourly updates'
    },
    {
      id: 2,
      icon: 'Wind',
      title: 'Air Quality Monitoring',
      description: 'Track SPM levels, greenhouse gases, and receive quality alerts'
    },
    {
      id: 3,
      icon: 'Leaf',
      title: 'Plant Air Purification',
      description: 'Calculate CO2 absorption and get personalized plant recommendations'
    },
    {
      id: 4,
      icon: 'TrendingUp',
      title: 'Carbon Tracking',
      description: 'Monitor emissions, track sequestration, and reduce your footprint'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Comprehensive Environmental Intelligence
        </h2>
        <p className="text-muted-foreground">
          Make informed decisions with integrated weather, air quality, and carbon tracking data
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features?.map((feature) => (
          <div
            key={feature?.id}
            className="p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-all duration-150"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <Icon name={feature?.icon} size={24} className="text-primary" />
            </div>
            <h3 className="text-base font-semibold text-foreground mb-2">{feature?.title}</h3>
            <p className="text-sm text-muted-foreground">{feature?.description}</p>
          </div>
        ))}
      </div>
      <div className="p-4 rounded-lg bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20">
        <div className="flex items-start gap-3">
          <Icon name="Sparkles" size={20} className="text-primary flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-1">
              Join 50,000+ Environmental Enthusiasts
            </h4>
            <p className="text-xs text-muted-foreground">
              Access premium features and contribute to a sustainable future
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureHighlights;