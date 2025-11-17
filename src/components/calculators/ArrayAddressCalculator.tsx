import React, { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ArrayAddressCalculator: React.FC = React.memo(() => {
  const [baseAddress, setBaseAddress] = useState("");
  const [elementSize, setElementSize] = useState("");
  const [arrayIndex, setArrayIndex] = useState("");
  const [result, setResult] = useState<number | null>(null);

  useEffect(() => {
    calculateAddress();
  }, [baseAddress, elementSize, arrayIndex]);

  const calculateAddress = () => {
    const base = parseFloat(baseAddress);
    const size = parseFloat(elementSize);
    const index = parseFloat(arrayIndex);

    if (!isNaN(base) && !isNaN(size) && !isNaN(index)) {
      const address = base + (index * size);
      setResult(address);
    } else {
      setResult(null);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Array Address Calculator</CardTitle>
        <CardDescription>
          Calculate the memory address of an array element
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="baseAddress">Base Address</Label>
            <Input
              id="baseAddress"
              type="number"
              placeholder="e.g., 1000"
              value={baseAddress}
              onChange={(e) => setBaseAddress(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="elementSize">Element Size (bytes)</Label>
            <Input
              id="elementSize"
              type="number"
              placeholder="e.g., 4"
              value={elementSize}
              onChange={(e) => setElementSize(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="arrayIndex">Array Index (i)</Label>
            <Input
              id="arrayIndex"
              type="number"
              placeholder="e.g., 5"
              value={arrayIndex}
              onChange={(e) => setArrayIndex(e.target.value)}
            />
          </div>
        </div>

        {result !== null && (
          <div className="mt-6 p-4 bg-secondary rounded-lg space-y-2">
            <h3 className="text-lg font-semibold text-secondary-foreground">Result</h3>
            <p className="text-2xl font-bold text-primary">
              Address of A[{arrayIndex}] = {result}
            </p>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-sm text-muted-foreground font-medium mb-2">Calculation:</p>
              <p className="text-sm text-muted-foreground">
                {baseAddress} + ({arrayIndex} × {elementSize}) = {result}
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 p-4 bg-muted/50 rounded-lg">
          <h4 className="font-semibold mb-2 text-foreground">Formula</h4>
          <p className="text-sm text-muted-foreground">
            Address of A[i] = Base_Address + (Index × Element_Size)
          </p>
        </div>
      </CardContent>
    </Card>
  );
});

ArrayAddressCalculator.displayName = "ArrayAddressCalculator";
