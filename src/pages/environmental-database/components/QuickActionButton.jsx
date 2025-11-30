import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickActionButton = ({
  icon,
  label,
  description,
  onClick,
  variant = 'default',
  disabled = false
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary text-primary-foreground hover:bg-primary/90';
      case 'success':
        return 'bg-success text-success-foreground hover:bg-success/90';
      case 'warning':
        return 'bg-warning text-warning-foreground hover:bg-warning/90';
      case 'error':
        return 'bg-error text-error-foreground hover:bg-error/90';
      default:
        return 'bg-card border border-border text-foreground hover:bg-muted hover:border-primary/30';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`w-full p-4 rounded-lg transition-all duration-200 text-left ${getVariantStyles()} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${variant === 'default' ? 'bg-primary/10 text-primary' : 'bg-white/20'}`}>
          <Icon name={icon} size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold mb-1">{label}</h4>
          {description && (
            <p className="text-xs opacity-80">{description}</p>
          )}
        </div>
        <Icon name="ChevronRight" size={16} className="flex-shrink-0 mt-1" />
      </div>
    </button>
  );
};

export default QuickActionButton;