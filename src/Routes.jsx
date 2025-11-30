import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AirQualityTracking from './pages/air-quality-tracking';
import Login from './pages/login';
import EnvironmentalDashboard from './pages/environmental-database';
import WeatherMonitoring from './pages/weather-monitoring';
import PlantAirPurification from './pages/plant-air-purification';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<EnvironmentalDashboard />} />
        <Route path="/air-quality-tracking" element={<AirQualityTracking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/environmental-dashboard" element={<EnvironmentalDashboard />} />
        <Route path="/weather-monitoring" element={<WeatherMonitoring />} />
        <Route path="/plant-air-purification" element={<PlantAirPurification />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;