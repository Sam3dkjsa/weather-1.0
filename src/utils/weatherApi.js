import axios from 'axios';

// OpenWeatherMap API configuration
const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY || 'YOUR_API_KEY_HERE';

console.log('OpenWeather API Key:', OPENWEATHER_API_KEY);
console.log('API Key Length:', OPENWEATHER_API_KEY?.length);

/**
 * Fetch current weather data for a given location
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Weather data
 */
export const getCurrentWeather = async (lat, lon) => {
  try {
    console.log(`Fetching current weather for lat: ${lat}, lon: ${lon}`);
    const response = await axios.get('/api/weather/weather', {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric'
      }
    });
    console.log('Current weather response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching current weather:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status
    });
    throw new Error(`Failed to fetch current weather: ${error.message}`);
  }
};

/**
 * Fetch 7-day weather forecast for a given location
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Forecast data
 */
export const getForecast = async (lat, lon) => {
  try {
    console.log(`Fetching forecast for lat: ${lat}, lon: ${lon}`);
    const response = await axios.get('/api/weather/forecast', {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY,
        units: 'metric',
        cnt: 40 // Number of timestamps (8 timestamps per day for 5 days)
      }
    });
    console.log('Forecast response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching forecast:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status
    });
    throw new Error(`Failed to fetch forecast: ${error.message}`);
  }
};

/**
 * Fetch air quality data for a given location
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Air quality data
 */
export const getAirQuality = async (lat, lon) => {
  try {
    console.log(`Fetching air quality for lat: ${lat}, lon: ${lon}`);
    const response = await axios.get('/api/pollution/air_pollution', {
      params: {
        lat,
        lon,
        appid: OPENWEATHER_API_KEY
      }
    });
    console.log('Air quality response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching air quality:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status
    });
    throw new Error(`Failed to fetch air quality: ${error.message}`);
  }
};

/**
 * Reverse geocode coordinates to get location name
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Location data
 */
export const reverseGeocode = async (lat, lon) => {
  try {
    const response = await axios.get('/api/geo/reverse', {
      params: {
        lat,
        lon,
        limit: 1,
        appid: OPENWEATHER_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error reverse geocoding:', error);
    throw error;
  }
};

/**
 * Geocode location name to get coordinates
 * @param {string} locationName - Name of the location
 * @returns {Promise<Object>} Location data with coordinates
 */
export const geocode = async (locationName) => {
  try {
    const response = await axios.get('/api/geo/direct', {
      params: {
        q: locationName,
        limit: 1,
        appid: OPENWEATHER_API_KEY
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error geocoding:', error);
    throw error;
  }
};

// Utility functions to transform API data for the app

/**
 * Transform OpenWeather current weather data to app format
 * @param {Object} data - Raw OpenWeather data
 * @returns {Object} Transformed data
 */
export const transformCurrentWeather = (data) => {
  console.log('Transforming current weather data:', data);
  if (!data || !data.main || !data.weather || !data.weather[0]) {
    console.error('Invalid weather data structure:', data);
    return null;
  }
  
  return {
    temperature: Math.round(data.main.temp),
    feelsLike: Math.round(data.main.feels_like),
    condition: data.weather[0].main.toLowerCase(),
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind?.speed || 0,
    windDirection: data.wind?.deg || 0,
    pressure: data.main.pressure,
    visibility: (data.visibility / 1000).toFixed(1), // Convert to km
    sunrise: new Date(data.sys?.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    sunset: new Date(data.sys?.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    iconAlt: data.weather[0].description
  };
};

/**
 * Transform OpenWeather forecast data to app format
 * @param {Object} data - Raw OpenWeather forecast data
 * @returns {Array} Transformed forecast data
 */
export const transformForecast = (data) => {
  console.log('Transforming forecast data:', data);
  if (!data || !data.list || !Array.isArray(data.list)) {
    console.error('Invalid forecast data structure:', data);
    return [];
  }
  
  // Group forecast by day
  const dailyForecasts = {};
  
  data.list.forEach(item => {
    const date = new Date(item.dt * 1000).toISOString().split('T')[0];
    
    if (!dailyForecasts[date]) {
      dailyForecasts[date] = {
        temps: [],
        conditions: [],
        rainChances: [],
        rainAmounts: [],
        humidity: [],
        windSpeeds: [],
        pressures: []
      };
    }
    
    dailyForecasts[date].temps.push(item.main.temp);
    dailyForecasts[date].conditions.push(item.weather[0].main.toLowerCase());
    dailyForecasts[date].humidity.push(item.main.humidity);
    dailyForecasts[date].windSpeeds.push(item.wind?.speed || 0);
    dailyForecasts[date].pressures.push(item.main.pressure);
    
    if (item.rain && item.rain['3h']) {
      dailyForecasts[date].rainChances.push(1); // Rain occurrence
      dailyForecasts[date].rainAmounts.push(item.rain['3h']);
    } else {
      dailyForecasts[date].rainChances.push(0); // No rain
    }
  });
  
  // Convert to array with daily summaries
  return Object.keys(dailyForecasts).slice(0, 7).map((date, index) => {
    const dayData = dailyForecasts[date];
    const avgTemp = dayData.temps.reduce((a, b) => a + b, 0) / dayData.temps.length;
    const maxTemp = Math.max(...dayData.temps);
    const minTemp = Math.min(...dayData.temps);
    const avgHumidity = dayData.humidity.reduce((a, b) => a + b, 0) / dayData.humidity.length;
    const avgWindSpeed = dayData.windSpeeds.reduce((a, b) => a + b, 0) / dayData.windSpeeds.length;
    const avgPressure = dayData.pressures.reduce((a, b) => a + b, 0) / dayData.pressures.length;
    
    // Most common condition
    const conditionCounts = {};
    dayData.conditions.forEach(condition => {
      conditionCounts[condition] = (conditionCounts[condition] || 0) + 1;
    });
    const condition = Object.keys(conditionCounts).reduce((a, b) => 
      conditionCounts[a] > conditionCounts[b] ? a : b
    );
    
    // Rain probability and amount
    const rainProbability = (dayData.rainChances.filter(r => r > 0).length / dayData.rainChances.length) * 100;
    const totalRainAmount = dayData.rainAmounts.reduce((a, b) => a + b, 0);
    
    const dateObj = new Date(date);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayName = index === 0 ? 'Today' : daysOfWeek[dateObj.getDay()];
    
    return {
      day: dayName,
      date: dateObj.toLocaleDateString([], { month: 'short', day: 'numeric' }),
      maxTemp: Math.round(maxTemp),
      minTemp: Math.round(minTemp),
      condition,
      rainProbability: Math.round(rainProbability),
      rainAmount: totalRainAmount.toFixed(1),
      humidity: Math.round(avgHumidity),
      windSpeed: Math.round(avgWindSpeed),
      pressure: Math.round(avgPressure),
      icon: getWeatherIcon(condition),
      iconAlt: condition
    };
  });
};

/**
 * Transform OpenWeather air quality data to app format
 * @param {Object} data - Raw OpenWeather air quality data
 * @returns {Object} Transformed air quality data
 */
export const transformAirQuality = (data) => {
  console.log('Transforming air quality data:', data);
  if (!data || !data.list || !data.list[0] || !data.list[0].main || !data.list[0].components) {
    console.error('Invalid air quality data structure:', data);
    return null;
  }
  
  const aqi = data.list[0].main.aqi;
  const components = data.list[0].components;
  
  // AQI descriptions
  const aqiDescriptions = {
    1: 'Good',
    2: 'Fair',
    3: 'Moderate',
    4: 'Poor',
    5: 'Very Poor'
  };
  
  // AQI health implications
  const aqiImplications = {
    1: 'Air quality is satisfactory, and air pollution poses little or no risk.',
    2: 'Air quality is acceptable. However, there may be a risk for some people.',
    3: 'Members of sensitive groups may experience health effects.',
    4: 'Everyone may begin to experience health effects.',
    5: 'Health alert: Everyone may experience more serious health effects.'
  };
  
  // Additional SPM (Suspended Particulate Matter) data
  const spmData = {
    pm25: Math.round(components.pm2_5),
    pm10: Math.round(components.pm10),
    pm1: components.pm1 ? Math.round(components.pm1) : null,
    pm4: components.pm4 ? Math.round(components.pm4) : null,
    pm100: components.pm100 ? Math.round(components.pm100) : null
  };
  
  // Greenhouse gases
  const ghgData = {
    co2: components.co2 ? Math.round(components.co2) : 415, // Default to global average
    ch4: components.ch4 ? components.ch4.toFixed(2) : '1.9', // Default to global average
    n2o: components.n2o ? components.n2o.toFixed(3) : '0.330', // Default to global average
    co: components.co.toFixed(1)
  };
  
  return {
    aqi: aqi,
    aqiDescription: aqiDescriptions[aqi],
    aqiImplication: aqiImplications[aqi],
    ...spmData,
    ...ghgData,
    o3: Math.round(components.o3),
    no2: Math.round(components.no2),
    so2: Math.round(components.so2)
  };
};

/**
 * Get appropriate weather icon based on condition
 * @param {string} condition - Weather condition
 * @returns {string} Icon name
 */
const getWeatherIcon = (condition) => {
  const conditionIcons = {
    'clear': 'https://images.unsplash.com/photo-1669650061954-a6cd3047cf62',
    'clouds': 'https://images.unsplash.com/photo-1716152937181-892e450ed5af',
    'rain': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    'drizzle': 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    'thunderstorm': 'https://images.unsplash.com/photo-1605726182055-133e20da9d0e',
    'snow': 'https://images.unsplash.com/photo-1517297106026-10395982714e',
    'mist': 'https://images.unsplash.com/photo-1482062399831-22a7c8d0ff10',
    'fog': 'https://images.unsplash.com/photo-1482062399831-22a7c8d0ff10'
  };
  
  return conditionIcons[condition] || conditionIcons['clear'];
};

export default {
  getCurrentWeather,
  getForecast,
  getAirQuality,
  reverseGeocode,
  geocode,
  transformCurrentWeather,
  transformForecast,
  transformAirQuality
};