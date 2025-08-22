import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Calculator, Heart, Dog } from 'lucide-react';

const DogAgeCalculator: React.FC = () => {
  const [dogAge, setDogAge] = useState<number>(3);
  const [dogSize, setDogSize] = useState<string>('medium');
  const [humanAge, setHumanAge] = useState<number | null>(null);
  const [lifeStage, setLifeStage] = useState<string>('');
  const [showComparison, setShowComparison] = useState(false);

  const sizeCategories = {
    small: { name: 'Small', range: '< 20 lbs', lifeSpan: 15, factor: 5 },
    medium: { name: 'Medium', range: '20-50 lbs', lifeSpan: 13, factor: 5 },
    large: { name: 'Large', range: '50-80 lbs', lifeSpan: 11, factor: 6 },
    giant: { name: 'Giant', range: '> 80 lbs', lifeSpan: 9, factor: 6 }
  };

  const calculateDogAge = () => {
    let calculatedHumanAge: number;
    const sizeInfo = sizeCategories[dogSize as keyof typeof sizeCategories];

    if (dogAge <= 0) {
      calculatedHumanAge = 0;
    } else if (dogAge === 1) {
      // First year = 15 human years
      calculatedHumanAge = 15;
    } else if (dogAge === 2) {
      // Second year = +9 human years (total 24)
      calculatedHumanAge = 24;
    } else {
      // Each additional year = +5 or +6 based on size
      calculatedHumanAge = 24 + (dogAge - 2) * sizeInfo.factor;
    }

    // Alternative: Modern logarithmic method (for dogs >= 1 year)
    let logarithmicAge = 0;
    if (dogAge >= 1) {
      logarithmicAge = 16 * Math.log(dogAge) + 31;
    }

    setHumanAge(calculatedHumanAge);
    
    // Determine life stage
    let stage = '';
    if (dogAge < 1) stage = 'Puppy';
    else if (dogAge < 3) stage = 'Young Adult';
    else if (dogAge < 7) stage = 'Adult';
    else if (dogAge < 10) stage = 'Senior';
    else stage = 'Geriatric';
    
    setLifeStage(stage);
    setShowComparison(true);
  };

  const getLifeStageInfo = (stage: string) => {
    const stages = {
      'Puppy': { color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300', description: 'Growing and learning' },
      'Young Adult': { color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300', description: 'Active and energetic' },
      'Adult': { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300', description: 'Mature and stable' },
      'Senior': { color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300', description: 'Slower, needs more care' },
      'Geriatric': { color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300', description: 'Elderly, special needs' }
    };
    return stages[stage as keyof typeof stages] || stages['Adult'];
  };

  const getLifeExpectancyProgress = () => {
    const sizeInfo = sizeCategories[dogSize as keyof typeof sizeCategories];
    return Math.min(100, (dogAge / sizeInfo.lifeSpan) * 100);
  };

  const getDevelopmentMilestones = () => {
    return [
      { age: 0.5, milestone: 'Weaning', description: 'Transition from milk to solid food' },
      { age: 1, milestone: 'Sexual Maturity', description: 'Capable of reproduction' },
      { age: 2, milestone: 'Full Adult Size', description: 'Reached maximum size' },
      { age: 7, milestone: 'Senior Status', description: 'Beginning to show signs of aging' },
      { age: 10, milestone: 'Geriatric Care', description: 'Requires special senior care' }
    ];
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Dog className="h-6 w-6 text-amber-500" />
          <Heart className="h-6 w-6 text-red-500" />
        </div>
        <CardTitle className="text-2xl">Dog Age Calculator</CardTitle>
        <CardDescription>
          Convert your dog's age to human years using modern logarithmic and traditional methods
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="dog-age">Dog's Age (years)</Label>
              <Input
                id="dog-age"
                type="number"
                min="0"
                max="30"
                step="0.1"
                value={dogAge}
                onChange={(e) => setDogAge(parseFloat(e.target.value) || 0)}
                placeholder="Enter your dog's age"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dog-size">Dog Size Category</Label>
              <Select value={dogSize} onValueChange={setDogSize}>
                <SelectTrigger>
                  <SelectValue placeholder="Select size category" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(sizeCategories).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.name} ({value.range})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Size affects aging rate and life expectancy
              </p>
            </div>
            
            <Button onClick={calculateDogAge} className="w-full" size="lg">
              <Calculator className="mr-2 h-5 w-5" />
              Calculate Human Age
            </Button>
          </div>

          {humanAge !== null && showComparison && (
            <div className="space-y-4">
              <Card className="p-6 bg-gradient-card">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Human Age Equivalent</h3>
                  <div className="text-4xl font-bold text-primary mb-2">
                    {humanAge.toFixed(0)} years
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
                    <span>Age: {dogAge} years</span>
                    <span>Expected: {sizeCategories[dogSize as keyof typeof sizeCategories].lifeSpan} years</span>
                  </div>
                  <Progress value={getLifeExpectancyProgress()} className="h-3" />
                  <p className="text-xs text-muted-foreground">
                    {getLifeExpectancyProgress().toFixed(1)}% of expected lifespan
                  </p>
                </div>
              </Card>
            </div>
          )}
        </div>

        {showComparison && (
          <div className="space-y-6">
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Calculation Methods</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm">Traditional Rule</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      Year 1 = 15, Year 2 = +9, Each additional = +{sizeCategories[dogSize as keyof typeof sizeCategories].factor}
                    </p>
                    <div className="text-lg font-bold text-primary">
                      {humanAge} years
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-sm">Modern Logarithmic</h4>
                    <p className="text-xs text-muted-foreground mb-2">
                      HumanAge ≈ 16 ln(DogAge) + 31
                    </p>
                    <div className="text-lg font-bold text-accent">
                      {dogAge >= 1 ? (16 * Math.log(dogAge) + 31).toFixed(0) : '0'} years
                    </div>
                  </div>
                </div>
              </Card>
              
              <Card className="p-4">
                <h3 className="font-semibold mb-4">Size Category Info</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Category:</span>
                    <span className="font-medium">{sizeCategories[dogSize as keyof typeof sizeCategories].name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weight Range:</span>
                    <span className="font-medium">{sizeCategories[dogSize as keyof typeof sizeCategories].range}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Life Expectancy:</span>
                    <span className="font-medium">{sizeCategories[dogSize as keyof typeof sizeCategories].lifeSpan} years</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aging Factor:</span>
                    <span className="font-medium">+{sizeCategories[dogSize as keyof typeof sizeCategories].factor} years/year</span>
                  </div>
                </div>
              </Card>
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Development Milestones</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {getDevelopmentMilestones().map((milestone, index) => {
                  const isPassed = dogAge >= milestone.age;
                  return (
                    <div key={index} className={`p-3 rounded-lg border text-center ${isPassed ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-muted/50'}`}>
                      <div className="font-medium text-sm mb-1">{milestone.milestone}</div>
                      <div className="text-xs text-muted-foreground mb-2">{milestone.description}</div>
                      <Badge variant={isPassed ? 'default' : 'secondary'} className="text-xs">
                        {milestone.age} {milestone.age === 1 ? 'year' : 'years'}
                      </Badge>
                      <div className="text-xs mt-1">
                        {isPassed ? '✓ Reached' : `In ${(milestone.age - dogAge).toFixed(1)} years`}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-4 bg-muted/50">
              <h4 className="font-semibold mb-2">About Dog Aging</h4>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Traditional Method:</strong> Uses the classic "7 dog years = 1 human year" concept, refined to account for faster aging in early years and size-dependent factors.
                </p>
                <p>
                  <strong>Logarithmic Method:</strong> Based on DNA methylation research showing that dog aging follows a logarithmic pattern similar to human aging.
                </p>
                <p>
                  <strong>Size Factor:</strong> Larger dogs generally age faster and have shorter lifespans compared to smaller dogs.
                </p>
              </div>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default DogAgeCalculator;