import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const BodyFatCalculator: React.FC = memo(() => {
  const [gender, setGender] = useState('');
  const [height, setHeight] = useState('');
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [hip, setHip] = useState(''); // Only for women
  const [result, setResult] = useState<any>(null);

  const calculateBodyFat = () => {
    const h = parseFloat(height);
    const w = parseFloat(waist);
    const n = parseFloat(neck);
    const hipVal = parseFloat(hip);
    
    if (isNaN(h) || isNaN(w) || isNaN(n)) return;
    if (gender === 'female' && isNaN(hipVal)) return;
    
    let bodyFatPercentage: number;
    
    if (gender === 'male') {
      // Men: 86.010 × log₁₀(waist - neck) - 70.041 × log₁₀(height) + 36.76
      bodyFatPercentage = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
    } else {
      // Women: 163.205 × log₁₀(waist + hip - neck) - 97.684 × log₁₀(height) - 78.387
      bodyFatPercentage = 163.205 * Math.log10(w + hipVal - n) - 97.684 * Math.log10(h) - 78.387;
    }
    
    // Ensure reasonable bounds
    bodyFatPercentage = Math.max(0, Math.min(50, bodyFatPercentage));
    
    let category = '';
    let description = '';
    
    if (gender === 'male') {
      if (bodyFatPercentage < 6) {
        category = 'Essential Fat';
        description = 'Below minimum recommended';
      } else if (bodyFatPercentage < 14) {
        category = 'Athletes';
        description = 'Athletic performance range';
      } else if (bodyFatPercentage < 18) {
        category = 'Fitness';
        description = 'Good fitness level';
      } else if (bodyFatPercentage < 25) {
        category = 'Average';
        description = 'Average for general population';
      } else {
        category = 'Above Average';
        description = 'Above recommended range';
      }
    } else {
      if (bodyFatPercentage < 12) {
        category = 'Essential Fat';
        description = 'Below minimum recommended';
      } else if (bodyFatPercentage < 21) {
        category = 'Athletes';
        description = 'Athletic performance range';
      } else if (bodyFatPercentage < 25) {
        category = 'Fitness';
        description = 'Good fitness level';
      } else if (bodyFatPercentage < 32) {
        category = 'Average';
        description = 'Average for general population';
      } else {
        category = 'Above Average';
        description = 'Above recommended range';
      }
    }
    
    setResult({
      bodyFatPercentage: bodyFatPercentage.toFixed(1),
      category,
      description,
      gender
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Body Fat Calculator (Navy Method)
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate body fat percentage using the US Navy method
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  placeholder="Enter height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="waist">Waist (cm)</Label>
                <Input
                  id="waist"
                  type="number"
                  placeholder="Enter waist"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="neck">Neck (cm)</Label>
                <Input
                  id="neck"
                  type="number"
                  placeholder="Enter neck"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                />
              </div>
              {gender === 'female' && (
                <div className="space-y-2">
                  <Label htmlFor="hip">Hip (cm)</Label>
                  <Input
                    id="hip"
                    type="number"
                    placeholder="Enter hip"
                    value={hip}
                    onChange={(e) => setHip(e.target.value)}
                  />
                </div>
              )}
            </div>
            
            <Button onClick={calculateBodyFat} className="w-full">
              Calculate Body Fat Percentage
            </Button>
            
            {result && (
              <div className="bg-gradient-primary rounded-lg p-6 text-white">
                <h3 className="text-lg font-semibold mb-4 text-center">Body Fat Analysis</h3>
                <div className="text-center mb-4">
                  <div className="text-sm opacity-90">Body Fat Percentage</div>
                  <div className="text-3xl font-bold">{result.bodyFatPercentage}%</div>
                </div>
                <div className="text-center mb-2">
                  <div className="text-lg font-semibold">{result.category}</div>
                  <div className="text-sm opacity-90">{result.description}</div>
                </div>
                <div className="text-xs opacity-80 text-center mt-4">
                  Calculated using US Navy method for {result.gender}s
                </div>
              </div>
            )}
            
            <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
              <strong>Navy Method Formulas:</strong><br />
              <strong>Men:</strong> 86.010 × log₁₀(waist - neck) - 70.041 × log₁₀(height) + 36.76<br />
              <strong>Women:</strong> 163.205 × log₁₀(waist + hip - neck) - 97.684 × log₁₀(height) - 78.387<br />
              <br />
              <strong>Measurement Tips:</strong><br />
              • Waist: Measure at navel level<br />
              • Neck: Measure below Adam's apple<br />
              • Hip (women): Measure at widest point
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});