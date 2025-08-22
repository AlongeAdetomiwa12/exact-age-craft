import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Calculator, Heart, Cat } from 'lucide-react';

const CatAgeCalculator: React.FC = () => {
  const [catAge, setCatAge] = useState<number>(3);
  const [humanAge, setHumanAge] = useState<number | null>(null);
  const [lifeStage, setLifeStage] = useState<string>('');
  const [showDetails, setShowDetails] = useState(false);

  const calculateCatAge = () => {
    let calculatedHumanAge: number;

    if (catAge <= 0) {
      calculatedHumanAge = 0;
    } else if (catAge === 1) {
      // First year = 15 human years
      calculatedHumanAge = 15;
    } else if (catAge === 2) {
      // Second year = +9 human years (total 24)
      calculatedHumanAge = 24;
    } else {
      // Each additional year = +4 human years
      // Formula: HumanAge = 24 + 4(y - 2) for cats aged y ≥ 2
      calculatedHumanAge = 24 + 4 * (catAge - 2);
    }

    setHumanAge(calculatedHumanAge);
    
    // Determine life stage
    let stage = '';
    if (catAge < 1) stage = 'Kitten';
    else if (catAge < 2) stage = 'Young Adult';
    else if (catAge < 7) stage = 'Adult';
    else if (catAge < 11) stage = 'Mature';
    else if (catAge < 15) stage = 'Senior';
    else stage = 'Geriatric';
    
    setLifeStage(stage);
    setShowDetails(true);
  };

  const getLifeStageInfo = (stage: string) => {
    const stages = {
      'Kitten': { 
        color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300', 
        description: 'Growing rapidly, very playful',
        ageRange: '0-1 years'
      },
      'Young Adult': { 
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', 
        description: 'Active and energetic',
        ageRange: '1-2 years'
      },
      'Adult': { 
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', 
        description: 'Mature and stable behavior',
        ageRange: '2-7 years'
      },
      'Mature': { 
        color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', 
        description: 'Less active, may gain weight',
        ageRange: '7-11 years'
      },
      'Senior': { 
        color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300', 
        description: 'Slower, needs more care',
        ageRange: '11-15 years'
      },
      'Geriatric': { 
        color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', 
        description: 'Elderly, special medical needs',
        ageRange: '15+ years'
      }
    };
    return stages[stage as keyof typeof stages] || stages['Adult'];
  };

  const getLifeExpectancyProgress = () => {
    const averageLifespan = 15; // Average indoor cat lifespan
    return Math.min(100, (catAge / averageLifespan) * 100);
  };

  const getDevelopmentMilestones = () => {
    return [
      { age: 0.25, milestone: 'Eyes Open', description: 'Begin to see and hear' },
      { age: 0.5, milestone: 'Weaning', description: 'Transition from milk to solid food' },
      { age: 1, milestone: 'Sexual Maturity', description: 'Capable of reproduction' },
      { age: 2, milestone: 'Full Adult', description: 'Reached full size and maturity' },
      { age: 7, milestone: 'Mature Adult', description: 'Beginning middle age' },
      { age: 11, milestone: 'Senior Status', description: 'Beginning to show signs of aging' },
      { age: 15, milestone: 'Geriatric Care', description: 'Requires special senior care' }
    ];
  };

  const getCatAgeComparison = () => {
    if (!humanAge) return [];
    
    return [
      { catAge: 1, humanAge: 15, description: 'Teenage years - rebellious and energetic' },
      { catAge: 2, humanAge: 24, description: 'Young adult - prime physical condition' },
      { catAge: 5, humanAge: 36, description: 'Established adult - confident and settled' },
      { catAge: 10, humanAge: 56, description: 'Middle-aged - starting to slow down' },
      { catAge: 15, humanAge: 76, description: 'Senior citizen - needs gentle care' },
      { catAge: 20, humanAge: 96, description: 'Very elderly - exceptional longevity' }
    ];
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Cat className="h-6 w-6 text-purple-500" />
          <Heart className="h-6 w-6 text-red-500" />
        </div>
        <CardTitle className="text-2xl">Cat Age Calculator</CardTitle>
        <CardDescription>
          Convert your cat's age to human years using the standard feline aging formula
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="cat-age">Cat's Age (years)</Label>
              <Input
                id="cat-age"
                type="number"
                min="0"
                max="30"
                step="0.1"
                value={catAge}
                onChange={(e) => setCatAge(parseFloat(e.target.value) || 0)}
                placeholder="Enter your cat's age"
              />
              <p className="text-xs text-muted-foreground">
                Indoor cats typically live 12-18 years, outdoor cats 2-5 years
              </p>
            </div>
            
            <Button onClick={calculateCatAge} className="w-full" size="lg">
              <Calculator className="mr-2 h-5 w-5" />
              Calculate Human Age
            </Button>
          </div>

          {humanAge !== null && showDetails && (
            <div className="space-y-4">
              <Card className="p-6 bg-gradient-card">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Human Age Equivalent</h3>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {humanAge} years
                  </div>
                  <Badge className={getLifeStageInfo(lifeStage).color}>
                    {lifeStage}
                  </Badge>
                  <p className="text-sm text-muted-foreground mt-2">
                    {getLifeStageInfo(lifeStage).description}
                  </p>
                </div>
              </Card>
              
              <Card className="p-4">
                <h4 className="font-semibold mb-3">Life Expectancy Progress</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Age: {catAge} years</span>
                    <span>Average lifespan: 15 years</span>
                  </div>
                  <Progress value={getLifeExpectancyProgress()} className="h-3" />
                  <p className="text-xs text-muted-foreground">
                    {getLifeExpectancyProgress().toFixed(1)}% of average lifespan
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>

        {showDetails && (
          <div className="space-y-6">
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Calculation Formula</h3>
                <div className="space-y-4">
                  <div className="text-sm">
                    <p className="font-medium mb-2">Standard Cat Age Formula:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      <li>• Year 1 = 15 human years</li>
                      <li>• Year 2 = +9 human years (total 24)</li>
                      <li>• Each additional year = +4 human years</li>
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm font-medium">For cats aged ≥ 2 years:</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Human Age = 24 + 4 × (Cat Age - 2)
                    </p>
                    {catAge >= 2 && (
                      <p className="text-xs mt-2">
                        = 24 + 4 × ({catAge} - 2) = <strong>{humanAge} years</strong>
                      </p>
                    )}
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Life Stage Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Current Stage:</span>
                    <Badge className={getLifeStageInfo(lifeStage).color}>
                      {lifeStage}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Age Range:</span>
                    <span className="font-medium">{getLifeStageInfo(lifeStage).ageRange}</span>
                  </div>
                  <div className="text-sm text-muted-foreground mt-3">
                    {getLifeStageInfo(lifeStage).description}
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Age Comparison Chart</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getCatAgeComparison().map((comparison, index) => {
                  const isCurrent = Math.abs(comparison.catAge - catAge) < 0.5;
                  return (
                    <div key={index} className={`p-3 rounded-lg border ${isCurrent ? 'bg-primary/10 border-primary' : 'bg-muted/50'}`}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{comparison.catAge} cat years</span>
                        <span className="text-lg font-bold text-primary">{comparison.humanAge}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{comparison.description}</p>
                      {isCurrent && (
                        <Badge variant="outline" className="mt-2 text-xs">
                          Your cat's current age
                        </Badge>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Development Milestones</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {getDevelopmentMilestones().map((milestone, index) => {
                  const isPassed = catAge >= milestone.age;
                  const timeRemaining = milestone.age - catAge;
                  
                  return (
                    <div key={index} className={`p-3 rounded-lg border text-center ${isPassed ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-muted/50'}`}>
                      <div className="font-medium text-sm mb-1">{milestone.milestone}</div>
                      <div className="text-xs text-muted-foreground mb-2">{milestone.description}</div>
                      <Badge variant={isPassed ? 'default' : 'secondary'} className="text-xs">
                        {milestone.age < 1 ? `${milestone.age * 12} mo` : `${milestone.age} yr`}
                      </Badge>
                      <div className="text-xs mt-1">
                        {isPassed ? '✓ Reached' : timeRemaining > 1 ? `In ${timeRemaining.toFixed(1)} years` : `In ${(timeRemaining * 12).toFixed(0)} months`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-4 bg-muted/50">
              <h4 className="font-semibold mb-2">About Cat Aging</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Rapid Early Development:</strong> Cats mature much faster than humans in their first two years, reaching the equivalent of 24 human years by age 2.
                </p>
                <p>
                  <strong>Consistent Later Aging:</strong> After age 2, cats age approximately 4 human years for each calendar year, providing a steady aging pattern.
                </p>
                <p>
                  <strong>Indoor vs Outdoor:</strong> Indoor cats typically live much longer (12-18 years) compared to outdoor cats (2-5 years) due to reduced exposure to dangers and diseases.
                </p>
                <p>
                  <strong>Health Factors:</strong> Proper veterinary care, nutrition, and environment can significantly extend a cat's lifespan and quality of life.
                </p>
              </div>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default CatAgeCalculator;