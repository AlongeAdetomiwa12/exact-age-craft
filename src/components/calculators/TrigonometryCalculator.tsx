import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const TrigonometryCalculator: React.FC = memo(() => {
  const [angle, setAngle] = useState('');
  const [isRadians, setIsRadians] = useState(false);
  const [sinResult, setSinResult] = useState<number | null>(null);
  const [cosResult, setCosResult] = useState<number | null>(null);
  const [tanResult, setTanResult] = useState<number | null>(null);
  
  const [invValue, setInvValue] = useState('');
  const [asinResult, setAsinResult] = useState<number | null>(null);
  const [acosResult, setAcosResult] = useState<number | null>(null);
  const [atanResult, setAtanResult] = useState<number | null>(null);

  const toRadians = (degrees: number) => degrees * (Math.PI / 180);
  const toDegrees = (radians: number) => radians * (180 / Math.PI);

  const calculateTrig = () => {
    const angleValue = parseFloat(angle);
    if (isNaN(angleValue)) return;
    
    const angleInRadians = isRadians ? angleValue : toRadians(angleValue);
    
    setSinResult(Math.sin(angleInRadians));
    setCosResult(Math.cos(angleInRadians));
    setTanResult(Math.tan(angleInRadians));
  };

  const calculateInverseTrig = () => {
    const value = parseFloat(invValue);
    if (isNaN(value)) return;
    
    const asinRad = Math.asin(value);
    const acosRad = Math.acos(value);
    const atanRad = Math.atan(value);
    
    setAsinResult(isRadians ? asinRad : toDegrees(asinRad));
    setAcosResult(isRadians ? acosRad : toDegrees(acosRad));
    setAtanResult(isRadians ? atanRad : toDegrees(atanRad));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Trigonometry Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate trigonometric functions and their inverses
          </p>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex justify-center">
            <Button
              variant={isRadians ? "default" : "outline"}
              onClick={() => setIsRadians(!isRadians)}
              size="sm"
            >
              {isRadians ? "Radians" : "Degrees"}
            </Button>
          </div>
          
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="basic">Basic Functions</TabsTrigger>
              <TabsTrigger value="inverse">Inverse Functions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="angle">Angle ({isRadians ? "radians" : "degrees"})</Label>
                <Input
                  id="angle"
                  type="number"
                  placeholder="Enter angle"
                  value={angle}
                  onChange={(e) => setAngle(e.target.value)}
                />
              </div>
              
              <Button onClick={calculateTrig} className="w-full">
                Calculate Trigonometric Functions
              </Button>
              
              {(sinResult !== null || cosResult !== null || tanResult !== null) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {sinResult !== null && (
                    <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                      <div className="text-sm opacity-90">sin({angle}°)</div>
                      <div className="text-lg font-bold">{sinResult.toFixed(6)}</div>
                    </div>
                  )}
                  {cosResult !== null && (
                    <div className="bg-secondary rounded-lg p-4 text-center">
                      <div className="text-sm text-muted-foreground">cos({angle}°)</div>
                      <div className="text-lg font-bold text-accent">{cosResult.toFixed(6)}</div>
                    </div>
                  )}
                  {tanResult !== null && (
                    <div className="bg-secondary rounded-lg p-4 text-center">
                      <div className="text-sm text-muted-foreground">tan({angle}°)</div>
                      <div className="text-lg font-bold text-accent">{tanResult.toFixed(6)}</div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                <strong>Formulas:</strong><br />
                • sin θ = opposite / hypotenuse<br />
                • cos θ = adjacent / hypotenuse<br />
                • tan θ = opposite / adjacent
              </div>
            </TabsContent>
            
            <TabsContent value="inverse" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="invValue">Value (between -1 and 1 for asin/acos)</Label>
                <Input
                  id="invValue"
                  type="number"
                  placeholder="Enter value"
                  value={invValue}
                  onChange={(e) => setInvValue(e.target.value)}
                />
              </div>
              
              <Button onClick={calculateInverseTrig} className="w-full">
                Calculate Inverse Functions
              </Button>
              
              {(asinResult !== null || acosResult !== null || atanResult !== null) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {asinResult !== null && !isNaN(asinResult) && (
                    <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                      <div className="text-sm opacity-90">arcsin({invValue})</div>
                      <div className="text-lg font-bold">{asinResult.toFixed(6)}°</div>
                    </div>
                  )}
                  {acosResult !== null && !isNaN(acosResult) && (
                    <div className="bg-secondary rounded-lg p-4 text-center">
                      <div className="text-sm text-muted-foreground">arccos({invValue})</div>
                      <div className="text-lg font-bold text-accent">{acosResult.toFixed(6)}°</div>
                    </div>
                  )}
                  {atanResult !== null && (
                    <div className="bg-secondary rounded-lg p-4 text-center">
                      <div className="text-sm text-muted-foreground">arctan({invValue})</div>
                      <div className="text-lg font-bold text-accent">{atanResult.toFixed(6)}°</div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                <strong>Note:</strong> Inverse functions return the angle whose trigonometric value equals the input.
                Domain: asin/acos require values between -1 and 1.
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
});