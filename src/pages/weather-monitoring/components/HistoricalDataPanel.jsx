import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const HistoricalDataPanel = ({ historicalData }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('temperature');

  const periodOptions = [
    { value: 'week', label: 'Last 7 Days' },
    { value: 'month', label: 'Last 30 Days' },
    { value: 'quarter', label: 'Last 3 Months' },
    { value: 'year', label: 'Last Year' }
  ];

  const metricOptions = [
    { value: 'temperature', label: 'Temperature' },
    { value: 'rainfall', label: 'Rainfall' },
    { value: 'humidity', label: 'Humidity' },
    { value: 'windSpeed', label: 'Wind Speed' }
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-md">
          <p className="text-sm font-medium text-popover-foreground mb-2">{payload?.[0]?.payload?.date}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Current:</span>
              <span className="text-xs font-semibold text-foreground">{payload?.[0]?.value}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-xs text-muted-foreground">Average:</span>
              <span className="text-xs font-semibold text-foreground">{payload?.[1]?.value}</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="TrendingUp" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Historical Data</h3>
            <p className="text-sm text-muted-foreground">Trend analysis and comparison</p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select
            options={metricOptions}
            value={selectedMetric}
            onChange={setSelectedMetric}
            className="w-full sm:w-40"
          />
          <Select
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            className="w-full sm:w-40"
          />
        </div>
      </div>

      <div className="w-full h-80 mb-6" aria-label="Historical Weather Data Chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={historicalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.2)" />
            <XAxis
              dataKey="date"
              stroke="rgb(107, 114, 128)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="rgb(107, 114, 128)"
              style={{ fontSize: '12px' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: '12px' }}
              iconType="circle"
            />
            <Bar
              dataKey="current"
              fill="rgb(45, 90, 39)"
              radius={[4, 4, 0, 0]}
              name="Current Period"
            />
            <Bar
              dataKey="average"
              fill="rgb(74, 144, 164)"
              radius={[4, 4, 0, 0]}
              name="Historical Average"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-xs text-muted-foreground">Highest</span>
          </div>
          <div className="text-xl font-semibold text-foreground mb-1">28°C</div>
          <div className="text-xs text-muted-foreground">Nov 25, 2025</div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="TrendingDown" size={16} className="text-error" />
            <span className="text-xs text-muted-foreground">Lowest</span>
          </div>
          <div className="text-xl font-semibold text-foreground mb-1">18°C</div>
          <div className="text-xs text-muted-foreground">Nov 22, 2025</div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="Activity" size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">Average</span>
          </div>
          <div className="text-xl font-semibold text-foreground mb-1">23°C</div>
          <div className="text-xs text-muted-foreground">Last 7 days</div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="BarChart3" size={16} className="text-primary" />
            <span className="text-xs text-muted-foreground">Variance</span>
          </div>
          <div className="text-xl font-semibold text-foreground mb-1">±3.2°C</div>
          <div className="text-xs text-muted-foreground">Standard dev</div>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Icon name="Info" size={16} />
          <span>Data sourced from NOAA weather stations</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" iconName="Download" iconPosition="left">
            Export Data
          </Button>
          <Button variant="outline" iconName="Share2" iconPosition="left">
            Share
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HistoricalDataPanel;