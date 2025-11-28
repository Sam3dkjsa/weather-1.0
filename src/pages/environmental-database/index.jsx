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

const EnvironmentalDashboard = () => {
  const navigate = useNavigate();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isAddLocationModalOpen, setIsAddLocationModalOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState({
    value: 'new-york',
    label: 'New York, NY',
    coordinates: { lat: 40.7128, lng: -74.0060 }
  });
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const defaultLocations = [
    { value: 'new-york', label: 'New York, NY', coordinates: { lat: 40.7128, lng: -74.0060 } },
    { value: 'los-angeles', label: 'Los Angeles, CA', coordinates: { lat: 34.0522, lng: -118.2437 } },
    { value: 'chicago', label: 'Chicago, IL', coordinates: { lat: 41.8781, lng: -87.6298 } },
    { value: 'houston', label: 'Houston, TX', coordinates: { lat: 29.7604, lng: -95.3698 } },
    { value: 'miami', label: 'Miami, FL', coordinates: { lat: 25.7617, lng: -80.1918 } }
  ];

  const [customLocations, setCustomLocations] = useState(() => {
    const saved = localStorage?.getItem('customLocations');
    return saved ? JSON.parse(saved) : [];
  });

  const allLocations = [...defaultLocations, ...customLocations];


  const currentMetrics = [
  {
    title: 'Temperature',
    value: '72',
    unit: '°F',
    icon: 'Thermometer',
    trend: 'up',
    trendValue: '+2.5°',
    status: 'good',
    description: 'Comfortable range'
  },
  {
    title: 'Air Quality Index',
    value: '42',
    unit: 'AQI',
    icon: 'Wind',
    trend: 'down',
    trendValue: '-8',
    status: 'good',
    description: 'Good air quality'
  },
  {
    title: 'Humidity',
    value: '65',
    unit: '%',
    icon: 'Droplets',
    trend: 'stable',
    trendValue: '0%',
    status: 'good',
    description: 'Optimal humidity'
  },
  {
    title: 'CO₂ Levels',
    value: '412',
    unit: 'ppm',
    icon: 'CloudRain',
    trend: 'up',
    trendValue: '+3 ppm',
    status: 'moderate',
    description: 'Slightly elevated'
  }];


  const temperatureData = [
  { time: '00:00', value: 68 },
  { time: '04:00', value: 65 },
  { time: '08:00', value: 70 },
  { time: '12:00', value: 75 },
  { time: '16:00', value: 72 },
  { time: '20:00', value: 69 },
  { time: '24:00', value: 67 }];


  const airQualityData = [
  { time: 'Mon', value: 45 },
  { time: 'Tue', value: 38 },
  { time: 'Wed', value: 52 },
  { time: 'Thu', value: 41 },
  { time: 'Fri', value: 48 },
  { time: 'Sat', value: 42 },
  { time: 'Sun', value: 39 }];


  const greenhouseData = [
  { time: 'Jan', value: 405 },
  { time: 'Feb', value: 408 },
  { time: 'Mar', value: 410 },
  { time: 'Apr', value: 412 },
  { time: 'May', value: 415 },
  { time: 'Jun', value: 418 }];


  const alerts = [
  {
    type: 'warning',
    title: 'High Pollen Count Alert',
    message: 'Pollen levels are expected to be high today. Consider limiting outdoor activities if you have allergies.',
    timestamp: '2 hours ago',
    location: 'New York, NY',
    actionLabel: 'View Details'
  },
  {
    type: 'info',
    title: 'Rain Forecast',
    message: 'Light rain expected this evening between 6 PM and 9 PM. Rainfall amount: 0.2 inches.',
    timestamp: '4 hours ago',
    location: 'New York, NY',
    actionLabel: 'View Forecast'
  },
  {
    type: 'success',
    title: 'Air Quality Improved',
    message: 'Air quality has improved to Good category. Safe for outdoor activities and exercise.',
    timestamp: '6 hours ago',
    location: 'New York, NY'
  }];


  const plantPerformance = [
  {
    plantName: 'Snake Plant',
    plantImage: "https://images.unsplash.com/photo-1703672363402-b10805ffe665",
    plantImageAlt: 'Tall green snake plant with vertical striped leaves in white ceramic pot on wooden table',
    co2Absorbed: '2.4 kg/day',
    o2Released: '1.8 kg/day',
    efficiency: 92,
    location: 'Living Room',
    status: 'excellent'
  },
  {
    plantName: 'Peace Lily',
    plantImage: "https://images.unsplash.com/photo-1594015996170-b3a112ab7a1e",
    plantImageAlt: 'White peace lily flower with glossy green leaves in decorative pot against light background',
    co2Absorbed: '1.8 kg/day',
    o2Released: '1.3 kg/day',
    efficiency: 85,
    location: 'Bedroom',
    status: 'good'
  },
  {
    plantName: 'Spider Plant',
    plantImage: "https://images.unsplash.com/photo-1684569653013-b6b23c8e5fc8",
    plantImageAlt: 'Cascading spider plant with long green and white striped leaves in hanging basket',
    co2Absorbed: '1.5 kg/day',
    o2Released: '1.1 kg/day',
    efficiency: 78,
    location: 'Kitchen',
    status: 'good'
  }];


  const quickActions = [
  {
    icon: 'CloudSun',
    label: 'Weather Monitoring',
    description: 'View detailed weather forecasts',
    path: '/weather-monitoring'
  },
  {
    icon: 'Wind',
    label: 'Air Quality Tracking',
    description: 'Monitor air quality metrics',
    path: '/air-quality-tracking'
  },
  {
    icon: 'Leaf',
    label: 'Plant Management',
    description: 'Manage your air purifying plants',
    path: '/plant-air-purification'
  }];


  useEffect(() => {
    localStorage?.setItem('customLocations', JSON.stringify(customLocations));
  }, [customLocations]);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleExport = (exportConfig) => {
    console.log('Exporting data with config:', exportConfig);
  };

  const handleAddLocation = (newLocation) => {
    setCustomLocations((prev) => [...prev, newLocation]);
    setCurrentLocation(newLocation);
  };

  const handleDeleteLocation = (locationToDelete) => {
    setCustomLocations((prev) =>
      prev?.filter((loc) => loc?.value !== locationToDelete?.value)
    );

    if (currentLocation?.value === locationToDelete?.value) {
      setCurrentLocation(defaultLocations?.[0]);
    }
  };

  const formatLastUpdate = () => {
    const now = new Date();
    const diff = Math.floor((now - lastUpdate) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    return `${Math.floor(diff / 3600)} hours ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Environmental Dashboard</h1>
              <p className="text-muted-foreground">
                Real-time environmental monitoring and analytics • Last updated: {formatLastUpdate()}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={() => setLastUpdate(new Date())}>

                Refresh
              </Button>
              <Button
                variant="default"
                iconName="Download"
                iconPosition="left"
                onClick={() => setIsExportModalOpen(true)}>

                Export Data
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {currentMetrics?.map((metric, index) =>
                <MetricCard
                  key={index}
                  {...metric}
                  onClick={() => {
                    if (metric?.title === 'Temperature') navigate('/weather-monitoring');
                    if (metric?.title === 'Air Quality Index') navigate('/air-quality-tracking');
                  }} />

                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <ChartWidget
                  title="Temperature Trend"
                  type="area"
                  data={temperatureData}
                  dataKey="value"
                  xAxisKey="time"
                  color="var(--color-primary)"
                  icon="Thermometer"
                  height={280}
                  actions={null} />


                <ChartWidget
                  title="Air Quality Index"
                  type="bar"
                  data={airQualityData}
                  dataKey="value"
                  xAxisKey="time"
                  color="var(--color-secondary)"
                  icon="Wind"
                  height={280}
                  actions={null} />

              </div>

              <ChartWidget
                title="Greenhouse Gas Levels (CO₂)"
                type="line"
                data={greenhouseData}
                dataKey="value"
                xAxisKey="time"
                color="var(--color-warning)"
                icon="CloudRain"
                height={300}
                actions={null} />


              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-foreground">Plant Performance</h2>
                  <Button
                    variant="ghost"
                    iconName="ArrowRight"
                    iconPosition="right"
                    onClick={() => navigate('/plant-air-purification')}>

                    View All
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {plantPerformance?.map((plant, index) =>
                  <PlantPerformanceCard
                    key={index}
                    {...plant}
                    onClick={() => navigate('/plant-air-purification')} />

                  )}
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Location</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="Plus"
                    iconPosition="left"
                    onClick={() => setIsAddLocationModalOpen(true)}
                  >
                    Add
                  </Button>
                </div>
                <LocationSwitcher
                  currentLocation={currentLocation}
                  locations={allLocations}
                  onLocationChange={setCurrentLocation}
                  onDeleteLocation={handleDeleteLocation}
                />
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-foreground">Environmental Alerts</h3>
                  <div className="w-6 h-6 rounded-full bg-error flex items-center justify-center">
                    <span className="text-xs font-bold text-white">{alerts?.length}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {alerts?.map((alert, index) =>
                  <AlertCard
                    key={index}
                    {...alert}
                    onAction={() => {
                      if (alert?.actionLabel === 'View Forecast') navigate('/weather-monitoring');
                      if (alert?.actionLabel === 'View Details') navigate('/air-quality-tracking');
                    }} />

                  )}
                </div>
              </div>

              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  {quickActions?.map((action, index) =>
                  <QuickActionButton
                    key={index}
                    {...action}
                    onClick={() => navigate(action?.path)} />

                  )}
                </div>
              </div>

              <div className="bg-gradient-to-br from-primary/10 to-success/10 border border-primary/20 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Icon name="Lightbulb" size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-foreground mb-1">Environmental Tip</h4>
                    <p className="text-sm text-muted-foreground">
                      Adding 2-3 snake plants in your bedroom can improve air quality by up to 25% and help you sleep better.
                    </p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={() => navigate('/plant-air-purification')}
                  className="w-full">

                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <DataExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />
      <AddLocationModal
        isOpen={isAddLocationModalOpen}
        onClose={() => setIsAddLocationModalOpen(false)}
        onAddLocation={handleAddLocation}
      />

    </div>);

};

export default EnvironmentalDashboard;