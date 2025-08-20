import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';

export const BasicArithmeticCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);
      
      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string): number => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const addZeros = (count: number) => {
    const currentValue = parseFloat(display);
    if (!isNaN(currentValue) && currentValue !== 0) {
      const zerosToAdd = '0'.repeat(count);
      const newValue = display + zerosToAdd;
      setDisplay(newValue);
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      if (key === 'm') {
        e.preventDefault();
        addZeros(6); // Million - 6 zeros
      } else if (key === 'k') {
        e.preventDefault();
        addZeros(3); // Thousand - 3 zeros
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [display]);

  const buttons = [
    ['C', '±', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=']
  ];

  const getButtonVariant = (btn: string) => {
    if (['÷', '×', '-', '+', '='].includes(btn)) return 'blue';
    if (['C', '±', '%'].includes(btn)) return 'secondary';
    return 'outline';
  };

  const handleButtonClick = (btn: string) => {
    if (btn === 'C') clear();
    else if (btn === '=') performCalculation();
    else if (['+', '-', '×', '÷'].includes(btn)) inputOperation(btn);
    else if (btn === '.') inputDecimal();
    else if (btn === '±') setDisplay(String(-parseFloat(display)));
    else if (btn === '%') setDisplay(String(parseFloat(display) / 100));
    else inputNumber(btn);
  };

  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            Basic Arithmetic Calculator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Display */}
          <div className="bg-secondary rounded-lg p-4">
            <Input
              value={display}
              readOnly
              className="text-right text-2xl font-mono bg-transparent border-0 focus:ring-0 text-foreground"
            />
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {buttons.flat().map((btn, index) => (
              <Button
                key={index}
                variant={getButtonVariant(btn)}
                size="lg"
                className={`h-14 text-lg font-semibold ${
                  btn === '0' ? 'col-span-2' : ''
                } ${btn === '=' ? 'col-span-2' : ''}`}
                onClick={() => handleButtonClick(btn)}
              >
                {btn}
              </Button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={clear}
            className="w-full mt-4"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear All
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};