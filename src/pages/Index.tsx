import React from 'react';
import { AgeCalculator } from '@/components/AgeCalculator';
import { InfoTabs } from '@/components/InfoTabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Globe, Calculator, Star, Zap, Shield, Sparkles, ArrowRight, TrendingUp, Activity } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

const Index = () => {
  const isMobile = useIsMobile();
  const { user } = useAuth();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  const cardHoverVariants = {
    rest: { scale: 1, y: 0 },
    hover: { 
      scale: 1.05, 
      y: -10
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
      {/* Animated background gradients */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5 pointer-events-none"
        animate={{
          background: [
            "linear-gradient(to bottom right, hsl(var(--primary) / 0.05), hsl(var(--background)), hsl(var(--accent) / 0.05))",
            "linear-gradient(to bottom right, hsl(var(--accent) / 0.05), hsl(var(--background)), hsl(var(--primary) / 0.05))",
            "linear-gradient(to bottom right, hsl(var(--primary) / 0.05), hsl(var(--background)), hsl(var(--accent) / 0.05))"
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      <motion.div 
        className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: [0, 50, 0],
          y: [0, 30, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
          x: [0, -50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <motion.div 
          className="container mx-auto px-4 text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="flex justify-center mb-8"
            animate={{
              y: [0, -20, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="relative">
              <motion.div 
                className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-50"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.7, 0.5]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div 
                className="relative p-6 bg-gradient-primary rounded-full shadow-glow cursor-pointer"
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Calculator className="h-16 w-16 text-white" />
              </motion.div>
            </div>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent bg-[length:200%_auto]"
            initial={{ y: 20, opacity: 0 }}
            animate={{ 
              y: 0,
              opacity: 1,
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          >
            ChronoSphere
          </motion.h1>
          
          <motion.div 
            className="flex items-center justify-center gap-2 mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-5 w-5 text-accent" />
            </motion.div>
            <p className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
              Next-Gen Calculator Suite
            </p>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
            >
              <Sparkles className="h-5 w-5 text-primary" />
            </motion.div>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-10 leading-relaxed"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Precision meets innovation. From quantum-speed arithmetic to advanced scientific computations—experience calculations reimagined for the future.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to={user ? "/calculators" : "/auth"} className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  size="lg" 
                  className="gap-3 px-10 py-6 text-lg font-semibold bg-gradient-primary hover:shadow-glow transition-all duration-300 w-full sm:w-auto group active:scale-95 touch-manipulation"
                >
                  <Globe className="h-6 w-6" />
                  Explore Suite
                  <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: 0 }}
                    whileHover={{ x: 5 }}
                  >
                    <ArrowRight className="h-5 w-5 ml-1" />
                  </motion.div>
                </Button>
              </motion.div>
            </Link>
            <Link to="/auth" className="w-full sm:w-auto">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="gap-3 px-10 py-6 text-lg font-semibold border-2 hover:bg-primary/10 hover:border-primary transition-all duration-300 w-full sm:w-auto active:scale-95 touch-manipulation"
                >
                  <Shield className="h-6 w-6" />
                  Sign In
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Stats Section */}
          <motion.div 
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16"
            variants={containerVariants}
          >
            {[
              { number: "40+", label: "Calculators", icon: Calculator },
              { number: "100K+", label: "Calculations", icon: TrendingUp },
              { number: "99.9%", label: "Accuracy", icon: Activity }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="text-center"
              >
                <motion.div
                  animate={{ 
                    y: [0, -10, 0],
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                >
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Calculator Demo Section */}
      <section className="relative py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <motion.div 
            className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'} gap-12 items-center`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              className="space-y-8"
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div>
                <motion.h2 
                  className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent"
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                >
                  Featured Calculator
                </motion.h2>
                <motion.p 
                  className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  Our signature Age Calculator delivers instant, precise calculations with an intuitive interface designed for everyone.
                </motion.p>
                {!isMobile && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <InfoTabs />
                  </motion.div>
                )}
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:pl-8"
              initial={{ x: isMobile ? 0 : 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: isMobile ? 0.2 : 0.4 }}
            >
              <div className="relative">
                <motion.div 
                  className="absolute -inset-4 bg-gradient-primary rounded-2xl blur-2xl opacity-20"
                  animate={{
                    opacity: [0.2, 0.3, 0.2],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div 
                  className="relative touch-manipulation"
                  whileHover={{ scale: isMobile ? 1 : 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <AgeCalculator />
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
              Why ChronoSphere?
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Built with cutting-edge technology, designed for seamless experience across all devices and conditions.
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {[
              {
                icon: Zap,
                title: "Quantum Speed",
                description: "Real-time calculations powered by optimized algorithms. Experience zero-latency computing.",
                color: "primary",
                gradient: "from-primary/20 to-primary/5"
              },
              {
                icon: Star,
                title: "40+ Calculators",
                description: "Comprehensive suite covering mathematics, finance, health, science, and everyday needs.",
                color: "accent",
                gradient: "from-accent/20 to-accent/5"
              },
              {
                icon: Shield,
                title: "Offline Ready",
                description: "Progressive Web App technology ensures seamless operation anywhere, anytime.",
                color: "secondary",
                gradient: "from-secondary/20 to-secondary/5"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                animate="rest"
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover="hover"
              >
                <motion.div variants={cardHoverVariants}>
                  <Card className="group relative overflow-hidden border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-glow h-full cursor-pointer">
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                    />
                    <CardContent className="relative p-8">
                      <motion.div 
                        className="flex justify-center mb-6"
                        whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.div 
                          className={`p-4 bg-gradient-to-br ${feature.gradient} rounded-2xl`}
                          whileHover={{ scale: 1.1 }}
                        >
                          <feature.icon className={`h-10 w-10 text-${feature.color}`} />
                        </motion.div>
                      </motion.div>
                      <h3 className="text-2xl font-bold mb-3 text-center">{feature.title}</h3>
                      <p className="text-muted-foreground text-center leading-relaxed">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Index;
