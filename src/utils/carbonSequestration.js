/**
 * Carbon Sequestration Calculation Utilities
 * 
 * This module provides functions to calculate carbon sequestration
 * by plants and other environmental factors.
 */

/**
 * Calculate carbon sequestration rate for a plant based on its characteristics
 * @param {Object} plant - Plant object with characteristics
 * @param {string} plant.type - Type of plant (tree, shrub, herb, etc.)
 * @param {number} plant.height - Height of the plant in meters
 * @param {number} plant.width - Width of the plant in meters
 * @param {number} plant.age - Age of the plant in years
 * @param {string} plant.species - Species of the plant
 * @returns {number} Carbon sequestration rate in kg CO2/year
 */
export const calculatePlantCarbonSequestration = (plant) => {
  // Base sequestration rates per plant type (kg CO2/year)
  const baseRates = {
    'tree': 22,
    'shrub': 8,
    'herb': 2,
    'succulent': 1,
    'fern': 3,
    'vine': 4
  };

  // Size multiplier (based on height and width)
  const sizeMultiplier = (plant.height * plant.width) / 10;

  // Age factor (younger plants sequester less)
  const ageFactor = Math.min(plant.age / 10, 1); // Cap at 1 for mature plants

  // Species factor (some species are more efficient)
  const speciesFactors = {
    'Ficus elastica': 1.2, // Rubber Plant
    'Sansevieria trifasciata': 1.1, // Snake Plant
    'Chlorophytum comosum': 1.0, // Spider Plant
    'Spathiphyllum wallisii': 1.3, // Peace Lily
    'Epipremnum aureum': 1.0, // Pothos
    'Aloe barbadensis miller': 0.8, // Aloe Vera
    'Nephrolepis exaltata': 1.1 // Boston Fern
  };

  const baseRate = baseRates[plant.type] || 5;
  const speciesFactor = speciesFactors[plant.species] || 1.0;

  return baseRate * sizeMultiplier * ageFactor * speciesFactor;
};

/**
 * Calculate total carbon sequestration for a collection of plants
 * @param {Array} plants - Array of plant objects
 * @returns {Object} Object containing total sequestration and breakdown
 */
export const calculateTotalCarbonSequestration = (plants) => {
  const breakdown = plants.map(plant => ({
    plantId: plant.id,
    plantName: plant.name,
    sequestration: calculatePlantCarbonSequestration(plant)
  }));

  const total = breakdown.reduce((sum, item) => sum + item.sequestration, 0);

  return {
    total,
    breakdown,
    formattedTotal: `${total.toFixed(2)} kg CO2/year`
  };
};

/**
 * Calculate carbon offset equivalent
 * @param {number} co2Amount - Amount of CO2 in kg
 * @returns {Object} Object containing various equivalents
 */
export const calculateCarbonOffsetEquivalent = (co2Amount) => {
  return {
    // Driving emissions (average car emits ~4.6 metric tons CO2 per year)
    carMiles: Math.round((co2Amount / 4600) * 12000),
    // Electricity usage (average home emits ~5,000 kg CO2 per year)
    homeElectricityMonths: (co2Amount / 5000) * 12,
    // Tree equivalent (average tree absorbs ~22 kg CO2 per year)
    treeYears: co2Amount / 22,
    // Flight emissions (average flight emits ~986 kg CO2 per hour)
    flightHours: co2Amount / 986
  };
};

/**
 * Predict future carbon sequestration based on growth models
 * @param {Object} currentSequestration - Current sequestration data
 * @param {number} years - Number of years to predict
 * @returns {Object} Predicted sequestration data
 */
export const predictFutureSequestration = (currentSequestration, years) => {
  // Assuming 5% annual growth in sequestration capacity
  const growthRate = 0.05;
  const predictions = [];

  for (let i = 1; i <= years; i++) {
    const predictedValue = currentSequestration.total * Math.pow(1 + growthRate, i);
    predictions.push({
      year: i,
      value: predictedValue,
      formattedValue: `${predictedValue.toFixed(2)} kg CO2/year`
    });
  }

  return {
    current: currentSequestration,
    predictions
  };
};

export default {
  calculatePlantCarbonSequestration,
  calculateTotalCarbonSequestration,
  calculateCarbonOffsetEquivalent,
  predictFutureSequestration
};