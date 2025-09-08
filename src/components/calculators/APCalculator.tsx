import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export const APCalculator: React.FC = memo(() => {
  const [firstTerm, setFirstTerm] = useState('1');
  const [commonDiff, setCommonDiff] = useState('1');
  const [numTerms, setNumTerms] = useState('10');
  const [nthTerm, setNthTerm] = useState(0);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    calculateAP();
  }, [firstTerm, commonDiff, numTerms]);

  const calculateAP = () => {
    const a = parseFloat(firstTerm) || 0;
    const d = parseFloat(commonDiff) || 0;
    const n = parseInt(numTerms) || 0;

    if (n <= 0) {
      setNthTerm(0);
      setSum(0);
      return;
    }

    // nth term: an = a + (n-1)d
    const an = a + (n - 1) * d;
    setNthTerm(an);

    // Sum: Sn = n/2 [2a + (n-1)d]
    const sn = (n / 2) * (2 * a + (n - 1) * d);
    setSum(sn);
  };

  const generateSequence = () => {
    const a = parseFloat(firstTerm) || 0;
    const d = parseFloat(commonDiff) || 0;
    const n = Math.min(parseInt(numTerms) || 0, 10); // Limit to 10 terms for display

    if (n <= 0) return [];

    const sequence = [];
    for (let i = 0; i < n; i++) {
      sequence.push(a + i * d);
    }
    return sequence;
  };

  const sequence = generateSequence();

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Arithmetic Progression Calculator
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
            <Label htmlFor="commonDiff">Common Difference (d)</Label>
            <Input
              id="commonDiff"
              type="number"
              step="any"
              value={commonDiff}
              onChange={(e) => setCommonDiff(e.target.value)}
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
            <div className="text-2xl font-bold text-primary">{nthTerm.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">a₍ₙ₎ = a + (n-1)d</p>
          </div>
          <div className="bg-muted p-4 rounded-lg">
            <Label className="text-sm text-muted-foreground">Sum of n Terms</Label>
            <div className="text-2xl font-bold text-primary">{sum.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Sₙ = n/2 [2a + (n-1)d]</p>
          </div>
        </div>

        {sequence.length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Sequence (first {sequence.length} terms)</Label>
            <div className="flex flex-wrap gap-2">
              {sequence.map((term, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {term.toFixed(2)}
                </Badge>
              ))}
              {parseInt(numTerms) > 10 && <span className="text-muted-foreground">...</span>}
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
          <p><strong>Formulas:</strong></p>
          <p>• nth term: aₙ = a + (n-1)d</p>
          <p>• Sum of n terms: Sₙ = n/2 [2a + (n-1)d]</p>
          <p>Where a = first term, d = common difference, n = number of terms</p>
        </div>
      </CardContent>
    </Card>
  );
});

APCalculator.displayName = 'APCalculator';