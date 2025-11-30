import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import PlantCard from './components/PlantCard';
import RecommendationCard from './components/RecommendationCard';
import PerformanceChart from './components/PerformanceChart';
import AirQualityCalculator from './components/AirQualityCalculator';
import CareSchedule from './components/CareSchedule';
import PlantDatabase from './components/PlantDatabase';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
// Import carbon sequestration utilities
import { calculateTotalCarbonSequestration, calculateCarbonOffsetEquivalent } from '../../utils/carbonSequestration';

const PlantAirPurification = () => {
  const [selectedRoom, setSelectedRoom] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [chartType, setChartType] = useState('line');

  const roomOptions = [
  { value: 'all', label: 'All Rooms' },
  { value: 'living-room', label: 'Living Room' },
  { value: 'bedroom', label: 'Bedroom' },
  { value: 'office', label: 'Office' },
  { value: 'kitchen', label: 'Kitchen' }];


  const myPlants = [
  {
    id: 1,
    name: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    image: "https://images.unsplash.com/photo-1642207274913-30ca1f075854",
    imageAlt: "Tall green snake plant with upright sword-shaped leaves in white ceramic pot on wooden surface",
    room: "Living Room",
    co2Absorption: "6.2 g/h",
    o2Emission: "5.8 g/h",
    carbonSequestration: "0.8 kg/year",
    effectiveness: 4.8,
    isActive: true,
    nextWatering: "Nov 30, 2025"
  },
  {
    id: 2,
    name: "Spider Plant",
    scientificName: "Chlorophytum comosum",
    image: "https://images.unsplash.com/photo-1684569653013-b6b23c8e5fc8",
    imageAlt: "Vibrant spider plant with long arching green and white striped leaves cascading from hanging basket",
    room: "Bedroom",
    co2Absorption: "5.8 g/h",
    o2Emission: "5.4 g/h",
    carbonSequestration: "0.6 kg/year",
    effectiveness: 4.5,
    isActive: true,
    nextWatering: "Nov 29, 2025"
  },
  {
    id: 3,
    name: "Peace Lily",
    scientificName: "Spathiphyllum wallisii",
    image: "https://images.unsplash.com/photo-1652731706550-c85ae3f0617a",
    imageAlt: "Elegant peace lily with glossy dark green leaves and white spathe flowers in decorative pot",
    room: "Office",
    co2Absorption: "7.1 g/h",
    o2Emission: "6.5 g/h",
    carbonSequestration: "1.2 kg/year",
    effectiveness: 4.9,
    isActive: true,
    nextWatering: "Dec 01, 2025"
  },
  {
    id: 4,
    name: "Pothos",
    scientificName: "Epipremnum aureum",
    image: "https://images.unsplash.com/photo-1668317018596-f7d50634632a",
    imageAlt: "Trailing golden pothos plant with heart-shaped variegated green and yellow leaves in white pot",
    room: "Kitchen",
    co2Absorption: "5.5 g/h",
    o2Emission: "5.1 g/h",
    carbonSequestration: "0.7 kg/year",
    effectiveness: 4.3,
    isActive: true,
    nextWatering: "Nov 29, 2025"
  },
  {
    id: 5,
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    image: "https://images.unsplash.com/photo-1674822532798-709523fd5c54",
    imageAlt: "Succulent aloe vera plant with thick fleshy green leaves arranged in rosette pattern in terracotta pot",
    room: "Bedroom",
    co2Absorption: "4.2 g/h",
    o2Emission: "3.9 g/h",
    carbonSequestration: "0.4 kg/year",
    effectiveness: 3.8,
    isActive: false,
    nextWatering: "Dec 05, 2025"
  },
  {
    id: 6,
    name: "Boston Fern",
    scientificName: "Nephrolepis exaltata",
    image: "https://images.unsplash.com/photo-1691129937053-4cff02fe5f39",
    imageAlt: "Lush boston fern with delicate feathery green fronds cascading from hanging planter in bright room",
    room: "Living Room",
    co2Absorption: "6.8 g/h",
    o2Emission: "6.3 g/h",
    carbonSequestration: "1.0 kg/year",
    effectiveness: 4.7,
    isActive: true,
    nextWatering: "Nov 28, 2025"
  }];


  const recommendedPlants = [
  {
    id: 7,
    name: "Rubber Plant",
    scientificName: "Ficus elastica",
    image: "https://images.unsplash.com/photo-1591656884447-8562e2373a66",
    imageAlt: "Tall rubber plant with large glossy burgundy leaves in modern white planter against neutral wall",
    careLevel: "Easy",
    benefits: "Excellent air purifier that removes formaldehyde and other toxins. Low maintenance and thrives in indirect light.",
    wateringFrequency: "Once per week",
    lightRequirement: "Indirect light",
    airPurification: "Very High",
    carbonSequestration: "1.5 kg/year",
    idealRoomSize: "Medium to Large",
    recommended: true
  },
  {
    id: 8,
    name: "Chinese Evergreen",
    scientificName: "Aglaonema",
    image: "https://images.unsplash.com/photo-1727772998812-73c7026ff44a",
    imageAlt: "Chinese evergreen plant with variegated green and silver patterned leaves in decorative ceramic pot",
    careLevel: "Easy",
    benefits: "Highly effective at filtering indoor air pollutants. Tolerates low light and irregular watering.",
    wateringFrequency: "Every 1-2 weeks",
    lightRequirement: "Low to Medium",
    airPurification: "High",
    carbonSequestration: "0.9 kg/year",
    idealRoomSize: "Small to Medium",
    recommended: true
  },
  {
    id: 9,
    name: "Dracaena",
    scientificName: "Dracaena marginata",
    image: "https://images.unsplash.com/photo-1665931971851-ad59dfe005c9",
    imageAlt: "Tall dracaena plant with thin spiky red-edged green leaves on woody stems in modern interior setting",
    careLevel: "Moderate",
    benefits: "Removes benzene, formaldehyde, and trichloroethylene from the air. Adds vertical interest to spaces.",
    wateringFrequency: "Once per week",
    lightRequirement: "Indirect light",
    airPurification: "High",
    carbonSequestration: "1.1 kg/year",
    idealRoomSize: "Medium to Large",
    recommended: false
  },
  {
    id: 10,
    name: "ZZ Plant",
    scientificName: "Zamioculcas zamiifolia",
    image: "https://images.unsplash.com/photo-1662845364684-7c65b4c25772",
    imageAlt: "ZZ plant with glossy dark green oval leaflets on upright stems in minimalist white pot on wooden stand",
    careLevel: "Easy",
    benefits: "Extremely low maintenance and drought tolerant. Removes toxins like xylene and toluene from indoor air.",
    wateringFrequency: "Every 2-3 weeks",
    lightRequirement: "Low to Bright",
    airPurification: "Medium",
    carbonSequestration: "0.7 kg/year",
    idealRoomSize: "Small to Medium",
    recommended: false
  }];


  const performanceData = [
  { time: "6 AM", co2: 12.5, o2: 11.8, carbonSequestration: 8.2 },
  { time: "9 AM", co2: 18.2, o2: 17.1, carbonSequestration: 12.5 },
  { time: "12 PM", co2: 24.8, o2: 23.2, carbonSequestration: 16.8 },
  { time: "3 PM", co2: 28.5, o2: 26.8, carbonSequestration: 19.2 },
  { time: "6 PM", co2: 22.3, o2: 20.9, carbonSequestration: 15.4 },
  { time: "9 PM", co2: 15.7, o2: 14.6, carbonSequestration: 10.8 }];


  const careSchedules = [
  {
    id: 1,
    task: "Water Plants",
    plantName: "Spider Plant",
    type: "watering",
    dueDate: "Nov 29, 2025",
    location: "Bedroom",
    priority: "high",
    notes: "Check soil moisture before watering. Water thoroughly until it drains from bottom."
  },
  {
    id: 2,
    task: "Fertilize",
    plantName: "Peace Lily",
    type: "fertilizing",
    dueDate: "Dec 01, 2025",
    location: "Office",
    priority: "medium",
    notes: "Use balanced liquid fertilizer diluted to half strength."
  },
  {
    id: 3,
    task: "Prune Dead Leaves",
    plantName: "Boston Fern",
    type: "pruning",
    dueDate: "Nov 28, 2025",
    location: "Living Room",
    priority: "low",
    notes: "Remove brown or yellowing fronds to encourage new growth."
  },
  {
    id: 4,
    task: "Check for Pests",
    plantName: "Pothos",
    type: "inspection",
    dueDate: "Nov 30, 2025",
    location: "Kitchen",
    priority: "medium",
    notes: "Inspect leaves for spider mites or mealybugs. Wipe leaves with damp cloth."
  }];


  const filteredPlants = selectedRoom === 'all' ?
  myPlants :
  myPlants?.filter((plant) => plant?.room?.toLowerCase()?.replace(' ', '-') === selectedRoom);

  const handleViewDetails = (plant) => {
    console.log('View details for:', plant);
  };

  const handleAddCare = (plant) => {
    console.log('Add care schedule for:', plant);
  };

  const handleAddPlant = (plant) => {
    console.log('Add plant to collection:', plant);
  };

  const handleMarkComplete = (schedule) => {
    console.log('Mark schedule complete:', schedule);
  };

  const handleViewScheduleDetails = (schedule) => {
    console.log('View schedule details:', schedule);
  };

  const handleSelectPlant = (plant) => {
    console.log('Selected plant from database:', plant);
  };

  const totalCO2 = myPlants?.reduce((sum, plant) => {
    if (plant?.isActive) {
      return sum + parseFloat(plant?.co2Absorption);
    }
    return sum;
  }, 0);

  const totalO2 = myPlants?.reduce((sum, plant) => {
    if (plant?.isActive) {
      return sum + parseFloat(plant?.o2Emission);
    }
    return sum;
  }, 0);

  // Calculate carbon sequestration
  const carbonSequestrationData = calculateTotalCarbonSequestration(myPlants);
  const carbonOffsetEquivalent = calculateCarbonOffsetEquivalent(carbonSequestrationData.total);

  const activePlants = myPlants?.filter((plant) => plant?.isActive)?.length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="main-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Icon name="Leaf" size={24} className="text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-foreground">Plant Air Purification</h1>
                <p className="text-muted-foreground">Monitor and optimize indoor air quality with plants</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Leaf" size={20} className="text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">Active Plants</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{activePlants}</p>
              <p className="text-xs text-muted-foreground mt-1">Out of {myPlants?.length} total</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                  <Icon name="Wind" size={20} className="text-secondary" />
                </div>
                <span className="text-sm text-muted-foreground">CO₂ Absorbed</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{totalCO2?.toFixed(1)} g/h</p>
              <p className="text-xs text-success mt-1">+12% from last week</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Icon name="Sparkles" size={20} className="text-success" />
                </div>
                <span className="text-sm text-muted-foreground">O₂ Produced</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{totalO2?.toFixed(1)} g/h</p>
              <p className="text-xs text-success mt-1">+8% from last week</p>
            </div>

            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-warning/10 flex items-center justify-center">
                  <Icon name="Calendar" size={20} className="text-warning" />
                </div>
                <span className="text-sm text-muted-foreground">Care Tasks</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{careSchedules?.length}</p>
              <p className="text-xs text-warning mt-1">2 due today</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-lg bg-success/10 flex items-center justify-center">
                  <Icon name="Leaf" size={20} className="text-success" />
                </div>
                <span className="text-sm text-muted-foreground">Carbon Sequestration</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{carbonSequestrationData?.formattedTotal || '0 kg CO2/year'}</p>
              <p className="text-xs text-success mt-1">{carbonOffsetEquivalent?.treeYears?.toFixed(1) || '0'} tree-years equivalent</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div className="flex items-center gap-3">
              <Select
                options={roomOptions}
                value={selectedRoom}
                onChange={setSelectedRoom}
                className="w-48" />

              <Button
                variant="outline"
                size="sm"
                iconName="Filter"
                iconPosition="left">

                Filters
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                iconName="Grid3x3"
                onClick={() => setViewMode('grid')} />

              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                iconName="List"
                onClick={() => setViewMode('list')} />

            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">My Plants</h2>
              <Button variant="default" size="sm" iconName="Plus" iconPosition="left">
                Add Plant
              </Button>
            </div>
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredPlants?.map((plant) =>
              <PlantCard
                key={plant?.id}
                plant={plant}
                onViewDetails={handleViewDetails}
                onAddCare={handleAddCare} />

              )}
            </div>
          </div>

          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-foreground">Performance Analytics</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant={chartType === 'line' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType('line')}>

                  Line
                </Button>
                <Button
                  variant={chartType === 'area' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setChartType('area')}>

                  Area
                </Button>
              </div>
            </div>
            <PerformanceChart data={performanceData} type={chartType} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <AirQualityCalculator />
            <CareSchedule
              schedules={careSchedules}
              onMarkComplete={handleMarkComplete}
              onViewDetails={handleViewScheduleDetails} />

          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recommended Plants</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {recommendedPlants?.map((plant) =>
              <RecommendationCard
                key={plant?.id}
                plant={plant}
                onAddPlant={handleAddPlant} />

              )}
            </div>
          </div>

          <div className="mb-8">
            <PlantDatabase onSelectPlant={handleSelectPlant} />
          </div>
        </div>
      </main>
    </div>);

};

export default PlantAirPurification;