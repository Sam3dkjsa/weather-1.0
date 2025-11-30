import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

import Image from '../../../components/AppImage';

const PlantDatabase = ({ onSelectPlant }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [filterDifficulty, setFilterDifficulty] = useState('');

  const categories = [
  { value: '', label: 'All Categories' },
  { value: 'air-purifying', label: 'Air Purifying' },
  { value: 'low-light', label: 'Low Light' },
  { value: 'pet-friendly', label: 'Pet Friendly' },
  { value: 'flowering', label: 'Flowering' }];


  const difficulties = [
  { value: '', label: 'All Levels' },
  { value: 'easy', label: 'Easy' },
  { value: 'moderate', label: 'Moderate' },
  { value: 'difficult', label: 'Difficult' }];


  const plants = [
  {
    id: 1,
    name: "Snake Plant",
    scientificName: "Sansevieria trifasciata",
    image: "https://images.unsplash.com/photo-1642207274913-30ca1f075854",
    imageAlt: "Tall green snake plant with upright sword-shaped leaves in white ceramic pot on wooden surface",
    category: "air-purifying",
    difficulty: "easy",
    co2Absorption: "6.2 g/h",
    o2Production: "5.8 g/h",
    toxinRemoval: "Formaldehyde, Benzene",
    wateringFrequency: "Every 2-3 weeks"
  },
  {
    id: 2,
    name: "Spider Plant",
    scientificName: "Chlorophytum comosum",
    image: "https://images.unsplash.com/photo-1684569653013-b6b23c8e5fc8",
    imageAlt: "Vibrant spider plant with long arching green and white striped leaves cascading from hanging basket",
    category: "air-purifying",
    difficulty: "easy",
    co2Absorption: "5.8 g/h",
    o2Production: "5.4 g/h",
    toxinRemoval: "Carbon Monoxide, Xylene",
    wateringFrequency: "2-3 times per week"
  },
  {
    id: 3,
    name: "Peace Lily",
    scientificName: "Spathiphyllum wallisii",
    image: "https://images.unsplash.com/photo-1652731706550-c85ae3f0617a",
    imageAlt: "Elegant peace lily with glossy dark green leaves and white spathe flowers in decorative pot",
    category: "air-purifying",
    difficulty: "moderate",
    co2Absorption: "7.1 g/h",
    o2Production: "6.5 g/h",
    toxinRemoval: "Ammonia, Benzene, Formaldehyde",
    wateringFrequency: "Once per week"
  },
  {
    id: 4,
    name: "Pothos",
    scientificName: "Epipremnum aureum",
    image: "https://images.unsplash.com/photo-1668317018596-f7d50634632a",
    imageAlt: "Trailing golden pothos plant with heart-shaped variegated green and yellow leaves in white pot",
    category: "low-light",
    difficulty: "easy",
    co2Absorption: "5.5 g/h",
    o2Production: "5.1 g/h",
    toxinRemoval: "Formaldehyde, Xylene",
    wateringFrequency: "Once per week"
  },
  {
    id: 5,
    name: "Aloe Vera",
    scientificName: "Aloe barbadensis miller",
    image: "https://images.unsplash.com/photo-1674822532798-709523fd5c54",
    imageAlt: "Succulent aloe vera plant with thick fleshy green leaves arranged in rosette pattern in terracotta pot",
    category: "low-light",
    difficulty: "easy",
    co2Absorption: "4.2 g/h",
    o2Production: "3.9 g/h",
    toxinRemoval: "Formaldehyde, Benzene",
    wateringFrequency: "Every 2-3 weeks"
  },
  {
    id: 6,
    name: "Boston Fern",
    scientificName: "Nephrolepis exaltata",
    image: "https://images.unsplash.com/photo-1691129937053-4cff02fe5f39",
    imageAlt: "Lush boston fern with delicate feathery green fronds cascading from hanging planter in bright room",
    category: "air-purifying",
    difficulty: "moderate",
    co2Absorption: "6.8 g/h",
    o2Production: "6.3 g/h",
    toxinRemoval: "Formaldehyde, Xylene",
    wateringFrequency: "2-3 times per week"
  }];


  const filteredPlants = plants?.filter((plant) => {
    const matchesSearch = plant?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
    plant?.scientificName?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    const matchesCategory = !filterCategory || plant?.category === filterCategory;
    const matchesDifficulty = !filterDifficulty || plant?.difficulty === filterDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="Database" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Plant Database</h3>
          <p className="text-sm text-muted-foreground">Browse and search plant species</p>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        <Input
          type="search"
          placeholder="Search plants by name or scientific name..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e?.target?.value)}
          className="w-full" />


        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            placeholder="Filter by category"
            options={categories}
            value={filterCategory}
            onChange={setFilterCategory} />

          <Select
            placeholder="Filter by difficulty"
            options={difficulties}
            value={filterDifficulty}
            onChange={setFilterDifficulty} />

        </div>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredPlants?.map((plant) =>
        <div
          key={plant?.id}
          className="bg-muted/30 border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors duration-150 cursor-pointer"
          onClick={() => onSelectPlant(plant)}>

            <div className="flex gap-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                src={plant?.image}
                alt={plant?.imageAlt}
                className="w-full h-full object-cover" />

              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="text-sm font-semibold text-foreground">{plant?.name}</h4>
                    <p className="text-xs text-muted-foreground italic">{plant?.scientificName}</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary capitalize">
                    {plant?.difficulty}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Icon name="Wind" size={12} />
                    <span>CO₂: {plant?.co2Absorption}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Icon name="Leaf" size={12} />
                    <span>O₂: {plant?.o2Production}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground col-span-2">
                    <Icon name="Droplets" size={12} />
                    <span>{plant?.wateringFrequency}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      {filteredPlants?.length === 0 &&
      <div className="text-center py-8">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-sm text-muted-foreground">No plants found matching your criteria</p>
        </div>
      }
    </div>);

};

export default PlantDatabase;