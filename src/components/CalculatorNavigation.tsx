import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
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
  PieChart as Pie,
  Grid3X3,
  Navigation,
  Circle
} from 'lucide-react';

interface CalculatorRoute {
  name: string;
  path: string;
  icon: any;
  description: string;
  category: string;
  formula?: string;
  dateAdded?: string; // ISO date string for sorting
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
    formula: "Max HR = 220 - age",
    dateAdded: "2025-01-15"
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
    formula: "Navy Method Formula",
    dateAdded: "2025-01-16"
  },

  // Science Calculators
  { 
    name: "Ohm's Law Calculator", 
    path: "/calculator/ohms-law", 
    icon: Zap, 
    description: "Voltage, current, resistance, power", 
    category: "Science",
    formula: "V = I×R, P = V×I",
    dateAdded: "2025-01-14"
  },
  { 
    name: "Thermodynamics Calculator", 
    path: "/calculator/thermodynamics", 
    icon: Thermometer, 
    description: "Heat transfer and efficiency", 
    category: "Science",
    formula: "Q = m×c×ΔT",
    dateAdded: "2025-01-13"
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
  },
  { 
    name: "Matrix Calculator", 
    path: "/calculator/matrix", 
    icon: Grid3X3, 
    description: "Matrix operations and determinant", 
    category: "Mathematics",
    formula: "|A| = ad - bc (2x2 case)"
  },
  { 
    name: "Quadratic Equation Solver", 
    path: "/calculator/quadratic", 
    icon: Square,
    description: "Solve quadratic equations", 
    category: "Mathematics",
    formula: "x = [-b ± √(b² - 4ac)] / (2a)"
  },
  { 
    name: "AP Calculator", 
    path: "/calculator/ap", 
    icon: TrendingUp, 
    description: "Arithmetic Progression calculator", 
    category: "Mathematics",
    formula: "an = a + (n-1)d"
  },
  { 
    name: "GP Calculator", 
    path: "/calculator/gp", 
    icon: TrendingUp, 
    description: "Geometric Progression calculator", 
    category: "Mathematics",
    formula: "an = ar^(n-1)"
  },
  { 
    name: "LCM & GCD Calculator", 
    path: "/calculator/lcm-gcd", 
    icon: Hash, 
    description: "Least Common Multiple & Greatest Common Divisor", 
    category: "Mathematics",
    formula: "LCM(a,b) × GCD(a,b) = a × b"
  },
  { 
    name: "Modular Arithmetic Calculator", 
    path: "/calculator/modular", 
    icon: Percent, 
    description: "Modulo operations", 
    category: "Mathematics",
    formula: "a mod n = r"
  },
  { 
    name: "Complex Number Calculator", 
    path: "/calculator/complex", 
    icon: CalcIcon, 
    description: "Complex number operations", 
    category: "Mathematics",
    formula: "(a+bi)(c+di) = (ac-bd) + (ad+bc)i"
  },
  { 
    name: "Vector Calculator", 
    path: "/calculator/vector", 
    icon: Navigation, 
    description: "Vector operations and calculations", 
    category: "Mathematics",
    formula: "|v| = √(x² + y² + z²)"
  },
  { 
    name: "Circle Theorem Calculator", 
    path: "/calculator/circle", 
    icon: Circle, 
    description: "Circle geometry and theorems", 
    category: "Mathematics",
    formula: "Inscribed angle = Central angle ÷ 2",
    dateAdded: "2025-01-10"
  },
  { 
    name: "Array Address Calculator", 
    path: "/calculator/array-address", 
    icon: Grid3X3, 
    description: "Calculate memory address of array elements", 
    category: "Mathematics",
    formula: "Address[i] = Base + (i × Size)",
    dateAdded: "2025-01-17"
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
        <div className="flex items-center justify-center gap-2 mb-1">
          <CardTitle className="text-lg text-accent">{calc.name}</CardTitle>
          {calc.dateAdded && new Date(calc.dateAdded) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
            <Badge variant="default" className="text-xs bg-primary">New</Badge>
          )}
        </div>
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
  const [sortBy, setSortBy] = useState<"default" | "newest" | "alphabetical">("default");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter by search query
  let filteredCalculators = calculatorRoutes.filter(calc => {
    const matchesSearch = searchQuery === "" || 
      calc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      calc.formula?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || calc.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Apply sorting
  if (sortBy === "newest") {
    filteredCalculators = [...filteredCalculators].sort((a, b) => {
      const dateA = a.dateAdded ? new Date(a.dateAdded).getTime() : 0;
      const dateB = b.dateAdded ? new Date(b.dateAdded).getTime() : 0;
      return dateB - dateA; // Newest first
    });
  } else if (sortBy === "alphabetical") {
    filteredCalculators = [...filteredCalculators].sort((a, b) => 
      a.name.localeCompare(b.name)
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-accent mb-4">ChronoSphere Calculator Suite</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Comprehensive mathematical and scientific calculations for every dimension of life
        </p>
        
        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search calculators by name, description, or formula..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-6 text-base border-2 focus:border-primary transition-all duration-300"
            />
          </div>
        </div>
        
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

        {/* Sort Filter */}
        <div className="flex justify-center items-center gap-3 mb-6">
          <span className="text-sm text-muted-foreground font-medium">Sort by:</span>
          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-[180px] bg-background border-border">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent className="bg-popover border-border z-50">
              <SelectItem value="default">Default</SelectItem>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="alphabetical">A-Z</SelectItem>
            </SelectContent>
          </Select>
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