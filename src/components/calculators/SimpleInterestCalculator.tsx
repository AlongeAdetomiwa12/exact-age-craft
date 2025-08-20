import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const SimpleInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [simpleInterest, setSimpleInterest] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [workings, setWorkings] = useState<string[]>([]);

  useEffect(() => {
    calculateSimpleInterest();
  }, [principal, rate, time]);

  const calculateSimpleInterest = () => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate) || 0;
    const t = parseFloat(time) || 0;

    if (p && r && t) {
      const si = (p * r * t) / 100;
      const total = p + si;

      setSimpleInterest(si);
      setTotalAmount(total);

      setWorkings([
        `Given:`,
        `Principal (P) = $${p}`,
        `Rate (R) = ${r}% per year`,
        `Time (T) = ${t} years`,
        '',
        `Formula: SI = (P × R × T) / 100`,
        `Step 1: Substitute values`,
        `SI = ($${p} × ${r}% × ${t}) / 100`,
        `SI = ($${p} × ${r} × ${t}) / 100`,
        `SI = ${(p * r * t)} / 100`,
        `SI = $${si.toFixed(2)}`,
        '',
        `Step 2: Calculate total amount`,
        `Total Amount = Principal + Simple Interest`,
        `Total Amount = $${p} + $${si.toFixed(2)}`,
        `Total Amount = $${total.toFixed(2)}`
      ]);
    } else {
      setSimpleInterest(0);
      setTotalAmount(0);
      setWorkings([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Simple Interest Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate simple interest and total amount
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="principal">Principal Amount ($)</Label>
                <Input
                  id="principal"
                  type="number"
                  placeholder="Enter principal amount"
                  value={principal}
                  onChange={(e) => setPrincipal(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="rate">Annual Interest Rate (%)</Label>
                <Input
                  id="rate"
                  type="number"
                  placeholder="Enter interest rate"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time Period (Years)</Label>
                <Input
                  id="time"
                  type="number"
                  placeholder="Enter time in years"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>

              {simpleInterest > 0 && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="bg-secondary rounded-lg p-4 text-center">
                    <div className="text-sm text-muted-foreground">Simple Interest</div>
                    <div className="text-xl font-bold text-accent">
                      ${simpleInterest.toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                    <div className="text-sm opacity-90">Total Amount</div>
                    <div className="text-xl font-bold">
                      ${totalAmount.toFixed(2)}
                    </div>
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
        </CardContent>
      </Card>
    </div>
  );
};