import React from 'react';
import Icon from '../../../components/AppIcon';

const FeatureHighlights = () => {
  const features = [
    {
      icon: 'CloudSun',
      title: 'Weather Forecasting',
      description: 'Accurate daily predictions with historical data comparison and hourly forecasts'
    },
    {
      icon: 'Wind',
      title: 'Air Quality Monitoring',
      description: 'Real-time SPM tracking with air quality index calculations and health alerts'
    },
    {
      icon: 'BarChart3',
      title: 'Carbon Tracking',
      description: 'Monitor greenhouse gas emissions and track carbon sequestration progress'
    },
    {
      icon: 'Leaf',
      title: 'Plant Air Purification',
      description: 'CO2 absorption rates and O2 emission tracking for indoor plant species'
    },
    {
      icon: 'TrendingUp',
      title: 'Predictive Analytics',
      description: 'Advanced modeling dashboard for environmental data trends and forecasting'
    },
    {
      icon: 'Bell',
      title: 'Smart Alerts',
      description: 'Customizable notifications for air quality thresholds and weather warnings'
    }
  ];

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Comprehensive Environmental Intelligence
        </h3>
        <p className="text-sm text-muted-foreground">
          Everything you need to monitor and improve your environmental impact
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {features?.map((feature, index) => (
          <div
            key={index}
            className="p-4 rounded-lg bg-card border border-border hover:border-primary/50 hover:shadow-md transition-all duration-150"
          >
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Icon name={feature?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {feature?.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {feature?.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureHighlights;