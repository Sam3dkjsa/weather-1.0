import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustItems = [
    {
      icon: 'Shield',
      title: 'Secure & Private',
      description: 'Your environmental data is encrypted and protected with industry-standard security protocols'
    },
    {
      icon: 'Award',
      title: 'Certified Data Sources',
      description: 'All environmental data sourced from verified scientific institutions and government agencies'
    },
    {
      icon: 'Leaf',
      title: 'Sustainability Focused',
      description: 'Carbon-neutral platform committed to environmental conservation and climate action'
    },
    {
      icon: 'Users',
      title: 'Trusted by 50,000+ Users',
      description: 'Join environmental enthusiasts, professionals, and researchers worldwide'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center lg:text-left">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Why Choose EcoWeather Pro?
        </h3>
        <p className="text-sm text-muted-foreground">
          Comprehensive environmental intelligence backed by scientific data
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
        {trustItems?.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-all duration-150"
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name={item?.icon} size={24} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-foreground mb-1">
                {item?.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {item?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Icon name="CheckCircle2" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">Free to start</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="CheckCircle2" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">No credit card required</span>
        </div>
        <div className="flex items-center gap-2">
          <Icon name="CheckCircle2" size={16} className="text-success" />
          <span className="text-xs text-muted-foreground">Cancel anytime</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;