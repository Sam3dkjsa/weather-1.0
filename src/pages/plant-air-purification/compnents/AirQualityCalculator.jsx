import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const AirQualityCalculator = () => {
  const [roomSize, setRoomSize] = useState('');
  const [currentAQI, setCurrentAQI] = useState('');
  const [plantCount, setPlantCount] = useState('');
  const [plantType, setPlantType] = useState('');
  const [results, setResults] = useState(null);

  const plantTypes = [
    { value: 'snake-plant', label: 'Snake Plant (High Efficiency)' },
    { value: 'spider-plant', label: 'Spider Plant (Medium Efficiency)' },
    { value: 'peace-lily', label: 'Peace Lily (High Efficiency)' },
    { value: 'pothos', label: 'Pothos (Medium Efficiency)' },
    { value: 'aloe-vera', label: 'Aloe Vera (Low Efficiency)' }
  ];

  const calculateImpact = () => {
    const size = parseFloat(roomSize);
    const aqi = parseFloat(currentAQI);
    const count = parseInt(plantCount);

    if (!size || !aqi || !count || !plantType) return;

    const efficiencyMap = {
      'snake-plant': 0.85,
      'spider-plant': 0.65,
      'peace-lily': 0.90,
      'pothos': 0.70,
      'aloe-vera': 0.50
    };

    const efficiency = efficiencyMap?.[plantType] || 0.65;
    const improvement = (count * efficiency * 10) / size;
    const projectedAQI = Math.max(0, aqi - improvement);
    const co2Reduction = count * 5.2 * efficiency;
    const o2Production = count * 4.8 * efficiency;

    setResults({
      currentAQI: aqi,
      projectedAQI: projectedAQI?.toFixed(1),
      improvement: improvement?.toFixed(1),
      co2Reduction: co2Reduction?.toFixed(2),
      o2Production: o2Production?.toFixed(2),
      timeToImprove: Math.ceil(30 / efficiency)
    });
  };

  const resetCalculator = () => {
    setRoomSize('');
    setCurrentAQI('');
    setPlantCount('');
    setPlantType('');
    setResults(null);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <Icon name="Calculator" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Air Quality Impact Calculator</h3>
          <p className="text-sm text-muted-foreground">Calculate projected improvements with plants</p>
        </div>
      </div>
      <div className="space-y-4 mb-6">
        <Input
          label="Room Size (sq ft)"
          type="number"
          placeholder="Enter room size"
          value={roomSize}
          onChange={(e) => setRoomSize(e?.target?.value)}
          required
        />

        <Input
          label="Current AQI Level"
          type="number"
          placeholder="Enter current AQI"
          value={currentAQI}
          onChange={(e) => setCurrentAQI(e?.target?.value)}
          description="Air Quality Index (0-500)"
          required
        />

        <Input
          label="Number of Plants"
          type="number"
          placeholder="Enter plant count"
          value={plantCount}
          onChange={(e) => setPlantCount(e?.target?.value)}
          required
        />

        <Select
          label="Plant Type"
          placeholder="Select plant type"
          options={plantTypes}
          value={plantType}
          onChange={setPlantType}
          required
        />
      </div>
      <div className="flex gap-3 mb-6">
        <Button
          variant="default"
          fullWidth
          iconName="Calculator"
          iconPosition="left"
          onClick={calculateImpact}
        >
          Calculate Impact
        </Button>
        <Button
          variant="outline"
          iconName="RotateCcw"
          onClick={resetCalculator}
        />
      </div>
      {results && (
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="Activity" size={16} className="text-error" />
                <span className="text-xs text-muted-foreground">Current AQI</span>
              </div>
              <p className="text-2xl font-bold text-foreground">{results?.currentAQI}</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Icon name="TrendingDown" size={16} className="text-success" />
                <span className="text-xs text-muted-foreground">Projected AQI</span>
              </div>
              <p className="text-2xl font-bold text-success">{results?.projectedAQI}</p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Icon name="Sparkles" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">Projected Improvements</span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">AQI Improvement</span>
                <span className="font-medium text-foreground">{results?.improvement} points</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">CO₂ Reduction</span>
                <span className="font-medium text-foreground">{results?.co2Reduction} g/day</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">O₂ Production</span>
                <span className="font-medium text-foreground">{results?.o2Production} g/day</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Time to Improve</span>
                <span className="font-medium text-foreground">{results?.timeToImprove} days</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AirQualityCalculator;