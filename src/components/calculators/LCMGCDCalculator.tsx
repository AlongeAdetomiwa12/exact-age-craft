import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export const LCMGCDCalculator: React.FC = memo(() => {
  const [numbers, setNumbers] = useState('12, 18');
  const [lcm, setLcm] = useState(0);
  const [gcd, setGcd] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);

  useEffect(() => {
    calculateLCMGCD();
  }, [numbers]);

  const gcdTwo = (a: number, b: number): number => {
    while (b !== 0) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const lcmTwo = (a: number, b: number): number => {
    return Math.abs(a * b) / gcdTwo(a, b);
  };

  const calculateLCMGCD = () => {
    const nums = numbers
      .split(',')
      .map(n => parseInt(n.trim()))
      .filter(n => !isNaN(n) && n > 0);

    if (nums.length < 2) {
      setLcm(0);
      setGcd(0);
      setSteps([]);
      return;
    }

    // Calculate GCD
    let currentGCD = nums[0];
    for (let i = 1; i < nums.length; i++) {
      currentGCD = gcdTwo(currentGCD, nums[i]);
    }
    setGcd(currentGCD);

    // Calculate LCM
    let currentLCM = nums[0];
    for (let i = 1; i < nums.length; i++) {
      currentLCM = lcmTwo(currentLCM, nums[i]);
    }
    setLcm(currentLCM);

    // Generate steps for two numbers
    if (nums.length === 2) {
      const [a, b] = nums.sort((x, y) => y - x);
      const stepsList = [];
      
      stepsList.push(`Finding GCD of ${a} and ${b}:`);
      let x = a, y = b;
      while (y !== 0) {
        const quotient = Math.floor(x / y);
        const remainder = x % y;
        stepsList.push(`${x} = ${y} × ${quotient} + ${remainder}`);
        x = y;
        y = remainder;
      }
      stepsList.push(`GCD = ${currentGCD}`);
      stepsList.push(`LCM = (${a} × ${b}) ÷ GCD = ${currentLCM}`);
      
      setSteps(stepsList);
    } else {
      setSteps([
        `Numbers: ${nums.join(', ')}`,
        `GCD = ${currentGCD}`,
        `LCM = ${currentLCM}`
      ]);
    }
  };

  const getPrimeFactors = (n: number): number[] => {
    const factors = [];
    let d = 2;
    while (d * d <= n) {
      while (n % d === 0) {
        factors.push(d);
        n /= d;
      }
      d++;
    }
    if (n > 1) factors.push(n);
    return factors;
  };

  const nums = numbers
    .split(',')
    .map(n => parseInt(n.trim()))
    .filter(n => !isNaN(n) && n > 0);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          LCM & GCD Calculator
          <Badge variant="secondary">Mathematics</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="numbers">Numbers (comma-separated)</Label>
          <Input
            id="numbers"
            value={numbers}
            onChange={(e) => setNumbers(e.target.value)}
            placeholder="12, 18, 24"
          />
          <p className="text-xs text-muted-foreground">
            Enter at least 2 positive integers separated by commas
          </p>
        </div>

        {nums.length >= 2 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-muted p-4 rounded-lg">
                <Label className="text-sm text-muted-foreground">Greatest Common Divisor</Label>
                <div className="text-3xl font-bold text-primary">{gcd}</div>
                <p className="text-xs text-muted-foreground">GCD({nums.join(', ')})</p>
              </div>
              <div className="bg-muted p-4 rounded-lg">
                <Label className="text-sm text-muted-foreground">Least Common Multiple</Label>
                <div className="text-3xl font-bold text-primary">{lcm}</div>
                <p className="text-xs text-muted-foreground">LCM({nums.join(', ')})</p>
              </div>
            </div>

            {steps.length > 0 && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Calculation Steps</Label>
                <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
                  {steps.map((step, index) => (
                    <div key={index}>{step}</div>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm font-medium">Prime Factorization</Label>
              <div className="space-y-2">
                {nums.map((num, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span className="font-medium">{num} =</span>
                    <div className="flex gap-1">
                      {getPrimeFactors(num).map((factor, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Verification:</strong> LCM × GCD = {lcm} × {gcd} = {lcm * gcd}
              </p>
              {nums.length === 2 && (
                <p className="text-sm text-blue-800">
                  Product = {nums[0]} × {nums[1]} = {nums[0] * nums[1]}
                </p>
              )}
            </div>
          </>
        )}

        <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
          <p><strong>Formula:</strong> LCM(a,b) × GCD(a,b) = a × b</p>
          <p><strong>Method:</strong> Using Euclidean algorithm for GCD</p>
          <p>GCD finds the largest number that divides all inputs</p>
          <p>LCM finds the smallest number that all inputs divide</p>
        </div>
      </CardContent>
    </Card>
  );
});

LCMGCDCalculator.displayName = 'LCMGCDCalculator';