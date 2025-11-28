import React from 'react';
import Icon from '../../../components/AppIcon';

const AirQualityGauge = ({ value, max, label, unit, status, icon }) => {
  const percentage = (value / max) * 100;
  const rotation = (percentage / 100) * 180 - 90;

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

  const getStatusBg = () => {
    switch (status) {
      case 'good':
        return 'bg-success/10';
      case 'moderate':
        return 'bg-warning/10';
      case 'unhealthy':
        return 'bg-error/10';
      default:
        return 'bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 flex flex-col items-center">
      <div className="flex items-center gap-2 mb-4">
        <Icon name={icon} size={20} className={getStatusColor()} />
        <h3 className="text-sm font-medium text-foreground">{label}</h3>
      </div>
      <div className="relative w-40 h-20 mb-4">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          <path
            d="M 20 80 A 80 80 0 0 1 180 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            className="text-muted/30"
          />
          <path
            d="M 20 80 A 80 80 0 0 1 180 80"
            fill="none"
            stroke="currentColor"
            strokeWidth="12"
            strokeDasharray={`${percentage * 2.51} 251`}
            className={getStatusColor()}
          />
          <circle
            cx="100"
            cy="80"
            r="4"
            className="fill-foreground"
            style={{
              transform: `rotate(${rotation}deg)`,
              transformOrigin: '100px 80px'
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-2">
          <span className="text-2xl font-bold text-foreground">{value}</span>
          <span className="text-xs text-muted-foreground">{unit}</span>
        </div>
      </div>
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBg()} ${getStatusColor()}`}>
        {status?.charAt(0)?.toUpperCase() + status?.slice(1)}
      </div>
    </div>
  );
};

export default AirQualityGauge;