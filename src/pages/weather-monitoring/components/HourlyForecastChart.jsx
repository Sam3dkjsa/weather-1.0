
import React from 'react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import Icon from '../../../components/AppIcon';

const HourlyForecastChart = ({ hourlyData }) => {
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-md">
          <p className="text-sm font-medium text-popover-foreground mb-2">{payload?.[0]?.payload?.time}</p>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground">Temperature:</span>
              <span className="text-xs font-semibold text-foreground">{payload?.[0]?.value}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-secondary" />
              <span className="text-xs text-muted-foreground">Humidity:</span>
              <span className="text-xs font-semibold text-foreground">{payload?.[1]?.value}%</span>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Clock" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">24-Hour Forecast</h3>
            <p className="text-sm text-muted-foreground">Temperature and humidity trends</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-xs text-muted-foreground">Temperature</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-secondary" />
            <span className="text-xs text-muted-foreground">Humidity</span>
          </div>
        </div>
      </div>

      <div className="w-full h-80" aria-label="24-Hour Weather Forecast Chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={hourlyData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(45, 90, 39)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="rgb(45, 90, 39)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="colorHumidity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="rgb(74, 144, 164)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="rgb(74, 144, 164)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.2)" />
            <XAxis
              dataKey="time"
              stroke="rgb(107, 114, 128)"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              yAxisId="left"
              stroke="rgb(107, 114, 128)"
              style={{ fontSize: '12px' }}
              label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft', style: { fontSize: '12px', fill: 'rgb(107, 114, 128)' } }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="rgb(107, 114, 128)"
              style={{ fontSize: '12px' }}
              label={{ value: 'Humidity (%)', angle: 90, position: 'insideRight', style: { fontSize: '12px', fill: 'rgb(107, 114, 128)' } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              stroke="rgb(45, 90, 39)"
              strokeWidth={2}
              fill="url(#colorTemp)"
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              stroke="rgb(74, 144, 164)"
              strokeWidth={2}
              fill="url(#colorHumidity)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HourlyForecastChart;