import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const DataExportModal = ({ isOpen, onClose, onExport }) => {
  const [selectedMetrics, setSelectedMetrics] = useState({
    weather: true,
    airQuality: true,
    greenhouse: true,
    plants: true
  });
  const [exportFormat, setExportFormat] = useState('csv');
  const [dateRange, setDateRange] = useState('7days');

  if (!isOpen) return null;

  const handleExport = () => {
    onExport({
      metrics: selectedMetrics,
      format: exportFormat,
      dateRange
    });
    onClose();
  };

  const metrics = [
    { key: 'weather', label: 'Weather Data', description: 'Temperature, humidity, rainfall predictions' },
    { key: 'airQuality', label: 'Air Quality', description: 'SPM levels, AQI, pollutant concentrations' },
    { key: 'greenhouse', label: 'Greenhouse Gases', description: 'CO₂, CH₄, N₂O emissions tracking' },
    { key: 'plants', label: 'Plant Performance', description: 'CO₂ absorption, O₂ release rates' }
  ];

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[200] flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto animation-slide-in">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Download" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Export Environmental Data</h2>
              <p className="text-sm text-muted-foreground">Select metrics and format for export</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors duration-150"
          >
            <Icon name="X" size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Select Metrics</h3>
            <div className="space-y-3">
              {metrics?.map((metric) => (
                <Checkbox
                  key={metric?.key}
                  label={metric?.label}
                  description={metric?.description}
                  checked={selectedMetrics?.[metric?.key]}
                  onChange={(e) => setSelectedMetrics({ ...selectedMetrics, [metric?.key]: e?.target?.checked })}
                />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Export Format</h3>
            <div className="grid grid-cols-3 gap-3">
              {['csv', 'json', 'xlsx']?.map((format) => (
                <button
                  key={format}
                  onClick={() => setExportFormat(format)}
                  className={`p-3 rounded-lg border transition-all duration-150 ${
                    exportFormat === format
                      ? 'border-primary bg-primary/10 text-primary' :'border-border text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="text-sm font-medium uppercase">{format}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3">Date Range</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { value: '7days', label: 'Last 7 Days' },
                { value: '30days', label: 'Last 30 Days' },
                { value: '90days', label: 'Last 90 Days' },
                { value: 'custom', label: 'Custom Range' }
              ]?.map((range) => (
                <button
                  key={range?.value}
                  onClick={() => setDateRange(range?.value)}
                  className={`p-3 rounded-lg border transition-all duration-150 ${
                    dateRange === range?.value
                      ? 'border-primary bg-primary/10 text-primary' :'border-border text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="text-sm font-medium">{range?.label}</div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="default" iconName="Download" onClick={handleExport}>
            Export Data
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DataExportModal;