import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const SpecialFunctionsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Special Functions</h1>
            <p className="text-muted-foreground mt-2">
              Discover advanced features and special functions available in our calculator suite
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Advanced Age Calculations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">Zodiac Integration</Badge>
                  <p>Automatic detection of both Western zodiac signs (based on birth date) and Chinese zodiac signs (based on birth year), complete with characteristics and compatibility information.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Milestone Tracking</Badge>
                  <p>Track important life milestones like "10,000 days old", "half a century", or custom milestone celebrations with countdown timers.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Future Predictions</Badge>
                  <p>Calculate what day of the week your future birthdays will fall on, helping with party planning and special celebrations.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Scientific Calculations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">Actuarial Life Tables</Badge>
                  <p>Life expectancy calculations using official mortality data with formulas like l(x+1) = l(x)(1 - qx) for precise statistical projections.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Gompertz-Makeham Model</Badge>
                  <p>Advanced continuous mortality modeling using hazard functions μ(x) = A + Bc^x for more sophisticated life expectancy estimates.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Biomarker Analysis</Badge>
                  <p>Biological age calculation using standardized biomarker scores with composite indexing: I = α + Σ wi zi.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Mathematics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">Compound Interest</Badge>
                  <p>Advanced compound interest calculations with multiple compounding frequencies (daily, monthly, quarterly, annually) and variable interest rates.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Present Value</Badge>
                  <p>Calculate present and future values of investments with inflation adjustments and risk factors.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Tax Calculations</Badge>
                  <p>Sales tax calculator with support for multiple tax rates, tax-inclusive/exclusive pricing, and regional tax variations.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Health & Medical Functions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">Pregnancy Tracking</Badge>
                  <p>Comprehensive pregnancy calculator using Naegele's rule (EDD = LMP + 280 days) with gestational age, trimester tracking, and fetal development milestones.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Biological Age Gap</Badge>
                  <p>Calculate the difference between biological and chronological age using standardized health metrics and biomarker analysis.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Growth Percentiles</Badge>
                  <p>Age-specific calculations for tracking development milestones and growth patterns across different age groups.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Data Export & Sharing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">Shareable Age Cards</Badge>
                  <p>Generate beautiful, shareable age cards for social media with your exact age breakdown and zodiac information.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Calculation History</Badge>
                  <p>Automatic saving of all calculations to your profile for future reference and trend analysis.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">PDF Reports</Badge>
                  <p>Export comprehensive age and health reports in PDF format for medical appointments or personal records.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Precision & Accuracy Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Leap Year Handling:</strong> Automatic adjustment for leap years in all date calculations</li>
                  <li><strong>Time Zone Support:</strong> Calculations adjusted for different time zones and daylight saving time</li>
                  <li><strong>Millisecond Precision:</strong> Age calculations accurate to the millisecond for scientific applications</li>
                  <li><strong>Calendar System Support:</strong> Compatibility with Gregorian and other calendar systems</li>
                  <li><strong>Rounding Options:</strong> Customizable rounding rules for different precision requirements</li>
                  <li><strong>Error Validation:</strong> Comprehensive input validation with helpful error messages</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialFunctionsPage;