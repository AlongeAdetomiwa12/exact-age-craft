import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calculator, Heart, TrendingUp } from 'lucide-react';

interface LifeTableEntry {
  age: number;
  qx: number; // probability of death
  lx: number; // survivors
  dx: number; // deaths
  Lx: number; // person-years lived
  Tx: number; // total future person-years
  ex: number; // life expectancy
}

const LifeExpectancyCalculator: React.FC = () => {
  const [currentAge, setCurrentAge] = useState<number>(25);
  const [gender, setGender] = useState<string>('male');
  const [country, setCountry] = useState<string>('us');
  const [lifeExpectancy, setLifeExpectancy] = useState<number | null>(null);
  const [remainingYears, setRemainingYears] = useState<number | null>(null);
  const [probabilityData, setProbabilityData] = useState<LifeTableEntry[]>([]);
  const [showDetails, setShowDetails] = useState(false);

  // Simplified life table data (US 2020 data approximation)
  const getLifeTableData = (gender: string): LifeTableEntry[] => {
    const baseLifeExpectancy = gender === 'male' ? 76.1 : 81.1;
    const data: LifeTableEntry[] = [];
    let lx = 100000; // radix

    for (let age = 0; age <= 100; age++) {
      // Simplified mortality rates (Gompertz-Makeham approximation)
      const A = 0.0001; // baseline mortality
      const B = gender === 'male' ? 0.00008 : 0.00006;
      const c = 1.1;
      
      const qx = Math.min(1, A + B * Math.pow(c, age));
      const dx = lx * qx;
      const lxNext = lx - dx;
      const Lx = (lx + lxNext) / 2;
      
      data.push({
        age,
        qx,
        lx,
        dx,
        Lx,
        Tx: 0, // Will calculate later
        ex: 0  // Will calculate later
      });
      
      lx = lxNext;
      if (lx <= 0) break;
    }

    // Calculate Tx and ex (backwards calculation)
    let Tx = 0;
    for (let i = data.length - 1; i >= 0; i--) {
      Tx += data[i].Lx;
      data[i].Tx = Tx;
      data[i].ex = data[i].lx > 0 ? Tx / data[i].lx : 0;
    }

    return data;
  };

  const calculateLifeExpectancy = () => {
    const lifeTable = getLifeTableData(gender);
    setProbabilityData(lifeTable);

    const currentData = lifeTable.find(entry => entry.age === currentAge);
    if (currentData) {
      setLifeExpectancy(currentAge + currentData.ex);
      setRemainingYears(currentData.ex);
    }
  };

  const getSurvivalProbability = (targetAge: number): number => {
    const currentData = probabilityData.find(entry => entry.age === currentAge);
    const targetData = probabilityData.find(entry => entry.age === targetAge);
    
    if (!currentData || !targetData || targetAge <= currentAge) return 0;
    
    return (targetData.lx / currentData.lx) * 100;
  };

  const formatYears = (years: number): string => {
    const wholeYears = Math.floor(years);
    const months = Math.round((years - wholeYears) * 12);
    return `${wholeYears} years, ${months} months`;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Heart className="h-6 w-6 text-red-500" />
          <Calculator className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Life Expectancy Calculator</CardTitle>
        <CardDescription>
          Calculate life expectancy using actuarial life tables with Gompertz-Makeham mortality models
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="current-age">Current Age</Label>
            <Input
              id="current-age"
              type="number"
              min="0"
              max="100"
              value={currentAge}
              onChange={(e) => setCurrentAge(parseInt(e.target.value) || 0)}
              placeholder="Enter your age"
            />
          </div>
          
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
          
          <div className="space-y-2">
            <Label htmlFor="country">Country/Region</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger>
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="us">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="japan">Japan</SelectItem>
                <SelectItem value="global">Global Average</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button onClick={calculateLifeExpectancy} className="w-full" size="lg">
          <TrendingUp className="mr-2 h-5 w-5" />
          Calculate Life Expectancy
        </Button>

        {lifeExpectancy && remainingYears && (
          <div className="space-y-6">
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-gradient-card">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Life Expectancy</h3>
                  <div className="text-3xl font-bold text-primary mb-1">
                    {formatYears(lifeExpectancy)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Expected lifespan based on current age
                  </p>
                </div>
              </Card>
              
              <Card className="p-6 bg-gradient-card">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Remaining Years</h3>
                  <div className="text-3xl font-bold text-accent mb-1">
                    {formatYears(remainingYears)}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Expected years remaining from current age
                  </p>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[65, 75, 85, 95].map(age => (
                <div key={age} className="text-center p-4 border rounded-lg">
                  <div className="text-lg font-semibold">Age {age}</div>
                  <div className="text-sm text-muted-foreground">
                    {getSurvivalProbability(age).toFixed(1)}% chance
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <Button
                variant="outline"
                onClick={() => setShowDetails(!showDetails)}
                className="w-full"
              >
                {showDetails ? 'Hide' : 'Show'} Detailed Calculations
              </Button>

              {showDetails && (
                <Card className="p-4">
                  <h4 className="font-semibold mb-4">Actuarial Life Table Method</h4>
                  <div className="space-y-4 text-sm">
                    <div>
                      <strong>Formula Used:</strong>
                      <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                        <li>Mortality rate: μ(x) = A + Bc^x (Gompertz-Makeham)</li>
                        <li>Survivors at age x+1: l(x+1) = l(x)(1 - qx)</li>
                        <li>Person-years lived: Lx ≈ (lx + lx+1)/2</li>
                        <li>Total future years: Tx = Σ Lk from k=x to ∞</li>
                        <li>Life expectancy: ex = Tx / lx</li>
                      </ul>
                    </div>
                    
                    <div>
                      <strong>Current Calculation:</strong>
                      <div className="mt-2 p-3 bg-muted rounded-lg">
                        <p>Age: {currentAge}</p>
                        <p>Gender: {gender}</p>
                        <p>Survivors at age {currentAge}: {probabilityData.find(d => d.age === currentAge)?.lx.toFixed(0) || 'N/A'}</p>
                        <p>Remaining life expectancy: {remainingYears.toFixed(2)} years</p>
                        <p>Expected age at death: {lifeExpectancy.toFixed(2)} years</p>
                      </div>
                    </div>
                  </div>
                </Card>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default LifeExpectancyCalculator;