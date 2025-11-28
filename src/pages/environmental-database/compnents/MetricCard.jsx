import React from 'react';
import Icon from '../../../components/AppIcon';

const MetricCard = ({
  title,
  value,
  unit,
  icon,
  trend,
  trendValue,
  status,
  description,
  onClick
}) => {
  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return 'text-success bg-success/10';
      case 'moderate':
        return 'text-warning bg-warning/10';
      case 'poor':
        return 'text-error bg-error/10';
      default:
        return 'text-primary bg-primary/10';
    }
  };

  const getTrendColor = () => {
    return trend === 'up' ? 'text-success' : trend === 'down' ? 'text-error' : 'text-muted-foreground';
  };

  return (
    <div
      onClick={onClick}
      className={`bg-card border border-border rounded-lg p-6 transition-all duration-200 ${onClick ? 'cursor-pointer hover:shadow-md hover:border-primary/30' : ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getStatusColor()}`}>
          <Icon name={icon} size={24} />
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-sm font-medium ${getTrendColor()}`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} size={16} />
            <span>{trendValue}</span>
          </div>
        )}
      </div>

      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-3xl font-bold text-foreground">{value}</span>
        {unit && <span className="text-lg text-muted-foreground">{unit}</span>}
      </div>

      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export default MetricCard;