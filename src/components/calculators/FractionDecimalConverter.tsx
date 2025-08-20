import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const FractionDecimalConverter: React.FC = () => {
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [decimal, setDecimal] = useState('');
  const [fractionResult, setFractionResult] = useState<{decimal: number, workings: string[]}>({decimal: 0, workings: []});
  const [decimalResult, setDecimalResult] = useState<{numerator: number, denominator: number, workings: string[]}>({numerator: 0, denominator: 1, workings: []});

  useEffect(() => {
    convertFractionToDecimal();
  }, [numerator, denominator]);

  useEffect(() => {
    convertDecimalToFraction();
  }, [decimal]);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const convertFractionToDecimal = () => {
    const num = parseFloat(numerator) || 0;
    const den = parseFloat(denominator) || 0;

    if (num && den && den !== 0) {
      const result = num / den;
      const workings = [
        `Given: Fraction = ${num}/${den}`,
        `Step 1: Divide numerator by denominator`,
        `Decimal = Numerator ÷ Denominator`,
        `Decimal = ${num} ÷ ${den}`,
        `Decimal = ${result}`
      ];

      setFractionResult({ decimal: result, workings });
    } else {
      setFractionResult({ decimal: 0, workings: [] });
    }
  };

  const convertDecimalToFraction = () => {
    const dec = parseFloat(decimal) || 0;

    if (dec) {
      // Handle decimal places
      const decimalString = dec.toString();
      const decimalPlaces = decimalString.includes('.') ? decimalString.split('.')[1].length : 0;
      
      let numerator = dec * Math.pow(10, decimalPlaces);
      let denominator = Math.pow(10, decimalPlaces);

      // Simplify the fraction
      const gcdValue = gcd(Math.abs(numerator), denominator);
      numerator = numerator / gcdValue;
      denominator = denominator / gcdValue;

      const workings = [
        `Given: Decimal = ${dec}`,
        `Step 1: Count decimal places = ${decimalPlaces}`,
        `Step 2: Remove decimal point`,
        `Numerator = ${dec} × 10^${decimalPlaces} = ${dec * Math.pow(10, decimalPlaces)}`,
        `Denominator = 10^${decimalPlaces} = ${Math.pow(10, decimalPlaces)}`,
        `Step 3: Simplify by dividing by GCD`,
        `GCD(${dec * Math.pow(10, decimalPlaces)}, ${Math.pow(10, decimalPlaces)}) = ${gcdValue}`,
        `Simplified fraction = ${numerator}/${denominator}`
      ];

      setDecimalResult({ numerator, denominator, workings });
    } else {
      setDecimalResult({ numerator: 0, denominator: 1, workings: [] });
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Fraction ⟷ Decimal Converter
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Convert between fractions and decimals
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="fraction-to-decimal" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="fraction-to-decimal">Fraction → Decimal</TabsTrigger>
              <TabsTrigger value="decimal-to-fraction">Decimal → Fraction</TabsTrigger>
            </TabsList>
            
            <TabsContent value="fraction-to-decimal" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-3 gap-2 items-center">
                    <div className="space-y-2">
                      <Label htmlFor="numerator">Numerator</Label>
                      <Input
                        id="numerator"
                        type="number"
                        placeholder="Enter numerator"
                        value={numerator}
                        onChange={(e) => setNumerator(e.target.value)}
                      />
                    </div>
                    <div className="text-center text-2xl font-bold text-accent pt-6">/</div>
                    <div className="space-y-2">
                      <Label htmlFor="denominator">Denominator</Label>
                      <Input
                        id="denominator"
                        type="number"
                        placeholder="Enter denominator"
                        value={denominator}
                        onChange={(e) => setDenominator(e.target.value)}
                      />
                    </div>
                  </div>

                  {fractionResult.decimal !== 0 && (
                    <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                      <div className="text-sm opacity-90">Decimal Result</div>
                      <div className="text-2xl font-bold">{fractionResult.decimal}</div>
                    </div>
                  )}
                </div>

                {fractionResult.workings.length > 0 && (
                  <div className="bg-secondary rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-accent mb-3">Step-by-Step Calculation</h3>
                    <div className="space-y-1">
                      {fractionResult.workings.map((step, index) => (
                        <div key={index} className="text-sm text-muted-foreground font-mono">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="decimal-to-fraction" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="decimal">Decimal</Label>
                    <Input
                      id="decimal"
                      type="number"
                      step="any"
                      placeholder="Enter decimal (e.g., 0.75)"
                      value={decimal}
                      onChange={(e) => setDecimal(e.target.value)}
                    />
                  </div>

                  {decimalResult.numerator !== 0 && (
                    <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                      <div className="text-sm opacity-90">Fraction Result</div>
                      <div className="text-2xl font-bold">
                        {decimalResult.numerator}/{decimalResult.denominator}
                      </div>
                    </div>
                  )}
                </div>

                {decimalResult.workings.length > 0 && (
                  <div className="bg-secondary rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-accent mb-3">Step-by-Step Calculation</h3>
                    <div className="space-y-1">
                      {decimalResult.workings.map((step, index) => (
                        <div key={index} className="text-sm text-muted-foreground font-mono">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};