import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const DiscountCalculator: React.FC = () => {
  const [originalPrice, setOriginalPrice] = useState('');
  const [discountPercent, setDiscountPercent] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [savings, setSavings] = useState(0);

  useEffect(() => {
    calculateDiscount();
  }, [originalPrice, discountPercent]);

  const calculateDiscount = () => {
    const price = parseFloat(originalPrice) || 0;
    const percent = parseFloat(discountPercent) || 0;

    const discountValue = (price * percent) / 100;
    const final = price - discountValue;

    setDiscountAmount(discountValue);
    setFinalPrice(final);
    setSavings(discountValue);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Discount Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate discounts and final prices with ease
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="originalPrice">Original Price ($)</Label>
              <Input
                id="originalPrice"
                type="number"
                placeholder="Enter original price"
                value={originalPrice}
                onChange={(e) => setOriginalPrice(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discountPercent">Discount (%)</Label>
              <Input
                id="discountPercent"
                type="number"
                placeholder="Enter discount percentage"
                value={discountPercent}
                onChange={(e) => setDiscountPercent(e.target.value)}
              />
            </div>
          </div>

          {originalPrice && discountPercent && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground">Discount Amount</div>
                <div className="text-xl font-bold text-accent">
                  ${discountAmount.toFixed(2)}
                </div>
              </div>
              <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                <div className="text-sm opacity-90">Final Price</div>
                <div className="text-xl font-bold">
                  ${finalPrice.toFixed(2)}
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground">You Save</div>
                <div className="text-xl font-bold text-green-500">
                  ${savings.toFixed(2)}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};