import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
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
  Calendar,
  Activity,
  Heart,
  Zap,
  Atom,
  FlaskConical,
  TrendingDown,
  DivideSquare,
  Sigma,
  BarChart,
  Target,
  Dog,
  Cat,
  Calculator as CalcIcon,
  Fuel,
  ChefHat,
  Baby,
  Square,
  LogOut,
  Hash as FactorialIcon,
  Triangle,
  CircleDot,
  Thermometer,
  PieChart as Pie
} from 'lucide-react';

interface CalculatorRoute {
  name: string;
  path: string;
  icon: any;
  description: string;
  category: string;
  formula?: string;
}

const calculatorRoutes: CalculatorRoute[] = [
  // Mathematics Calculators
  { 
    name: "Basic Arithmetic", 
    path: "/calculator/basic-arithmetic", 
    icon: Calculator, 
    description: "Add, subtract, multiply, divide", 
    category: "Mathematics",
    formula: "a + b, a - b, a × b, a ÷ b"
  },
  { 
    name: "Percentage Calculator", 
    path: "/calculator/percentage", 
    icon: Percent, 
    description: "Calculate percentages and increases", 
    category: "Mathematics",
    formula: "%Value = (P/100) × V"
  },
  { 
    name: "Ratio Calculator", 
    path: "/calculator/ratio", 
    icon: PieChart, 
    description: "Calculate ratios and proportions", 
    category: "Mathematics",
    formula: "a/b = c/d"
  },
  { 
    name: "Fraction & Combinations", 
    path: "/calculator/fractions-combinations", 
    icon: Hash, 
    description: "Simplify fractions, nCr, nPr", 
    category: "Mathematics",
    formula: "nCr = n!/(r!(n-r)!)"
  },
  { 
    name: "Exponents & Roots", 
    path: "/calculator/exponents-roots", 
    icon: Square, 
    description: "Powers and root calculations", 
    category: "Mathematics",
    formula: "a^b, ⁿ√a"
  },
  { 
    name: "Logarithm Calculator", 
    path: "/calculator/logarithm", 
    icon: LogOut, 
    description: "Calculate logarithms", 
    category: "Mathematics",
    formula: "log_b(a) = x ⟺ b^x = a"
  },
  { 
    name: "Factorial & Combinations", 
    path: "/calculator/factorial-combinations", 
    icon: FactorialIcon, 
    description: "Factorials, permutations, combinations", 
    category: "Mathematics",
    formula: "n!, nPr, nCr"
  },
  { 
    name: "Trigonometry Calculator", 
    path: "/calculator/trigonometry", 
    icon: Triangle, 
    description: "Sin, cos, tan functions", 
    category: "Mathematics",
    formula: "sin θ, cos θ, tan θ"
  },
  { 
    name: "Geometry Calculator", 
    path: "/calculator/geometry", 
    icon: CircleDot, 
    description: "Area and volume calculations", 
    category: "Mathematics",
    formula: "A = πr², V = 4/3πr³"
  },

  // Finance Calculators
  { 
    name: "Simple Interest", 
    path: "/calculator/simple-interest", 
    icon: Banknote, 
    description: "Calculate simple interest", 
    category: "Finance",
    formula: "SI = (P × R × T) / 100"
  },
  { 
    name: "Compound Interest", 
    path: "/calculator/compound-interest", 
    icon: TrendingUp, 
    description: "Calculate compound interest", 
    category: "Finance",
    formula: "A = P(1 + r/n)^(nt)"
  },
  { 
    name: "Loan EMI Calculator", 
    path: "/calculator/loan-emi", 
    icon: Receipt, 
    description: "Calculate EMI for loans", 
    category: "Finance",
    formula: "EMI = [P × r × (1+r)^n] / [(1+r)^n-1]"
  },
  { 
    name: "ROI Calculator", 
    path: "/calculator/roi", 
    icon: Target, 
    description: "Return on investment", 
    category: "Finance",
    formula: "(Gain - Cost) / Cost × 100"
  },
  { 
    name: "Depreciation Calculator", 
    path: "/calculator/depreciation", 
    icon: TrendingDown, 
    description: "Asset depreciation calculation", 
    category: "Finance",
    formula: "Straight Line: (Cost - Salvage) / Life"
  },
  { 
    name: "Currency Converter", 
    path: "/calculator/currency-converter", 
    icon: Globe, 
    description: "Convert between currencies", 
    category: "Finance",
    formula: "Amount × Exchange Rate"
  },

  // Health Calculators
  { 
    name: "BMI Calculator", 
    path: "/calculator/bmi", 
    icon: Activity, 
    description: "Body Mass Index calculator", 
    category: "Health",
    formula: "BMI = Weight(kg) / Height(m)²"
  },
  { 
    name: "BMR Calculator", 
    path: "/calculator/bmr", 
    icon: Heart, 
    description: "Basal Metabolic Rate", 
    category: "Health",
    formula: "Men: 10W + 6.25H - 5A + 5"
  },
  { 
    name: "Calorie Calculator", 
    path: "/calculator/calorie", 
    icon: Zap, 
    description: "Daily calorie needs (TDEE)", 
    category: "Health",
    formula: "TDEE = BMR × Activity Factor"
  },
  { 
    name: "Heart Rate Zones", 
    path: "/calculator/heart-rate", 
    icon: Heart, 
    description: "Training heart rate zones", 
    category: "Health",
    formula: "Max HR = 220 - age"
  },
  { 
    name: "Pregnancy Calculator", 
    path: "/calculator/pregnancy", 
    icon: Baby, 
    description: "Due date calculator", 
    category: "Health",
    formula: "EDD = LMP + 280 days"
  },
  { 
    name: "Body Fat Calculator", 
    path: "/calculator/body-fat", 
    icon: Activity, 
    description: "Body fat percentage", 
    category: "Health",
    formula: "Navy Method Formula"
  },

  // Science Calculators
  { 
    name: "Ohm's Law Calculator", 
    path: "/calculator/ohms-law", 
    icon: Zap, 
    description: "Voltage, current, resistance, power", 
    category: "Science",
    formula: "V = I×R, P = V×I"
  },
  { 
    name: "Thermodynamics Calculator", 
    path: "/calculator/thermodynamics", 
    icon: Thermometer, 
    description: "Heat transfer and efficiency", 
    category: "Science",
    formula: "Q = m×c×ΔT"
  },

  // Statistics Calculators
  { 
    name: "Mean & Standard Deviation", 
    path: "/calculator/mean-std", 
    icon: BarChart, 
    description: "Statistical measures", 
    category: "Statistics",
    formula: "σ = √[Σ(xi - μ)² / N]"
  },
  { 
    name: "Z-Score Calculator", 
    path: "/calculator/z-score", 
    icon: Sigma, 
    description: "Standard score calculation", 
    category: "Statistics",
    formula: "z = (x - μ) / σ"
  },
  { 
    name: "Probability Calculator", 
    path: "/calculator/probability", 
    icon: Pie, 
    description: "Normal distribution probability", 
    category: "Statistics",
    formula: "P(X) = e^(-(x-μ)²/2σ²)"
  },

  // Everyday Calculators
  { 
    name: "Age Calculator", 
    path: "/", 
    icon: Calendar, 
    description: "Calculate your exact age", 
    category: "Everyday",
    formula: "Years, months, days calculation"
  },
  { 
    name: "Tip Calculator", 
    path: "/calculator/tip", 
    icon: DollarSign, 
    description: "Calculate tips and split bills", 
    category: "Everyday",
    formula: "Tip = Bill × % / 100"
  },
  { 
    name: "Discount Calculator", 
    path: "/calculator/discount", 
    icon: ShoppingCart, 
    description: "Calculate discounts and savings", 
    category: "Everyday",
    formula: "Final = Original - (Original × %)"
  },
  { 
    name: "Sales Tax Calculator", 
    path: "/calculator/sales-tax", 
    icon: Receipt, 
    description: "Calculate sales tax amounts", 
    category: "Everyday",
    formula: "Final = Price + (Price × Tax%)"
  },
  { 
    name: "Unit Price Calculator", 
    path: "/calculator/unit-price", 
    icon: Scale, 
    description: "Compare unit prices", 
    category: "Everyday",
    formula: "Price per unit comparison"
  },
  { 
    name: "Fuel Cost Calculator", 
    path: "/calculator/fuel-cost", 
    icon: Fuel, 
    description: "Trip fuel cost calculation", 
    category: "Everyday",
    formula: "Cost = Distance / Mileage × Price"
  },
  { 
    name: "Cooking Converter", 
    path: "/calculator/cooking-converter", 
    icon: ChefHat, 
    description: "Recipe measurement converter", 
    category: "Everyday",
    formula: "Cups ↔ mL conversion"
  },
  { 
    name: "Dog Age Calculator", 
    path: "/calculator/dog-age", 
    icon: Dog, 
    description: "Dog to human age conversion", 
    category: "Everyday",
    formula: "16 ln(DogYears) + 31"
  },
  { 
    name: "Cat Age Calculator", 
    path: "/calculator/cat-age", 
    icon: Cat, 
    description: "Cat to human age conversion", 
    category: "Everyday",
    formula: "1st=15, 2nd=9, +4 each year"
  },
  { 
    name: "GPA Calculator", 
    path: "/calculator/gpa", 
    icon: GraduationCap, 
    description: "Grade Point Average", 
    category: "Everyday",
    formula: "GPA = Total Grade Points / Total Credits"
  }
];

const categories = [
  { name: "All", color: "hsl(var(--primary))" },
  { name: "Mathematics", color: "hsl(var(--blue-primary))" },
  { name: "Finance", color: "hsl(147 80% 35%)" },
  { name: "Health", color: "hsl(0 80% 50%)" },
  { name: "Science", color: "hsl(280 80% 50%)" },
  { name: "Statistics", color: "hsl(40 80% 50%)" },
  { name: "Everyday", color: "hsl(200 80% 50%)" }
];

const CalculatorCard = memo(({ calc }: { calc: CalculatorRoute }) => (
  <Link key={calc.path} to={calc.path}>
    <Card className="bg-gradient-card border-border shadow-card hover:shadow-glow transition-all duration-300 hover:scale-105 cursor-pointer h-full">
      <CardHeader className="text-center pb-3">
        <div className="bg-gradient-primary p-3 rounded-full w-fit mx-auto mb-3">
          <calc.icon className="h-6 w-6 text-white" />
        </div>
        <CardTitle className="text-lg text-accent mb-1">{calc.name}</CardTitle>
        <Badge 
          variant="secondary" 
          className="text-xs"
          style={{ backgroundColor: categories.find(c => c.name === calc.category)?.color + '20' }}
        >
          {calc.category}
        </Badge>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground text-center mb-2">
          {calc.description}
        </p>
        {calc.formula && (
          <p className="text-xs text-muted-foreground text-center font-mono bg-muted p-2 rounded">
            {calc.formula}
          </p>
        )}
      </CardContent>
    </Card>
  </Link>
));

export const CalculatorNavigation: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCalculators = selectedCategory === "All" 
    ? calculatorRoutes 
    : calculatorRoutes.filter(calc => calc.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-accent mb-4">ChronoSphere Calculator Suite</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Comprehensive mathematical and scientific calculations for every dimension of life
        </p>
        
        {/* Category Tags */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((category) => (
            <Button
              key={category.name}
              variant={selectedCategory === category.name ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.name)}
              className="transition-all duration-200"
              style={selectedCategory === category.name ? {
                backgroundColor: category.color,
                borderColor: category.color
              } : {}}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2 text-xs">
                {category.name === "All" 
                  ? calculatorRoutes.length 
                  : calculatorRoutes.filter(c => c.category === category.name).length
                }
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCalculators.map((calc) => (
          <CalculatorCard key={calc.path} calc={calc} />
        ))}
      </div>
    </div>
  );
};