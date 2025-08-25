import React from 'react';
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

const calculatorComponents = {
  'basic-arithmetic': BasicArithmeticCalculator,
  'percentage': PercentageCalculator,
  'tip': TipCalculator,
  'discount': DiscountCalculator,
  'sales-tax': SalesTaxCalculator,
  'unit-price': UnitPriceCalculator,
  'ratio': RatioCalculator,
  'fraction-decimal': FractionDecimalConverter,
  'gpa': GPACalculator,
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
        <CalculatorComponent />
      </div>
    </div>
  );
};