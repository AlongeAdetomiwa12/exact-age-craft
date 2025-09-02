import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const FractionsCombinationsCalculator: React.FC = memo(() => {
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [fractionResult, setFractionResult] = useState<any>(null);
  
  const [n, setN] = useState('');
  const [r, setR] = useState('');
  const [combinationResult, setCombinationResult] = useState<any>(null);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  };

  const simplifyFraction = () => {
    const num = parseInt(numerator);
    const den = parseInt(denominator);
    
    if (isNaN(num) || isNaN(den) || den === 0) return;
    
    const divisor = gcd(Math.abs(num), Math.abs(den));
    const simplifiedNum = num / divisor;
    const simplifiedDen = den / divisor;
    const decimal = num / den;
    
    setFractionResult({
      original: `${num}/${den}`,
      simplified: `${simplifiedNum}/${simplifiedDen}`,
      decimal: decimal.toFixed(6),
      percentage: (decimal * 100).toFixed(2),
      gcd: divisor
    });
  };

  const calculateCombinations = () => {
    const nVal = parseInt(n);
    const rVal = parseInt(r);
    
    if (isNaN(nVal) || isNaN(rVal) || nVal < 0 || rVal < 0 || rVal > nVal) return;
    
    const nFactorial = factorial(nVal);
    const rFactorial = factorial(rVal);
    const nMinusRFactorial = factorial(nVal - rVal);
    
    const combinations = nFactorial / (rFactorial * nMinusRFactorial);
    const permutations = nFactorial / nMinusRFactorial;
    
    setCombinationResult({
      n: nVal,
      r: rVal,
      nFactorial,
      rFactorial,
      nMinusRFactorial,
      combinations,
      permutations
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Fractions & Combinations Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Simplify fractions and calculate combinations and permutations
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="fractions" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="fractions">Fraction Simplifier</TabsTrigger>
              <TabsTrigger value="combinations">Combinations & Permutations</TabsTrigger>
            </TabsList>
            
            <TabsContent value="fractions" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
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
              
              <Button onClick={simplifyFraction} className="w-full">
                Simplify Fraction
              </Button>
              
              {fractionResult && (
                <div className="bg-gradient-primary rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-4 text-center">Fraction Results</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-sm opacity-90">Original</div>
                      <div className="text-xl font-bold">{fractionResult.original}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm opacity-90">Simplified</div>
                      <div className="text-xl font-bold">{fractionResult.simplified}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm opacity-90">Decimal</div>
                      <div className="text-xl font-bold">{fractionResult.decimal}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm opacity-90">Percentage</div>
                      <div className="text-xl font-bold">{fractionResult.percentage}%</div>
                    </div>
                  </div>
                  <div className="text-center mt-4">
                    <div className="text-sm opacity-90">Greatest Common Divisor</div>
                    <div className="text-lg font-bold">{fractionResult.gcd}</div>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="combinations" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="n">n (total items)</Label>
                  <Input
                    id="n"
                    type="number"
                    placeholder="Enter n"
                    value={n}
                    onChange={(e) => setN(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="r">r (items to choose)</Label>
                  <Input
                    id="r"
                    type="number"
                    placeholder="Enter r"
                    value={r}
                    onChange={(e) => setR(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={calculateCombinations} className="w-full">
                Calculate nCr and nPr
              </Button>
              
              {combinationResult && (
                <div className="bg-gradient-primary rounded-lg p-6 text-white">
                  <h3 className="text-lg font-semibold mb-4 text-center">
                    Results for n={combinationResult.n}, r={combinationResult.r}
                  </h3>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-sm opacity-90">Combinations (nCr)</div>
                      <div className="text-2xl font-bold">{combinationResult.combinations}</div>
                      <div className="text-xs opacity-80">Order doesn't matter</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm opacity-90">Permutations (nPr)</div>
                      <div className="text-2xl font-bold">{combinationResult.permutations}</div>
                      <div className="text-xs opacity-80">Order matters</div>
                    </div>
                  </div>
                  <div className="text-center space-y-1 text-sm opacity-90">
                    <div>n! = {combinationResult.nFactorial}</div>
                    <div>r! = {combinationResult.rFactorial}</div>
                    <div>(n-r)! = {combinationResult.nMinusRFactorial}</div>
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="text-xs text-muted-foreground bg-muted p-3 rounded mt-4">
            <strong>Formulas:</strong><br />
            • Combinations: nCr = n! / (r! × (n-r)!) - order doesn't matter<br />
            • Permutations: nPr = n! / (n-r)! - order matters<br />
            • Fraction simplification uses Greatest Common Divisor (GCD)
          </div>
        </CardContent>
      </Card>
    </div>
  );
});