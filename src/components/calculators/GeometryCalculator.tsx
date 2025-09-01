import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const GeometryCalculator: React.FC = memo(() => {
  // Circle
  const [circleRadius, setCircleRadius] = useState('');
  const [circleArea, setCircleArea] = useState<number | null>(null);
  const [circleCircumference, setCircleCircumference] = useState<number | null>(null);

  // Rectangle
  const [rectLength, setRectLength] = useState('');
  const [rectWidth, setRectWidth] = useState('');
  const [rectArea, setRectArea] = useState<number | null>(null);
  const [rectPerimeter, setRectPerimeter] = useState<number | null>(null);

  // Sphere
  const [sphereRadius, setSphereRadius] = useState('');
  const [sphereVolume, setSphereVolume] = useState<number | null>(null);
  const [sphereSurfaceArea, setSphereSurfaceArea] = useState<number | null>(null);

  // Cube
  const [cubeEdge, setCubeEdge] = useState('');
  const [cubeVolume, setCubeVolume] = useState<number | null>(null);
  const [cubeSurfaceArea, setCubeSurfaceArea] = useState<number | null>(null);

  const calculateCircle = () => {
    const r = parseFloat(circleRadius);
    if (isNaN(r) || r <= 0) return;
    
    setCircleArea(Math.PI * r * r);
    setCircleCircumference(2 * Math.PI * r);
  };

  const calculateRectangle = () => {
    const l = parseFloat(rectLength);
    const w = parseFloat(rectWidth);
    if (isNaN(l) || isNaN(w) || l <= 0 || w <= 0) return;
    
    setRectArea(l * w);
    setRectPerimeter(2 * (l + w));
  };

  const calculateSphere = () => {
    const r = parseFloat(sphereRadius);
    if (isNaN(r) || r <= 0) return;
    
    setSphereVolume((4/3) * Math.PI * r * r * r);
    setSphereSurfaceArea(4 * Math.PI * r * r);
  };

  const calculateCube = () => {
    const a = parseFloat(cubeEdge);
    if (isNaN(a) || a <= 0) return;
    
    setCubeVolume(a * a * a);
    setCubeSurfaceArea(6 * a * a);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Geometry Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate area, volume, and perimeter for geometric shapes
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="circle" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="circle">Circle</TabsTrigger>
              <TabsTrigger value="rectangle">Rectangle</TabsTrigger>
              <TabsTrigger value="sphere">Sphere</TabsTrigger>
              <TabsTrigger value="cube">Cube</TabsTrigger>
            </TabsList>
            
            <TabsContent value="circle" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="circleRadius">Radius (r)</Label>
                <Input
                  id="circleRadius"
                  type="number"
                  placeholder="Enter radius"
                  value={circleRadius}
                  onChange={(e) => setCircleRadius(e.target.value)}
                />
              </div>
              
              <Button onClick={calculateCircle} className="w-full">
                Calculate Circle Properties
              </Button>
              
              {(circleArea !== null || circleCircumference !== null) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {circleArea !== null && (
                    <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                      <div className="text-sm opacity-90">Area</div>
                      <div className="text-lg font-bold">{circleArea.toFixed(2)}</div>
                    </div>
                  )}
                  {circleCircumference !== null && (
                    <div className="bg-secondary rounded-lg p-4 text-center">
                      <div className="text-sm text-muted-foreground">Circumference</div>
                      <div className="text-lg font-bold text-accent">{circleCircumference.toFixed(2)}</div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                <strong>Formulas:</strong> Area = πr², Circumference = 2πr
              </div>
            </TabsContent>
            
            <TabsContent value="rectangle" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rectLength">Length (l)</Label>
                  <Input
                    id="rectLength"
                    type="number"
                    placeholder="Enter length"
                    value={rectLength}
                    onChange={(e) => setRectLength(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rectWidth">Width (w)</Label>
                  <Input
                    id="rectWidth"
                    type="number"
                    placeholder="Enter width"
                    value={rectWidth}
                    onChange={(e) => setRectWidth(e.target.value)}
                  />
                </div>
              </div>
              
              <Button onClick={calculateRectangle} className="w-full">
                Calculate Rectangle Properties
              </Button>
              
              {(rectArea !== null || rectPerimeter !== null) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {rectArea !== null && (
                    <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                      <div className="text-sm opacity-90">Area</div>
                      <div className="text-lg font-bold">{rectArea.toFixed(2)}</div>
                    </div>
                  )}
                  {rectPerimeter !== null && (
                    <div className="bg-secondary rounded-lg p-4 text-center">
                      <div className="text-sm text-muted-foreground">Perimeter</div>
                      <div className="text-lg font-bold text-accent">{rectPerimeter.toFixed(2)}</div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                <strong>Formulas:</strong> Area = l × w, Perimeter = 2(l + w)
              </div>
            </TabsContent>
            
            <TabsContent value="sphere" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="sphereRadius">Radius (r)</Label>
                <Input
                  id="sphereRadius"
                  type="number"
                  placeholder="Enter radius"
                  value={sphereRadius}
                  onChange={(e) => setSphereRadius(e.target.value)}
                />
              </div>
              
              <Button onClick={calculateSphere} className="w-full">
                Calculate Sphere Properties
              </Button>
              
              {(sphereVolume !== null || sphereSurfaceArea !== null) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {sphereVolume !== null && (
                    <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                      <div className="text-sm opacity-90">Volume</div>
                      <div className="text-lg font-bold">{sphereVolume.toFixed(2)}</div>
                    </div>
                  )}
                  {sphereSurfaceArea !== null && (
                    <div className="bg-secondary rounded-lg p-4 text-center">
                      <div className="text-sm text-muted-foreground">Surface Area</div>
                      <div className="text-lg font-bold text-accent">{sphereSurfaceArea.toFixed(2)}</div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                <strong>Formulas:</strong> Volume = (4/3)πr³, Surface Area = 4πr²
              </div>
            </TabsContent>
            
            <TabsContent value="cube" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="cubeEdge">Edge length (a)</Label>
                <Input
                  id="cubeEdge"
                  type="number"
                  placeholder="Enter edge length"
                  value={cubeEdge}
                  onChange={(e) => setCubeEdge(e.target.value)}
                />
              </div>
              
              <Button onClick={calculateCube} className="w-full">
                Calculate Cube Properties
              </Button>
              
              {(cubeVolume !== null || cubeSurfaceArea !== null) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cubeVolume !== null && (
                    <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                      <div className="text-sm opacity-90">Volume</div>
                      <div className="text-lg font-bold">{cubeVolume.toFixed(2)}</div>
                    </div>
                  )}
                  {cubeSurfaceArea !== null && (
                    <div className="bg-secondary rounded-lg p-4 text-center">
                      <div className="text-sm text-muted-foreground">Surface Area</div>
                      <div className="text-lg font-bold text-accent">{cubeSurfaceArea.toFixed(2)}</div>
                    </div>
                  )}
                </div>
              )}
              
              <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
                <strong>Formulas:</strong> Volume = a³, Surface Area = 6a²
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
});