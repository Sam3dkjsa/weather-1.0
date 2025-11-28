import React from 'react';
import Icon from '../../../components/AppIcon';

const PollutantCard = ({ name, value, unit, change, trend, icon, status }) => {
  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return 'text-success';
      case 'moderate':
        return 'text-warning';
      case 'unhealthy':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getTrendIcon = () => {
    if (trend === 'up') return 'TrendingUp';
    if (trend === 'down') return 'TrendingDown';
    return 'Minus';
  };

  const getTrendColor = () => {
    if (trend === 'up') return 'text-error';
    if (trend === 'down') return 'text-success';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-10 h-10 rounded-lg ${status === 'good' ? 'bg-success/10' : status === 'moderate' ? 'bg-warning/10' : 'bg-error/10'} flex items-center justify-center`}>
            <Icon name={icon} size={20} className={getStatusColor()} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">{name}</h4>
            <p className="text-xs text-muted-foreground">{status}</p>
          </div>
        </div>
        <div className={`flex items-center gap-1 ${getTrendColor()}`}>
          <Icon name={getTrendIcon()} size={16} />
          <span className="text-xs font-medium">{change}%</span>
        </div>
      </div>

      <div className="flex items-baseline gap-1">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        <span className="text-sm text-muted-foreground">{unit}</span>
      </div>
    </div>
  );
};

export default PollutantCard;