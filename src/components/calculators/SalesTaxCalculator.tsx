import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const SalesTaxCalculator: React.FC = () => {
  const [price, setPrice] = useState('');
  const [taxRate, setTaxRate] = useState('');
  const [taxAmount, setTaxAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [workings, setWorkings] = useState<string[]>([]);

  useEffect(() => {
    calculateSalesTax();
  }, [price, taxRate]);

  const calculateSalesTax = () => {
    const priceNum = parseFloat(price) || 0;
    const taxNum = parseFloat(taxRate) || 0;

    const tax = (priceNum * taxNum) / 100;
    const final = priceNum + tax;

    setTaxAmount(tax);
    setFinalPrice(final);

    if (priceNum && taxNum) {
      setWorkings([
        `Given: Price = $${priceNum}, Tax Rate = ${taxNum}%`,
        `Step 1: Calculate Tax Amount`,
        `Tax = Price × Tax Rate / 100`,
        `Tax = $${priceNum} × ${taxNum}% / 100`,
        `Tax = $${priceNum} × ${taxNum / 100}`,
        `Tax = $${tax.toFixed(2)}`,
        `Step 2: Calculate Final Price`,
        `Final Price = Price + Tax`,
        `Final Price = $${priceNum} + $${tax.toFixed(2)}`,
        `Final Price = $${final.toFixed(2)}`
      ]);
    } else {
      setWorkings([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Sales Tax Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate sales tax and final price
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="taxRate">Tax Rate (%)</Label>
                <Input
                  id="taxRate"
                  type="number"
                  placeholder="Enter tax rate"
                  value={taxRate}
                  onChange={(e) => setTaxRate(e.target.value)}
                />
              </div>

              {price && taxRate && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="bg-secondary rounded-lg p-4 text-center">
                    <div className="text-sm text-muted-foreground">Tax Amount</div>
                    <div className="text-xl font-bold text-accent">
                      ${taxAmount.toFixed(2)}
                    </div>
                  </div>
                  <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                    <div className="text-sm opacity-90">Final Price</div>
                    <div className="text-xl font-bold">
                      ${finalPrice.toFixed(2)}
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