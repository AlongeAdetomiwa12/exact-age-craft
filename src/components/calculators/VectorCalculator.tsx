import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Vector3D {
  x: number;
  y: number;
  z: number;
}

export const VectorCalculator: React.FC = memo(() => {
  const [v1, setV1] = useState<Vector3D>({ x: 1, y: 2, z: 3 });
  const [v2, setV2] = useState<Vector3D>({ x: 4, y: 5, z: 6 });
  const [operation, setOperation] = useState('magnitude');
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    calculateVector();
  }, [v1, v2, operation]);

  const calculateVector = () => {
    switch (operation) {
      case 'magnitude':
        const mag1 = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
        setResult({ 
          type: 'scalar', 
          value: mag1,
          description: 'Magnitude of Vector 1',
          formula: '|v| = √(x² + y² + z²)'
        });
        break;

      case 'add':
        setResult({
          type: 'vector',
          value: { x: v1.x + v2.x, y: v1.y + v2.y, z: v1.z + v2.z },
          description: 'Vector Addition',
          formula: 'v₁ + v₂ = (x₁+x₂, y₁+y₂, z₁+z₂)'
        });
        break;

      case 'subtract':
        setResult({
          type: 'vector',
          value: { x: v1.x - v2.x, y: v1.y - v2.y, z: v1.z - v2.z },
          description: 'Vector Subtraction',
          formula: 'v₁ - v₂ = (x₁-x₂, y₁-y₂, z₁-z₂)'
        });
        break;

      case 'dot':
        const dotProduct = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
        setResult({
          type: 'scalar',
          value: dotProduct,
          description: 'Dot Product',
          formula: 'v₁ · v₂ = x₁x₂ + y₁y₂ + z₁z₂'
        });
        break;

      case 'cross':
        const crossProduct = {
          x: v1.y * v2.z - v1.z * v2.y,
          y: v1.z * v2.x - v1.x * v2.z,
          z: v1.x * v2.y - v1.y * v2.x
        };
        setResult({
          type: 'vector',
          value: crossProduct,
          description: 'Cross Product',
          formula: 'v₁ × v₂ = (y₁z₂-z₁y₂, z₁x₂-x₁z₂, x₁y₂-y₁x₂)'
        });
        break;

      case 'angle':
        const mag1_angle = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
        const mag2_angle = Math.sqrt(v2.x * v2.x + v2.y * v2.y + v2.z * v2.z);
        const dot_angle = v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
        
        if (mag1_angle === 0 || mag2_angle === 0) {
          setResult({
            type: 'scalar',
            value: 0,
            description: 'Angle between vectors',
            formula: 'θ = arccos((v₁·v₂)/(|v₁||v₂|))'
          });
        } else {
          const cosTheta = dot_angle / (mag1_angle * mag2_angle);
          const angleRad = Math.acos(Math.max(-1, Math.min(1, cosTheta)));
          const angleDeg = angleRad * (180 / Math.PI);
          
          setResult({
            type: 'angle',
            value: angleDeg,
            radians: angleRad,
            description: 'Angle between vectors',
            formula: 'θ = arccos((v₁·v₂)/(|v₁||v₂|))'
          });
        }
        break;

      case 'normalize':
        const mag_norm = Math.sqrt(v1.x * v1.x + v1.y * v1.y + v1.z * v1.z);
        if (mag_norm === 0) {
          setResult({
            type: 'vector',
            value: { x: 0, y: 0, z: 0 },
            description: 'Unit Vector',
            formula: 'û = v/|v|'
          });
        } else {
          setResult({
            type: 'vector',
            value: { x: v1.x / mag_norm, y: v1.y / mag_norm, z: v1.z / mag_norm },
            description: 'Unit Vector',
            formula: 'û = v/|v|'
          });
        }
        break;

      default:
        setResult(null);
    }
  };

  const updateVector = (vector: 'v1' | 'v2', component: 'x' | 'y' | 'z', value: string) => {
    const numValue = parseFloat(value) || 0;
    if (vector === 'v1') {
      setV1(prev => ({ ...prev, [component]: numValue }));
    } else {
      setV2(prev => ({ ...prev, [component]: numValue }));
    }
  };

  const formatVector = (v: Vector3D): string => {
    return `(${v.x.toFixed(3)}, ${v.y.toFixed(3)}, ${v.z.toFixed(3)})`;
  };

  const renderResult = () => {
    if (!result) return null;

    return (
      <div className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <Label className="text-sm text-muted-foreground">{result.description}</Label>
          <div className="text-2xl font-bold text-primary">
            {result.type === 'vector' && formatVector(result.value)}
            {result.type === 'scalar' && result.value.toFixed(4)}
            {result.type === 'angle' && `${result.value.toFixed(2)}°`}
          </div>
          {result.type === 'angle' && (
            <p className="text-sm text-muted-foreground">
              ({result.radians.toFixed(4)} radians)
            </p>
          )}
        </div>
        
        <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
          <strong>Formula:</strong> {result.formula}
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Vector Calculator
          <Badge variant="secondary">Mathematics</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label className="text-lg font-medium">Vector 1 (v₁)</Label>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <Label className="text-sm">x</Label>
                <Input
                  type="number"
                  step="any"
                  value={v1.x}
                  onChange={(e) => updateVector('v1', 'x', e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">y</Label>
                <Input
                  type="number"
                  step="any"
                  value={v1.y}
                  onChange={(e) => updateVector('v1', 'y', e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">z</Label>
                <Input
                  type="number"
                  step="any"
                  value={v1.z}
                  onChange={(e) => updateVector('v1', 'z', e.target.value)}
                />
              </div>
            </div>
            <div className="text-center p-2 bg-muted rounded font-mono">
              {formatVector(v1)}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-medium">Vector 2 (v₂)</Label>
            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1">
                <Label className="text-sm">x</Label>
                <Input
                  type="number"
                  step="any"
                  value={v2.x}
                  onChange={(e) => updateVector('v2', 'x', e.target.value)}
                  disabled={operation === 'magnitude' || operation === 'normalize'}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">y</Label>
                <Input
                  type="number"
                  step="any"
                  value={v2.y}
                  onChange={(e) => updateVector('v2', 'y', e.target.value)}
                  disabled={operation === 'magnitude' || operation === 'normalize'}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">z</Label>
                <Input
                  type="number"
                  step="any"
                  value={v2.z}
                  onChange={(e) => updateVector('v2', 'z', e.target.value)}
                  disabled={operation === 'magnitude' || operation === 'normalize'}
                />
              </div>
            </div>
            <div className="text-center p-2 bg-muted rounded font-mono">
              {(operation === 'magnitude' || operation === 'normalize') ? 'N/A' : formatVector(v2)}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Operation</Label>
          <Select value={operation} onValueChange={setOperation}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="magnitude">Magnitude |v₁|</SelectItem>
              <SelectItem value="add">Addition v₁ + v₂</SelectItem>
              <SelectItem value="subtract">Subtraction v₁ - v₂</SelectItem>
              <SelectItem value="dot">Dot Product v₁ · v₂</SelectItem>
              <SelectItem value="cross">Cross Product v₁ × v₂</SelectItem>
              <SelectItem value="angle">Angle between v₁ and v₂</SelectItem>
              <SelectItem value="normalize">Normalize v₁</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {renderResult()}

        <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
          <p><strong>Key Formulas:</strong></p>
          <p>• Magnitude: |v| = √(x² + y² + z²)</p>
          <p>• Dot product: v₁ · v₂ = |v₁||v₂|cos(θ)</p>
          <p>• Cross product magnitude: |v₁ × v₂| = |v₁||v₂|sin(θ)</p>
        </div>
      </CardContent>
    </Card>
  );
});

VectorCalculator.displayName = 'VectorCalculator';