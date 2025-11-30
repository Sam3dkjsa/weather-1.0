import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const AlertConfiguration = ({ alerts, onSave }) => {
  const [localAlerts, setLocalAlerts] = useState(alerts);
  const [isEditing, setIsEditing] = useState(false);

  const handleThresholdChange = (id, value) => {
    setLocalAlerts(localAlerts?.map(alert =>
      alert?.id === id ? { ...alert, threshold: parseFloat(value) } : alert
    ));
  };

  const handleToggle = (id) => {
    setLocalAlerts(localAlerts?.map(alert =>
      alert?.id === id ? { ...alert, enabled: !alert?.enabled } : alert
    ));
  };

  const handleSave = () => {
    onSave(localAlerts);
    setIsEditing(false);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Icon name="Bell" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Alert Configuration</h3>
        </div>
        <Button
          variant={isEditing ? "default" : "outline"}
          size="sm"
          iconName={isEditing ? "Check" : "Settings"}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          {isEditing ? "Save" : "Edit"}
        </Button>
      </div>
      <div className="space-y-4">
        {localAlerts?.map((alert) => (
          <div
            key={alert?.id}
            className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-150"
          >
            <div className="flex items-start gap-3">
              <Checkbox
                checked={alert?.enabled}
                onChange={() => handleToggle(alert?.id)}
                disabled={!isEditing}
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name={alert?.icon} size={16} className="text-muted-foreground" />
                  <h4 className="text-sm font-medium text-foreground">{alert?.name}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Alert when exceeds:</span>
                  <Input
                    type="number"
                    value={alert?.threshold}
                    onChange={(e) => handleThresholdChange(alert?.id, e?.target?.value)}
                    disabled={!isEditing || !alert?.enabled}
                    className="w-20"
                  />
                  <span className="text-xs text-muted-foreground">{alert?.unit}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertConfiguration;