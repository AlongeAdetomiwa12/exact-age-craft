import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const LoanEMICalculator: React.FC = memo(() => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [tenure, setTenure] = useState('');
  const [emi, setEmi] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [principal, rate, tenure]);

  const calculateEMI = () => {
    const p = parseFloat(principal) || 0;
    const r = parseFloat(rate) || 0;
    const t = parseFloat(tenure) || 0;

    if (p === 0 || r === 0 || t === 0) {
      setEmi(0);
      setTotalAmount(0);
      setTotalInterest(0);
      return;
    }

    const monthlyRate = r / (12 * 100);
    const months = t * 12;

    const emiValue = (p * monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                     (Math.pow(1 + monthlyRate, months) - 1);

    const totalAmountValue = emiValue * months;
    const totalInterestValue = totalAmountValue - p;

    setEmi(emiValue);
    setTotalAmount(totalAmountValue);
    setTotalInterest(totalInterestValue);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Loan EMI Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate your Equated Monthly Installment
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="principal">Principal Amount ($)</Label>
              <Input
                id="principal"
                type="number"
                placeholder="Enter loan amount"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rate">Interest Rate (% per annum)</Label>
              <Input
                id="rate"
                type="number"
                placeholder="Enter interest rate"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tenure">Tenure (years)</Label>
              <Input
                id="tenure"
                type="number"
                placeholder="Enter tenure"
                value={tenure}
                onChange={(e) => setTenure(e.target.value)}
              />
            </div>
          </div>

          {principal && rate && tenure && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                <div className="text-sm opacity-90">Monthly EMI</div>
                <div className="text-xl font-bold">
                  ${emi.toFixed(2)}
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground">Total Amount</div>
                <div className="text-xl font-bold text-accent">
                  ${totalAmount.toFixed(2)}
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground">Total Interest</div>
                <div className="text-xl font-bold text-red-500">
                  ${totalInterest.toFixed(2)}
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
            <strong>Formula:</strong> EMI = [P × r × (1+r)^n] / [(1+r)^n-1]
            <br />
            Where P = Principal, r = Monthly interest rate, n = Number of months
          </div>
        </CardContent>
      </Card>
    </div>
  );
});