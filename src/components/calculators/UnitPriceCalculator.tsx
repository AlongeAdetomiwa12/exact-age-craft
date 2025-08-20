import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const UnitPriceCalculator: React.FC = () => {
  const [totalPrice1, setTotalPrice1] = useState('');
  const [quantity1, setQuantity1] = useState('');
  const [totalPrice2, setTotalPrice2] = useState('');
  const [quantity2, setQuantity2] = useState('');
  const [unitPrice1, setUnitPrice1] = useState(0);
  const [unitPrice2, setUnitPrice2] = useState(0);
  const [workings, setWorkings] = useState<string[]>([]);

  useEffect(() => {
    calculateUnitPrices();
  }, [totalPrice1, quantity1, totalPrice2, quantity2]);

  const calculateUnitPrices = () => {
    const price1 = parseFloat(totalPrice1) || 0;
    const qty1 = parseFloat(quantity1) || 0;
    const price2 = parseFloat(totalPrice2) || 0;
    const qty2 = parseFloat(quantity2) || 0;

    const unit1 = qty1 > 0 ? price1 / qty1 : 0;
    const unit2 = qty2 > 0 ? price2 / qty2 : 0;

    setUnitPrice1(unit1);
    setUnitPrice2(unit2);

    const steps = [];
    if (price1 && qty1) {
      steps.push(
        `Product 1:`,
        `Unit Price = Total Price ÷ Quantity`,
        `Unit Price = $${price1} ÷ ${qty1}`,
        `Unit Price = $${unit1.toFixed(4)}`
      );
    }
    
    if (price2 && qty2) {
      if (steps.length > 0) steps.push('');
      steps.push(
        `Product 2:`,
        `Unit Price = Total Price ÷ Quantity`,
        `Unit Price = $${price2} ÷ ${qty2}`,
        `Unit Price = $${unit2.toFixed(4)}`
      );
    }

    if (unit1 > 0 && unit2 > 0) {
      steps.push('');
      const betterDeal = unit1 < unit2 ? 'Product 1' : 'Product 2';
      const savings = Math.abs(unit1 - unit2).toFixed(4);
      steps.push(
        `Comparison:`,
        `${betterDeal} is the better deal`,
        `Savings per unit: $${savings}`
      );
    }

    setWorkings(steps);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Unit Price Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Compare unit prices to find the best deal
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-accent">Product 1</h3>
                  <div className="space-y-2">
                    <Label htmlFor="totalPrice1">Total Price ($)</Label>
                    <Input
                      id="totalPrice1"
                      type="number"
                      placeholder="Enter total price"
                      value={totalPrice1}
                      onChange={(e) => setTotalPrice1(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity1">Quantity</Label>
                    <Input
                      id="quantity1"
                      type="number"
                      placeholder="Enter quantity"
                      value={quantity1}
                      onChange={(e) => setQuantity1(e.target.value)}
                    />
                  </div>
                  {unitPrice1 > 0 && (
                    <div className="bg-secondary rounded-lg p-3 text-center">
                      <div className="text-sm text-muted-foreground">Unit Price</div>
                      <div className="text-lg font-bold text-accent">
                        ${unitPrice1.toFixed(4)}
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-accent">Product 2</h3>
                  <div className="space-y-2">
                    <Label htmlFor="totalPrice2">Total Price ($)</Label>
                    <Input
                      id="totalPrice2"
                      type="number"
                      placeholder="Enter total price"
                      value={totalPrice2}
                      onChange={(e) => setTotalPrice2(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="quantity2">Quantity</Label>
                    <Input
                      id="quantity2"
                      type="number"
                      placeholder="Enter quantity"
                      value={quantity2}
                      onChange={(e) => setQuantity2(e.target.value)}
                    />
                  </div>
                  {unitPrice2 > 0 && (
                    <div className="bg-secondary rounded-lg p-3 text-center">
                      <div className="text-sm text-muted-foreground">Unit Price</div>
                      <div className="text-lg font-bold text-accent">
                        ${unitPrice2.toFixed(4)}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {unitPrice1 > 0 && unitPrice2 > 0 && (
                <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                  <div className="text-sm opacity-90">Better Deal</div>
                  <div className="text-xl font-bold">
                    {unitPrice1 < unitPrice2 ? 'Product 1' : 'Product 2'}
                  </div>
                  <div className="text-sm opacity-90">
                    Save ${Math.abs(unitPrice1 - unitPrice2).toFixed(4)} per unit
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