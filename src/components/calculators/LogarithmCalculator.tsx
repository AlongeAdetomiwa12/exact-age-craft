import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const LogarithmCalculator: React.FC = memo(() => {
  const [value, setValue] = useState('');
  const [base, setBase] = useState('');
  const [result, setResult] = useState<number | null>(null);
  const [naturalLogValue, setNaturalLogValue] = useState('');
  const [naturalLogResult, setNaturalLogResult] = useState<number | null>(null);
  const [commonLogValue, setCommonLogValue] = useState('');
  const [commonLogResult, setCommonLogResult] = useState<number | null>(null);

  const calculateCustomLog = () => {
    const v = parseFloat(value);
    const b = parseFloat(base);
    
    if (isNaN(v) || isNaN(b) || v <= 0 || b <= 0 || b === 1) return;
    
    const logResult = Math.log(v) / Math.log(b);
    setResult(logResult);
  };

  const calculateNaturalLog = () => {
    const v = parseFloat(naturalLogValue);
    if (isNaN(v) || v <= 0) return;
    
    setNaturalLogResult(Math.log(v));
  };

  const calculateCommonLog = () => {
    const v = parseFloat(commonLogValue);
    if (isNaN(v) || v <= 0) return;
    
    setCommonLogResult(Math.log10(v));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Logarithm Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate logarithms with different bases
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="custom" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="custom">Custom Base</TabsTrigger>
              <TabsTrigger value="natural">Natural (ln)</TabsTrigger>
              <TabsTrigger value="common">Common (log₁₀)</TabsTrigger>
            </TabsList>
            
            <TabsContent value="custom" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="value">Value (a)</Label>
                  <Input
                    id="value"
                    type="number"
                    placeholder="Enter value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="base">Base (b)</Label>
                  <Input
                    id="base"
                    type="number"
                    placeholder="Enter base"
                    value={base}
                    onChange={(e) => setBase(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={calculateCustomLog} className="w-full">
                Calculate log₍ᵦ₎(a)
              </Button>
              
              {result !== null && (
                <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                  <div className="text-sm opacity-90">Result</div>
                  <div className="text-2xl font-bold">
                    log₍{base}₎({value}) = {result.toFixed(6)}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="natural" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="naturalValue">Value</Label>
                <Input
                  id="naturalValue"
                  type="number"
                  placeholder="Enter value for ln(x)"
                  value={naturalLogValue}
                  onChange={(e) => setNaturalLogValue(e.target.value)}
                />
              </div>
              
              <Button onClick={calculateNaturalLog} className="w-full">
                Calculate ln(x)
              </Button>
              
              {naturalLogResult !== null && (
                <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                  <div className="text-sm opacity-90">Result</div>
                  <div className="text-2xl font-bold">
                    ln({naturalLogValue}) = {naturalLogResult.toFixed(6)}
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="common" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="commonValue">Value</Label>
                <Input
                  id="commonValue"
                  type="number"
                  placeholder="Enter value for log₁₀(x)"
                  value={commonLogValue}
                  onChange={(e) => setCommonLogValue(e.target.value)}
                />
              </div>
              
              <Button onClick={calculateCommonLog} className="w-full">
                Calculate log₁₀(x)
              </Button>
              
              {commonLogResult !== null && (
                <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                  <div className="text-sm opacity-90">Result</div>
                  <div className="text-2xl font-bold">
                    log₁₀({commonLogValue}) = {commonLogResult.toFixed(6)}
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="text-xs text-muted-foreground bg-muted p-3 rounded mt-4">
            <strong>Formulas:</strong><br />
            • Custom: log₍ᵦ₎(a) = ln(a) / ln(b)<br />
            • Natural: ln(x) uses base e ≈ 2.718<br />
            • Common: log₁₀(x) uses base 10
          </div>
        </CardContent>
      </Card>
    </div>
  );
});