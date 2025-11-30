import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CareSchedule = ({ schedules, onMarkComplete, onViewDetails }) => {
  const getTaskIcon = (type) => {
    const icons = {
      watering: 'Droplets',
      fertilizing: 'Sprout',
      pruning: 'Scissors',
      repotting: 'Package',
      inspection: 'Eye'
    };
    return icons?.[type] || 'Calendar';
  };

  const getTaskColor = (type) => {
    const colors = {
      watering: 'text-primary bg-primary/10',
      fertilizing: 'text-success bg-success/10',
      pruning: 'text-warning bg-warning/10',
      repotting: 'text-secondary bg-secondary/10',
      inspection: 'text-accent bg-accent/10'
    };
    return colors?.[type] || 'text-muted-foreground bg-muted';
  };

  const getPriorityColor = (priority) => {
    if (priority === 'high') return 'text-error';
    if (priority === 'medium') return 'text-warning';
    return 'text-muted-foreground';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Calendar" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Care Schedule</h3>
            <p className="text-sm text-muted-foreground">Upcoming plant maintenance tasks</p>
          </div>
        </div>
        <Button variant="outline" size="sm" iconName="Plus" iconPosition="left">
          Add Task
        </Button>
      </div>
      <div className="space-y-3">
        {schedules?.map((schedule) => (
          <div
            key={schedule?.id}
            className="bg-muted/30 border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-150"
          >
            <div className="flex items-start gap-4">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${getTaskColor(schedule?.type)}`}>
                <Icon name={getTaskIcon(schedule?.type)} size={20} />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">{schedule?.task}</h4>
                    <p className="text-xs text-muted-foreground">{schedule?.plantName}</p>
                  </div>
                  <Icon
                    name="AlertCircle"
                    size={16}
                    className={getPriorityColor(schedule?.priority)}
                  />
                </div>

                <div className="flex items-center gap-4 mb-3">
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon name="Clock" size={14} />
                    <span>{schedule?.dueDate}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Icon name="MapPin" size={14} />
                    <span>{schedule?.location}</span>
                  </div>
                </div>

                {schedule?.notes && (
                  <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{schedule?.notes}</p>
                )}

                <div className="flex gap-2">
                  <Button
                    variant="default"
                    size="xs"
                    iconName="Check"
                    iconPosition="left"
                    onClick={() => onMarkComplete(schedule)}
                  >
                    Mark Complete
                  </Button>
                  <Button
                    variant="ghost"
                    size="xs"
                    iconName="Eye"
                    onClick={() => onViewDetails(schedule)}
                  >
                    Details
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CareSchedule;