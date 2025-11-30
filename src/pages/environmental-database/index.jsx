import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import MetricCard from './components/MetricCard';
import ChartWidget from './components/ChartWidget';
import AlertCard from './components/AlertCard';
import PlantPerformanceCard from './components/PlantPerformanceCard';
import QuickActionButton from './components/QuickActionButton';
import LocationSwitcher from './components/LocationSwitcher';
import DataExportModal from './components/DataExportModal';
import AddLocationModal from './components/AddLocationModal';
// Import the new weather API service
import { getCurrentWeather, getForecast, getAirQuality, transformCurrentWeather, transformForecast, transformAirQuality } from '../../utils/weatherApi';
// Import carbon sequestration utilities
import { calculateTotalCarbonSequestration, calculateCarbonOffsetEquivalent } from '../../utils/carbonSequestration';

const EnvironmentalDashboard = () => {
  const navigate = useNavigate();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(() => {
    // Load current location from localStorage or default to New York
    try {
      const saved = localStorage?.getItem('currentLocation');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error('Error parsing current location from localStorage', e);
    }
    return {
      value: 'new-york',
      label: 'New York, NY',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    };
  });
  const [lastUpdate, setLastUpdate] = useState(new Date());
  // State for weather data
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const defaultLocations = [
    { value: 'new-york', label: 'New York, NY', coordinates: { lat: 40.7128, lng: -74.0060 } },
    { value: 'los-angeles', label: 'Los Angeles, CA', coordinates: { lat: 34.0522, lng: -118.2437 } },
    { value: 'chicago', label: 'Chicago, IL', coordinates: { lat: 41.8781, lng: -87.6298 } },
    { value: 'houston', label: 'Houston, TX', coordinates: { lat: 29.7604, lng: -95.3698 } },
    { value: 'miami', label: 'Miami, FL', coordinates: { lat: 25.7617, lng: -80.1918 } }
  ];

  const [customLocations, setCustomLocations] = useState(() => {
    try {
      const saved = localStorage?.getItem('customLocations');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error parsing custom locations from localStorage', e);
      return [];
    }
  });

  const allLocations = [...defaultLocations, ...customLocations];

  // Fetch weather data when location changes
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!currentLocation?.coordinates) return;
      
      setLoading(true);
      setError(null);
      
      try {
        console.log('Fetching weather data for:', currentLocation);
        // Fetch all weather data in parallel
        const [currentWeatherRaw, forecastRaw, airQualityRaw] = await Promise.all([
          getCurrentWeather(currentLocation.coordinates.lat, currentLocation.coordinates.lng),
          getForecast(currentLocation.coordinates.lat, currentLocation.coordinates.lng),
          getAirQuality(currentLocation.coordinates.lat, currentLocation.coordinates.lng)
        ]);
        
        console.log('Raw data received:', { currentWeatherRaw, forecastRaw, airQualityRaw });
        
        // Transform the data for the app
        const currentWeather = transformCurrentWeather(currentWeatherRaw);
        const forecast = transformForecast(forecastRaw);
        const airQuality = transformAirQuality(airQualityRaw);
        
        console.log('Transformed data:', { currentWeather, forecast, airQuality });
        
        setWeatherData(currentWeather);
        setForecastData(forecast);
        setAirQualityData(airQuality);
        setLastUpdate(new Date());
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError(`Failed to load weather data: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeatherData();
  }, [currentLocation]);

  const currentMetrics = weatherData && airQualityData ? [
    {
      title: 'Temperature',
      value: weatherData.temperature,
      unit: '°C',
      icon: 'Thermometer',
      trend: 'up',
      trendValue: '+2.5°',
      status: 'good',
      description: 'Comfortable range'
    },
    {
      title: 'Air Quality Index',
      value: airQualityData.aqi,
      unit: 'AQI',
      icon: 'Wind',
      trend: 'down',
      trendValue: '-8',
      status: 'good',
      description: airQualityData.aqiDescription
    },
    {
      title: 'Humidity',
      value: weatherData.humidity,
      unit: '%',
      icon: 'Droplets',
      trend: 'stable',
      trendValue: '0%',
      status: 'good',
      description: 'Optimal humidity'
    },
    {
      title: 'PM2.5 (SPM)',
      value: airQualityData.pm25,
      unit: 'µg/m³',
      icon: 'CloudRain',
      trend: 'up',
      trendValue: '+5 µg/m³',
      status: airQualityData.pm25 <= 12 ? 'good' : airQualityData.pm25 <= 35 ? 'moderate' : 'poor',
      description: airQualityData.pm25 <= 12 ? 'Good' : airQualityData.pm25 <= 35 ? 'Moderate' : 'Unhealthy'
    },
    {
      title: 'CO₂ Levels',
      value: airQualityData.co2,
      unit: 'ppm',
      icon: 'Factory',
      trend: 'up',
      trendValue: '+3 ppm',
      status: 'moderate',
      description: 'Slightly elevated'
    },
    {
      title: 'Rain Probability',
      value: forecastData && forecastData.length > 0 ? forecastData[0].rainProbability : 0,
      unit: '%',
      icon: 'CloudRain',
      trend: 'up',
      trendValue: '+15%',
      status: 'moderate',
      description: 'Chance of precipitation'
    }
  ].filter(Boolean) : [];

  const temperatureData = weatherData ? [
    { time: '00:00', value: weatherData.temperature - 2 },
    { time: '04:00', value: weatherData.temperature - 3 },
    { time: '08:00', value: weatherData.temperature - 1 },
    { time: '12:00', value: weatherData.temperature + 2 },
    { time: '16:00', value: weatherData.temperature + 1 },
    { time: '20:00', value: weatherData.temperature - 1 },
    { time: '24:00', value: weatherData.temperature - 2 }
  ] : [];

  const airQualityDataPoints = airQualityData ? [
    { time: 'Mon', value: airQualityData.aqi - 3 },
    { time: 'Tue', value: airQualityData.aqi - 5 },
    { time: 'Wed', value: airQualityData.aqi + 2 },
    { time: 'Thu', value: airQualityData.aqi - 1 },
    { time: 'Fri', value: airQualityData.aqi },
    { time: 'Sat', value: airQualityData.aqi + 1 },
    { time: 'Sun', value: airQualityData.aqi - 2 }
  ] : [];

  const spmDataPoints = airQualityData ? [
    { time: 'Mon', value: airQualityData.pm25 - 2 },
    { time: 'Tue', value: airQualityData.pm25 - 4 },
    { time: 'Wed', value: airQualityData.pm25 + 3 },
    { time: 'Thu', value: airQualityData.pm25 - 1 },
    { time: 'Fri', value: airQualityData.pm25 },
    { time: 'Sat', value: airQualityData.pm25 + 2 },
    { time: 'Sun', value: airQualityData.pm25 - 3 }
  ] : [];

  const co2DataPoints = airQualityData ? [
    { time: 'Mon', value: airQualityData.co2 - 2 },
    { time: 'Tue', value: airQualityData.co2 - 4 },
    { time: 'Wed', value: airQualityData.co2 + 3 },
    { time: 'Thu', value: airQualityData.co2 - 1 },
    { time: 'Fri', value: airQualityData.co2 },
    { time: 'Sat', value: airQualityData.co2 + 2 },
    { time: 'Sun', value: airQualityData.co2 - 3 }
  ] : [];

  // Sample plant data for carbon sequestration calculation
  const samplePlants = [
    { id: 1, name: "Snake Plant", type: "herb", height: 0.6, width: 0.3, age: 2, species: "Sansevieria trifasciata" },
    { id: 2, name: "Spider Plant", type: "herb", height: 0.3, width: 0.4, age: 1, species: "Chlorophytum comosum" },
    { id: 3, name: "Peace Lily", type: "herb", height: 0.5, width: 0.5, age: 3, species: "Spathiphyllum wallisii" },
    { id: 4, name: "Rubber Plant", type: "tree", height: 1.2, width: 0.8, age: 4, species: "Ficus elastica" }
  ];

  // Calculate carbon sequestration
  const carbonSequestrationData = calculateTotalCarbonSequestration(samplePlants);
  const carbonOffsetEquivalent = calculateCarbonOffsetEquivalent(carbonSequestrationData.total);

  const handleLocationChange = (location) => {
    setCurrentLocation(location);
    localStorage.setItem('currentLocation', JSON.stringify(location));
  };

  const handleAddLocation = (newLocation) => {
    const updatedCustomLocations = [...customLocations, newLocation];
    setCustomLocations(updatedCustomLocations);
    localStorage.setItem('customLocations', JSON.stringify(updatedCustomLocations));
    handleLocationChange(newLocation);
  };

  const handleDeleteLocation = (locationToDelete) => {
    const updatedCustomLocations = customLocations.filter(
      loc => loc.value !== locationToDelete.value
    );
    setCustomLocations(updatedCustomLocations);
    localStorage.setItem('customLocations', JSON.stringify(updatedCustomLocations));
    
    // If the deleted location was the current one, switch to default
    if (currentLocation.value === locationToDelete.value) {
      handleLocationChange(defaultLocations[0]);
    }
  };

  const handleRefresh = async () => {
    // Refetch weather data
    if (!currentLocation?.coordinates) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [currentWeatherRaw, forecastRaw, airQualityRaw] = await Promise.all([
        getCurrentWeather(currentLocation.coordinates.lat, currentLocation.coordinates.lng),
        getForecast(currentLocation.coordinates.lat, currentLocation.coordinates.lng),
        getAirQuality(currentLocation.coordinates.lat, currentLocation.coordinates.lng)
      ]);
      
      const currentWeather = transformCurrentWeather(currentWeatherRaw);
      const forecast = transformForecast(forecastRaw);
      const airQuality = transformAirQuality(airQualityRaw);
      
      setWeatherData(currentWeather);
      setForecastData(forecast);
      setAirQualityData(airQuality);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error refreshing weather data:', err);
      setError(`Failed to refresh weather data: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="main-content bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Environmental Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Comprehensive monitoring of weather conditions and environmental metrics
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-xs text-muted-foreground">
                Last updated: {lastUpdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
              <Button 
                variant="outline" 
                iconName="RefreshCw" 
                iconPosition="left"
                onClick={handleRefresh}
                disabled={loading}
                className="bg-card border-border"
              >
                {loading ? 'Loading...' : 'Refresh'}
              </Button>
              <Button 
                variant="default" 
                iconName="Plus" 
                iconPosition="left"
                onClick={() => setIsAddLocationModalOpen(true)}
              >
                Add Location
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Current Conditions</h2>
                    <p className="text-sm text-muted-foreground">Real-time environmental metrics</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-success animate-pulse"></div>
                    <span className="text-xs text-muted-foreground">Live</span>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentMetrics.length > 0 ? (
                    currentMetrics.map((metric, index) => (
                      <MetricCard key={index} metric={metric} />
                    ))
                  ) : (
                    <div className="col-span-full text-center py-8">
                      <p className="text-muted-foreground">No weather data available. Please try refreshing.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon name="MapPin" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Location</h3>
                    <p className="text-sm text-muted-foreground">Current monitoring site</p>
                  </div>
                </div>
                <LocationSwitcher
                  currentLocation={currentLocation}
                  locations={allLocations}
                  onLocationChange={handleLocationChange}
                  onDeleteLocation={handleDeleteLocation}
                />
              </div>
              
              <AlertCard
                title="Weather Advisory"
                message="High UV index expected today. Limit outdoor exposure between 10am-4pm."
                severity="warning"
                time="2 hours ago"
              />
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

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin">
                <Icon name="Loader2" size={32} className="text-primary" />
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-semibold text-foreground">Environmental Overview</h2>
                      <p className="text-sm text-muted-foreground">Key metrics and trends</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm" iconName="BarChart3" iconPosition="left">
                        View Detailed Report
                      </Button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                    <ChartWidget
                      title="Temperature Trend"
                      data={temperatureData}
                      color="primary"
                      icon="Thermometer"
                      height={300}
                    />
                    <ChartWidget
                      title="Humidity Levels"
                      data={temperatureData}
                      color="secondary"
                      icon="Droplets"
                      height={300}
                    />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <ChartWidget
                      title="Air Quality Index"
                      data={airQualityDataPoints}
                      color="secondary"
                      icon="Wind"
                      height={300}
                    />
                    <ChartWidget
                      title="SPM (PM2.5) Levels"
                      data={spmDataPoints}
                      color="#DC2626"
                      icon="CloudRain"
                      height={300}
                    />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                        <Icon name="Leaf" size={20} className="text-success" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">Carbon Sequestration</h3>
                        <p className="text-sm text-muted-foreground">Environmental impact of your plants</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Total Sequestration</div>
                        <div className="text-2xl font-bold text-foreground">{carbonSequestrationData?.formattedTotal || '0 kg CO2/year'}</div>
                      </div>
                      <div className="bg-muted/50 rounded-lg p-4 text-center">
                        <div className="text-xs text-muted-foreground mb-1">Tree Equivalent</div>
                        <div className="text-2xl font-bold text-foreground">{carbonOffsetEquivalent?.treeYears?.toFixed(1) || '0'} years</div>
                      </div>
                    </div>
                  </div>
                  
                  <AlertCard
                    title="Weather Advisory"
                    message="High UV index expected today. Limit outdoor exposure between 10am-4pm."
                    severity="warning"
                    time="2 hours ago"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <ChartWidget
                  title="CO₂ Levels"
                  data={co2DataPoints}
                  color="#4A90A4"
                  icon="Factory"
                  height={300}
                />
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-foreground mb-6">GHG Monitoring</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <div className="text-xs text-muted-foreground mb-1">CH₄</div>
                      <div className="text-xl font-bold text-foreground">{airQualityData?.ch4 || '1.9'} ppm</div>
                      <div className="text-xs text-success mt-1">↓ 0.1%</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <div className="text-xs text-muted-foreground mb-1">N₂O</div>
                      <div className="text-xl font-bold text-foreground">{airQualityData?.n2o || '0.330'} ppm</div>
                      <div className="text-xs text-error mt-1">↑ 0.001%</div>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-4 text-center">
                      <div className="text-xs text-muted-foreground mb-1">CO</div>
                      <div className="text-xl font-bold text-foreground">{airQualityData?.co || '0.8'} ppm</div>
                      <div className="text-xs text-warning mt-1">→ Stable</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-6 shadow-sm mb-6">
                <h2 className="text-xl font-semibold text-foreground mb-6">Quick Actions</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  <QuickActionButton
                    title="Weather Forecast"
                    description="7-day detailed forecast"
                    icon="CloudSun"
                    onClick={() => navigate('/weather-monitoring')}
                  />
                  <QuickActionButton
                    title="Air Quality"
                    description="Real-time pollution tracking"
                    icon="Wind"
                    onClick={() => navigate('/air-quality-tracking')}
                  />
                  <QuickActionButton
                    title="Plant Care"
                    description="Air purification guide"
                    icon="Leaf"
                    onClick={() => navigate('/plant-air-purification')}
                  />
                  <QuickActionButton
                    title="Carbon Tracking"
                    description="Monitor carbon sequestration"
                    icon="Activity"
                    onClick={() => navigate('/plant-air-purification')}
                  />
                  <QuickActionButton
                    title="Export Data"
                    description="Download environmental reports"
                    icon="Download"
                    onClick={() => setIsExportModalOpen(true)}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <DataExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      <AddLocationModal
        isOpen={isAddLocationModalOpen}
        onClose={() => setIsAddLocationModalOpen(false)}
        onAddLocation={handleAddLocation}
      />
    </>
  );
};

export default EnvironmentalDashboard;