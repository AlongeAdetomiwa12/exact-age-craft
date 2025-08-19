import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
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
  Globe,
  Calendar
} from 'lucide-react';

const calculatorRoutes = [
  { 
    name: "Age Calculator", 
    path: "/", 
    icon: Calendar, 
    description: "Calculate your exact age in multiple units" 
  },
  { 
    name: "Basic Arithmetic Calculator", 
    path: "/calculator/basic-arithmetic", 
    icon: Calculator, 
    description: "Basic math operations" 
  },
  { 
    name: "Percentage Calculator", 
    path: "/calculator/percentage", 
    icon: Percent, 
    description: "Calculate percentages and increases" 
  },
  { 
    name: "Tip Calculator", 
    path: "/calculator/tip", 
    icon: DollarSign, 
    description: "Calculate tips and split bills" 
  },
  { 
    name: "Discount Calculator", 
    path: "/calculator/discount", 
    icon: ShoppingCart, 
    description: "Calculate discounts and savings" 
  },
  { 
    name: "Sales Tax Calculator", 
    path: "/calculator/sales-tax", 
    icon: Receipt, 
    description: "Calculate sales tax amounts" 
  },
  { 
    name: "Unit Price Calculator", 
    path: "/calculator/unit-price", 
    icon: Scale, 
    description: "Compare unit prices" 
  },
  { 
    name: "Ratio Calculator", 
    path: "/calculator/ratio", 
    icon: PieChart, 
    description: "Calculate ratios and proportions" 
  },
  { 
    name: "Fraction to Decimal Converter", 
    path: "/calculator/fraction-decimal", 
    icon: Hash, 
    description: "Convert fractions to decimals" 
  },
  { 
    name: "GPA Calculator", 
    path: "/calculator/gpa", 
    icon: GraduationCap, 
    description: "Calculate your GPA" 
  },
  { 
    name: "Simple Interest Calculator", 
    path: "/calculator/simple-interest", 
    icon: Banknote, 
    description: "Calculate simple interest" 
  },
  { 
    name: "Compound Interest Calculator", 
    path: "/calculator/compound-interest", 
    icon: TrendingUp, 
    description: "Calculate compound interest" 
  }
];

export const CalculatorNavigation: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-accent mb-4">Calculator Collection</h1>
        <p className="text-lg text-muted-foreground">
          Choose from our comprehensive collection of specialized calculators
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculatorRoutes.map((calc) => (
          <Link key={calc.path} to={calc.path}>
            <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer h-full">
              <CardHeader className="text-center">
                <div className="bg-gradient-primary p-3 rounded-full w-fit mx-auto mb-3">
                  <calc.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-lg text-accent">{calc.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground text-center">
                  {calc.description}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};