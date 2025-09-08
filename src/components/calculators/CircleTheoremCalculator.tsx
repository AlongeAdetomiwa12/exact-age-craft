import React, { useState, useEffect, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export const CircleTheoremCalculator: React.FC = memo(() => {
  const [theorem, setTheorem] = useState('inscribed_angle');
  const [inputs, setInputs] = useState<{ [key: string]: string }>({
    central_angle: '60',
    arc_length: '10',
    radius: '5',
    chord_length: '8',
    angle1: '45',
    angle2: '30'
  });
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    calculateCircleTheorem();
  }, [theorem, inputs]);

  const updateInput = (key: string, value: string) => {
    setInputs(prev => ({ ...prev, [key]: value }));
  };

  const calculateCircleTheorem = () => {
    const getValue = (key: string) => parseFloat(inputs[key]) || 0;

    switch (theorem) {
      case 'inscribed_angle':
        // Inscribed angle = 1/2 × central angle
        const centralAngle = getValue('central_angle');
        const inscribedAngle = centralAngle / 2;
        setResult({
          type: 'angle',
          value: inscribedAngle,
          description: 'Inscribed Angle',
          explanation: `The inscribed angle is half the central angle that subtends the same arc.`,
          formula: 'Inscribed Angle = Central Angle ÷ 2'
        });
        break;

      case 'arc_length':
        // Arc length = (θ/360°) × 2πr or (θ in radians) × r
        const angle = getValue('central_angle');
        const radius = getValue('radius');
        const arcLength = (angle / 360) * 2 * Math.PI * radius;
        setResult({
          type: 'length',
          value: arcLength,
          description: 'Arc Length',
          explanation: `Arc length is proportional to the central angle and radius.`,
          formula: 'Arc Length = (θ/360°) × 2πr'
        });
        break;

      case 'sector_area':
        // Sector area = (θ/360°) × πr²
        const sectorAngle = getValue('central_angle');
        const sectorRadius = getValue('radius');
        const sectorArea = (sectorAngle / 360) * Math.PI * sectorRadius * sectorRadius;
        setResult({
          type: 'area',
          value: sectorArea,
          description: 'Sector Area',
          explanation: `Sector area is proportional to the central angle.`,
          formula: 'Sector Area = (θ/360°) × πr²'
        });
        break;

      case 'chord_angle':
        // For chord, using law of cosines: chord² = 2r²(1 - cos(θ))
        const chordRadius = getValue('radius');
        const chordAngle = getValue('central_angle');
        const angleRad = (chordAngle * Math.PI) / 180;
        const chordLength = 2 * chordRadius * Math.sin(angleRad / 2);
        setResult({
          type: 'length',
          value: chordLength,
          description: 'Chord Length',
          explanation: `Chord length depends on the central angle and radius.`,
          formula: 'Chord = 2r × sin(θ/2)'
        });
        break;

      case 'tangent_angle':
        // Angle between tangent and radius = 90°
        setResult({
          type: 'angle',
          value: 90,
          description: 'Tangent-Radius Angle',
          explanation: `A tangent line is always perpendicular to the radius at the point of tangency.`,
          formula: 'Tangent ⊥ Radius = 90°'
        });
        break;

      case 'cyclic_quadrilateral':
        // Opposite angles in cyclic quadrilateral sum to 180°
        const angle1 = getValue('angle1');
        const angle2 = getValue('angle2');
        const oppositeAngle1 = 180 - angle1;
        const oppositeAngle2 = 180 - angle2;
        setResult({
          type: 'angles',
          value: { angle1: oppositeAngle1, angle2: oppositeAngle2 },
          description: 'Cyclic Quadrilateral Opposite Angles',
          explanation: `In a cyclic quadrilateral, opposite angles sum to 180°.`,
          formula: 'Opposite angles: A + C = 180°, B + D = 180°'
        });
        break;

      case 'power_of_point':
        // Power of point theorem: PA × PB = PC × PD
        const pa = getValue('chord_length');
        const pb = getValue('radius');
        const power = pa * pb;
        setResult({
          type: 'power',
          value: power,
          description: 'Power of Point',
          explanation: `For intersecting chords, the products of their segments are equal.`,
          formula: 'PA × PB = PC × PD'
        });
        break;

      default:
        setResult(null);
    }
  };

  const renderInputs = () => {
    switch (theorem) {
      case 'inscribed_angle':
        return (
          <div className="space-y-2">
            <Label htmlFor="central_angle">Central Angle (degrees)</Label>
            <Input
              id="central_angle"
              type="number"
              min="0"
              max="360"
              value={inputs.central_angle}
              onChange={(e) => updateInput('central_angle', e.target.value)}
            />
          </div>
        );

      case 'arc_length':
      case 'sector_area':
      case 'chord_angle':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="central_angle">Central Angle (degrees)</Label>
              <Input
                id="central_angle"
                type="number"
                min="0"
                max="360"
                value={inputs.central_angle}
                onChange={(e) => updateInput('central_angle', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="radius">Radius</Label>
              <Input
                id="radius"
                type="number"
                min="0"
                step="any"
                value={inputs.radius}
                onChange={(e) => updateInput('radius', e.target.value)}
              />
            </div>
          </div>
        );

      case 'cyclic_quadrilateral':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="angle1">First Angle (degrees)</Label>
              <Input
                id="angle1"
                type="number"
                min="0"
                max="180"
                value={inputs.angle1}
                onChange={(e) => updateInput('angle1', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="angle2">Second Angle (degrees)</Label>
              <Input
                id="angle2"
                type="number"
                min="0"
                max="180"
                value={inputs.angle2}
                onChange={(e) => updateInput('angle2', e.target.value)}
              />
            </div>
          </div>
        );

      case 'power_of_point':
        return (
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="chord_length">Segment PA</Label>
              <Input
                id="chord_length"
                type="number"
                min="0"
                step="any"
                value={inputs.chord_length}
                onChange={(e) => updateInput('chord_length', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="radius">Segment PB</Label>
              <Input
                id="radius"
                type="number"
                min="0"
                step="any"
                value={inputs.radius}
                onChange={(e) => updateInput('radius', e.target.value)}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderResult = () => {
    if (!result) return null;

    return (
      <div className="space-y-4">
        <div className="bg-muted p-4 rounded-lg">
          <Label className="text-sm text-muted-foreground">{result.description}</Label>
          <div className="text-2xl font-bold text-primary">
            {result.type === 'angle' && `${result.value.toFixed(2)}°`}
            {result.type === 'length' && `${result.value.toFixed(3)} units`}
            {result.type === 'area' && `${result.value.toFixed(3)} units²`}
            {result.type === 'power' && `${result.value.toFixed(3)}`}
            {result.type === 'angles' && (
              <div className="grid grid-cols-2 gap-2 text-lg">
                <div>Angle 3: {result.value.angle1.toFixed(1)}°</div>
                <div>Angle 4: {result.value.angle2.toFixed(1)}°</div>
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 p-3 rounded-lg">
          <p className="text-sm text-blue-800 mb-2">
            <strong>Explanation:</strong> {result.explanation}
          </p>
          <p className="text-xs text-blue-600 font-mono">
            <strong>Formula:</strong> {result.formula}
          </p>
        </div>
      </div>
    );
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          Circle Theorem Calculator
          <Badge variant="secondary">Mathematics</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>Circle Theorem</Label>
          <Select value={theorem} onValueChange={setTheorem}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inscribed_angle">Inscribed Angle Theorem</SelectItem>
              <SelectItem value="arc_length">Arc Length</SelectItem>
              <SelectItem value="sector_area">Sector Area</SelectItem>
              <SelectItem value="chord_angle">Chord Length</SelectItem>
              <SelectItem value="tangent_angle">Tangent-Radius Angle</SelectItem>
              <SelectItem value="cyclic_quadrilateral">Cyclic Quadrilateral</SelectItem>
              <SelectItem value="power_of_point">Power of a Point</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {renderInputs()}
        {renderResult()}

        <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
          <p><strong>Key Circle Theorems:</strong></p>
          <p>• Inscribed angle = ½ × central angle (same arc)</p>
          <p>• Tangent ⊥ radius at point of contact</p>
          <p>• Opposite angles in cyclic quadrilateral sum to 180°</p>
          <p>• Power of point: PA × PB = PC × PD (intersecting chords)</p>
        </div>
      </CardContent>
    </Card>
  );
});

CircleTheoremCalculator.displayName = 'CircleTheoremCalculator';