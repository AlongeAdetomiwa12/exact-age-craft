import React from 'react';
import { AgeCalculator } from '@/components/AgeCalculator';
import { InfoTabs } from '@/components/InfoTabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const Index = () => {
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-8`}>
          {/* Left Side - Always show on mobile, conditionally on desktop */}
          <div className="space-y-6">
            {!isMobile && (
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-accent mb-4">
                  ChronoSphere Calculator Suite | Precision Calculations Across Time & Mathematics
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  Discover precise calculations with our comprehensive suite featuring advanced age calculations, mathematical operations, financial tools, scientific formulas, and statistical analysis. Get instant results with professional-grade accuracy across every dimension of calculation.
                </p>
                
                <Link to="/calculators">
                  <Button variant="explore" size="lg" className="mb-8">
                    <Globe className="mr-2 h-5 w-5" />
                    Explore All Calculators
                  </Button>
                </Link>
              </div>
            )}
            
            {!isMobile && <InfoTabs />}
            
            {/* Mobile: Show only Age Calculator */}
            {isMobile && (
              <div>
                <h1 className="text-2xl font-bold text-accent mb-4">
                  ChronoSphere Calculator
                </h1>
                <AgeCalculator />
              </div>
            )}
          </div>
          
          {/* Right Side - Only show on desktop */}
          {!isMobile && (
            <div className="lg:pl-8">
              <AgeCalculator />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
