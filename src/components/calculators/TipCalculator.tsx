import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

export const TipCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState('');
  const [tipPercentage, setTipPercentage] = useState([18]);
  const [numberOfPeople, setNumberOfPeople] = useState('1');
  const [customTip, setCustomTip] = useState('');
  const [useCustomTip, setUseCustomTip] = useState(false);

  const [tipAmount, setTipAmount] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [perPersonAmount, setPerPersonAmount] = useState(0);
  const [tipPerPerson, setTipPerPerson] = useState(0);

  const quickTipButtons = [10, 15, 18, 20, 25];

  useEffect(() => {
    calculateTip();
  }, [billAmount, tipPercentage, numberOfPeople, customTip, useCustomTip]);

  const calculateTip = () => {
    const bill = parseFloat(billAmount) || 0;
    const people = parseInt(numberOfPeople) || 1;
    const tipPercent = useCustomTip ? parseFloat(customTip) || 0 : tipPercentage[0];

    const tip = (bill * tipPercent) / 100;
    const total = bill + tip;
    const perPerson = total / people;
    const tipEach = tip / people;

    setTipAmount(tip);
    setTotalAmount(total);
    setPerPersonAmount(perPerson);
    setTipPerPerson(tipEach);
  };

  const handleQuickTip = (percent: number) => {
    setTipPercentage([percent]);
    setUseCustomTip(false);
    setCustomTip('');
  };

  const handleCustomTipChange = (value: string) => {
    setCustomTip(value);
    setUseCustomTip(true);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Tip Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate tips and split bills easily
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Bill Amount */}
          <div className="space-y-2">
            <Label htmlFor="billAmount">Bill Amount ($)</Label>
            <Input
              id="billAmount"
              type="number"
              placeholder="Enter bill amount"
              value={billAmount}
              onChange={(e) => setBillAmount(e.target.value)}
              className="text-lg"
            />
          </div>

          {/* Quick Tip Buttons */}
          <div className="space-y-3">
            <Label>Quick Tip Percentages</Label>
            <div className="grid grid-cols-5 gap-2">
              {quickTipButtons.map((percent) => (
                <Button
                  key={percent}
                  variant={tipPercentage[0] === percent && !useCustomTip ? "blue" : "outline"}
                  onClick={() => handleQuickTip(percent)}
                  className="h-12"
                >
                  {percent}%
                </Button>
              ))}
            </div>
          </div>

          {/* Tip Slider */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <Label>Tip Percentage</Label>
              <span className="text-sm font-medium text-accent">
                {useCustomTip ? customTip : tipPercentage[0]}%
              </span>
            </div>
            {!useCustomTip && (
              <Slider
                value={tipPercentage}
                onValueChange={setTipPercentage}
                max={50}
                min={0}
                step={1}
                className="w-full"
              />
            )}
          </div>

          {/* Custom Tip */}
          <div className="space-y-2">
            <Label htmlFor="customTip">Custom Tip (%)</Label>
            <Input
              id="customTip"
              type="number"
              placeholder="Enter custom tip percentage"
              value={customTip}
              onChange={(e) => handleCustomTipChange(e.target.value)}
            />
          </div>

          {/* Number of People */}
          <div className="space-y-2">
            <Label htmlFor="numberOfPeople">Number of People</Label>
            <Input
              id="numberOfPeople"
              type="number"
              min="1"
              placeholder="Number of people"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
            />
          </div>

          {/* Results */}
          {billAmount && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground">Tip Amount</div>
                <div className="text-xl font-bold text-accent">
                  ${tipAmount.toFixed(2)}
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground">Total Amount</div>
                <div className="text-xl font-bold text-accent">
                  ${totalAmount.toFixed(2)}
                </div>
              </div>
              <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                <div className="text-sm opacity-90">Per Person</div>
                <div className="text-xl font-bold">
                  ${perPersonAmount.toFixed(2)}
                </div>
              </div>
              <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                <div className="text-sm opacity-90">Tip Per Person</div>
                <div className="text-xl font-bold">
                  ${tipPerPerson.toFixed(2)}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};