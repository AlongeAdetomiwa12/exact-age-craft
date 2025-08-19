import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Calculator, 
  Percent, 
  DollarSign, 
  ShoppingCart, 
  Receipt, 
  Scale,
  PieChart,
  Hash,
  RotateCcw, 
  TrendingUp,
  BarChart3,
  GraduationCap,
  Award,
  Banknote,
  Clock,
  Globe
} from 'lucide-react';

const calculatorCategories = {
  "Basic Math & Everyday Use": [
    { name: "Basic Arithmetic Calculator", icon: Calculator },
    { name: "Percentage Calculator", icon: Percent },
    { name: "Tip Calculator", icon: DollarSign },
    { name: "Discount Calculator", icon: ShoppingCart },
    { name: "Sales Tax Calculator", icon: Receipt },
    { name: "Unit Price Calculator", icon: Scale },
    { name: "Ratio Calculator", icon: PieChart },
    { name: "Fraction to Decimal Converter", icon: Hash },
    { name: "Decimal to Fraction Converter", icon: RotateCcw },
    { name: "Percentage Increase/Decrease Calculator", icon: TrendingUp },
    { name: "Average Calculator", icon: BarChart3 },
    { name: "GPA Calculator", icon: GraduationCap },
    { name: "Grade Calculator", icon: Award },
    { name: "Simple Interest Calculator", icon: Banknote },
    { name: "Compound Interest Calculator", icon: Banknote },
    { name: "Currency Converter", icon: DollarSign },
    { name: "Time Zone Converter", icon: Clock }
  ]
};

export const CalculatorsMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <Button 
        variant="explore" 
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className="mb-8"
      >
        <Globe className="mr-2 h-5 w-5" />
        Explore All Calculators
      </Button>
      
      {isOpen && (
        <Card className="absolute top-full left-0 right-0 z-50 bg-gradient-card border-border shadow-card mt-2">
          <CardHeader>
            <CardTitle className="text-accent">All Available Calculators</CardTitle>
          </CardHeader>
          <CardContent>
            {Object.entries(calculatorCategories).map(([category, calculators]) => (
              <div key={category} className="mb-6">
                <h3 className="text-lg font-semibold text-accent mb-3">{category}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                  {calculators.map((calc) => (
                    <Button
                      key={calc.name}
                      variant="ghost"
                      className="justify-start h-auto p-3 text-left hover:bg-secondary/50"
                    >
                      <calc.icon className="mr-3 h-4 w-4 flex-shrink-0" />
                      <span className="text-sm">{calc.name}</span>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};