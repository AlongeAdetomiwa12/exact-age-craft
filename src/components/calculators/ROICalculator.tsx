import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const ROICalculator: React.FC = memo(() => {
  const [initialInvestment, setInitialInvestment] = useState('');
  const [finalValue, setFinalValue] = useState('');
  const [gain, setGain] = useState(0);
  const [roiPercentage, setRoiPercentage] = useState(0);

  useEffect(() => {
    calculateROI();
  }, [initialInvestment, finalValue]);

  const calculateROI = () => {
    const initial = parseFloat(initialInvestment) || 0;
    const final = parseFloat(finalValue) || 0;

    if (initial === 0) {
      setGain(0);
      setRoiPercentage(0);
      return;
    }

    const calculatedGain = final - initial;
    const roi = (calculatedGain / initial) * 100;

    setGain(calculatedGain);
    setRoiPercentage(roi);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            ROI Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate Return on Investment
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="initialInvestment">Initial Investment ($)</Label>
              <Input
                id="initialInvestment"
                type="number"
                placeholder="Enter initial investment"
                value={initialInvestment}
                onChange={(e) => setInitialInvestment(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="finalValue">Final Value ($)</Label>
              <Input
                id="finalValue"
                type="number"
                placeholder="Enter final value"
                value={finalValue}
                onChange={(e) => setFinalValue(e.target.value)}
              />
            </div>
          </div>

          {initialInvestment && finalValue && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                <div className="text-sm opacity-90">Total Gain/Loss</div>
                <div className="text-xl font-bold">
                  ${gain.toFixed(2)}
                </div>
              </div>
              <div className={`rounded-lg p-4 text-center ${roiPercentage >= 0 ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                <div className="text-sm opacity-90">ROI Percentage</div>
                <div className="text-xl font-bold">
                  {roiPercentage.toFixed(2)}%
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
            <strong>Formula:</strong> ROI = (Gain - Cost) / Cost × 100
            <br />
            Where Gain = Final Value - Initial Investment
          </div>
        </CardContent>
      </Card>
    </div>
  );
});