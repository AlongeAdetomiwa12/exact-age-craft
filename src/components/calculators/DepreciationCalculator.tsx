import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const DepreciationCalculator: React.FC = memo(() => {
  // Straight Line
  const [slCost, setSlCost] = useState('');
  const [slSalvage, setSlSalvage] = useState('');
  const [slLife, setSlLife] = useState('');
  const [slDepreciation, setSlDepreciation] = useState<number | null>(null);

  // Declining Balance
  const [dbInitialValue, setDbInitialValue] = useState('');
  const [dbRate, setDbRate] = useState('');
  const [dbYears, setDbYears] = useState('');
  const [dbResult, setDbResult] = useState<{ year: number; value: number; depreciation: number }[]>([]);

  const calculateStraightLine = () => {
    const cost = parseFloat(slCost);
    const salvage = parseFloat(slSalvage);
    const life = parseFloat(slLife);

    if (isNaN(cost) || isNaN(salvage) || isNaN(life) || life === 0) return;

    const annualDepreciation = (cost - salvage) / life;
    setSlDepreciation(annualDepreciation);
  };

  const calculateDecliningBalance = () => {
    const initialValue = parseFloat(dbInitialValue);
    const rate = parseFloat(dbRate) / 100;
    const years = parseInt(dbYears);

    if (isNaN(initialValue) || isNaN(rate) || isNaN(years) || years <= 0) return;

    const results = [];
    let currentValue = initialValue;

    for (let year = 1; year <= years; year++) {
      const depreciation = currentValue * rate;
      currentValue -= depreciation;
      results.push({
        year,
        value: currentValue,
        depreciation
      });
    }

    setDbResult(results);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Depreciation Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate asset depreciation using different methods
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="straight" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="straight">Straight Line</TabsTrigger>
              <TabsTrigger value="declining">Declining Balance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="straight" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="slCost">Initial Cost ($)</Label>
                  <Input
                    id="slCost"
                    type="number"
                    placeholder="Enter cost"
                    value={slCost}
                    onChange={(e) => setSlCost(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slSalvage">Salvage Value ($)</Label>
                  <Input
                    id="slSalvage"
                    type="number"
                    placeholder="Enter salvage value"
                    value={slSalvage}
                    onChange={(e) => setSlSalvage(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slLife">Useful Life (years)</Label>
                  <Input
                    id="slLife"
                    type="number"
                    placeholder="Enter years"
                    value={slLife}
                    onChange={(e) => setSlLife(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={calculateStraightLine} className="w-full">
                Calculate Straight Line Depreciation
              </Button>
              
              {slDepreciation !== null && (
                <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                  <div className="text-sm opacity-90">Annual Depreciation</div>
                  <div className="text-2xl font-bold">
                    ${slDepreciation.toFixed(2)}
                  </div>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                <strong>Formula:</strong> Annual Depreciation = (Cost - Salvage Value) / Useful Life
              </div>
            </TabsContent>
            
            <TabsContent value="declining" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dbInitialValue">Initial Value ($)</Label>
                  <Input
                    id="dbInitialValue"
                    type="number"
                    placeholder="Enter initial value"
                    value={dbInitialValue}
                    onChange={(e) => setDbInitialValue(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dbRate">Depreciation Rate (%)</Label>
                  <Input
                    id="dbRate"
                    type="number"
                    placeholder="Enter rate"
                    value={dbRate}
                    onChange={(e) => setDbRate(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dbYears">Number of Years</Label>
                  <Input
                    id="dbYears"
                    type="number"
                    placeholder="Enter years"
                    value={dbYears}
                    onChange={(e) => setDbYears(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={calculateDecliningBalance} className="w-full">
                Calculate Declining Balance
              </Button>
              
              {dbResult.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-semibold text-accent">Year-by-Year Breakdown:</h4>
                  <div className="bg-secondary rounded-lg p-4 max-h-48 overflow-y-auto">
                    {dbResult.map((result) => (
                      <div key={result.year} className="flex justify-between items-center py-1 border-b border-border last:border-b-0">
                        <span className="text-sm">Year {result.year}</span>
                        <div className="text-right">
                          <div className="text-sm font-medium">${result.value.toFixed(2)}</div>
                          <div className="text-xs text-muted-foreground">-${result.depreciation.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                <strong>Formula:</strong> Book Value = Previous Value × (1 - Depreciation Rate)
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
});