import React, { useState, memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const conversions: Record<string, Record<string, number>> = {
  volume: {
    'cup': 1,
    'tablespoon': 16,
    'teaspoon': 48,
    'fluid-ounce': 8,
    'milliliter': 236.588,
    'liter': 0.236588,
    'pint': 0.5,
    'quart': 0.25,
    'gallon': 0.0625
  },
  weight: {
    'gram': 1,
    'kilogram': 0.001,
    'ounce': 0.035274,
    'pound': 0.002205,
    'stone': 0.000157
  },
  temperature: {
    'celsius': 1,
    'fahrenheit': 1,
    'kelvin': 1
  }
};

export const CookingConverter: React.FC = memo(() => {
  const [value, setValue] = useState('');
  const [fromUnit, setFromUnit] = useState('cup');
  const [toUnit, setToUnit] = useState('milliliter');
  const [conversionType, setConversionType] = useState('volume');
  const [result, setResult] = useState<number | null>(null);

  const convert = () => {
    const inputValue = parseFloat(value);
    if (isNaN(inputValue)) {
      setResult(null);
      return;
    }

    if (conversionType === 'temperature') {
      let celsius: number;
      
      // Convert to Celsius first
      if (fromUnit === 'fahrenheit') {
        celsius = (inputValue - 32) * 5/9;
      } else if (fromUnit === 'kelvin') {
        celsius = inputValue - 273.15;
      } else {
        celsius = inputValue;
      }
      
      // Convert from Celsius to target
      if (toUnit === 'fahrenheit') {
        setResult(celsius * 9/5 + 32);
      } else if (toUnit === 'kelvin') {
        setResult(celsius + 273.15);
      } else {
        setResult(celsius);
      }
    } else {
      const fromConversion = conversions[conversionType][fromUnit];
      const toConversion = conversions[conversionType][toUnit];
      
      if (fromConversion && toConversion) {
        // Convert to base unit, then to target unit
        const baseValue = inputValue / fromConversion;
        const convertedValue = baseValue * toConversion;
        setResult(convertedValue);
      }
    }
  };

  React.useEffect(() => {
    if (value) convert();
  }, [value, fromUnit, toUnit, conversionType]);

  const getUnits = () => Object.keys(conversions[conversionType]);

  return (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Cooking Measurement Converter
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Convert between different cooking measurements
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="type">Conversion Type</Label>
            <Select value={conversionType} onValueChange={(value) => {
              setConversionType(value);
              setFromUnit(Object.keys(conversions[value])[0]);
              setToUnit(Object.keys(conversions[value])[1]);
            }}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="volume">Volume</SelectItem>
                <SelectItem value="weight">Weight</SelectItem>
                <SelectItem value="temperature">Temperature</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                placeholder="Enter value"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Select value={fromUnit} onValueChange={setFromUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getUnits().map(unit => (
                    <SelectItem key={unit} value={unit}>
                      {unit.replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Select value={toUnit} onValueChange={setToUnit}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {getUnits().map(unit => (
                    <SelectItem key={unit} value={unit}>
                      {unit.replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {result !== null && value && (
            <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
              <div className="text-sm opacity-90">Result</div>
              <div className="text-2xl font-bold">
                {value} {fromUnit.replace('-', ' ')} = {result.toFixed(4)} {toUnit.replace('-', ' ')}
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
            <strong>Common Conversions:</strong>
            <br />• 1 cup = 240 mL = 16 tablespoons
            <br />• 1 pound = 454 grams = 16 ounces
            <br />• 0°C = 32°F = 273.15K
          </div>
        </CardContent>
      </Card>
    </div>
  );
});