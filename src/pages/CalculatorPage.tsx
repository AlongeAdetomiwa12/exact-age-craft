import * as React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { BasicArithmeticCalculator } from '@/components/calculators/BasicArithmeticCalculator';
import { PercentageCalculator } from '@/components/calculators/PercentageCalculator';
import { TipCalculator } from '@/components/calculators/TipCalculator';
import { DiscountCalculator } from '@/components/calculators/DiscountCalculator';
import { SalesTaxCalculator } from '@/components/calculators/SalesTaxCalculator';
import { UnitPriceCalculator } from '@/components/calculators/UnitPriceCalculator';
import { RatioCalculator } from '@/components/calculators/RatioCalculator';
import { FractionDecimalConverter } from '@/components/calculators/FractionDecimalConverter';
import { GPACalculator } from '@/components/calculators/GPACalculator';
import { SimpleInterestCalculator } from '@/components/calculators/SimpleInterestCalculator';
import { CompoundInterestCalculator } from '@/components/calculators/CompoundInterestCalculator';
import { BMICalculator } from '@/components/calculators/BMICalculator';
import { FuelCostCalculator } from '@/components/calculators/FuelCostCalculator';
import { ExponentsRootsCalculator } from '@/components/calculators/ExponentsRootsCalculator';
import { LoanEMICalculator } from '@/components/calculators/LoanEMICalculator';
import { CookingConverter } from '@/components/calculators/CookingConverter';
import DogAgeCalculator from '@/components/calculators/DogAgeCalculator';
import CatAgeCalculator from '@/components/calculators/CatAgeCalculator';
import PregnancyCalculator from '@/components/calculators/PregnancyCalculator';

// Lazy load new calculators
const LogarithmCalculator = React.lazy(() => import('@/components/calculators/LogarithmCalculator').then(m => ({ default: m.LogarithmCalculator })));
const FactorialCombinationsCalculator = React.lazy(() => import('@/components/calculators/FactorialCombinationsCalculator').then(m => ({ default: m.FactorialCombinationsCalculator })));
const TrigonometryCalculator = React.lazy(() => import('@/components/calculators/TrigonometryCalculator').then(m => ({ default: m.TrigonometryCalculator })));
const GeometryCalculator = React.lazy(() => import('@/components/calculators/GeometryCalculator').then(m => ({ default: m.GeometryCalculator })));
const ROICalculator = React.lazy(() => import('@/components/calculators/ROICalculator').then(m => ({ default: m.ROICalculator })));
const DepreciationCalculator = React.lazy(() => import('@/components/calculators/DepreciationCalculator').then(m => ({ default: m.DepreciationCalculator })));
const CurrencyConverter = React.lazy(() => import('@/components/calculators/CurrencyConverter').then(m => ({ default: m.CurrencyConverter })));
const BMRCalculator = React.lazy(() => import('@/components/calculators/BMRCalculator').then(m => ({ default: m.BMRCalculator })));
const CalorieCalculator = React.lazy(() => import('@/components/calculators/CalorieCalculator').then(m => ({ default: m.CalorieCalculator })));

// Lazy load new calculators
const MatrixCalculator = React.lazy(() => import('@/components/calculators/MatrixCalculator').then(m => ({ default: m.MatrixCalculator })));
const QuadraticEquationSolver = React.lazy(() => import('@/components/calculators/QuadraticEquationSolver').then(m => ({ default: m.QuadraticEquationSolver })));
const APCalculator = React.lazy(() => import('@/components/calculators/APCalculator').then(m => ({ default: m.APCalculator })));
const GPCalculator = React.lazy(() => import('@/components/calculators/GPCalculator').then(m => ({ default: m.GPCalculator })));
const LCMGCDCalculator = React.lazy(() => import('@/components/calculators/LCMGCDCalculator').then(m => ({ default: m.LCMGCDCalculator })));
const ModularArithmeticCalculator = React.lazy(() => import('@/components/calculators/ModularArithmeticCalculator').then(m => ({ default: m.ModularArithmeticCalculator })));
const ComplexNumberCalculator = React.lazy(() => import('@/components/calculators/ComplexNumberCalculator').then(m => ({ default: m.ComplexNumberCalculator })));
const VectorCalculator = React.lazy(() => import('@/components/calculators/VectorCalculator').then(m => ({ default: m.VectorCalculator })));
const CircleTheoremCalculator = React.lazy(() => import('@/components/calculators/CircleTheoremCalculator').then(m => ({ default: m.CircleTheoremCalculator })));
const OhmsLawCalculator = React.lazy(() => import('@/components/calculators/OhmsLawCalculator').then(m => ({ default: m.OhmsLawCalculator })));
const ThermodynamicsCalculator = React.lazy(() => import('@/components/calculators/ThermodynamicsCalculator').then(m => ({ default: m.ThermodynamicsCalculator })));
const HeartRateZonesCalculator = React.lazy(() => import('@/components/calculators/HeartRateZonesCalculator').then(m => ({ default: m.HeartRateZonesCalculator })));
const FractionsCombinationsCalculator = React.lazy(() => import('@/components/calculators/FractionsCombinationsCalculator').then(m => ({ default: m.FractionsCombinationsCalculator })));
const BodyFatCalculator = React.lazy(() => import('@/components/calculators/BodyFatCalculator').then(m => ({ default: m.BodyFatCalculator })));
const ArrayAddressCalculator = React.lazy(() => import('@/components/calculators/ArrayAddressCalculator').then(m => ({ default: m.ArrayAddressCalculator })));

const calculatorComponents = {
  'basic-arithmetic': BasicArithmeticCalculator,
  'percentage': PercentageCalculator,
  'tip': TipCalculator,
  'discount': DiscountCalculator,
  'sales-tax': SalesTaxCalculator,
  'unit-price': UnitPriceCalculator,
  'ratio': RatioCalculator,
  'fraction-decimal': FractionDecimalConverter,
  'fractions-combinations': FractionsCombinationsCalculator,
  'gpa': GPACalculator,
  'matrix': MatrixCalculator,
  'quadratic': QuadraticEquationSolver,
  'ap': APCalculator,
  'gp': GPCalculator,
  'lcm-gcd': LCMGCDCalculator,
  'modular': ModularArithmeticCalculator,
  'complex': ComplexNumberCalculator,
  'vector': VectorCalculator,
  'circle': CircleTheoremCalculator,
  'simple-interest': SimpleInterestCalculator,
  'compound-interest': CompoundInterestCalculator,
  'bmi': BMICalculator,
  'fuel-cost': FuelCostCalculator,
  'exponents-roots': ExponentsRootsCalculator,
  'loan-emi': LoanEMICalculator,
  'cooking-converter': CookingConverter,
  'dog-age': DogAgeCalculator,
  'cat-age': CatAgeCalculator,
  'pregnancy': PregnancyCalculator,
  'logarithm': LogarithmCalculator,
  'factorial-combinations': FactorialCombinationsCalculator,
  'trigonometry': TrigonometryCalculator,
  'geometry': GeometryCalculator,
  'roi': ROICalculator,
  'depreciation': DepreciationCalculator,
  'currency-converter': CurrencyConverter,
  'bmr': BMRCalculator,
  'calorie': CalorieCalculator,
  'ohms-law': OhmsLawCalculator,
  'thermodynamics': ThermodynamicsCalculator,
  'heart-rate': HeartRateZonesCalculator,
  'body-fat': BodyFatCalculator,
  'array-address': ArrayAddressCalculator,
};

export const CalculatorPage: React.FC = () => {
  const { type } = useParams<{ type: string }>();
  
  if (!type || !(type in calculatorComponents)) {
    return <Navigate to="/calculators" replace />;
  }

  const CalculatorComponent = calculatorComponents[type as keyof typeof calculatorComponents];

  return (
    <div className="min-h-screen bg-background text-foreground py-8">
      <div className="container mx-auto px-4">
        <React.Suspense fallback={<div className="flex justify-center py-8">Loading calculator...</div>}>
          <CalculatorComponent />
        </React.Suspense>
      </div>
    </div>
  );
};