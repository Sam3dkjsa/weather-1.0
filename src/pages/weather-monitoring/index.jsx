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
// Import the new weather API service
import { getCurrentWeather, getForecast, transformCurrentWeather, transformForecast } from '../../utils/weatherApi';

const WeatherMonitoring = () => {
  const [selectedLocation, setSelectedLocation] = useState('new-york');
  const [forecastPeriod, setForecastPeriod] = useState('24-hour');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  // State for weather data
  const [currentWeather, setCurrentWeather] = useState(null);
  const [hourlyData, setHourlyData] = useState([]);
  const [dailyForecast, setDailyForecast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const locationOptions = [
    { value: 'new-york', label: 'New York, NY', coordinates: { lat: 40.7128, lng: -74.0060 } },
    { value: 'los-angeles', label: 'Los Angeles, CA', coordinates: { lat: 34.0522, lng: -118.2437 } },
    { value: 'chicago', label: 'Chicago, IL', coordinates: { lat: 41.8781, lng: -87.6298 } },
    { value: 'houston', label: 'Houston, TX', coordinates: { lat: 29.7604, lng: -95.3698 } },
    { value: 'miami', label: 'Miami, FL', coordinates: { lat: 25.7617, lng: -80.1918 } }
  ];

  const forecastPeriodOptions = [
    { value: '24-hour', label: '24-Hour Forecast' },
    { value: '7-day', label: '7-Day Forecast' },
    { value: 'monthly', label: 'Monthly Outlook' }
  ];

  // Fetch weather data when location changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      const location = locationOptions.find(loc => loc.value === selectedLocation);
      if (!location) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Fetch current weather and forecast in parallel
        const [currentWeatherRaw, forecastRaw] = await Promise.all([
          getCurrentWeather(location.coordinates.lat, location.coordinates.lng),
          getForecast(location.coordinates.lat, location.coordinates.lng)
        ]);
        
        // Transform the data for the app
        const currentWeatherTransformed = transformCurrentWeather(currentWeatherRaw);
        const forecastTransformed = transformForecast(forecastRaw);
        
        setCurrentWeather(currentWeatherTransformed);
        
        // Process hourly data from forecast
        const hourly = forecastRaw.list.slice(0, 8).map(item => ({
          time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: 'numeric' }),
          temperature: Math.round(item.main.temp),
          humidity: item.main.humidity
        }));
        setHourlyData(hourly);
        
        setDailyForecast(forecastTransformed);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to load weather data. Please try again.');
      } finally {
        setLoading(false);
        setLastUpdate(new Date());
      }
    };
    
    fetchWeatherData();
  }, [selectedLocation]);

  const historicalData = [
    { date: 'Nov 21', current: 24, average: 22 },
    { date: 'Nov 22', current: 23, average: 21 },
    { date: 'Nov 23', current: 25, average: 23 },
    { date: 'Nov 24', current: 26, average: 24 },
    { date: 'Nov 25', current: 28, average: 23 },
    { date: 'Nov 26', current: 27, average: 22 },
    { date: 'Nov 27', current: 25, average: 21 }
  ];

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
    }
  ];

  const handleExportData = () => {
    console.log('Exporting weather data...');
  };

  const handleRefreshData = async () => {
    const location = locationOptions.find(loc => loc.value === selectedLocation);
    if (!location) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [currentWeatherRaw, forecastRaw] = await Promise.all([
        getCurrentWeather(location.coordinates.lat, location.coordinates.lng),
        getForecast(location.coordinates.lat, location.coordinates.lng)
      ]);
      
      const currentWeatherTransformed = transformCurrentWeather(currentWeatherRaw);
      const forecastTransformed = transformForecast(forecastRaw);
      
      setCurrentWeather(currentWeatherTransformed);
      
      const hourly = forecastRaw.list.slice(0, 8).map(item => ({
        time: new Date(item.dt * 1000).toLocaleTimeString([], { hour: 'numeric' }),
        temperature: Math.round(item.main.temp),
        humidity: item.main.humidity
      }));
      setHourlyData(hourly);
      
      setDailyForecast(forecastTransformed);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error refreshing weather data:', err);
      setError('Failed to refresh weather data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Show loading or error states
  if (loading && !currentWeather) {
    return (
      <>
        <Helmet>
          <title>Weather Monitoring - EcoWeather Pro</title>
          <meta name="description" content="Comprehensive weather monitoring with detailed forecasts, historical data analysis, and real-time alerts for informed environmental decisions." />
        </Helmet>
        <Header />
        <main className="main-content bg-background">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin">
                <Icon name="Loader2" size={32} className="text-primary" />
              </div>
            </div>
          </div>
        </main>
      </>
    );
  }

  if (error && !currentWeather) {
    return (
      <>
        <Helmet>
          <title>Weather Monitoring - EcoWeather Pro</title>
          <meta name="description" content="Comprehensive weather monitoring with detailed forecasts, historical data analysis, and real-time alerts for informed environmental decisions." />
        </Helmet>
        <Header />
        <main className="main-content bg-background">
          <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-error/10 border border-error/20 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="AlertCircle" size={20} className="text-error" />
                <h3 className="text-lg font-medium text-error">Error Loading Weather Data</h3>
              </div>
              <p className="text-error mb-4">{error}</p>
              <Button variant="default" onClick={handleRefreshData}>Try Again</Button>
            </div>
          </div>
        </main>
      </>
    );
  }

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
                className="w-full sm:w-48"
              />

              <Select
                options={forecastPeriodOptions}
                value={forecastPeriod}
                onChange={setForecastPeriod}
                className="w-full sm:w-48"
              />

              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={handleRefreshData}
                disabled={loading}
              >
                {loading ? 'Loading...' : 'Refresh'}
              </Button>
              <Button
                variant="default"
                iconName="Download"
                iconPosition="left"
                onClick={handleExportData}
              >
                Export Data
              </Button>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-center gap-2">
                <Icon name="AlertCircle" size={16} className="text-error" />
                <span className="text-error">{error}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {currentWeather && (
                <CurrentWeatherCard
                  currentWeather={currentWeather}
                  location={locationOptions?.find(loc => loc?.value === selectedLocation)?.label}
                />
              )}

              <HourlyForecastChart
                data={hourlyData}
                forecastPeriod={forecastPeriod}
              />

              <DailyForecastGrid
                dailyForecast={dailyForecast}
              />
            </div>

            <div className="space-y-6">
              <WeatherMapView
                location={locationOptions?.find(loc => loc?.value === selectedLocation)?.label}
              />

              <HistoricalDataPanel
                data={historicalData}
              />

              <WeatherAlertsPanel
                alerts={weatherAlerts}
              />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default WeatherMonitoring;