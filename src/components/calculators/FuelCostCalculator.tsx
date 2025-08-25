import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const FuelCostCalculator: React.FC = memo(() => {
  const [distance, setDistance] = useState('');
  const [mileage, setMileage] = useState('');
  const [fuelPrice, setFuelPrice] = useState('');
  const [fuelNeeded, setFuelNeeded] = useState(0);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    calculateFuelCost();
  }, [distance, mileage, fuelPrice]);

  const calculateFuelCost = () => {
    const dist = parseFloat(distance) || 0;
    const mpg = parseFloat(mileage) || 0;
    const price = parseFloat(fuelPrice) || 0;

    if (dist === 0 || mpg === 0 || price === 0) {
      setFuelNeeded(0);
      setTotalCost(0);
      return;
    }

    const fuel = dist / mpg;
    const cost = fuel * price;

    setFuelNeeded(fuel);
    setTotalCost(cost);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Fuel Cost Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate fuel consumption and trip costs
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="distance">Distance (miles/km)</Label>
              <Input
                id="distance"
                type="number"
                placeholder="Enter distance"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mileage">Fuel Economy (mpg/kmpl)</Label>
              <Input
                id="mileage"
                type="number"
                placeholder="Enter mileage"
                value={mileage}
                onChange={(e) => setMileage(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fuelPrice">Fuel Price (per gallon/liter)</Label>
              <Input
                id="fuelPrice"
                type="number"
                placeholder="Enter price"
                value={fuelPrice}
                onChange={(e) => setFuelPrice(e.target.value)}
              />
            </div>
          </div>

          {distance && mileage && fuelPrice && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground">Fuel Needed</div>
                <div className="text-xl font-bold text-accent">
                  {fuelNeeded.toFixed(2)} gal/L
                </div>
              </div>
              <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                <div className="text-sm opacity-90">Total Cost</div>
                <div className="text-xl font-bold">
                  ${totalCost.toFixed(2)}
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
            <strong>Formula:</strong> Cost = (Distance ÷ Fuel Economy) × Fuel Price
          </div>
        </CardContent>
      </Card>
    </div>
  );
});