import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AboutToolPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">About Our Age Calculator</h1>
            <p className="text-muted-foreground mt-2">
              Learn about the comprehensive age calculation tools we provide
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>What is the Age Calculator?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our Advanced Age Calculator is a comprehensive tool that provides precise age calculations 
                  down to years, months, weeks, days, hours, and minutes. It's designed to be more than 
                  just a simple age calculator.
                </p>
                <p>
                  The calculator automatically detects your zodiac sign, provides birthday countdown timers, 
                  and can predict what day of the week future birthdays will fall on.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Key Features</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2">
                  <li>Precise age calculation in multiple time units</li>
                  <li>Automatic zodiac sign detection (Western & Chinese)</li>
                  <li>Birthday countdown timer</li>
                  <li>Day-of-week prediction for future birthdays</li>
                  <li>Life expectancy calculations</li>
                  <li>Biological age assessment</li>
                  <li>Pet age calculators (dogs & cats)</li>
                  <li>Pregnancy due date calculator</li>
                  <li>Mathematical calculators (percentage, interest, etc.)</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Who Can Use This Tool?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our age calculator is perfect for anyone who needs precise age calculations:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Parents tracking their children's development milestones</li>
                  <li>Healthcare professionals needing exact age calculations</li>
                  <li>Astrology enthusiasts exploring zodiac connections</li>
                  <li>Pet owners curious about their pets' human equivalent age</li>
                  <li>Pregnant mothers tracking their pregnancy progress</li>
                  <li>Anyone curious about their exact age and life statistics</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accuracy & Reliability</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  All calculations are performed using precise mathematical algorithms that account for:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Leap years and their impact on date calculations</li>
                  <li>Different month lengths</li>
                  <li>Time zones and daylight saving time</li>
                  <li>Actuarial life tables for life expectancy</li>
                  <li>Scientific research for biological age assessment</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutToolPage;