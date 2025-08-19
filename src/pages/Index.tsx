import React from 'react';
import { AgeCalculator } from '@/components/AgeCalculator';
import { InfoTabs } from '@/components/InfoTabs';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Globe } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-accent mb-4">
                Advanced Age Calculator | Calculate Your Exact Age in Years, Months, Days
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Discover your precise age with our comprehensive calculator that shows your age in years, months, weeks, days, hours, and minutes. Get instant zodiac sign detection, birthday countdown, and day-of-week predictions all in one powerful tool.
              </p>
              
              <Link to="/calculators">
                <Button variant="explore" size="lg" className="mb-8">
                  <Globe className="mr-2 h-5 w-5" />
                  Explore All Calculators
                </Button>
              </Link>
            </div>
            
            <InfoTabs />
          </div>
          
          {/* Right Side */}
          <div className="lg:pl-8">
            <AgeCalculator />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
