import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const ThermodynamicsCalculator: React.FC = memo(() => {
  const [mass, setMass] = useState('');
  const [specificHeat, setSpecificHeat] = useState('');
  const [tempChange, setTempChange] = useState('');
  const [heatResult, setHeatResult] = useState<number | null>(null);
  
  const [work, setWork] = useState('');
  const [heatInput, setHeatInput] = useState('');
  const [efficiencyResult, setEfficiencyResult] = useState<number | null>(null);
  
  const [heatEntropy, setHeatEntropy] = useState('');
  const [temperature, setTemperature] = useState('');
  const [entropyResult, setEntropyResult] = useState<number | null>(null);

  const calculateHeat = () => {
    const m = parseFloat(mass);
    const c = parseFloat(specificHeat);
    const deltaT = parseFloat(tempChange);
    
    if (isNaN(m) || isNaN(c) || isNaN(deltaT)) return;
    
    const Q = m * c * deltaT;
    setHeatResult(Q);
  };

  const calculateEfficiency = () => {
    const W = parseFloat(work);
    const Q = parseFloat(heatInput);
    
    if (isNaN(W) || isNaN(Q) || Q === 0) return;
    
    const efficiency = (W / Q) * 100;
    setEfficiencyResult(efficiency);
  };

  const calculateEntropy = () => {
    const Q = parseFloat(heatEntropy);
    const T = parseFloat(temperature);
    
    if (isNaN(Q) || isNaN(T) || T === 0) return;
    
    const deltaS = Q / T;
    setEntropyResult(deltaS);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Thermodynamics Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate heat transfer, efficiency, and entropy changes
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="heat" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="heat">Heat Transfer</TabsTrigger>
              <TabsTrigger value="efficiency">Efficiency</TabsTrigger>
              <TabsTrigger value="entropy">Entropy</TabsTrigger>
            </TabsList>
            
            <TabsContent value="heat" className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="mass">Mass (kg)</Label>
                  <Input
                    id="mass"
                    type="number"
                    placeholder="Enter mass"
                    value={mass}
                    onChange={(e) => setMass(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="specificHeat">Specific Heat (J/kg·K)</Label>
                  <Input
                    id="specificHeat"
                    type="number"
                    placeholder="Enter specific heat"
                    value={specificHeat}
                    onChange={(e) => setSpecificHeat(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tempChange">Temperature Change (K)</Label>
                  <Input
                    id="tempChange"
                    type="number"
                    placeholder="Enter ΔT"
                    value={tempChange}
                    onChange={(e) => setTempChange(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={calculateHeat} className="w-full">
                Calculate Heat Transfer (Q = m×c×ΔT)
              </Button>
              
              {heatResult !== null && (
                <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                  <div className="text-sm opacity-90">Heat Transfer</div>
                  <div className="text-2xl font-bold">Q = {heatResult.toFixed(2)} J</div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="efficiency" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="work">Work Output (J)</Label>
                  <Input
                    id="work"
                    type="number"
                    placeholder="Enter work output"
                    value={work}
                    onChange={(e) => setWork(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="heatInput">Heat Input (J)</Label>
                  <Input
                    id="heatInput"
                    type="number"
                    placeholder="Enter heat input"
                    value={heatInput}
                    onChange={(e) => setHeatInput(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={calculateEfficiency} className="w-full">
                Calculate Efficiency (η = W/Q × 100%)
              </Button>
              
              {efficiencyResult !== null && (
                <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                  <div className="text-sm opacity-90">Efficiency</div>
                  <div className="text-2xl font-bold">η = {efficiencyResult.toFixed(2)}%</div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="entropy" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="heatEntropy">Heat (J)</Label>
                  <Input
                    id="heatEntropy"
                    type="number"
                    placeholder="Enter heat"
                    value={heatEntropy}
                    onChange={(e) => setHeatEntropy(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="temperature">Temperature (K)</Label>
                  <Input
                    id="temperature"
                    type="number"
                    placeholder="Enter temperature"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={calculateEntropy} className="w-full">
                Calculate Entropy Change (ΔS = Q/T)
              </Button>
              
              {entropyResult !== null && (
                <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                  <div className="text-sm opacity-90">Entropy Change</div>
                  <div className="text-2xl font-bold">ΔS = {entropyResult.toFixed(4)} J/K</div>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          <div className="text-xs text-muted-foreground bg-muted p-3 rounded mt-4">
            <strong>Thermodynamics Formulas:</strong><br />
            • Q = m×c×ΔT (Heat = mass × specific heat × temperature change)<br />
            • η = (W/Q) × 100% (Efficiency = work output / heat input × 100%)<br />
            • ΔS = Q/T (Entropy change = heat / temperature)
          </div>
        </CardContent>
      </Card>
    </div>
  );
});