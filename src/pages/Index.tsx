import React from 'react';
import { AgeCalculator } from '@/components/AgeCalculator';
import { InfoTabs } from '@/components/InfoTabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Globe, Calculator, Star, Zap, Shield, Sparkles } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';

const Index = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center mb-8 animate-fade-in">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-50 animate-pulse" />
              <div className="relative p-6 bg-gradient-primary rounded-full shadow-glow">
                <Calculator className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-fade-in bg-[length:200%_auto] animate-pulse">
            ChronoSphere
          </h1>
          
          <div className="flex items-center justify-center gap-2 mb-6 animate-fade-in">
            <Sparkles className="h-5 w-5 text-accent animate-pulse" />
            <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Next-Gen Calculator Suite
            </p>
            <Sparkles className="h-5 w-5 text-primary animate-pulse" />
          </div>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 animate-fade-in leading-relaxed">
            Precision meets innovation. From quantum-speed arithmetic to advanced scientific computations—experience calculations reimagined for the future.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in">
            <Link to={user ? "/calculators" : "/auth"} className="w-full sm:w-auto">
              <Button size="lg" className="gap-3 px-10 py-6 text-lg font-semibold bg-gradient-primary hover:shadow-glow transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                <Globe className="h-6 w-6" />
                Explore Suite
              </Button>
            </Link>
            <Link to="/auth" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="gap-3 px-10 py-6 text-lg font-semibold border-2 hover:bg-primary/10 hover:border-primary transition-all duration-300 hover:scale-105 w-full sm:w-auto">
                <Shield className="h-6 w-6" />
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Calculator Demo Section */}
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-12 items-center`}>
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Featured Calculator
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
                  Our signature Age Calculator delivers instant, precise calculations with an intuitive interface designed for everyone.
                </p>
                {!isMobile && <InfoTabs />}
              </div>
            </div>
            
            <div className="lg:pl-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-primary rounded-2xl blur-2xl opacity-20" />
                <div className="relative">
                  <AgeCalculator />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Why ChronoSphere?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with cutting-edge technology, designed for seamless experience across all devices and conditions.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-glow hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-primary/20 to-primary/5 rounded-2xl group-hover:shadow-glow transition-all duration-300">
                    <Zap className="h-10 w-10 text-primary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center">Quantum Speed</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Real-time calculations powered by optimized algorithms. Experience zero-latency computing.
                </p>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-2 hover:border-accent/50 transition-all duration-300 hover:shadow-glow hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-accent/20 to-accent/5 rounded-2xl group-hover:shadow-glow transition-all duration-300">
                    <Star className="h-10 w-10 text-accent" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center">40+ Calculators</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Comprehensive suite covering mathematics, finance, health, science, and everyday needs.
                </p>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-2 hover:border-secondary/50 transition-all duration-300 hover:shadow-glow hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative p-8">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-br from-secondary/20 to-secondary/5 rounded-2xl group-hover:shadow-glow transition-all duration-300">
                    <Shield className="h-10 w-10 text-secondary" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3 text-center">Offline Ready</h3>
                <p className="text-muted-foreground text-center leading-relaxed">
                  Progressive Web App technology ensures seamless operation anywhere, anytime.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
