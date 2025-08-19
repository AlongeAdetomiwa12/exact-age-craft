import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const PercentageCalculator: React.FC = () => {
  const [basicValue, setBasicValue] = useState('');
  const [basicPercent, setBasicPercent] = useState('');
  const [basicResult, setBasicResult] = useState<number | null>(null);

  const [increaseValue, setIncreaseValue] = useState('');
  const [increasePercent, setIncreasePercent] = useState('');
  const [increaseResult, setIncreaseResult] = useState<number | null>(null);

  const [partValue, setPartValue] = useState('');
  const [wholeValue, setWholeValue] = useState('');
  const [percentResult, setPercentResult] = useState<number | null>(null);

  const calculateBasicPercentage = () => {
    const value = parseFloat(basicValue);
    const percent = parseFloat(basicPercent);
    if (!isNaN(value) && !isNaN(percent)) {
      setBasicResult((value * percent) / 100);
    }
  };

  const calculatePercentageIncrease = () => {
    const value = parseFloat(increaseValue);
    const percent = parseFloat(increasePercent);
    if (!isNaN(value) && !isNaN(percent)) {
      setIncreaseResult(value + (value * percent) / 100);
    }
  };

  const calculateWhatPercent = () => {
    const part = parseFloat(partValue);
    const whole = parseFloat(wholeValue);
    if (!isNaN(part) && !isNaN(whole) && whole !== 0) {
      setPercentResult((part / whole) * 100);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Percentage Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate percentages, increases, and find what percent one number is of another
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">What is X% of Y?</TabsTrigger>
              <TabsTrigger value="increase">X% increase/decrease</TabsTrigger>
              <TabsTrigger value="percent">What % is X of Y?</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="basicPercent">Percentage (%)</Label>
                  <Input
                    id="basicPercent"
                    type="number"
                    placeholder="Enter percentage"
                    value={basicPercent}
                    onChange={(e) => setBasicPercent(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="basicValue">Value</Label>
                  <Input
                    id="basicValue"
                    type="number"
                    placeholder="Enter value"
                    value={basicValue}
                    onChange={(e) => setBasicValue(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                onClick={calculateBasicPercentage} 
                variant="blue" 
                className="w-full"
                disabled={!basicValue || !basicPercent}
              >
                Calculate {basicPercent}% of {basicValue}
              </Button>

              {basicResult !== null && (
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <div className="text-sm text-muted-foreground">Result</div>
                  <div className="text-2xl font-bold text-accent">
                    {basicResult.toLocaleString()}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="increase" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="increaseValue">Original Value</Label>
                  <Input
                    id="increaseValue"
                    type="number"
                    placeholder="Enter original value"
                    value={increaseValue}
                    onChange={(e) => setIncreaseValue(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="increasePercent">Percentage Change (%)</Label>
                  <Input
                    id="increasePercent"
                    type="number"
                    placeholder="Enter percentage (+ or -)"
                    value={increasePercent}
                    onChange={(e) => setIncreasePercent(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                onClick={calculatePercentageIncrease} 
                variant="blue" 
                className="w-full"
                disabled={!increaseValue || !increasePercent}
              >
                Calculate {increasePercent}% change of {increaseValue}
              </Button>

              {increaseResult !== null && (
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <div className="text-sm text-muted-foreground">New Value</div>
                  <div className="text-2xl font-bold text-accent">
                    {increaseResult.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1">
                    Change: {(increaseResult - parseFloat(increaseValue)).toLocaleString()}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="percent" className="space-y-4 mt-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="partValue">Part Value</Label>
                  <Input
                    id="partValue"
                    type="number"
                    placeholder="Enter part value"
                    value={partValue}
                    onChange={(e) => setPartValue(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wholeValue">Whole Value</Label>
                  <Input
                    id="wholeValue"
                    type="number"
                    placeholder="Enter whole value"
                    value={wholeValue}
                    onChange={(e) => setWholeValue(e.target.value)}
                  />
                </div>
              </div>
              
              <Button 
                onClick={calculateWhatPercent} 
                variant="blue" 
                className="w-full"
                disabled={!partValue || !wholeValue}
              >
                Calculate what % is {partValue} of {wholeValue}
              </Button>

              {percentResult !== null && (
                <div className="bg-secondary rounded-lg p-4 text-center">
                  <div className="text-sm text-muted-foreground">Percentage</div>
                  <div className="text-2xl font-bold text-accent">
                    {percentResult.toFixed(2)}%
                  </div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};