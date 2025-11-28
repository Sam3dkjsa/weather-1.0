import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const certifications = [
    {
      id: 1,
      icon: 'Shield',
      title: 'ISO 27001 Certified',
      description: 'Data security standards'
    },
    {
      id: 2,
      icon: 'Award',
      title: 'EPA Verified',
      description: 'Environmental data accuracy'
    },
    {
      id: 3,
      icon: 'CheckCircle2',
      title: 'NOAA Partner',
      description: 'Official weather data source'
    }
  ];

  const dataSources = [
    {
      id: 1,
      name: 'National Weather Service',
      logo: 'CloudSun'
    },
    {
      id: 2,
      name: 'EPA Air Quality',
      logo: 'Wind'
    },
    {
      id: 3,
      name: 'NASA Earth Data',
      logo: 'Globe'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Trusted Certifications</h3>
        <div className="grid grid-cols-1 gap-4">
          {certifications?.map((cert) => (
            <div
              key={cert?.id}
              className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/30 transition-colors duration-150"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Icon name={cert?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-foreground mb-1">{cert?.title}</h4>
                <p className="text-xs text-muted-foreground">{cert?.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Official Data Sources</h3>
        <div className="space-y-3">
          {dataSources?.map((source) => (
            <div
              key={source?.id}
              className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
            >
              <div className="w-8 h-8 rounded-md bg-secondary/10 flex items-center justify-center">
                <Icon name={source?.logo} size={16} className="text-secondary" />
              </div>
              <span className="text-sm font-medium text-foreground">{source?.name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 rounded-lg bg-success/10 border border-success/20">
        <div className="flex items-start gap-3">
          <Icon name="Lock" size={20} className="text-success flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="text-sm font-semibold text-success mb-1">Secure & Private</h4>
            <p className="text-xs text-success/80">
              Your environmental data is encrypted and never shared with third parties
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;