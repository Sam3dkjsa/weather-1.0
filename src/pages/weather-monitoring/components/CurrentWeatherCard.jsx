import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CurrentWeatherCard = ({ currentWeather, location }) => {
  return (
    <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-foreground mb-1">Current Weather</h2>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Icon name="MapPin" size={16} />
            <span>{location}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-success/10 text-success text-xs font-medium">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span>Live</span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="flex items-center gap-6">
          <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
            <Image
              src={currentWeather?.icon}
              alt={currentWeather?.iconAlt}
              className="w-24 h-24 object-contain"
            />
          </div>
          <div>
            <div className="text-5xl font-bold text-foreground mb-2">
              {currentWeather?.temperature}°C
            </div>
            <div className="text-lg text-muted-foreground capitalize mb-1">
              {currentWeather?.condition}
            </div>
            <div className="text-sm text-muted-foreground">
              Feels like {currentWeather?.feelsLike}°C
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Droplets" size={20} className="text-primary" />
              <span className="text-sm text-muted-foreground">Humidity</span>
            </div>
            <div className="text-2xl font-semibold text-foreground">
              {currentWeather?.humidity}%
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Wind" size={20} className="text-primary" />
              <span className="text-sm text-muted-foreground">Wind Speed</span>
            </div>
            <div className="text-2xl font-semibold text-foreground">
              {currentWeather?.windSpeed} km/h
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Gauge" size={20} className="text-primary" />
              <span className="text-sm text-muted-foreground">Pressure</span>
            </div>
            <div className="text-2xl font-semibold text-foreground">
              {currentWeather?.pressure} hPa
            </div>
          </div>

          <div className="bg-muted/50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Icon name="Eye" size={20} className="text-primary" />
              <span className="text-sm text-muted-foreground">Visibility</span>
            </div>
            <div className="text-2xl font-semibold text-foreground">
              {currentWeather?.visibility} km
            </div>
          </div>
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-border">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="CloudRain" size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Rainfall</div>
              <div className="text-sm font-semibold text-foreground">{currentWeather?.rainfall} mm</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
              <Icon name="Sunrise" size={20} className="text-secondary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Sunrise</div>
              <div className="text-sm font-semibold text-foreground">{currentWeather?.sunrise}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Icon name="Sunset" size={20} className="text-accent" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Sunset</div>
              <div className="text-sm font-semibold text-foreground">{currentWeather?.sunset}</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="Compass" size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-xs text-muted-foreground">Wind Dir</div>
              <div className="text-sm font-semibold text-foreground">{currentWeather?.windDirection}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;