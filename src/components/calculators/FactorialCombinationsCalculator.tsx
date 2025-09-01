import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const FactorialCombinationsCalculator: React.FC = memo(() => {
  const [factorialN, setFactorialN] = useState('');
  const [permutationN, setPermutationN] = useState('');
  const [permutationR, setPermutationR] = useState('');
  const [combinationN, setCombinationN] = useState('');
  const [combinationR, setCombinationR] = useState('');
  const [factorialResult, setFactorialResult] = useState<number | null>(null);
  const [permutationResult, setPermutationResult] = useState<number | null>(null);
  const [combinationResult, setCombinationResult] = useState<number | null>(null);

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  const calculateFactorial = () => {
    const n = parseInt(factorialN);
    if (isNaN(n) || n < 0) return;
    
    setFactorialResult(factorial(n));
  };

  const calculatePermutation = () => {
    const n = parseInt(permutationN);
    const r = parseInt(permutationR);
    
    if (isNaN(n) || isNaN(r) || n < 0 || r < 0 || r > n) return;
    
    const result = factorial(n) / factorial(n - r);
    setPermutationResult(result);
  };

  const calculateCombination = () => {
    const n = parseInt(combinationN);
    const r = parseInt(combinationR);
    
    if (isNaN(n) || isNaN(r) || n < 0 || r < 0 || r > n) return;
    
    const result = factorial(n) / (factorial(r) * factorial(n - r));
    setCombinationResult(result);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Factorial & Combinations Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate factorials, permutations, and combinations
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="factorial" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="factorial">Factorial (n!)</TabsTrigger>
              <TabsTrigger value="permutation">Permutation (nPr)</TabsTrigger>
              <TabsTrigger value="combination">Combination (nCr)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="factorial" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="factorialN">Number (n)</Label>
                <Input
                  id="factorialN"
                  type="number"
                  placeholder="Enter number"
                  value={factorialN}
                  onChange={(e) => setFactorialN(e.target.value)}
                />
              </div>
              
              <Button onClick={calculateFactorial} className="w-full">
                Calculate n!
              </Button>
              
              {factorialResult !== null && (
                <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                  <div className="text-sm opacity-90">Result</div>
                  <div className="text-2xl font-bold">
                    {factorialN}! = {factorialResult.toLocaleString()}
                  </div>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                <strong>Formula:</strong> n! = n × (n-1) × (n-2) × ... × 1
              </div>
            </TabsContent>
            
            <TabsContent value="permutation" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="permutationN">Total items (n)</Label>
                  <Input
                    id="permutationN"
                    type="number"
                    placeholder="Enter n"
                    value={permutationN}
                    onChange={(e) => setPermutationN(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="permutationR">Selected items (r)</Label>
                  <Input
                    id="permutationR"
                    type="number"
                    placeholder="Enter r"
                    value={permutationR}
                    onChange={(e) => setPermutationR(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={calculatePermutation} className="w-full">
                Calculate nPr
              </Button>
              
              {permutationResult !== null && (
                <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                  <div className="text-sm opacity-90">Result</div>
                  <div className="text-2xl font-bold">
                    {permutationN}P{permutationR} = {permutationResult.toLocaleString()}
                  </div>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                <strong>Formula:</strong> nPr = n! / (n-r)!<br />
                Order matters in permutations
              </div>
            </TabsContent>
            
            <TabsContent value="combination" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="combinationN">Total items (n)</Label>
                  <Input
                    id="combinationN"
                    type="number"
                    placeholder="Enter n"
                    value={combinationN}
                    onChange={(e) => setCombinationN(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="combinationR">Selected items (r)</Label>
                  <Input
                    id="combinationR"
                    type="number"
                    placeholder="Enter r"
                    value={combinationR}
                    onChange={(e) => setCombinationR(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={calculateCombination} className="w-full">
                Calculate nCr
              </Button>
              
              {combinationResult !== null && (
                <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                  <div className="text-sm opacity-90">Result</div>
                  <div className="text-2xl font-bold">
                    {combinationN}C{combinationR} = {combinationResult.toLocaleString()}
                  </div>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                <strong>Formula:</strong> nCr = n! / (r! × (n-r)!)<br />
                Order doesn't matter in combinations
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
});