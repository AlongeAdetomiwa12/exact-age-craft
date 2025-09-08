import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export const QuadraticEquationSolver: React.FC = memo(() => {
  const [a, setA] = useState('1');
  const [b, setB] = useState('0');
  const [c, setC] = useState('0');
  const [solutions, setSolutions] = useState<{ x1?: number; x2?: number; discriminant?: number; type?: string } | null>(null);

  useEffect(() => {
    calculateSolutions();
  }, [a, b, c]);

  const calculateSolutions = () => {
    const aVal = parseFloat(a) || 0;
    const bVal = parseFloat(b) || 0;
    const cVal = parseFloat(c) || 0;

    if (aVal === 0) {
      setSolutions({ type: 'not_quadratic' });
      return;
    }

    const discriminant = bVal * bVal - 4 * aVal * cVal;
    
    if (discriminant > 0) {
      const x1 = (-bVal + Math.sqrt(discriminant)) / (2 * aVal);
      const x2 = (-bVal - Math.sqrt(discriminant)) / (2 * aVal);
      setSolutions({ x1, x2, discriminant, type: 'two_real' });
    } else if (discriminant === 0) {
      const x = -bVal / (2 * aVal);
      setSolutions({ x1: x, discriminant, type: 'one_real' });
    } else {
      const realPart = -bVal / (2 * aVal);
      const imaginaryPart = Math.sqrt(-discriminant) / (2 * aVal);
      setSolutions({ 
        discriminant, 
        type: 'complex',
        x1: realPart,
        x2: imaginaryPart
      });
    }
  };

  const renderSolutions = () => {
    if (!solutions) return null;

    switch (solutions.type) {
      case 'not_quadratic':
        return (
          <div className="p-4 bg-yellow-50 rounded-lg">
            <p className="text-yellow-800">Not a quadratic equation (a cannot be 0)</p>
          </div>
        );
      
      case 'two_real':
        return (
          <div className="space-y-4">
            <Badge variant="secondary">Two Real Solutions</Badge>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-3 rounded">
                <Label className="text-sm text-muted-foreground">Solution 1</Label>
                <div className="text-xl font-bold text-primary">x₁ = {solutions.x1?.toFixed(4)}</div>
              </div>
              <div className="bg-muted p-3 rounded">
                <Label className="text-sm text-muted-foreground">Solution 2</Label>
                <div className="text-xl font-bold text-primary">x₂ = {solutions.x2?.toFixed(4)}</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Discriminant: {solutions.discriminant?.toFixed(4)} (positive)
            </p>
          </div>
        );
      
      case 'one_real':
        return (
          <div className="space-y-4">
            <Badge variant="secondary">One Real Solution</Badge>
            <div className="bg-muted p-3 rounded text-center">
              <Label className="text-sm text-muted-foreground">Solution</Label>
              <div className="text-xl font-bold text-primary">x = {solutions.x1?.toFixed(4)}</div>
            </div>
            <p className="text-sm text-muted-foreground">
              Discriminant: {solutions.discriminant} (zero)
            </p>
          </div>
        );
      
      case 'complex':
        return (
          <div className="space-y-4">
            <Badge variant="secondary">Complex Solutions</Badge>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted p-3 rounded">
                <Label className="text-sm text-muted-foreground">Solution 1</Label>
                <div className="text-lg font-bold text-primary">
                  x₁ = {solutions.x1?.toFixed(4)} + {solutions.x2?.toFixed(4)}i
                </div>
              </div>
              <div className="bg-muted p-3 rounded">
                <Label className="text-sm text-muted-foreground">Solution 2</Label>
                <div className="text-lg font-bold text-primary">
                  x₂ = {solutions.x1?.toFixed(4)} - {solutions.x2?.toFixed(4)}i
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Discriminant: {solutions.discriminant?.toFixed(4)} (negative)
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Quadratic Equation Solver
          <Badge variant="secondary">Mathematics</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <p className="text-center text-lg">
            <span className="font-mono">{a || '1'}x² + {b || '0'}x + {c || '0'} = 0</span>
          </p>
          
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="a">Coefficient a</Label>
              <Input
                id="a"
                type="number"
                step="any"
                value={a}
                onChange={(e) => setA(e.target.value)}
                placeholder="1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="b">Coefficient b</Label>
              <Input
                id="b"
                type="number"
                step="any"
                value={b}
                onChange={(e) => setB(e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="c">Coefficient c</Label>
              <Input
                id="c"
                type="number"
                step="any"
                value={c}
                onChange={(e) => setC(e.target.value)}
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {renderSolutions()}

        <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
          <p><strong>Formula:</strong> x = [-b ± √(b² - 4ac)] / (2a)</p>
          <p><strong>Discriminant:</strong> Δ = b² - 4ac</p>
          <p>• Δ &gt; 0: Two real solutions</p>
          <p>• Δ = 0: One real solution</p>
          <p>• Δ &lt; 0: Two complex solutions</p>
        </div>
      </CardContent>
    </Card>
  );
});

QuadraticEquationSolver.displayName = 'QuadraticEquationSolver';