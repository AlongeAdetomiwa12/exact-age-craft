import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { BasicArithmeticCalculator } from '@/components/calculators/BasicArithmeticCalculator';
import { PercentageCalculator } from '@/components/calculators/PercentageCalculator';
import { TipCalculator } from '@/components/calculators/TipCalculator';
import { DiscountCalculator } from '@/components/calculators/DiscountCalculator';

const calculatorComponents = {
  'basic-arithmetic': BasicArithmeticCalculator,
  'percentage': PercentageCalculator,
  'tip': TipCalculator,
  'discount': DiscountCalculator,
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