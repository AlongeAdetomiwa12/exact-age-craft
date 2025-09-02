import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const OhmsLawCalculator: React.FC = memo(() => {
  const [voltage, setVoltage] = useState('');
  const [current, setCurrent] = useState('');
  const [resistance, setResistance] = useState('');
  const [power, setPower] = useState('');
  const [results, setResults] = useState<any>(null);

  const calculateFromVoltageAndCurrent = () => {
    const v = parseFloat(voltage);
    const i = parseFloat(current);
    if (isNaN(v) || isNaN(i)) return;

    const r = v / i;
    const p = v * i;
    setResults({
      type: 'From V and I',
      voltage: v,
      current: i,
      resistance: r.toFixed(2),
      power: p.toFixed(2)
    });
  };

  const calculateFromVoltageAndResistance = () => {
    const v = parseFloat(voltage);
    const r = parseFloat(resistance);
    if (isNaN(v) || isNaN(r)) return;

    const i = v / r;
    const p = v * i;
    setResults({
      type: 'From V and R',
      voltage: v,
      current: i.toFixed(2),
      resistance: r,
      power: p.toFixed(2)
    });
  };

  const calculateFromCurrentAndResistance = () => {
    const i = parseFloat(current);
    const r = parseFloat(resistance);
    if (isNaN(i) || isNaN(r)) return;

    const v = i * r;
    const p = v * i;
    setResults({
      type: 'From I and R',
      voltage: v.toFixed(2),
      current: i,
      resistance: r,
      power: p.toFixed(2)
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Ohm's Law Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate voltage, current, resistance, and power using Ohm's Law
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="vi" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="vi">V & I → R, P</TabsTrigger>
              <TabsTrigger value="vr">V & R → I, P</TabsTrigger>
              <TabsTrigger value="ir">I & R → V, P</TabsTrigger>
            </TabsList>
            
            <TabsContent value="vi" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="voltage1">Voltage (V)</Label>
                  <Input
                    id="voltage1"
                    type="number"
                    placeholder="Enter voltage"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="current1">Current (A)</Label>
                  <Input
                    id="current1"
                    type="number"
                    placeholder="Enter current"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={calculateFromVoltageAndCurrent} className="w-full">
                Calculate Resistance & Power
              </Button>
            </TabsContent>
            
            <TabsContent value="vr" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="voltage2">Voltage (V)</Label>
                  <Input
                    id="voltage2"
                    type="number"
                    placeholder="Enter voltage"
                    value={voltage}
                    onChange={(e) => setVoltage(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resistance2">Resistance (Ω)</Label>
                  <Input
                    id="resistance2"
                    type="number"
                    placeholder="Enter resistance"
                    value={resistance}
                    onChange={(e) => setResistance(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={calculateFromVoltageAndResistance} className="w-full">
                Calculate Current & Power
              </Button>
            </TabsContent>
            
            <TabsContent value="ir" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current3">Current (A)</Label>
                  <Input
                    id="current3"
                    type="number"
                    placeholder="Enter current"
                    value={current}
                    onChange={(e) => setCurrent(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="resistance3">Resistance (Ω)</Label>
                  <Input
                    id="resistance3"
                    type="number"
                    placeholder="Enter resistance"
                    value={resistance}
                    onChange={(e) => setResistance(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={calculateFromCurrentAndResistance} className="w-full">
                Calculate Voltage & Power
              </Button>
            </TabsContent>
          </Tabs>
          
          {results && (
            <div className="bg-gradient-primary rounded-lg p-6 text-white mt-6">
              <h3 className="text-lg font-semibold mb-4 text-center">{results.type}</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-sm opacity-90">Voltage</div>
                  <div className="text-xl font-bold">{results.voltage} V</div>
                </div>
                <div className="text-center">
                  <div className="text-sm opacity-90">Current</div>
                  <div className="text-xl font-bold">{results.current} A</div>
                </div>
                <div className="text-center">
                  <div className="text-sm opacity-90">Resistance</div>
                  <div className="text-xl font-bold">{results.resistance} Ω</div>
                </div>
                <div className="text-center">
                  <div className="text-sm opacity-90">Power</div>
                  <div className="text-xl font-bold">{results.power} W</div>
                </div>
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground bg-muted p-3 rounded mt-4">
            <strong>Ohm's Law Formulas:</strong><br />
            • V = I × R (Voltage = Current × Resistance)<br />
            • I = V ÷ R (Current = Voltage ÷ Resistance)<br />
            • R = V ÷ I (Resistance = Voltage ÷ Current)<br />
            • P = V × I (Power = Voltage × Current)
          </div>
        </CardContent>
      </Card>
    </div>
  );
});