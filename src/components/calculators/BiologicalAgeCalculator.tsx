import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Calculator, Activity, TrendingUp, TrendingDown } from 'lucide-react';

interface Biomarker {
  name: string;
  value: number;
  unit: string;
  referenceMean: number;
  referenceSD: number;
  weight: number;
  normalRange: [number, number];
}

const BiologicalAgeCalculator: React.FC = () => {
  const [chronologicalAge, setChronologicalAge] = useState<number>(30);
  const [biologicalAge, setBiologicalAge] = useState<number | null>(null);
  const [ageGap, setAgeGap] = useState<number | null>(null);
  const [biomarkers, setBiomarkers] = useState<Biomarker[]>([
    {
      name: 'Systolic Blood Pressure',
      value: 120,
      unit: 'mmHg',
      referenceMean: 120,
      referenceSD: 15,
      weight: 0.15,
      normalRange: [90, 140]
    },
    {
      name: 'Diastolic Blood Pressure',
      value: 80,
      unit: 'mmHg',
      referenceMean: 80,
      referenceSD: 10,
      weight: 0.12,
      normalRange: [60, 90]
    },
    {
      name: 'Resting Heart Rate',
      value: 70,
      unit: 'bpm',
      referenceMean: 70,
      referenceSD: 12,
      weight: 0.10,
      normalRange: [60, 100]
    },
    {
      name: 'BMI',
      value: 24,
      unit: 'kg/m²',
      referenceMean: 24,
      referenceSD: 4,
      weight: 0.12,
      normalRange: [18.5, 25]
    },
    {
      name: 'Total Cholesterol',
      value: 180,
      unit: 'mg/dL',
      referenceMean: 180,
      referenceSD: 40,
      weight: 0.10,
      normalRange: [100, 200]
    },
    {
      name: 'HDL Cholesterol',
      value: 50,
      unit: 'mg/dL',
      referenceMean: 50,
      referenceSD: 15,
      weight: 0.08,
      normalRange: [40, 80]
    },
    {
      name: 'Blood Glucose',
      value: 90,
      unit: 'mg/dL',
      referenceMean: 90,
      referenceSD: 15,
      weight: 0.13,
      normalRange: [70, 100]
    },
    {
      name: 'Creatinine',
      value: 1.0,
      unit: 'mg/dL',
      referenceMean: 1.0,
      referenceSD: 0.3,
      weight: 0.10,
      normalRange: [0.6, 1.3]
    },
    {
      name: 'C-Reactive Protein',
      value: 1.0,
      unit: 'mg/L',
      referenceMean: 1.0,
      referenceSD: 2.0,
      weight: 0.10,
      normalRange: [0, 3]
    }
  ]);
  const [showDetails, setShowDetails] = useState(false);

  const updateBiomarker = (index: number, value: number) => {
    const updated = [...biomarkers];
    updated[index].value = value;
    setBiomarkers(updated);
  };

  const calculateBiologicalAge = () => {
    // Step 1: Calculate standardized scores (z-scores)
    const standardizedScores = biomarkers.map(biomarker => {
      const zi = (biomarker.value - biomarker.referenceMean) / biomarker.referenceSD;
      return {
        ...biomarker,
        zScore: zi,
        weightedScore: biomarker.weight * zi
      };
    });

    // Step 2: Calculate composite index
    const alpha = 0; // intercept
    const compositeIndex = alpha + standardizedScores.reduce((sum, biomarker) => 
      sum + biomarker.weightedScore, 0
    );

    // Step 3: Map to biological age using linear transformation
    // Calibrated coefficients for mapping composite index to age
    const beta0 = chronologicalAge; // baseline age
    const beta1 = 5; // scaling factor (years per unit of composite index)
    
    const calculatedBioAge = beta0 + (beta1 * compositeIndex);
    const calculatedGap = calculatedBioAge - chronologicalAge;
    
    setBiologicalAge(calculatedBioAge);
    setAgeGap(calculatedGap);
  };

  const getBiomarkerStatus = (biomarker: Biomarker) => {
    const [min, max] = biomarker.normalRange;
    if (biomarker.value < min) return { status: 'low', color: 'text-blue-600' };
    if (biomarker.value > max) return { status: 'high', color: 'text-red-600' };
    return { status: 'normal', color: 'text-green-600' };
  };

  const getAgeGapInterpretation = (gap: number) => {
    if (gap < -5) return { text: 'Excellent', color: 'text-green-600', icon: TrendingDown };
    if (gap < -2) return { text: 'Good', color: 'text-green-500', icon: TrendingDown };
    if (gap < 2) return { text: 'Average', color: 'text-yellow-600', icon: Activity };
    if (gap < 5) return { text: 'Concerning', color: 'text-orange-600', icon: TrendingUp };
    return { text: 'Poor', color: 'text-red-600', icon: TrendingUp };
  };

  return (
    <Card className="w-full max-w-6xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Activity className="h-6 w-6 text-green-500" />
          <Calculator className="h-6 w-6 text-primary" />
        </div>
        <CardTitle className="text-2xl">Biological Age Calculator</CardTitle>
        <CardDescription>
          Calculate your biological age using biomarker analysis and composite scoring models
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="chronological-age">Chronological Age</Label>
              <Input
                id="chronological-age"
                type="number"
                min="18"
                max="100"
                value={chronologicalAge}
                onChange={(e) => setChronologicalAge(parseInt(e.target.value) || 30)}
                placeholder="Enter your current age"
              />
            </div>
            
            <Button onClick={calculateBiologicalAge} className="w-full" size="lg">
              <Calculator className="mr-2 h-5 w-5" />
              Calculate Biological Age
            </Button>
          </div>

          {biologicalAge !== null && ageGap !== null && (
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-card">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Biological Age</h3>
                  <div className="text-3xl font-bold text-primary mb-2">
                    {biologicalAge.toFixed(1)} years
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    {(() => {
                      const interpretation = getAgeGapInterpretation(ageGap);
                      const Icon = interpretation.icon;
                      return (
                        <>
                          <Icon className={`h-4 w-4 ${interpretation.color}`} />
                          <span className={`text-sm font-medium ${interpretation.color}`}>
                            {ageGap > 0 ? '+' : ''}{ageGap.toFixed(1)} years ({interpretation.text})
                          </span>
                        </>
                      );
                    })()}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Biomarkers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {biomarkers.map((biomarker, index) => {
              const status = getBiomarkerStatus(biomarker);
              return (
                <Card key={biomarker.name} className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">{biomarker.name}</Label>
                      <Badge 
                        variant={status.status === 'normal' ? 'default' : 'secondary'}
                        className={status.color}
                      >
                        {status.status}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <Input
                        type="number"
                        value={biomarker.value}
                        onChange={(e) => updateBiomarker(index, parseFloat(e.target.value) || 0)}
                        placeholder={`Enter ${biomarker.name.toLowerCase()}`}
                      />
                      <div className="text-xs text-muted-foreground">
                        Unit: {biomarker.unit} | Normal: {biomarker.normalRange[0]}-{biomarker.normalRange[1]}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs">
                        <span>Impact</span>
                        <span>{(biomarker.weight * 100).toFixed(0)}%</span>
                      </div>
                      <Progress value={biomarker.weight * 100} className="h-2" />
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>

        {biologicalAge !== null && (
          <div className="space-y-4">
            <Button
              variant="outline"
              onClick={() => setShowDetails(!showDetails)}
              className="w-full"
            >
              {showDetails ? 'Hide' : 'Show'} Calculation Details
            </Button>

            {showDetails && (
              <Card className="p-4">
                <h4 className="font-semibold mb-4">Composite Biomarker Model</h4>
                <div className="space-y-4 text-sm">
                  <div>
                    <strong>Formula Used:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1 text-muted-foreground">
                      <li>Standard score: zi = (Xi - μi)/σi</li>
                      <li>Composite index: I = α + Σ wi zi</li>
                      <li>Biological age: BioAge = β0 + β1 I</li>
                      <li>Age gap: Gap = BioAge - Chronological Age</li>
                    </ul>
                  </div>
                  
                  <div>
                    <strong>Biomarker Contributions:</strong>
                    <div className="mt-2 space-y-2">
                      {biomarkers.map((biomarker, index) => {
                        const zScore = (biomarker.value - biomarker.referenceMean) / biomarker.referenceSD;
                        const contribution = biomarker.weight * zScore;
                        return (
                          <div key={index} className="flex justify-between items-center p-2 bg-muted rounded">
                            <span>{biomarker.name}</span>
                            <div className="text-right">
                              <div>Z-score: {zScore.toFixed(2)}</div>
                              <div className={contribution > 0 ? 'text-red-600' : 'text-green-600'}>
                                Contribution: {contribution > 0 ? '+' : ''}{contribution.toFixed(3)}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div>
                    <strong>Result Interpretation:</strong>
                    <div className="mt-2 p-3 bg-muted rounded-lg">
                      <p>Chronological Age: {chronologicalAge} years</p>
                      <p>Biological Age: {biologicalAge.toFixed(2)} years</p>
                      <p>Age Gap: {ageGap > 0 ? '+' : ''}{ageGap.toFixed(2)} years</p>
                      <p className="mt-2 text-muted-foreground">
                        {ageGap < 0 
                          ? 'Your biological age is younger than your chronological age, suggesting good health status.' 
                          : 'Your biological age is older than your chronological age, which may indicate areas for health improvement.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BiologicalAgeCalculator;