import React from 'react';
import Icon from '../../../components/AppIcon';

const AlertCard = ({
  type = 'info',
  title,
  message,
  timestamp,
  location,
  onDismiss,
  actionLabel,
  onAction
}) => {
  const getAlertStyles = () => {
    switch (type) {
      case 'warning':
        return {
          bg: 'bg-warning/10',
          border: 'border-warning/30',
          icon: 'AlertTriangle',
          iconColor: 'text-warning'
        };
      case 'error':
        return {
          bg: 'bg-error/10',
          border: 'border-error/30',
          icon: 'AlertCircle',
          iconColor: 'text-error'
        };
      case 'success':
        return {
          bg: 'bg-success/10',
          border: 'border-success/30',
          icon: 'CheckCircle',
          iconColor: 'text-success'
        };
      default:
        return {
          bg: 'bg-primary/10',
          border: 'border-primary/30',
          icon: 'Info',
          iconColor: 'text-primary'
        };
    }
  };

  const styles = getAlertStyles();

  return (
    <div className={`${styles?.bg} border ${styles?.border} rounded-lg p-4 transition-all duration-200`}>
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${styles?.iconColor}`}>
          <Icon name={styles?.icon} size={20} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-sm font-semibold text-foreground">{title}</h4>
            {onDismiss && (
              <button
                onClick={onDismiss}
                className="text-muted-foreground hover:text-foreground transition-colors duration-150"
                aria-label="Dismiss alert"
              >
                <Icon name="X" size={16} />
              </button>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-2">{message}</p>

          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            {location && (
              <div className="flex items-center gap-1">
                <Icon name="MapPin" size={12} />
                <span>{location}</span>
              </div>
            )}
            {timestamp && (
              <div className="flex items-center gap-1">
                <Icon name="Clock" size={12} />
                <span>{timestamp}</span>
              </div>
            )}
          </div>

          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className="mt-3 text-sm font-medium text-primary hover:text-primary/80 transition-colors duration-150"
            >
              {actionLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertCard;