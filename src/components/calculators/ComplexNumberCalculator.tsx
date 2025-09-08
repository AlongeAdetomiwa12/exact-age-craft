import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ComplexNumber {
  real: number;
  imaginary: number;
}

export const ComplexNumberCalculator: React.FC = memo(() => {
  const [z1Real, setZ1Real] = useState('3');
  const [z1Imaginary, setZ1Imaginary] = useState('4');
  const [z2Real, setZ2Real] = useState('1');
  const [z2Imaginary, setZ2Imaginary] = useState('2');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState<ComplexNumber>({ real: 0, imaginary: 0 });
  const [magnitude, setMagnitude] = useState(0);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    calculateComplex();
  }, [z1Real, z1Imaginary, z2Real, z2Imaginary, operation]);

  const calculateComplex = () => {
    const z1: ComplexNumber = {
      real: parseFloat(z1Real) || 0,
      imaginary: parseFloat(z1Imaginary) || 0
    };

    const z2: ComplexNumber = {
      real: parseFloat(z2Real) || 0,
      imaginary: parseFloat(z2Imaginary) || 0
    };

    let res: ComplexNumber = { real: 0, imaginary: 0 };

    switch (operation) {
      case 'add':
        res = {
          real: z1.real + z2.real,
          imaginary: z1.imaginary + z2.imaginary
        };
        break;

      case 'subtract':
        res = {
          real: z1.real - z2.real,
          imaginary: z1.imaginary - z2.imaginary
        };
        break;

      case 'multiply':
        // (a+bi)(c+di) = (ac-bd) + (ad+bc)i
        res = {
          real: z1.real * z2.real - z1.imaginary * z2.imaginary,
          imaginary: z1.real * z2.imaginary + z1.imaginary * z2.real
        };
        break;

      case 'divide':
        // (a+bi)/(c+di) = [(ac+bd) + (bc-ad)i] / (c²+d²)
        const denominator = z2.real * z2.real + z2.imaginary * z2.imaginary;
        if (denominator === 0) {
          res = { real: 0, imaginary: 0 };
        } else {
          res = {
            real: (z1.real * z2.real + z1.imaginary * z2.imaginary) / denominator,
            imaginary: (z1.imaginary * z2.real - z1.real * z2.imaginary) / denominator
          };
        }
        break;

      case 'conjugate':
        res = {
          real: z1.real,
          imaginary: -z1.imaginary
        };
        break;

      default:
        res = z1;
    }

    setResult(res);
    
    // Calculate magnitude and angle
    const mag = Math.sqrt(res.real * res.real + res.imaginary * res.imaginary);
    const ang = Math.atan2(res.imaginary, res.real) * (180 / Math.PI);
    
    setMagnitude(mag);
    setAngle(ang);
  };

  const formatComplex = (z: ComplexNumber): string => {
    if (z.imaginary === 0) return z.real.toFixed(3);
    if (z.real === 0) return `${z.imaginary.toFixed(3)}i`;
    
    const sign = z.imaginary >= 0 ? '+' : '-';
    return `${z.real.toFixed(3)} ${sign} ${Math.abs(z.imaginary).toFixed(3)}i`;
  };

  const formatPolar = (): string => {
    return `${magnitude.toFixed(3)} ∠ ${angle.toFixed(1)}°`;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Complex Number Calculator
          <Badge variant="secondary">Mathematics</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <Label className="text-lg font-medium">First Complex Number (z₁)</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-sm">Real part</Label>
                <Input
                  type="number"
                  step="any"
                  value={z1Real}
                  onChange={(e) => setZ1Real(e.target.value)}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Imaginary part</Label>
                <Input
                  type="number"
                  step="any"
                  value={z1Imaginary}
                  onChange={(e) => setZ1Imaginary(e.target.value)}
                />
              </div>
            </div>
            <div className="text-center p-2 bg-muted rounded font-mono">
              {formatComplex({ real: parseFloat(z1Real) || 0, imaginary: parseFloat(z1Imaginary) || 0 })}
            </div>
          </div>

          <div className="space-y-4">
            <Label className="text-lg font-medium">Second Complex Number (z₂)</Label>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-sm">Real part</Label>
                <Input
                  type="number"
                  step="any"
                  value={z2Real}
                  onChange={(e) => setZ2Real(e.target.value)}
                  disabled={operation === 'conjugate'}
                />
              </div>
              <div className="space-y-1">
                <Label className="text-sm">Imaginary part</Label>
                <Input
                  type="number"
                  step="any"
                  value={z2Imaginary}
                  onChange={(e) => setZ2Imaginary(e.target.value)}
                  disabled={operation === 'conjugate'}
                />
              </div>
            </div>
            <div className="text-center p-2 bg-muted rounded font-mono">
              {operation === 'conjugate' ? 'N/A' : formatComplex({ real: parseFloat(z2Real) || 0, imaginary: parseFloat(z2Imaginary) || 0 })}
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
              <SelectItem value="add">Addition (z₁ + z₂)</SelectItem>
              <SelectItem value="subtract">Subtraction (z₁ - z₂)</SelectItem>
              <SelectItem value="multiply">Multiplication (z₁ × z₂)</SelectItem>
              <SelectItem value="divide">Division (z₁ ÷ z₂)</SelectItem>
              <SelectItem value="conjugate">Conjugate of z₁</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <Label className="text-sm text-muted-foreground">Result (Rectangular Form)</Label>
            <div className="text-2xl font-bold text-primary font-mono">
              {formatComplex(result)}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-muted p-3 rounded">
              <Label className="text-sm text-muted-foreground">Polar Form</Label>
              <div className="text-lg font-bold text-primary font-mono">
                {formatPolar()}
              </div>
            </div>
            <div className="bg-muted p-3 rounded">
              <Label className="text-sm text-muted-foreground">Magnitude</Label>
              <div className="text-lg font-bold text-primary">
                |z| = {magnitude.toFixed(4)}
              </div>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
          <p><strong>Formulas:</strong></p>
          <p>• Addition: (a+bi) + (c+di) = (a+c) + (b+d)i</p>
          <p>• Multiplication: (a+bi)(c+di) = (ac-bd) + (ad+bc)i</p>
          <p>• Magnitude: |z| = √(a² + b²)</p>
          <p>• Angle: θ = arctan(b/a)</p>
        </div>
      </CardContent>
    </Card>
  );
});

ComplexNumberCalculator.displayName = 'ComplexNumberCalculator';