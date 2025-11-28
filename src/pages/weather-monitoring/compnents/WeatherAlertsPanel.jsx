import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const WeatherAlertsPanel = ({ alerts }) => {
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [alertSettings, setAlertSettings] = useState({
    temperature: { enabled: true, threshold: 35 },
    rainfall: { enabled: true, threshold: 50 },
    windSpeed: { enabled: true, threshold: 60 },
    humidity: { enabled: false, threshold: 80 }
  });

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'critical':
        return 'bg-error/10 text-error border-error/20';
      case 'warning':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'info':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted/50 text-muted-foreground border-border';
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical':
        return 'AlertTriangle';
      case 'warning':
        return 'AlertCircle';
      case 'info':
        return 'Info';
      default:
        return 'Bell';
    }
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Bell" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Weather Alerts</h3>
            <p className="text-sm text-muted-foreground">{alerts?.length} active alerts</p>
          </div>
        </div>

        <Button
          variant="outline"
          iconName="Settings"
          iconPosition="left"
          onClick={() => setIsConfigOpen(!isConfigOpen)}
        >
          Configure
        </Button>
      </div>
      {isConfigOpen && (
        <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border">
          <h4 className="text-sm font-semibold text-foreground mb-4">Alert Thresholds</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Checkbox
                label="Temperature Alerts"
                checked={alertSettings?.temperature?.enabled}
                onChange={(e) => setAlertSettings({
                  ...alertSettings,
                  temperature: { ...alertSettings?.temperature, enabled: e?.target?.checked }
                })}
              />
              <Input
                type="number"
                value={alertSettings?.temperature?.threshold}
                onChange={(e) => setAlertSettings({
                  ...alertSettings,
                  temperature: { ...alertSettings?.temperature, threshold: e?.target?.value }
                })}
                className="w-24"
                disabled={!alertSettings?.temperature?.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <Checkbox
                label="Rainfall Alerts"
                checked={alertSettings?.rainfall?.enabled}
                onChange={(e) => setAlertSettings({
                  ...alertSettings,
                  rainfall: { ...alertSettings?.rainfall, enabled: e?.target?.checked }
                })}
              />
              <Input
                type="number"
                value={alertSettings?.rainfall?.threshold}
                onChange={(e) => setAlertSettings({
                  ...alertSettings,
                  rainfall: { ...alertSettings?.rainfall, threshold: e?.target?.value }
                })}
                className="w-24"
                disabled={!alertSettings?.rainfall?.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <Checkbox
                label="Wind Speed Alerts"
                checked={alertSettings?.windSpeed?.enabled}
                onChange={(e) => setAlertSettings({
                  ...alertSettings,
                  windSpeed: { ...alertSettings?.windSpeed, enabled: e?.target?.checked }
                })}
              />
              <Input
                type="number"
                value={alertSettings?.windSpeed?.threshold}
                onChange={(e) => setAlertSettings({
                  ...alertSettings,
                  windSpeed: { ...alertSettings?.windSpeed, threshold: e?.target?.value }
                })}
                className="w-24"
                disabled={!alertSettings?.windSpeed?.enabled}
              />
            </div>

            <div className="flex items-center justify-between">
              <Checkbox
                label="Humidity Alerts"
                checked={alertSettings?.humidity?.enabled}
                onChange={(e) => setAlertSettings({
                  ...alertSettings,
                  humidity: { ...alertSettings?.humidity, enabled: e?.target?.checked }
                })}
              />
              <Input
                type="number"
                value={alertSettings?.humidity?.threshold}
                onChange={(e) => setAlertSettings({
                  ...alertSettings,
                  humidity: { ...alertSettings?.humidity, threshold: e?.target?.value }
                })}
                className="w-24"
                disabled={!alertSettings?.humidity?.enabled}
              />
            </div>
          </div>

          <div className="mt-4 flex items-center justify-end gap-2">
            <Button variant="outline" onClick={() => setIsConfigOpen(false)}>
              Cancel
            </Button>
            <Button variant="default" onClick={() => setIsConfigOpen(false)}>
              Save Settings
            </Button>
          </div>
        </div>
      )}
      <div className="space-y-3">
        {alerts?.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-success/10 flex items-center justify-center">
              <Icon name="CheckCircle2" size={32} className="text-success" />
            </div>
            <p className="text-sm text-muted-foreground">No active weather alerts</p>
          </div>
        ) : (
          alerts?.map((alert) => (
            <div
              key={alert?.id}
              className={`p-4 rounded-lg border ${getSeverityColor(alert?.severity)}`}
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-background/50 flex items-center justify-center flex-shrink-0">
                  <Icon name={getSeverityIcon(alert?.severity)} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm font-semibold">{alert?.title}</h4>
                    <span className="text-xs opacity-75 whitespace-nowrap">{alert?.time}</span>
                  </div>
                  <p className="text-xs opacity-90 mb-2">{alert?.description}</p>
                  <div className="flex items-center gap-4 text-xs opacity-75">
                    <div className="flex items-center gap-1">
                      <Icon name="MapPin" size={12} />
                      <span>{alert?.location}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="Clock" size={12} />
                      <span>Valid until {alert?.validUntil}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {alerts?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
          <div className="text-xs text-muted-foreground">
            Last updated: 2 minutes ago
          </div>
          <Button variant="ghost" iconName="RefreshCw" iconPosition="left">
            Refresh Alerts
          </Button>
        </div>
      )}
    </div>
  );
};

export default WeatherAlertsPanel;