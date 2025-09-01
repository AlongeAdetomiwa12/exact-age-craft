import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const BMRCalculator: React.FC = memo(() => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [bmr, setBmr] = useState(0);

  useEffect(() => {
    calculateBMR();
  }, [weight, height, age, gender]);

  const calculateBMR = () => {
    const w = parseFloat(weight) || 0;
    const h = parseFloat(height) || 0;
    const a = parseFloat(age) || 0;

    if (w === 0 || h === 0 || a === 0) {
      setBmr(0);
      return;
    }

    let bmrValue;
    if (gender === 'male') {
      // Men: BMR = 10W + 6.25H - 5A + 5
      bmrValue = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      // Women: BMR = 10W + 6.25H - 5A - 161
      bmrValue = 10 * w + 6.25 * h - 5 * a - 161;
    }

    setBmr(bmrValue);
  };

  const activityLevels = [
    { level: 1.2, description: 'Sedentary (little/no exercise)' },
    { level: 1.375, description: 'Light activity (light exercise 1-3 days/week)' },
    { level: 1.55, description: 'Moderate activity (moderate exercise 3-5 days/week)' },
    { level: 1.725, description: 'Very active (hard exercise 6-7 days/week)' },
    { level: 1.9, description: 'Extremely active (very hard exercise, physical job)' }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            BMR Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate your Basal Metabolic Rate using the Mifflin-St Jeor equation
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="weight">Weight (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="Enter weight"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
              />
            </div>
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
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {weight && height && age && (
            <div className="space-y-4">
              <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                <div className="text-sm opacity-90">Your BMR</div>
                <div className="text-2xl font-bold">
                  {bmr.toFixed(0)} calories/day
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-semibold text-accent">Daily Calorie Needs (TDEE):</h4>
                <div className="space-y-2">
                  {activityLevels.map((activity, index) => (
                    <div key={index} className="bg-secondary rounded-lg p-3 flex justify-between items-center">
                      <span className="text-sm">{activity.description}</span>
                      <span className="font-semibold text-accent">
                        {(bmr * activity.level).toFixed(0)} cal/day
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
            <strong>Mifflin-St Jeor Formula:</strong><br />
            • Men: BMR = 10W + 6.25H - 5A + 5<br />
            • Women: BMR = 10W + 6.25H - 5A - 161<br />
            Where W = weight (kg), H = height (cm), A = age (years)
          </div>
        </CardContent>
      </Card>
    </div>
  );
});