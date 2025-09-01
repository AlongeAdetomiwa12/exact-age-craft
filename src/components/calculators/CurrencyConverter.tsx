import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const currencies = [
  { code: 'USD', name: 'US Dollar', rate: 1 },
  { code: 'EUR', name: 'Euro', rate: 0.85 },
  { code: 'GBP', name: 'British Pound', rate: 0.73 },
  { code: 'JPY', name: 'Japanese Yen', rate: 110 },
  { code: 'CAD', name: 'Canadian Dollar', rate: 1.25 },
  { code: 'AUD', name: 'Australian Dollar', rate: 1.35 },
  { code: 'CHF', name: 'Swiss Franc', rate: 0.92 },
  { code: 'CNY', name: 'Chinese Yuan', rate: 6.45 },
  { code: 'INR', name: 'Indian Rupee', rate: 74.5 },
  { code: 'NGN', name: 'Nigerian Naira', rate: 411 },
];

export const CurrencyConverter: React.FC = memo(() => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [result, setResult] = useState<number | null>(null);

  const convertCurrency = () => {
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue)) return;

    const fromRate = currencies.find(c => c.code === fromCurrency)?.rate || 1;
    const toRate = currencies.find(c => c.code === toCurrency)?.rate || 1;
    
    // Convert to USD first, then to target currency
    const usdAmount = amountValue / fromRate;
    const convertedAmount = usdAmount * toRate;
    
    setResult(convertedAmount);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Currency Converter
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Convert between different currencies
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fromCurrency">From Currency</Label>
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="toCurrency">To Currency</Label>
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={convertCurrency} className="w-full">
            Convert Currency
          </Button>

          {result !== null && amount && (
            <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
              <div className="text-sm opacity-90">Converted Amount</div>
              <div className="text-2xl font-bold">
                {amount} {fromCurrency} = {result.toFixed(2)} {toCurrency}
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
            <strong>Note:</strong> Exchange rates are approximate and for demonstration purposes only. 
            Use official financial services for actual currency conversion.
          </div>
        </CardContent>
      </Card>
    </div>
  );
});