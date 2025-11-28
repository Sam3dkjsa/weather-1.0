import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const AirQualityChart = ({ data, title }) => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload?.length) {
      return (
        <div className="bg-popover border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium text-popover-foreground mb-2">{label}</p>
          {payload?.map((entry, index) => (
            <div key={index} className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry?.color }} />
              <span className="text-muted-foreground">{entry?.name}:</span>
              <span className="font-medium text-popover-foreground">{entry?.value}</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(107, 114, 128, 0.2)" />
            <XAxis
              dataKey="time"
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
            <Line
              type="monotone"
              dataKey="pm25"
              stroke="#DC2626"
              strokeWidth={2}
              name="PM2.5"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="pm10"
              stroke="#D97706"
              strokeWidth={2}
              name="PM10"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="ozone"
              stroke="#4A90A4"
              strokeWidth={2}
              name="Ozone"
              dot={{ r: 3 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AirQualityChart;