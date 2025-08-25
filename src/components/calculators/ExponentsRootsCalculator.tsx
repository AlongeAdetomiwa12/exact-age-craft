import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ExponentsRootsCalculator: React.FC = memo(() => {
  const [base, setBase] = useState('');
  const [exponent, setExponent] = useState('');
  const [number, setNumber] = useState('');
  const [rootIndex, setRootIndex] = useState('');
  const [powerResult, setPowerResult] = useState<number | null>(null);
  const [rootResult, setRootResult] = useState<number | null>(null);

  const calculatePower = () => {
    const b = parseFloat(base);
    const e = parseFloat(exponent);
    
    if (isNaN(b) || isNaN(e)) return;
    
    const result = Math.pow(b, e);
    setPowerResult(result);
  };

  const calculateRoot = () => {
    const n = parseFloat(number);
    const r = parseFloat(rootIndex);
    
    if (isNaN(n) || isNaN(r) || r === 0) return;
    
    const result = Math.pow(n, 1 / r);
    setRootResult(result);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Exponents & Roots Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate powers and roots of numbers
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="power" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="power">Powers (a^b)</TabsTrigger>
              <TabsTrigger value="root">Roots (ⁿ√a)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="power" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="base">Base (a)</Label>
                  <Input
                    id="base"
                    type="number"
                    placeholder="Enter base"
                    value={base}
                    onChange={(e) => setBase(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exponent">Exponent (b)</Label>
                  <Input
                    id="exponent"
                    type="number"
                    placeholder="Enter exponent"
                    value={exponent}
                    onChange={(e) => setExponent(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={calculatePower} className="w-full">
                Calculate Power
              </Button>
              
              {powerResult !== null && (
                <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                  <div className="text-sm opacity-90">Result</div>
                  <div className="text-2xl font-bold">
                    {base}^{exponent} = {powerResult.toExponential(6)}
                  </div>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                <strong>Formula:</strong> a^b means 'a' multiplied by itself 'b' times
              </div>
            </TabsContent>
            
            <TabsContent value="root" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="number">Number (a)</Label>
                  <Input
                    id="number"
                    type="number"
                    placeholder="Enter number"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rootIndex">Root Index (n)</Label>
                  <Input
                    id="rootIndex"
                    type="number"
                    placeholder="Enter root index"
                    value={rootIndex}
                    onChange={(e) => setRootIndex(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={calculateRoot} className="w-full">
                Calculate Root
              </Button>
              
              {rootResult !== null && (
                <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                  <div className="text-sm opacity-90">Result</div>
                  <div className="text-2xl font-bold">
                    {rootIndex}√{number} = {rootResult.toFixed(6)}
                  </div>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                <strong>Formula:</strong> ⁿ√a = a^(1/n)
                <br />Common roots: √a (square root, n=2), ∛a (cube root, n=3)
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
});