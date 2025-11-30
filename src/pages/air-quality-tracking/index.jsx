import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import AirQualityGauge from './components/AirQualityGauge';
import PollutantCard from './components/PollutantCard';
import AirQualityChart from './components/AirQualityChart';
import HealthRecommendations from './components/HealthRecommendations';
import AlertConfiguration from './components/AlertConfiguration';
import LocationComparison from './components/LocationComparison';
import DataExport from './components/DataExport';
// Import the new weather API service
import { getAirQuality, transformAirQuality } from '../../utils/weatherApi';

const AirQualityTracking = () => {
  const [timeRange, setTimeRange] = useState('24h');
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  // State for air quality data
  const [airQualityData, setAirQualityData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Default location coordinates (New York)
  const defaultLocation = { lat: 40.7128, lng: -74.0060 };

  // Fetch air quality data on component mount and when refreshed
  useEffect(() => {
    const fetchAirQualityData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const airQualityRaw = await getAirQuality(defaultLocation.lat, defaultLocation.lng);
        const airQualityTransformed = transformAirQuality(airQualityRaw);
        setAirQualityData(airQualityTransformed);
      } catch (err) {
        console.error('Error fetching air quality data:', err);
        setError('Failed to load air quality data. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAirQualityData();
  }, []);

  const currentAQI = airQualityData ? {
    value: airQualityData.aqi * 50, // Scale AQI to 0-500 range
    max: 500,
    label: "Air Quality Index",
    unit: "AQI",
    status: getAQIStatus(airQualityData.aqi),
    icon: "Wind"
  } : {
    value: 87,
    max: 500,
    label: "Air Quality Index",
    unit: "AQI",
    status: "moderate",
    icon: "Wind"
  };

  const pollutants = airQualityData ? [
    {
      id: 1,
      name: "PM2.5",
      value: airQualityData.pm25,
      unit: "µg/m³",
      change: 12,
      trend: "up",
      icon: "Droplets",
      status: getPollutantStatus(airQualityData.pm25, 'pm25')
    },
    {
      id: 2,
      name: "PM10",
      value: airQualityData.pm10,
      unit: "µg/m³",
      change: 5,
      trend: "down",
      icon: "Wind",
      status: getPollutantStatus(airQualityData.pm10, 'pm10')
    },
    {
      id: 3,
      name: "Ozone (O₃)",
      value: airQualityData.o3,
      unit: "ppb",
      change: 8,
      trend: "up",
      icon: "CloudSun",
      status: getPollutantStatus(airQualityData.o3, 'o3')
    },
    {
      id: 4,
      name: "CO₂",
      value: airQualityData.co2,
      unit: "ppm",
      change: 3,
      trend: "up",
      icon: "Factory",
      status: "moderate"
    },
    {
      id: 5,
      name: "NO₂",
      value: airQualityData.no2,
      unit: "ppb",
      change: 15,
      trend: "down",
      icon: "Flame",
      status: getPollutantStatus(airQualityData.no2, 'no2')
    },
    {
      id: 6,
      name: "SO₂",
      value: airQualityData.so2,
      unit: "ppb",
      change: 2,
      trend: "stable",
      icon: "Zap",
      status: getPollutantStatus(airQualityData.so2, 'so2')
    },
    {
      id: 7,
      name: "CH₄ (Methane)",
      value: airQualityData.ch4,
      unit: "ppm",
      change: 0.1,
      trend: "up",
      icon: "Zap",
      status: "moderate"
    },
    {
      id: 8,
      name: "N₂O (Nitrous Oxide)",
      value: airQualityData.n2o,
      unit: "ppm",
      change: 0.001,
      trend: "up",
      icon: "Zap",
      status: "moderate"
    }
  ] : [
    {
      id: 1,
      name: "PM2.5",
      value: 35.2,
      unit: "µg/m³",
      change: 12,
      trend: "up",
      icon: "Droplets",
      status: "moderate"
    },
    {
      id: 2,
      name: "PM10",
      value: 68.5,
      unit: "µg/m³",
      change: 5,
      trend: "down",
      icon: "Wind",
      status: "moderate"
    },
    {
      id: 3,
      name: "Ozone (O₃)",
      value: 42.1,
      unit: "ppb",
      change: 8,
      trend: "up",
      icon: "CloudSun",
      status: "good"
    },
    {
      id: 4,
      name: "CO₂",
      value: 415,
      unit: "ppm",
      change: 3,
      trend: "up",
      icon: "Factory",
      status: "moderate"
    },
    {
      id: 5,
      name: "NO₂",
      value: 28.3,
      unit: "ppb",
      change: 15,
      trend: "down",
      icon: "Flame",
      status: "good"
    },
    {
      id: 6,
      name: "SO₂",
      value: 12.7,
      unit: "ppb",
      change: 2,
      trend: "stable",
      icon: "Zap",
      status: "good"
    },
    {
      id: 7,
      name: "CH₄ (Methane)",
      value: "1.9",
      unit: "ppm",
      change: 0.1,
      trend: "up",
      icon: "Zap",
      status: "moderate"
    },
    {
      id: 8,
      name: "N₂O (Nitrous Oxide)",
      value: "0.330",
      unit: "ppm",
      change: 0.001,
      trend: "up",
      icon: "Zap",
      status: "moderate"
    }
  ];

  const chartData = [
    { time: "00:00", pm25: 28, pm10: 45, ozone: 35, co2: 410, ch4: 1.8, n2o: 0.325 },
    { time: "04:00", pm25: 32, pm10: 52, ozone: 38, co2: 412, ch4: 1.82, n2o: 0.326 },
    { time: "08:00", pm25: 45, pm10: 68, ozone: 42, co2: 415, ch4: 1.85, n2o: 0.327 },
    { time: "12:00", pm25: 38, pm10: 61, ozone: 48, co2: 418, ch4: 1.87, n2o: 0.328 },
    { time: "16:00", pm25: 35, pm10: 58, ozone: 45, co2: 420, ch4: 1.88, n2o: 0.329 },
    { time: "20:00", pm25: 30, pm10: 50, ozone: 40, co2: 417, ch4: 1.86, n2o: 0.328 },
    { time: "Now", pm25: 35, pm10: 68, ozone: 42, co2: 415, ch4: 1.85, n2o: 0.327 }
  ];

  const healthRecommendations = airQualityData ? [
    {
      id: 1,
      type: "outdoor",
      severity: airQualityData.aqi <= 2 ? "safe" : airQualityData.aqi <= 3 ? "caution" : "warning",
      title: airQualityData.aqi <= 2 ? "Normal Outdoor Activities" : airQualityData.aqi <= 3 ? "Limit Outdoor Activities" : "Avoid Outdoor Activities",
      description: airQualityData.aqiImplication,
      groups: ["Children", "Elderly", "Respiratory conditions"]
    },
    {
      id: 2,
      type: "exercise",
      severity: airQualityData.aqi <= 2 ? "safe" : "caution",
      title: airQualityData.aqi <= 2 ? "Exercise Precautions" : "Modify Exercise Routine",
      description: "Light to moderate exercise is safe for most people. Those with respiratory conditions should monitor symptoms and reduce intensity if needed.",
      groups: ["Athletes", "Fitness enthusiasts"]
    },
    {
      id: 3,
      type: "mask",
      severity: airQualityData.aqi <= 2 ? "safe" : airQualityData.aqi <= 3 ? "caution" : "warning",
      title: airQualityData.aqi <= 2 ? "Masks Not Required" : "Consider Wearing Masks",
      description: airQualityData.aqi <= 2 ? "Air quality is good, masks not necessary for general population." : "N95 or KN95 masks recommended for sensitive individuals during outdoor activities, especially in high-traffic areas with elevated PM2.5 levels.",
      groups: ["Sensitive groups"]
    },
    {
      id: 4,
      type: "window",
      severity: "safe",
      title: "Ventilation Guidelines",
      description: "Indoor air quality is better than outdoor. Keep windows closed during peak pollution hours (8 AM - 12 PM). Use air purifiers if available.",
      groups: ["All residents"]
    }
  ] : [
    {
      id: 1,
      type: "outdoor",
      severity: "caution",
      title: "Limit Outdoor Activities",
      description: "Air quality is moderate. Sensitive groups should consider reducing prolonged outdoor exertion. Everyone else can enjoy outdoor activities normally.",
      groups: ["Children", "Elderly", "Respiratory conditions"]
    },
    {
      id: 2,
      type: "exercise",
      severity: "safe",
      title: "Exercise Precautions",
      description: "Light to moderate exercise is safe for most people. Those with respiratory conditions should monitor symptoms and reduce intensity if needed.",
      groups: ["Athletes", "Fitness enthusiasts"]
    },
    {
      id: 3,
      type: "mask",
      severity: "caution",
      title: "Consider Wearing Masks",
      description: "N95 or KN95 masks recommended for sensitive individuals during outdoor activities, especially in high-traffic areas with elevated PM2.5 levels.",
      groups: ["Sensitive groups"]
    },
    {
      id: 4,
      type: "window",
      severity: "safe",
      title: "Ventilation Guidelines",
      description: "Indoor air quality is better than outdoor. Keep windows closed during peak pollution hours (8 AM - 12 PM). Use air purifiers if available.",
      groups: ["All residents"]
    }
  ];

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      name: "PM2.5 Alert",
      threshold: 35,
      unit: "µg/m³",
      enabled: true,
      icon: "Droplets"
    },
    {
      id: 2,
      name: "PM10 Alert",
      threshold: 50,
      unit: "µg/m³",
      enabled: true,
      icon: "Wind"
    },
    {
      id: 3,
      name: "Ozone Alert",
      threshold: 70,
      unit: "ppb",
      enabled: false,
      icon: "CloudSun"
    },
    {
      id: 4,
      name: "CO₂ Alert",
      threshold: 450,
      unit: "ppm",
      enabled: true,
      icon: "Factory"
    }
  ]);

  const locations = [
    {
      id: 1,
      name: "New York, NY",
      aqi: airQualityData ? airQualityData.aqi * 50 : 87,
      pollutants: airQualityData ? [
        { name: "PM2.5", value: airQualityData.pm25, unit: "µg/m³" },
        { name: "PM10", value: airQualityData.pm10, unit: "µg/m³" },
        { name: "O₃", value: airQualityData.o3, unit: "ppb" },
        { name: "CO₂", value: 412, unit: "ppm" }
      ] : [
        { name: "PM2.5", value: 35.2, unit: "µg/m³" },
        { name: "PM10", value: 68.5, unit: "µg/m³" },
        { name: "O₃", value: 42.1, unit: "ppb" },
        { name: "CO₂", value: 412, unit: "ppm" }
      ],
      recommendation: airQualityData ? airQualityData.aqiImplication : "Air quality is acceptable for most people. Sensitive groups should consider reducing prolonged outdoor activities."
    },
    {
      id: 2,
      name: "Los Angeles, CA",
      aqi: 105,
      pollutants: [
        { name: "PM2.5", value: 42.8, unit: "µg/m³" },
        { name: "PM10", value: 78.2, unit: "µg/m³" },
        { name: "O₃", value: 58.3, unit: "ppb" },
        { name: "CO₂", value: 425, unit: "ppm" }
      ],
      recommendation: "Unhealthy for sensitive groups. Everyone should reduce prolonged outdoor exertion. Sensitive groups should avoid outdoor activities."
    },
    {
      id: 3,
      name: "Chicago, IL",
      aqi: 62,
      pollutants: [
        { name: "PM2.5", value: 22.5, unit: "µg/m³" },
        { name: "PM10", value: 45.8, unit: "µg/m³" },
        { name: "O₃", value: 35.2, unit: "ppb" },
        { name: "CO₂", value: 398, unit: "ppm" }
      ],
      recommendation: "Air quality is good. Ideal conditions for outdoor activities for all population groups."
    }
  ];

  const handleRefresh = async () => {
    setRefreshing(true);
    setError(null);
    
    try {
      const airQualityRaw = await getAirQuality(defaultLocation.lat, defaultLocation.lng);
      const airQualityTransformed = transformAirQuality(airQualityRaw);
      setAirQualityData(airQualityTransformed);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error refreshing air quality data:', err);
      setError('Failed to refresh air quality data. Please try again.');
    } finally {
      setRefreshing(false);
    }
  };

  const handleExport = async (options) => {
    console.log("Exporting data with options:", options);
    return new Promise(resolve => setTimeout(resolve, 2000));
  };

  const handleAlertSave = (updatedAlerts) => {
    setAlerts(updatedAlerts);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const formatLastUpdate = () => {
    const now = new Date();
    const diff = Math.floor((now - lastUpdate) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  // Helper function to determine AQI status
  function getAQIStatus(aqi) {
    if (aqi <= 1) return "good";
    if (aqi <= 2) return "fair";
    if (aqi <= 3) return "moderate";
    if (aqi <= 4) return "poor";
    return "very-poor";
  }

  // Helper function to determine pollutant status
  function getPollutantStatus(value, type) {
    const thresholds = {
      pm25: { good: 12, fair: 35, moderate: 55, poor: 150 },
      pm10: { good: 25, fair: 50, moderate: 90, poor: 250 },
      o3: { good: 60, fair: 100, moderate: 140, poor: 240 },
      no2: { good: 20, fair: 40, moderate: 70, poor: 120 },
      so2: { good: 20, fair: 50, moderate: 100, poor: 200 }
    };

    const limits = thresholds[type] || thresholds.pm25;
    
    if (value <= limits.good) return "good";
    if (value <= limits.fair) return "fair";
    if (value <= limits.moderate) return "moderate";
    if (value <= limits.poor) return "poor";
    return "very-poor";
  }

  // Show loading or error states
  if (loading && !airQualityData) {
    return (
      <>
        <Helmet>
          <title>Air Quality Tracking - EcoWeather Pro</title>
          <meta name="description" content="Monitor real-time air quality data including PM2.5, PM10, ozone levels, and greenhouse gas concentrations with health recommendations and alerts." />
        </Helmet>
        <Header />
        <main className="main-content bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
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

  if (error && !airQualityData) {
    return (
      <>
        <Helmet>
          <title>Air Quality Tracking - EcoWeather Pro</title>
          <meta name="description" content="Monitor real-time air quality data including PM2.5, PM10, ozone levels, and greenhouse gas concentrations with health recommendations and alerts." />
        </Helmet>
        <Header />
        <main className="main-content bg-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-error/10 border border-error/20 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Icon name="AlertCircle" size={20} className="text-error" />
                <h3 className="text-lg font-medium text-error">Error Loading Air Quality Data</h3>
              </div>
              <p className="text-error mb-4">{error}</p>
              <Button variant="default" onClick={handleRefresh}>Try Again</Button>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Air Quality Tracking - EcoWeather Pro</title>
        <meta name="description" content="Monitor real-time air quality data including PM2.5, PM10, ozone levels, and greenhouse gas concentrations with health recommendations and alerts." />
      </Helmet>
      <Header />
      <main className="main-content bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Air Quality Tracking</h1>
              <p className="text-sm text-muted-foreground">
                Real-time monitoring of atmospheric conditions and pollutant levels
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-2 bg-card border border-border rounded-lg">
                <Icon name="Clock" size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Updated {formatLastUpdate()}</span>
              </div>
              <Button
                variant="outline"
                iconName="RefreshCw"
                loading={refreshing}
                onClick={handleRefresh}
              >
                Refresh
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

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <div className="lg:col-span-2">
              <AirQualityGauge {...currentAQI} />
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-sm font-medium text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Overall Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    currentAQI.status === 'good' ? 'bg-success/10 text-success' :
                    currentAQI.status === 'fair' ? 'bg-info/10 text-info' :
                    currentAQI.status === 'moderate' ? 'bg-warning/10 text-warning' :
                    currentAQI.status === 'poor' ? 'bg-error/10 text-error' :
                    'bg-destructive/10 text-destructive'
                  }`}>
                    {currentAQI.status.charAt(0).toUpperCase() + currentAQI.status.slice(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Dominant Pollutant</span>
                  <span className="text-xs font-medium text-foreground">PM10</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Health Impact</span>
                  <span className="text-xs font-medium text-foreground">
                    {currentAQI.status === 'good' ? 'Minimal' :
                     currentAQI.status === 'fair' ? 'Low' :
                     currentAQI.status === 'moderate' ? 'Low-Moderate' :
                     currentAQI.status === 'poor' ? 'Moderate' : 'Significant'}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Visibility</span>
                  <span className="text-xs font-medium text-foreground">8.2 km</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Pollutant Levels</h2>
              <div className="flex gap-2">
                <Button
                  variant={timeRange === '24h' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange('24h')}
                >
                  24H
                </Button>
                <Button
                  variant={timeRange === '7d' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange('7d')}
                >
                  7D
                </Button>
                <Button
                  variant={timeRange === '30d' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTimeRange('30d')}
                >
                  30D
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {pollutants?.map((pollutant) => (
                <PollutantCard key={pollutant?.id} {...pollutant} />
              ))}
            </div>
          </div>

          <div className="mb-6">
            <AirQualityChart data={chartData} title="Air Quality Trends (24 Hours)" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <HealthRecommendations recommendations={healthRecommendations} />
            <AlertConfiguration alerts={alerts} onSave={handleAlertSave} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <LocationComparison locations={locations} />
            <DataExport onExport={handleExport} />
          </div>
        </div>
      </main>
    </>
  );
};

export default AirQualityTracking;