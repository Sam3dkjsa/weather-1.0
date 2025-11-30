import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';

const DataExport = ({ onExport }) => {
  const [format, setFormat] = useState('csv');
  const [dateRange, setDateRange] = useState('7days');
  const [isExporting, setIsExporting] = useState(false);

  const formatOptions = [
    { value: 'csv', label: 'CSV (Comma Separated)' },
    { value: 'pdf', label: 'PDF Report' },
    { value: 'json', label: 'JSON Data' },
    { value: 'xlsx', label: 'Excel Spreadsheet' }
  ];

  const dateRangeOptions = [
    { value: '24hours', label: 'Last 24 Hours' },
    { value: '7days', label: 'Last 7 Days' },
    { value: '30days', label: 'Last 30 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];

  const handleExport = async () => {
    setIsExporting(true);
    await onExport({ format, dateRange });
    setTimeout(() => setIsExporting(false), 2000);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Download" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Export Data</h3>
      </div>

      <div className="space-y-4">
        <Select
          label="Export Format"
          options={formatOptions}
          value={format}
          onChange={setFormat}
        />

        <Select
          label="Date Range"
          options={dateRangeOptions}
          value={dateRange}
          onChange={setDateRange}
        />

        {dateRange === 'custom' && (
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="date"
              label="Start Date"
            />
            <Input
              type="date"
              label="End Date"
            />
          </div>
        )}

        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="text-sm font-medium text-foreground mb-2">Export Includes:</h4>
          <ul className="space-y-1">
            <li className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name="Check" size={14} className="text-success" />
              <span>Air Quality Index (AQI) readings</span>
            </li>
            <li className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name="Check" size={14} className="text-success" />
              <span>PM2.5, PM10, and Ozone levels</span>
            </li>
            <li className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name="Check" size={14} className="text-success" />
              <span>Greenhouse gas concentrations</span>
            </li>
            <li className="flex items-center gap-2 text-xs text-muted-foreground">
              <Icon name="Check" size={14} className="text-success" />
              <span>Health recommendations</span>
            </li>
          </ul>
        </div>

        <Button
          variant="default"
          fullWidth
          iconName="Download"
          loading={isExporting}
          onClick={handleExport}
        >
          {isExporting ? 'Exporting...' : 'Export Data'}
        </Button>
      </div>
    </div>
  );
};

export default DataExport;