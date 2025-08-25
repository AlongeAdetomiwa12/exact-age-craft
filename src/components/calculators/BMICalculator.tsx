import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const BMICalculator: React.FC = memo(() => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [unit, setUnit] = useState('metric');
  const [bmi, setBmi] = useState(0);
  const [category, setCategory] = useState('');

  useEffect(() => {
    calculateBMI();
  }, [weight, height, unit]);

  const calculateBMI = () => {
    const w = parseFloat(weight) || 0;
    const h = parseFloat(height) || 0;

    if (w === 0 || h === 0) {
      setBmi(0);
      setCategory('');
      return;
    }

    let bmiValue: number;
    if (unit === 'metric') {
      // weight in kg, height in cm
      bmiValue = w / Math.pow(h / 100, 2);
    } else {
      // weight in lbs, height in inches
      bmiValue = (w / Math.pow(h, 2)) * 703;
    }

    setBmi(bmiValue);

    if (bmiValue < 18.5) setCategory('Underweight');
    else if (bmiValue < 25) setCategory('Normal weight');
    else if (bmiValue < 30) setCategory('Overweight');
    else setCategory('Obese');
  };

  const getCategoryColor = () => {
    switch (category) {
      case 'Underweight': return 'text-blue-500';
      case 'Normal weight': return 'text-green-500';
      case 'Overweight': return 'text-yellow-500';
      case 'Obese': return 'text-red-500';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            BMI Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate your Body Mass Index and health category
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="unit">Unit System</Label>
            <Select value={unit} onValueChange={setUnit}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="metric">Metric (kg, cm)</SelectItem>
                <SelectItem value="imperial">Imperial (lbs, inches)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">
                Weight ({unit === 'metric' ? 'kg' : 'lbs'})
              </Label>
              <Input
                id="weight"
                type="number"
                placeholder={`Enter weight in ${unit === 'metric' ? 'kg' : 'lbs'}`}
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </Label>
              <Input
                id="height"
                type="number"
                placeholder={`Enter height in ${unit === 'metric' ? 'cm' : 'inches'}`}
                value={height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </div>
          </div>

          {weight && height && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-border">
              <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                <div className="text-sm opacity-90">Your BMI</div>
                <div className="text-2xl font-bold">
                  {bmi.toFixed(1)}
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground">Category</div>
                <div className={`text-xl font-bold ${getCategoryColor()}`}>
                  {category}
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
            <strong>Formula:</strong> BMI = Weight(kg) / Height(m)²
            <br />
            <strong>Categories:</strong> Underweight (&lt;18.5), Normal (18.5-24.9), Overweight (25-29.9), Obese (≥30)
          </div>
        </CardContent>
      </Card>
    </div>
  );
});