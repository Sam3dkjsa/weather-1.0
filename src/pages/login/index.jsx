import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import TrustSignals from './components/TrustSignals';
import FeatureHighlights from './components/FeatureHighlights';

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Login - EcoWeather Pro</title>
        <meta name="description" content="Sign in to access your environmental monitoring dashboard with weather forecasts, air quality tracking, and carbon management tools." />
      </Helmet>
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
              <div className="order-2 lg:order-1">
                <div className="lg:sticky lg:top-8">
                  <div className="mb-8 lg:mb-12">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Icon name="Leaf" size={28} className="text-primary" />
                      </div>
                      <div>
                        <h1 className="text-2xl font-bold text-foreground">EcoWeather Pro</h1>
                        <p className="text-sm text-muted-foreground">Environmental Intelligence Platform</p>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:block">
                    <FeatureHighlights />
                  </div>

                  <div className="lg:hidden mt-8">
                    <TrustSignals />
                  </div>
                </div>
              </div>

              <div className="order-1 lg:order-2">
                <div className="bg-card border border-border rounded-2xl shadow-sm p-6 sm:p-8 lg:p-10">
                  <div className="mb-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                      Welcome Back
                    </h2>
                    <p className="text-muted-foreground">
                      Sign in to access your environmental dashboard
                    </p>
                  </div>

                  <LoginForm />

                  <div className="mt-8 pt-6 border-t border-border">
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                      <Icon name="Shield" size={16} />
                      <span>Protected by 256-bit SSL encryption</span>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block mt-8">
                  <TrustSignals />
                </div>

                <div className="lg:hidden mt-8">
                  <FeatureHighlights />
                </div>
              </div>
            </div>
          </div>
        </div>

        <footer className="border-t border-border bg-card mt-12">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                &copy; {new Date()?.getFullYear()} EcoWeather Pro. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Privacy Policy
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Terms of Service
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-150">
                  Support
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Login;