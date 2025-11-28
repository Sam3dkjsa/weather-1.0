import React from 'react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Icon from '../../../components/AppIcon';

const ChartWidget = ({
  title,
  type = 'line',
  data,
  dataKey,
  xAxisKey = 'time',
  color = 'var(--color-primary)',
  height = 300,
  showLegend = false,
  icon,
  actions
}) => {
  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 20, left: 0, bottom: 5 }
    };

    switch (type) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <defs>
              <linearGradient id={`gradient-${dataKey}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey={xAxisKey} stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem'
              }}
            />
            {showLegend && <Legend />}
            <Area type="monotone" dataKey={dataKey} stroke={color} fill={`url(#gradient-${dataKey})`} strokeWidth={2} />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey={xAxisKey} stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem'
              }}
            />
            {showLegend && <Legend />}
            <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
          </BarChart>
        );

      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
            <XAxis dataKey={xAxisKey} stroke="var(--color-muted-foreground)" fontSize={12} />
            <YAxis stroke="var(--color-muted-foreground)" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '0.5rem'
              }}
            />
            {showLegend && <Legend />}
            <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2} dot={{ fill: color, r: 4 }} />
          </LineChart>
        );
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name={icon} size={20} className="text-primary" />
            </div>
          )}
          <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        </div>
        {actions && (
          <div className="flex items-center gap-2">
            {actions}
          </div>
        )}
      </div>

      <div className="w-full" style={{ height }} aria-label={`${title} Chart`}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartWidget;