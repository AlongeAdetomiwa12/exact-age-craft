import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export const MatrixCalculator: React.FC = memo(() => {
  const [matrixA, setMatrixA] = useState<number[][]>([[1, 2], [3, 4]]);
  const [matrixB, setMatrixB] = useState<number[][]>([[5, 6], [7, 8]]);
  const [result, setResult] = useState<any>(null);
  const [operation, setOperation] = useState<string>('');

  const updateMatrixValue = (matrix: 'A' | 'B', row: number, col: number, value: string) => {
    const newValue = parseFloat(value) || 0;
    if (matrix === 'A') {
      const newMatrix = [...matrixA];
      newMatrix[row][col] = newValue;
      setMatrixA(newMatrix);
    } else {
      const newMatrix = [...matrixB];
      newMatrix[row][col] = newValue;
      setMatrixB(newMatrix);
    }
  };

  const addMatrices = () => {
    if (matrixA.length !== matrixB.length || matrixA[0].length !== matrixB[0].length) {
      setResult({ error: 'Matrices must have same dimensions for addition' });
      return;
    }
    
    const resultMatrix = matrixA.map((row, i) =>
      row.map((val, j) => val + matrixB[i][j])
    );
    setResult({ matrix: resultMatrix });
    setOperation('Addition');
  };

  const multiplyMatrices = () => {
    if (matrixA[0].length !== matrixB.length) {
      setResult({ error: 'Columns of A must equal rows of B for multiplication' });
      return;
    }

    const resultMatrix = Array(matrixA.length).fill(null).map(() => 
      Array(matrixB[0].length).fill(0)
    );

    for (let i = 0; i < matrixA.length; i++) {
      for (let j = 0; j < matrixB[0].length; j++) {
        for (let k = 0; k < matrixB.length; k++) {
          resultMatrix[i][j] += matrixA[i][k] * matrixB[k][j];
        }
      }
    }

    setResult({ matrix: resultMatrix });
    setOperation('Multiplication');
  };

  const calculateDeterminant = () => {
    if (matrixA.length !== 2 || matrixA[0].length !== 2) {
      setResult({ error: 'Determinant calculation only for 2x2 matrices' });
      return;
    }

    const det = matrixA[0][0] * matrixA[1][1] - matrixA[0][1] * matrixA[1][0];
    setResult({ determinant: det });
    setOperation('Determinant');
  };

  const renderMatrix = (matrix: number[][], label: string, matrixType: 'A' | 'B') => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="grid grid-cols-2 gap-2 max-w-32">
        {matrix.map((row, i) =>
          row.map((val, j) => (
            <Input
              key={`${i}-${j}`}
              type="number"
              value={val}
              onChange={(e) => updateMatrixValue(matrixType, i, j, e.target.value)}
              className="h-8 text-center"
            />
          ))
        )}
      </div>
    </div>
  );

  const renderResult = () => {
    if (!result) return null;

    if (result.error) {
      return (
        <div className="p-4 bg-destructive/10 rounded-lg">
          <p className="text-destructive text-sm">{result.error}</p>
        </div>
      );
    }

    if (result.matrix) {
      return (
        <div className="space-y-2">
          <Badge variant="secondary">{operation} Result</Badge>
          <div className="grid grid-cols-2 gap-2 max-w-32">
            {result.matrix.map((row: number[], i: number) =>
              row.map((val: number, j: number) => (
                <div key={`${i}-${j}`} className="h-8 bg-muted rounded flex items-center justify-center text-sm">
                  {val.toFixed(2)}
                </div>
              ))
            )}
          </div>
        </div>
      );
    }

    if (typeof result.determinant === 'number') {
      return (
        <div className="space-y-2">
          <Badge variant="secondary">Determinant</Badge>
          <div className="text-2xl font-bold text-primary">
            {result.determinant.toFixed(2)}
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Matrix Calculator
          <Badge variant="secondary">Mathematics</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {renderMatrix(matrixA, 'Matrix A', 'A')}
          {renderMatrix(matrixB, 'Matrix B', 'B')}
        </div>

        <div className="flex flex-wrap gap-2">
          <Button onClick={addMatrices} variant="outline" size="sm">
            Add A + B
          </Button>
          <Button onClick={multiplyMatrices} variant="outline" size="sm">
            Multiply A × B
          </Button>
          <Button onClick={calculateDeterminant} variant="outline" size="sm">
            Det(A)
          </Button>
        </div>

        {renderResult()}

        <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
          <p><strong>Formula (2x2 Determinant):</strong> |A| = ad - bc</p>
          <p><strong>Note:</strong> This calculator supports 2x2 matrices for demonstration.</p>
        </div>
      </CardContent>
    </Card>
  );
});

MatrixCalculator.displayName = 'MatrixCalculator';