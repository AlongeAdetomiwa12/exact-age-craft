import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export const GPCalculator: React.FC = memo(() => {
  const [firstTerm, setFirstTerm] = useState('1');
  const [commonRatio, setCommonRatio] = useState('2');
  const [numTerms, setNumTerms] = useState('5');
  const [nthTerm, setNthTerm] = useState(0);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    calculateGP();
  }, [firstTerm, commonRatio, numTerms]);

  const calculateGP = () => {
    const a = parseFloat(firstTerm) || 0;
    const r = parseFloat(commonRatio) || 0;
    const n = parseInt(numTerms) || 0;

    if (n <= 0 || a === 0) {
      setNthTerm(0);
      setSum(0);
      return;
    }

    // nth term: an = ar^(n-1)
    const an = a * Math.pow(r, n - 1);
    setNthTerm(an);

    // Sum: Sn = a(1-r^n)/(1-r) for r ≠ 1, or Sn = na for r = 1
    let sn;
    if (r === 1) {
      sn = n * a;
    } else {
      sn = a * (1 - Math.pow(r, n)) / (1 - r);
    }
    setSum(sn);
  };

  const generateSequence = () => {
    const a = parseFloat(firstTerm) || 0;
    const r = parseFloat(commonRatio) || 0;
    const n = Math.min(parseInt(numTerms) || 0, 8); // Limit to 8 terms for display

    if (n <= 0 || a === 0) return [];

    const sequence = [];
    for (let i = 0; i < n; i++) {
      const term = a * Math.pow(r, i);
      sequence.push(term);
    }
    return sequence;
  };

  const sequence = generateSequence();
  const r = parseFloat(commonRatio) || 0;

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Geometric Progression Calculator
          <Badge variant="secondary">Mathematics</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstTerm">First Term (a)</Label>
            <Input
              id="firstTerm"
              type="number"
              step="any"
              value={firstTerm}
              onChange={(e) => setFirstTerm(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="commonRatio">Common Ratio (r)</Label>
            <Input
              id="commonRatio"
              type="number"
              step="any"
              value={commonRatio}
              onChange={(e) => setCommonRatio(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="numTerms">Number of Terms (n)</Label>
            <Input
              id="numTerms"
              type="number"
              min="1"
              value={numTerms}
              onChange={(e) => setNumTerms(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-muted p-4 rounded-lg">
            <Label className="text-sm text-muted-foreground">nth Term</Label>
            <div className="text-2xl font-bold text-primary">
              {Math.abs(nthTerm) > 1e6 ? nthTerm.toExponential(3) : nthTerm.toFixed(3)}
            </div>
            <p className="text-xs text-muted-foreground">aₙ = ar^(n-1)</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <Label className="text-sm text-muted-foreground">Sum of n Terms</Label>
            <div className="text-2xl font-bold text-primary">
              {Math.abs(sum) > 1e6 ? sum.toExponential(3) : sum.toFixed(3)}
            </div>
            <p className="text-xs text-muted-foreground">
              {r === 1 ? 'Sₙ = na' : 'Sₙ = a(1-rⁿ)/(1-r)'}
            </p>
          </div>
        </div>

        {sequence.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Sequence (first {sequence.length} terms)</Label>
            <div className="flex flex-wrap gap-2">
              {sequence.map((term, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {Math.abs(term) > 1e6 ? term.toExponential(2) : term.toFixed(2)}
                </Badge>
              ))}
              {parseInt(numTerms) > 8 && <span className="text-muted-foreground">...</span>}
            </div>
          </div>
        )}

        {Math.abs(r) < 1 && r !== 0 && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <Label className="text-sm text-blue-800 font-medium">Infinite Sum (|r| &lt; 1)</Label>
            <div className="text-lg font-bold text-blue-600">
              S∞ = {(parseFloat(firstTerm) / (1 - r)).toFixed(4)}
            </div>
            <p className="text-xs text-blue-600">Formula: S∞ = a/(1-r)</p>
          </div>
        )}

        <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
          <p><strong>Formulas:</strong></p>
          <p>• nth term: aₙ = ar^(n-1)</p>
          <p>• Sum of n terms: Sₙ = a(1-rⁿ)/(1-r) when r ≠ 1</p>
          <p>• Sum of n terms: Sₙ = na when r = 1</p>
          <p>• Infinite sum: S∞ = a/(1-r) when |r| &lt; 1</p>
        </div>
      </CardContent>
    </Card>
  );
});

GPCalculator.displayName = 'GPCalculator';