import React from 'react';
import { AgeCalculator } from '@/components/AgeCalculator';
import { InfoTabs } from '@/components/InfoTabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Globe, Calculator, Star, Zap, Shield } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 to-accent/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-primary/20 rounded-full">
              <Calculator className="h-12 w-12 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            ChronoSphere Calculator
          </h1>
          <p className="text-xl md:text-2xl text-accent font-semibold mb-6">
            "Your All-in-One Calculator"
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Experience the power of precision with our comprehensive calculator suite. From age calculations to complex mathematical operations, financial tools, and scientific formulas - we've got every calculation covered.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to={user ? "/calculators" : "/auth"}>
              <Button size="lg" className="gap-2 px-8 py-3">
                <Globe className="h-5 w-5" />
                Explore All Calculators
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="outline" size="lg" className="gap-2 px-8 py-3">
                <Shield className="h-5 w-5" />
                Sign In for More Features
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose ChronoSphere?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built for professionals, loved by everyone. Our calculator collection delivers unmatched accuracy and ease of use.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary/20 rounded-full">
                    <Zap className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Instant calculations with real-time results. No waiting, no delays.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-accent/20 rounded-full">
                    <Star className="h-8 w-8 text-accent" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">40+ Calculators</h3>
                <p className="text-muted-foreground">
                  From basic arithmetic to complex financial calculations - all in one place.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-secondary/20 rounded-full">
                    <Shield className="h-8 w-8 text-secondary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">Works Offline</h3>
                <p className="text-muted-foreground">
                  Progressive Web App technology ensures calculations work anywhere, anytime.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Calculator Demo Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-8 items-center`}>
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Try Our Most Popular Calculator
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  Start with our Age Calculator - precise, instant, and incredibly useful for planning and curiosity.
                </p>
                {!isMobile && <InfoTabs />}
              </div>
            </div>
            
            <div className="lg:pl-8">
              <AgeCalculator />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
