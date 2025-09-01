import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const CalorieCalculator: React.FC = memo(() => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');
  const [activityLevel, setActivityLevel] = useState('1.375');
  const [goal, setGoal] = useState('maintain');
  const [bmr, setBmr] = useState(0);
  const [tdee, setTdee] = useState(0);
  const [targetCalories, setTargetCalories] = useState(0);

  useEffect(() => {
    calculateCalories();
  }, [weight, height, age, gender, activityLevel, goal]);

  const calculateCalories = () => {
    const w = parseFloat(weight) || 0;
    const h = parseFloat(height) || 0;
    const a = parseFloat(age) || 0;
    const activity = parseFloat(activityLevel);

    if (w === 0 || h === 0 || a === 0) {
      setBmr(0);
      setTdee(0);
      setTargetCalories(0);
      return;
    }

    // Calculate BMR using Mifflin-St Jeor equation
    let bmrValue;
    if (gender === 'male') {
      bmrValue = 10 * w + 6.25 * h - 5 * a + 5;
    } else {
      bmrValue = 10 * w + 6.25 * h - 5 * a - 161;
    }

    const tdeeValue = bmrValue * activity;
    
    let targetCal = tdeeValue;
    switch (goal) {
      case 'lose':
        targetCal = tdeeValue - 500; // 1 lb per week
        break;
      case 'lose-fast':
        targetCal = tdeeValue - 750; // 1.5 lbs per week
        break;
      case 'gain':
        targetCal = tdeeValue + 500; // 1 lb per week
        break;
      case 'gain-fast':
        targetCal = tdeeValue + 750; // 1.5 lbs per week
        break;
      default:
        targetCal = tdeeValue;
    }

    setBmr(bmrValue);
    setTdee(tdeeValue);
    setTargetCalories(Math.max(targetCal, bmrValue * 1.2)); // Minimum 1.2 * BMR
  };

  const activityLevels = [
    { value: '1.2', label: 'Sedentary (little/no exercise)' },
    { value: '1.375', label: 'Light activity (light exercise 1-3 days/week)' },
    { value: '1.55', label: 'Moderate activity (moderate exercise 3-5 days/week)' },
    { value: '1.725', label: 'Very active (hard exercise 6-7 days/week)' },
    { value: '1.9', label: 'Extremely active (very hard exercise, physical job)' }
  ];

  const goals = [
    { value: 'lose-fast', label: 'Lose weight fast (1.5 lbs/week)' },
    { value: 'lose', label: 'Lose weight (1 lb/week)' },
    { value: 'maintain', label: 'Maintain weight' },
    { value: 'gain', label: 'Gain weight (1 lb/week)' },
    { value: 'gain-fast', label: 'Gain weight fast (1.5 lbs/week)' }
  ];

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Daily Calorie Calculator (TDEE)
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate your daily calorie needs based on your goals
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

          <div className="space-y-2">
            <Label htmlFor="activityLevel">Activity Level</Label>
            <Select value={activityLevel} onValueChange={setActivityLevel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {activityLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="goal">Goal</Label>
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {goals.map((goalOption) => (
                  <SelectItem key={goalOption.value} value={goalOption.value}>
                    {goalOption.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {weight && height && age && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border">
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground">BMR</div>
                <div className="text-lg font-bold text-accent">
                  {bmr.toFixed(0)} cal/day
                </div>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-sm text-muted-foreground">TDEE</div>
                <div className="text-lg font-bold text-accent">
                  {tdee.toFixed(0)} cal/day
                </div>
              </div>
              <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                <div className="text-sm opacity-90">Target Calories</div>
                <div className="text-lg font-bold">
                  {targetCalories.toFixed(0)} cal/day
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
            <strong>Formula:</strong> TDEE = BMR × Activity Factor<br />
            BMR calculated using Mifflin-St Jeor equation. Calorie adjustments: ±500 cal = ±1 lb/week
          </div>
        </CardContent>
      </Card>
    </div>
  );
});