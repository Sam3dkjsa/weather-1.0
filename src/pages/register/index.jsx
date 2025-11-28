import React from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import FeatureHighlights from './components/FeatureHighlights';

const Register = () => {
  return (
    <>
      <Helmet>
        <title>Create Account - EcoWeather Pro</title>
        <meta name="description" content="Join EcoWeather Pro to access comprehensive environmental monitoring, weather forecasting, air quality tracking, and carbon management tools." />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8 lg:mb-12">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Icon name="Leaf" size={28} className="text-primary" />
                </div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  EcoWeather Pro
                </h1>
              </div>
              <p className="text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
                Create your account to start monitoring environmental data and making informed sustainability decisions
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
              <div className="lg:col-span-2 order-2 lg:order-1">
                <div className="bg-card rounded-2xl shadow-lg border border-border p-6 lg:p-8">
                  <div className="mb-6">
                    <h2 className="text-xl lg:text-2xl font-bold text-foreground mb-2">
                      Create Your Account
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Join thousands of users monitoring environmental data worldwide
                    </p>
                  </div>

                  <RegistrationForm />
                </div>

                <div className="mt-8">
                  <FeatureHighlights />
                </div>
              </div>

              <div className="lg:col-span-1 order-1 lg:order-2">
                <div className="lg:sticky lg:top-24">
                  <TrustSignals />
                </div>
              </div>
            </div>

            <div className="mt-12 text-center">
              <div className="inline-flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
                <button className="hover:text-foreground transition-colors duration-150">
                  About Us
                </button>
                <span className="hidden sm:inline">•</span>
                <button className="hover:text-foreground transition-colors duration-150">
                  Contact Support
                </button>
                <span className="hidden sm:inline">•</span>
                <button className="hover:text-foreground transition-colors duration-150">
                  Help Center
                </button>
                <span className="hidden sm:inline">•</span>
                <button className="hover:text-foreground transition-colors duration-150">
                  API Documentation
                </button>
              </div>
              <p className="mt-4 text-xs text-muted-foreground">
                © {new Date()?.getFullYear()} EcoWeather Pro. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;