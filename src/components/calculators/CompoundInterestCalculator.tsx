import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const CompoundInterestCalculator: React.FC = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [compoundingFrequency, setCompoundingFrequency] = useState('12');
  const [finalAmount, setFinalAmount] = useState(0);
  const [compoundInterest, setCompoundInterest] = useState(0);
  const [workings, setWorkings] = useState<string[]>([]);

  const frequencies = {
    '1': 'Annually',
    '2': 'Semi-annually',
    '4': 'Quarterly',
    '12': 'Monthly',
    '365': 'Daily'
  };

  useEffect(() => {
    calculateCompoundInterest();
  }, [principal, rate, time, compoundingFrequency]);

  const calculateCompoundInterest = () => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate) || 0;
    const t = parseFloat(time) || 0;
    const n = parseFloat(compoundingFrequency) || 1;

    if (p && r && t && n) {
      const rDecimal = r / 100;
      const amount = p * Math.pow((1 + rDecimal / n), n * t);
      const interest = amount - p;

      setFinalAmount(amount);
      setCompoundInterest(interest);

      setWorkings([
        `Given:`,
        `Principal (P) = $${p}`,
        `Annual Interest Rate (r) = ${r}%`,
        `Time (t) = ${t} years`,
        `Compounding Frequency (n) = ${n} times per year (${frequencies[compoundingFrequency as keyof typeof frequencies]})`,
        '',
        `Formula: A = P × (1 + r/n)^(n×t)`,
        `Step 1: Convert rate to decimal`,
        `r = ${r}% = ${r}/100 = ${rDecimal}`,
        '',
        `Step 2: Substitute values`,
        `A = $${p} × (1 + ${rDecimal}/${n})^(${n}×${t})`,
        `A = $${p} × (1 + ${(rDecimal / n).toFixed(6)})^${(n * t)}`,
        `A = $${p} × (${(1 + rDecimal / n).toFixed(6)})^${(n * t)}`,
        `A = $${p} × ${Math.pow((1 + rDecimal / n), n * t).toFixed(6)}`,
        `A = $${amount.toFixed(2)}`,
        '',
        `Step 3: Calculate compound interest`,
        `Compound Interest = Final Amount - Principal`,
        `Compound Interest = $${amount.toFixed(2)} - $${p}`,
        `Compound Interest = $${interest.toFixed(2)}`
      ]);
    } else {
      setFinalAmount(0);
      setCompoundInterest(0);
      setWorkings([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Compound Interest Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate compound interest and final amount
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
              <div className="space-y-2">
                <Label htmlFor="frequency">Compounding Frequency</Label>
                <Select value={compoundingFrequency} onValueChange={setCompoundingFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(frequencies).map(([value, label]) => (
                      <SelectItem key={value} value={value}>
                        {label} ({value}x per year)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {finalAmount > 0 && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="bg-secondary rounded-lg p-4 text-center">
                    <div className="text-sm text-muted-foreground">Compound Interest</div>
                    <div className="text-xl font-bold text-accent">
                      ${compoundInterest.toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                    <div className="text-sm opacity-90">Final Amount</div>
                    <div className="text-xl font-bold">
                      ${finalAmount.toFixed(2)}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {workings.length > 0 && (
              <div className="bg-secondary rounded-lg p-4">
                <h3 className="text-lg font-semibold text-accent mb-3">Step-by-Step Calculation</h3>
                <div className="space-y-1 max-h-96 overflow-y-auto">
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