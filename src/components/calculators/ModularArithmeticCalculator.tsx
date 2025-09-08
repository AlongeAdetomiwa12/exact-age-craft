import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const ModularArithmeticCalculator: React.FC = memo(() => {
  const [a, setA] = useState('17');
  const [b, setB] = useState('5');
  const [modulus, setModulus] = useState('12');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(0);
  const [steps, setSteps] = useState<string[]>([]);

  useEffect(() => {
    calculateModularArithmetic();
  }, [a, b, modulus, operation]);

  const mod = (n: number, m: number): number => {
    return ((n % m) + m) % m;
  };

  const modularInverse = (a: number, m: number): number | null => {
    // Extended Euclidean Algorithm
    const extgcd = (a: number, b: number): [number, number, number] => {
      if (a === 0) return [b, 0, 1];
      const [gcd, x1, y1] = extgcd(b % a, a);
      const x = y1 - Math.floor(b / a) * x1;
      const y = x1;
      return [gcd, x, y];
    };

    const [gcd, x] = extgcd(a, m);
    if (gcd !== 1) return null; // No inverse exists
    return mod(x, m);
  };

  const calculateModularArithmetic = () => {
    const aVal = parseInt(a) || 0;
    const bVal = parseInt(b) || 0;
    const modVal = parseInt(modulus) || 1;

    if (modVal <= 0) {
      setResult(0);
      setSteps(['Modulus must be positive']);
      return;
    }

    let res = 0;
    const stepsList = [];

    switch (operation) {
      case 'add':
        res = mod(aVal + bVal, modVal);
        stepsList.push(`(${aVal} + ${bVal}) mod ${modVal}`);
        stepsList.push(`${aVal + bVal} mod ${modVal}`);
        stepsList.push(`= ${res}`);
        break;

      case 'subtract':
        res = mod(aVal - bVal, modVal);
        stepsList.push(`(${aVal} - ${bVal}) mod ${modVal}`);
        stepsList.push(`${aVal - bVal} mod ${modVal}`);
        stepsList.push(`= ${res}`);
        break;

      case 'multiply':
        res = mod(aVal * bVal, modVal);
        stepsList.push(`(${aVal} × ${bVal}) mod ${modVal}`);
        stepsList.push(`${aVal * bVal} mod ${modVal}`);
        stepsList.push(`= ${res}`);
        break;

      case 'power':
        res = mod(Math.pow(aVal, bVal), modVal);
        stepsList.push(`${aVal}^${bVal} mod ${modVal}`);
        if (bVal <= 10) {
          stepsList.push(`${Math.pow(aVal, bVal)} mod ${modVal}`);
        }
        stepsList.push(`= ${res}`);
        break;

      case 'inverse':
        const inv = modularInverse(aVal, modVal);
        if (inv !== null) {
          res = inv;
          stepsList.push(`Finding inverse of ${aVal} mod ${modVal}`);
          stepsList.push(`${aVal} × ${inv} ≡ 1 (mod ${modVal})`);
          stepsList.push(`Inverse = ${res}`);
        } else {
          stepsList.push(`No inverse exists for ${aVal} mod ${modVal}`);
          stepsList.push(`gcd(${aVal}, ${modVal}) ≠ 1`);
        }
        break;

      default:
        res = mod(aVal, modVal);
        stepsList.push(`${aVal} mod ${modVal} = ${res}`);
    }

    setResult(res);
    setSteps(stepsList);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Modular Arithmetic Calculator
          <Badge variant="secondary">Mathematics</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="a">First Number (a)</Label>
            <Input
              id="a"
              type="number"
              value={a}
              onChange={(e) => setA(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="b">Second Number (b)</Label>
            <Input
              id="b"
              type="number"
              value={b}
              onChange={(e) => setB(e.target.value)}
              disabled={operation === 'inverse'}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="modulus">Modulus (m)</Label>
            <Input
              id="modulus"
              type="number"
              min="1"
              value={modulus}
              onChange={(e) => setModulus(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Operation</Label>
          <Select value={operation} onValueChange={setOperation}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="add">Addition (a + b) mod m</SelectItem>
              <SelectItem value="subtract">Subtraction (a - b) mod m</SelectItem>
              <SelectItem value="multiply">Multiplication (a × b) mod m</SelectItem>
              <SelectItem value="power">Exponentiation a^b mod m</SelectItem>
              <SelectItem value="inverse">Modular Inverse of a mod m</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="bg-muted p-4 rounded-lg text-center">
          <Label className="text-sm text-muted-foreground">Result</Label>
          <div className="text-3xl font-bold text-primary">{result}</div>
        </div>

        {steps.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Calculation Steps</Label>
            <div className="bg-muted p-3 rounded font-mono text-sm space-y-1">
              {steps.map((step, index) => (
                <div key={index}>{step}</div>
              ))}
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
          <p><strong>Formula:</strong> a mod n = r (remainder when a ÷ n)</p>
          <p><strong>Properties:</strong></p>
          <p>• (a + b) mod m = ((a mod m) + (b mod m)) mod m</p>
          <p>• (a × b) mod m = ((a mod m) × (b mod m)) mod m</p>
          <p>• Modular inverse exists only if gcd(a, m) = 1</p>
        </div>
      </CardContent>
    </Card>
  );
});

ModularArithmeticCalculator.displayName = 'ModularArithmeticCalculator';