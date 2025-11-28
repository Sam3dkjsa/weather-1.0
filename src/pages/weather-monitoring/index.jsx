import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Select from '../../components/ui/Select';
import CurrentWeatherCard from './components/CurrentWeatherCard';
import HourlyForecastChart from './components/HourlyForecastChart';
import DailyForecastGrid from './components/DailyForecastGrid';
import WeatherMapView from './components/WeatherMapView';
import HistoricalDataPanel from './components/HistoricalDataPanel';
import WeatherAlertsPanel from './components/WeatherAlertsPanel';

const WeatherMonitoring = () => {
  const [selectedLocation, setSelectedLocation] = useState('new-york');
  const [forecastPeriod, setForecastPeriod] = useState('24-hour');
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const locationOptions = [
  { value: 'new-york', label: 'New York, NY' },
  { value: 'los-angeles', label: 'Los Angeles, CA' },
  { value: 'chicago', label: 'Chicago, IL' },
  { value: 'houston', label: 'Houston, TX' },
  { value: 'miami', label: 'Miami, FL' }];


  const forecastPeriodOptions = [
  { value: '24-hour', label: '24-Hour Forecast' },
  { value: '7-day', label: '7-Day Forecast' },
  { value: 'monthly', label: 'Monthly Outlook' }];


  const currentWeather = {
    temperature: 24,
    feelsLike: 22,
    condition: 'partly cloudy',
    humidity: 65,
    windSpeed: 18,
    windDirection: 'NE',
    pressure: 1013,
    visibility: 10,
    rainfall: 2.5,
    sunrise: '06:42 AM',
    sunset: '05:18 PM',
    icon: "https://images.unsplash.com/photo-1716152937181-892e450ed5af",
    iconAlt: 'Partly cloudy sky with white fluffy clouds scattered across bright blue background during daytime'
  };

  const hourlyData = [
  { time: '12 AM', temperature: 22, humidity: 68 },
  { time: '3 AM', temperature: 21, humidity: 70 },
  { time: '6 AM', temperature: 20, humidity: 72 },
  { time: '9 AM', temperature: 23, humidity: 65 },
  { time: '12 PM', temperature: 26, humidity: 58 },
  { time: '3 PM', temperature: 28, humidity: 52 },
  { time: '6 PM', temperature: 25, humidity: 60 },
  { time: '9 PM', temperature: 23, humidity: 65 },
  { time: '12 AM', temperature: 22, humidity: 68 }];


  const dailyForecast = [
  {
    day: 'Today',
    date: 'Nov 28',
    maxTemp: 28,
    minTemp: 20,
    condition: 'partly cloudy',
    rainChance: 20,
    windSpeed: 18,
    icon: "https://images.unsplash.com/photo-1716152937181-892e450ed5af",
    iconAlt: 'Partly cloudy sky with scattered white clouds over blue background'
  },
  {
    day: 'Fri',
    date: 'Nov 29',
    maxTemp: 26,
    minTemp: 19,
    condition: 'sunny',
    rainChance: 10,
    windSpeed: 15,
    icon: "https://images.unsplash.com/photo-1709129917888-204b919cb8fb",
    iconAlt: 'Clear bright sunny sky with golden sun rays shining through atmosphere'
  },
  {
    day: 'Sat',
    date: 'Nov 30',
    maxTemp: 25,
    minTemp: 18,
    condition: 'cloudy',
    rainChance: 40,
    windSpeed: 20,
    icon: "https://images.unsplash.com/photo-1617175757904-45d1d57fd0c7",
    iconAlt: 'Overcast cloudy sky with dense gray clouds covering entire atmosphere'
  },
  {
    day: 'Sun',
    date: 'Dec 1',
    maxTemp: 23,
    minTemp: 17,
    condition: 'rainy',
    rainChance: 80,
    windSpeed: 25,
    icon: "https://images.unsplash.com/photo-1641980168515-6d8c7b7350a3",
    iconAlt: 'Heavy rain falling from dark storm clouds with water droplets visible in air'
  },
  {
    day: 'Mon',
    date: 'Dec 2',
    maxTemp: 24,
    minTemp: 18,
    condition: 'partly cloudy',
    rainChance: 30,
    windSpeed: 16,
    icon: "https://images.unsplash.com/photo-1716152937181-892e450ed5af",
    iconAlt: 'Partly cloudy sky with white clouds scattered across blue background'
  },
  {
    day: 'Tue',
    date: 'Dec 3',
    maxTemp: 27,
    minTemp: 20,
    condition: 'sunny',
    rainChance: 5,
    windSpeed: 12,
    icon: "https://images.unsplash.com/photo-1638180496767-74184affa616",
    iconAlt: 'Bright sunny day with clear blue sky and golden sunlight'
  },
  {
    day: 'Wed',
    date: 'Dec 4',
    maxTemp: 29,
    minTemp: 21,
    condition: 'sunny',
    rainChance: 0,
    windSpeed: 10,
    icon: "https://images.unsplash.com/photo-1669650061954-a6cd3047cf62",
    iconAlt: 'Clear sunny sky with bright golden sun and no clouds visible'
  }];


  const historicalData = [
  { date: 'Nov 21', current: 24, average: 22 },
  { date: 'Nov 22', current: 23, average: 21 },
  { date: 'Nov 23', current: 25, average: 23 },
  { date: 'Nov 24', current: 26, average: 24 },
  { date: 'Nov 25', current: 28, average: 23 },
  { date: 'Nov 26', current: 27, average: 22 },
  { date: 'Nov 27', current: 25, average: 21 }];


  const weatherAlerts = [
  {
    id: 1,
    severity: 'warning',
    title: 'High Wind Advisory',
    description: 'Sustained winds of 25-35 km/h with gusts up to 50 km/h expected this afternoon.',
    location: 'New York, NY',
    time: '2 hours ago',
    validUntil: '6:00 PM'
  },
  {
    id: 2,
    severity: 'info',
    title: 'Temperature Drop Expected',
    description: 'Temperatures will drop by 5-7°C overnight. Consider bringing plants indoors.',
    location: 'New York, NY',
    time: '4 hours ago',
    validUntil: 'Tomorrow 8:00 AM'
  }];


  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const handleExportData = () => {
    console.log('Exporting weather data...');
  };

  const handleRefreshData = () => {
    setLastUpdate(new Date());
    console.log('Refreshing weather data...');
  };

  return (
    <>
      <Helmet>
        <title>Weather Monitoring - EcoWeather Pro</title>
        <meta name="description" content="Comprehensive weather monitoring with detailed forecasts, historical data analysis, and real-time alerts for informed environmental decisions." />
      </Helmet>
      <Header />
      <main className="main-content bg-background">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Weather Monitoring</h1>
              <p className="text-muted-foreground">Detailed meteorological data and forecasting capabilities</p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <Select
                options={locationOptions}
                value={selectedLocation}
                onChange={setSelectedLocation}
                className="w-full sm:w-48" />

              <Select
                options={forecastPeriodOptions}
                value={forecastPeriod}
                onChange={setForecastPeriod}
                className="w-full sm:w-48" />

              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={handleRefreshData}>

                Refresh
              </Button>
              <Button
                variant="default"
                iconName="Download"
                iconPosition="left"
                onClick={handleExportData}>

                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <CurrentWeatherCard
                currentWeather={currentWeather}
                location={locationOptions?.find((loc) => loc?.value === selectedLocation)?.label || 'New York, NY'} />

            </div>
            <div>
              <WeatherAlertsPanel alerts={weatherAlerts} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6">
            <HourlyForecastChart hourlyData={hourlyData} />
          </div>

          <div className="grid grid-cols-1 gap-6 mb-6">
            <DailyForecastGrid dailyForecast={dailyForecast} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <WeatherMapView
              location={locationOptions?.find((loc) => loc?.value === selectedLocation)?.label || 'New York, NY'} />

            <HistoricalDataPanel historicalData={historicalData} />
          </div>

          <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Info" size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">Data Sources</h3>
                  <p className="text-xs text-muted-foreground">Weather data provided by NOAA, NASA, and local meteorological stations</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span>Last updated: {lastUpdate?.toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>);

};

export default WeatherMonitoring;