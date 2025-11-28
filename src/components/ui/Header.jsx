import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('New York, NY');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isOnline, setIsOnline] = useState(true);

  const locationDropdownRef = useRef(null);
  const userMenuRef = useRef(null);

  const navigationItems = [
    { label: 'Dashboard', path: '/environmental-dashboard', icon: 'LayoutDashboard' },
    { label: 'Weather', path: '/weather-monitoring', icon: 'CloudSun' },
    { label: 'Air Quality', path: '/air-quality-tracking', icon: 'Wind' },
    { label: 'Plants', path: '/plant-air-purification', icon: 'Leaf' }
  ];

  const locations = [
    { value: 'new-york', label: 'New York, NY', coordinates: { lat: 40.7128, lng: -74.0060 } },
    { value: 'los-angeles', label: 'Los Angeles, CA', coordinates: { lat: 34.0522, lng: -118.2437 } },
    { value: 'chicago', label: 'Chicago, IL', coordinates: { lat: 41.8781, lng: -87.6298 } },
    { value: 'houston', label: 'Houston, TX', coordinates: { lat: 29.7604, lng: -95.3698 } },
    { value: 'miami', label: 'Miami, FL', coordinates: { lat: 25.7617, lng: -80.1918 } }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationDropdownRef?.current && !locationDropdownRef?.current?.contains(event?.target)) {
        setIsLocationDropdownOpen(false);
      }
      if (userMenuRef?.current && !userMenuRef?.current?.contains(event?.target)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleNavigation = (path) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLocationChange = (location) => {
    setCurrentLocation(location?.label);
    setIsLocationDropdownOpen(false);
  };

  const handleLogout = () => {
    navigate('/login');
    setIsUserMenuOpen(false);
  };

  const formatLastUpdate = () => {
    const now = new Date();
    const diff = Math.floor((now - lastUpdate) / 1000);

    if (diff < 60) return 'Just now';
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
  };

  return (
    <>
      <header className="header">
        <div className="header-logo">
          <div className="header-logo-icon">
            <Icon name="Leaf" size={24} />
          </div>
          <span className="header-logo-text hidden sm:block">EcoWeather Pro</span>
        </div>

        <nav className="header-nav hidden lg:flex">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`header-nav-item ${location?.pathname === item?.path ? 'active' : ''}`}
            >
              {item?.label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-md bg-muted/50 text-xs text-muted-foreground">
            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-success' : 'bg-error'}`} />
            <span>{formatLastUpdate()}</span>
          </div>

          <div className="relative" ref={locationDropdownRef}>
            <button
              onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors duration-150"
            >
              <Icon name="MapPin" size={16} />
              <span className="hidden sm:inline">{currentLocation}</span>
              <Icon name="ChevronDown" size={16} />
            </button>

            {isLocationDropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-56 bg-popover border border-border rounded-lg shadow-md overflow-hidden animation-slide-in z-[200]">
                {locations?.map((location) => (
                  <button
                    key={location?.value}
                    onClick={() => handleLocationChange(location)}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors duration-150"
                  >
                    <Icon name="MapPin" size={16} />
                    <span>{location?.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-foreground hover:bg-muted transition-colors duration-150"
            >
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="User" size={16} className="text-primary" />
              </div>
              <Icon name="ChevronDown" size={16} className="hidden sm:block" />
            </button>

            {isUserMenuOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-popover border border-border rounded-lg shadow-md overflow-hidden animation-slide-in z-[200]">
                <button
                  onClick={() => {
                    navigate('/profile');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors duration-150"
                >
                  <Icon name="User" size={16} />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => {
                    navigate('/settings');
                    setIsUserMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-popover-foreground hover:bg-muted transition-colors duration-150"
                >
                  <Icon name="Settings" size={16} />
                  <span>Settings</span>
                </button>
                <div className="border-t border-border" />
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-sm text-error hover:bg-muted transition-colors duration-150"
                >
                  <Icon name="LogOut" size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="mobile-menu-button"
        aria-label="Toggle mobile menu"
      >
        <Icon name={isMobileMenuOpen ? 'X' : 'Menu'} size={20} />
      </button>
      {isMobileMenuOpen && (
        <>
          <div
            className="mobile-menu-overlay"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className={`mobile-menu ${isMobileMenuOpen ? '' : 'closed'}`}>
            <div className="mobile-menu-header">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Icon name="Leaf" size={24} className="text-primary" />
                </div>
                <span className="text-lg font-semibold text-foreground">EcoWeather Pro</span>
              </div>
            </div>

            <nav className="mobile-menu-nav">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`mobile-menu-item ${location?.pathname === item?.path ? 'active' : ''}`}
                >
                  <Icon name={item?.icon} size={20} />
                  <span>{item?.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
};

export default Header;