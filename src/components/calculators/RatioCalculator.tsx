import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const RatioCalculator: React.FC = () => {
  const [a, setA] = useState('');
  const [b, setB] = useState('');
  const [c, setC] = useState('');
  const [d, setD] = useState('');
  const [result, setResult] = useState<{ratio: string, decimal: number, gcd: number} | null>(null);
  const [proportionResult, setProportionResult] = useState<string>('');
  const [workings, setWorkings] = useState<string[]>([]);

  useEffect(() => {
    calculateRatio();
  }, [a, b]);

  useEffect(() => {
    calculateProportion();
  }, [a, b, c, d]);

  const gcd = (a: number, b: number): number => {
    return b === 0 ? a : gcd(b, a % b);
  };

  const calculateRatio = () => {
    const numA = parseFloat(a) || 0;
    const numB = parseFloat(b) || 0;

    if (numA && numB) {
      const gcdValue = gcd(Math.abs(numA), Math.abs(numB));
      const simplifiedA = numA / gcdValue;
      const simplifiedB = numB / gcdValue;
      const decimal = numA / numB;

      setResult({
        ratio: `${simplifiedA}:${simplifiedB}`,
        decimal: decimal,
        gcd: gcdValue
      });

      setWorkings([
        `Given: a = ${numA}, b = ${numB}`,
        `Step 1: Find GCD of ${numA} and ${numB}`,
        `GCD(${numA}, ${numB}) = ${gcdValue}`,
        `Step 2: Simplify the ratio`,
        `Simplified ratio = ${numA}÷${gcdValue} : ${numB}÷${gcdValue}`,
        `Simplified ratio = ${simplifiedA} : ${simplifiedB}`,
        `Step 3: Convert to decimal`,
        `Decimal = a ÷ b = ${numA} ÷ ${numB} = ${decimal.toFixed(4)}`
      ]);
    } else {
      setResult(null);
      setWorkings([]);
    }
  };

  const calculateProportion = () => {
    const numA = parseFloat(a) || 0;
    const numB = parseFloat(b) || 0;
    const numC = parseFloat(c) || 0;
    const numD = parseFloat(d) || 0;

    if (numA && numB && numC && numD) {
      const leftSide = numA * numD;
      const rightSide = numB * numC;
      const isEqual = Math.abs(leftSide - rightSide) < 0.0001;
      
      setProportionResult(
        `${numA}/${numB} ${isEqual ? '=' : '≠'} ${numC}/${numD}\n` +
        `Cross multiplication: ${numA} × ${numD} = ${leftSide}, ${numB} × ${numC} = ${rightSide}\n` +
        `Result: ${isEqual ? 'Equal proportions' : 'Not equal proportions'}`
      );
    } else {
      setProportionResult('');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Ratio Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate ratios and check proportions
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="ratio" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="ratio">Ratio Calculation</TabsTrigger>
              <TabsTrigger value="proportion">Proportion Check</TabsTrigger>
            </TabsList>
            
            <TabsContent value="ratio" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="a">Value A</Label>
                      <Input
                        id="a"
                        type="number"
                        placeholder="Enter value A"
                        value={a}
                        onChange={(e) => setA(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="b">Value B</Label>
                      <Input
                        id="b"
                        type="number"
                        placeholder="Enter value B"
                        value={b}
                        onChange={(e) => setB(e.target.value)}
                      />
                    </div>
                  </div>

                  {result && (
                    <div className="space-y-3">
                      <div className="bg-secondary rounded-lg p-4 text-center">
                        <div className="text-sm text-muted-foreground">Simplified Ratio</div>
                        <div className="text-2xl font-bold text-accent">{result.ratio}</div>
                      </div>
                      <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                        <div className="text-sm opacity-90">Decimal Value</div>
                        <div className="text-xl font-bold">{result.decimal.toFixed(4)}</div>
                      </div>
                    </div>
                  )}
                </div>

                {workings.length > 0 && (
                  <div className="bg-secondary rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-accent mb-3">Step-by-Step Calculation</h3>
                    <div className="space-y-1">
                      {workings.map((step, index) => (
                        <div key={index} className="text-sm text-muted-foreground font-mono">
                          {step}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="proportion" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="text-center text-lg text-muted-foreground">
                    Check if a/b = c/d
                  </div>
                  <div className="grid grid-cols-4 gap-2 items-center">
                    <Input
                      type="number"
                      placeholder="a"
                      value={a}
                      onChange={(e) => setA(e.target.value)}
                    />
                    <div className="text-center text-lg">/</div>
                    <Input
                      type="number"
                      placeholder="b"
                      value={b}
                      onChange={(e) => setB(e.target.value)}
                    />
                    <div className="text-center text-lg">=</div>
                  </div>
                  <div className="grid grid-cols-4 gap-2 items-center">
                    <Input
                      type="number"
                      placeholder="c"
                      value={c}
                      onChange={(e) => setC(e.target.value)}
                    />
                    <div className="text-center text-lg">/</div>
                    <Input
                      type="number"
                      placeholder="d"
                      value={d}
                      onChange={(e) => setD(e.target.value)}
                    />
                    <div></div>
                  </div>

                  {proportionResult && (
                    <div className="bg-secondary rounded-lg p-4">
                      <h3 className="text-lg font-semibold text-accent mb-2">Result</h3>
                      <pre className="text-sm text-muted-foreground whitespace-pre-line">
                        {proportionResult}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};