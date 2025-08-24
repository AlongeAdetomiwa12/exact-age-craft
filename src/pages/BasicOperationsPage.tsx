import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const BasicOperationsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Basic Operations</h1>
            <p className="text-muted-foreground mt-2">
              Learn how to use all the basic features of our calculator tools
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Age Calculator Operations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1. Date Input</h4>
                  <p>Enter your birth date using the date picker or manual input. The calculator accepts dates in various formats and automatically validates them.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">2. Real-time Calculation</h4>
                  <p>As soon as you enter a valid date, the calculator immediately computes your exact age in multiple units simultaneously.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">3. Additional Information</h4>
                  <p>The tool automatically generates zodiac signs, next birthday countdown, and other relevant information without requiring additional input.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mathematical Calculator Operations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Badge variant="outline" className="mb-2">Percentage Calculator</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• Calculate percentage of a number</li>
                      <li>• Find what percentage one number is of another</li>
                      <li>• Calculate percentage increase/decrease</li>
                    </ul>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Interest Calculators</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• Simple interest calculations</li>
                      <li>• Compound interest with multiple compounding periods</li>
                      <li>• Investment growth projections</li>
                    </ul>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Discount Calculator</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• Calculate final price after discount</li>
                      <li>• Find discount percentage</li>
                      <li>• Compare multiple discount scenarios</li>
                    </ul>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Tip Calculator</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• Calculate tip amounts</li>
                      <li>• Split bills among multiple people</li>
                      <li>• Include/exclude tax in calculations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health & Life Calculators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Life Expectancy Calculator</h4>
                  <p>Input demographic and lifestyle information to get statistical life expectancy estimates based on actuarial data.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Biological Age Calculator</h4>
                  <p>Enter various health biomarkers to estimate your biological age compared to your chronological age.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Pregnancy Calculator</h4>
                  <p>Input last menstrual period (LMP) date to calculate estimated due date, current gestational age, and pregnancy milestones.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pet Age Calculators</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Dog Age Calculator</h4>
                  <p>Select your dog's breed size (small, medium, large, or giant) and enter their age to get the most accurate human-equivalent age using modern veterinary science.</p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Cat Age Calculator</h4>
                  <p>Simply enter your cat's age to calculate their human-equivalent age using the latest feline aging research.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>General Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>All calculators provide instant results as you type</li>
                  <li>Results are automatically formatted for easy reading</li>
                  <li>Error messages will guide you if invalid data is entered</li>
                  <li>Most calculators remember your last inputs for convenience</li>
                  <li>All calculations are performed locally in your browser for privacy</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicOperationsPage;