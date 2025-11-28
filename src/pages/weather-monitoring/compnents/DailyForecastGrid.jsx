import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const DailyForecastGrid = ({ dailyForecast }) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="Calendar" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">7-Day Forecast</h3>
          <p className="text-sm text-muted-foreground">Extended weather outlook</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-4">
        {dailyForecast?.map((day, index) => (
          <div
            key={index}
            className="bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors duration-150"
          >
            <div className="text-center">
              <div className="text-sm font-medium text-foreground mb-1">{day?.day}</div>
              <div className="text-xs text-muted-foreground mb-3">{day?.date}</div>

              <div className="w-16 h-16 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <Image
                  src={day?.icon}
                  alt={day?.iconAlt}
                  className="w-12 h-12 object-contain"
                />
              </div>

              <div className="text-xs text-muted-foreground capitalize mb-2">{day?.condition}</div>

              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-lg font-semibold text-foreground">{day?.maxTemp}°</span>
                <span className="text-sm text-muted-foreground">{day?.minTemp}°</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Icon name="Droplets" size={14} className="text-primary" />
                    <span className="text-muted-foreground">Rain</span>
                  </div>
                  <span className="font-medium text-foreground">{day?.rainChance}%</span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1">
                    <Icon name="Wind" size={14} className="text-primary" />
                    <span className="text-muted-foreground">Wind</span>
                  </div>
                  <span className="font-medium text-foreground">{day?.windSpeed} km/h</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyForecastGrid;