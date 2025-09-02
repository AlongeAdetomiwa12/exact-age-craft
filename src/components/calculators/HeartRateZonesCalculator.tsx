import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

interface HeartRateZone {
  name: string;
  percentage: [number, number];
  description: string;
  color: string;
}

const zones: HeartRateZone[] = [
  { name: "Zone 1 - Recovery", percentage: [50, 60], description: "Active recovery", color: "bg-blue-500" },
  { name: "Zone 2 - Aerobic Base", percentage: [60, 70], description: "Base building", color: "bg-green-500" },
  { name: "Zone 3 - Aerobic", percentage: [70, 80], description: "Aerobic development", color: "bg-yellow-500" },
  { name: "Zone 4 - Threshold", percentage: [80, 90], description: "Lactate threshold", color: "bg-orange-500" },
  { name: "Zone 5 - Neuromuscular", percentage: [90, 100], description: "VO2 max", color: "bg-red-500" }
];

export const HeartRateZonesCalculator: React.FC = memo(() => {
  const [age, setAge] = useState('');
  const [restingHR, setRestingHR] = useState('');
  const [maxHR, setMaxHR] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateZones = () => {
    const ageNum = parseFloat(age);
    const restingHRNum = parseFloat(restingHR);
    let maxHRNum = parseFloat(maxHR);
    
    if (isNaN(ageNum)) return;
    
    // If max HR not provided, calculate it
    if (isNaN(maxHRNum)) {
      maxHRNum = 220 - ageNum;
    }
    
    const hrReserve = maxHRNum - (restingHRNum || 0);
    
    const zonesData = zones.map(zone => {
      const minHR = isNaN(restingHRNum) 
        ? Math.round(maxHRNum * zone.percentage[0] / 100)
        : Math.round((hrReserve * zone.percentage[0] / 100) + restingHRNum);
      
      const maxHRZone = isNaN(restingHRNum)
        ? Math.round(maxHRNum * zone.percentage[1] / 100)
        : Math.round((hrReserve * zone.percentage[1] / 100) + restingHRNum);
      
      return {
        ...zone,
        minHR,
        maxHR: maxHRZone
      };
    });
    
    setResults({
      maxHeartRate: maxHRNum,
      restingHeartRate: restingHRNum || 'Not provided',
      zones: zonesData
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Heart Rate Zones Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate your training heart rate zones for optimal workout intensity
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="space-y-2">
              <Label htmlFor="age">Age (required)</Label>
              <Input
                id="age"
                type="number"
                placeholder="Enter your age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="restingHR">Resting HR (optional)</Label>
              <Input
                id="restingHR"
                type="number"
                placeholder="Enter resting heart rate"
                value={restingHR}
                onChange={(e) => setRestingHR(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxHR">Max HR (optional)</Label>
              <Input
                id="maxHR"
                type="number"
                placeholder="If known, enter max HR"
                value={maxHR}
                onChange={(e) => setMaxHR(e.target.value)}
              />
            </div>
          </div>
          
          <Button onClick={calculateZones} className="w-full mb-6">
            Calculate Heart Rate Zones
          </Button>
          
          {results && (
            <div className="space-y-4">
              <div className="bg-gradient-primary rounded-lg p-4 text-white text-center">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm opacity-90">Max Heart Rate</div>
                    <div className="text-xl font-bold">{results.maxHeartRate} bpm</div>
                  </div>
                  <div>
                    <div className="text-sm opacity-90">Resting Heart Rate</div>
                    <div className="text-xl font-bold">{results.restingHeartRate} bpm</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                {results.zones.map((zone: any, index: number) => (
                  <div key={index} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className={`w-4 h-4 rounded ${zone.color}`}></div>
                        <h3 className="font-semibold text-accent">{zone.name}</h3>
                      </div>
                      <div className="text-lg font-bold text-primary">
                        {zone.minHR} - {zone.maxHR} bpm
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{zone.description}</p>
                    <div className="text-xs text-muted-foreground mt-1">
                      {zone.percentage[0]}% - {zone.percentage[1]}% of max HR
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground bg-muted p-3 rounded mt-4">
            <strong>Heart Rate Zone Calculation:</strong><br />
            • Max HR = 220 - Age (if not provided)<br />
            • With Resting HR: Zone HR = ((Max HR - Resting HR) × Zone %) + Resting HR<br />
            • Without Resting HR: Zone HR = Max HR × Zone %<br />
            • Resting HR measurement improves accuracy (Karvonen method)
          </div>
        </CardContent>
      </Card>
    </div>
  );
});