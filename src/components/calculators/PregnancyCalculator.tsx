import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, Baby, Heart, Clock } from 'lucide-react';
import { format, addDays, differenceInDays, differenceInWeeks } from 'date-fns';

const PregnancyCalculator: React.FC = () => {
  const [lmpDate, setLmpDate] = useState<Date | undefined>(undefined);
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [isCalculated, setIsCalculated] = useState(false);
  const [results, setResults] = useState({
    edd: null as Date | null,
    conceptionDate: null as Date | null,
    gestationalAge: { weeks: 0, days: 0 },
    fetalAge: { weeks: 0, days: 0 },
    trimester: 1,
    daysRemaining: 0
  });

  const calculatePregnancy = () => {
    if (!lmpDate) return;

    const today = new Date();
    
    // EDD (Estimated Due Date) - Naegele's Rule: LMP + 280 days
    const edd = addDays(lmpDate, 280);
    
    // Conception date (adjusted for cycle length)
    const ovulationDay = 14 + (cycleLength - 28); // Adjust for cycle length
    const conceptionDate = addDays(lmpDate, ovulationDay);
    
    // Gestational Age (from LMP)
    const gestationalDays = differenceInDays(today, lmpDate);
    const gestationalWeeks = Math.floor(gestationalDays / 7);
    const gestationalRemainderDays = gestationalDays % 7;
    
    // Fetal Age (conception age)
    const fetalDays = Math.max(0, gestationalDays - 14);
    const fetalWeeks = Math.floor(fetalDays / 7);
    const fetalRemainderDays = fetalDays % 7;
    
    // Determine trimester
    let trimester = 1;
    if (gestationalWeeks >= 14 && gestationalWeeks < 28) {
      trimester = 2;
    } else if (gestationalWeeks >= 28) {
      trimester = 3;
    }
    
    // Days remaining
    const daysRemaining = Math.max(0, differenceInDays(edd, today));
    
    setResults({
      edd,
      conceptionDate,
      gestationalAge: { weeks: gestationalWeeks, days: gestationalRemainderDays },
      fetalAge: { weeks: fetalWeeks, days: fetalRemainderDays },
      trimester,
      daysRemaining
    });
    
    setIsCalculated(true);
  };

  const getTrimesterInfo = (trimester: number) => {
    const info = {
      1: {
        name: 'First Trimester',
        range: '0-13 weeks 6 days',
        description: 'Critical organ development period',
        color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
      },
      2: {
        name: 'Second Trimester',
        range: '14-27 weeks 6 days',
        description: 'Growth and movement development',
        color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
      },
      3: {
        name: 'Third Trimester',
        range: '28-40+ weeks',
        description: 'Final growth and preparation for birth',
        color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'
      }
    };
    return info[trimester as keyof typeof info];
  };

  const getWeeksDisplay = (weeks: number, days: number) => {
    return `${weeks}w ${days}d`;
  };

  const getDaysUntilMilestone = (targetWeeks: number) => {
    if (!lmpDate) return 0;
    const today = new Date();
    const milestoneDate = addDays(lmpDate, targetWeeks * 7);
    return Math.max(0, differenceInDays(milestoneDate, today));
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Baby className="h-6 w-6 text-pink-500" />
          <Heart className="h-6 w-6 text-red-500" />
        </div>
        <CardTitle className="text-2xl">Pregnancy Calculator</CardTitle>
        <CardDescription>
          Calculate pregnancy milestones, due date, and fetal development using Naegele's rule
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Last Menstrual Period (LMP)</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {lmpDate ? format(lmpDate, "PPP") : "Select LMP date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={lmpDate}
                    onSelect={setLmpDate}
                    initialFocus
                    disabled={(date) => date > new Date()}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="cycle-length">Average Cycle Length (days)</Label>
              <Input
                id="cycle-length"
                type="number"
                min="21"
                max="40"
                value={cycleLength}
                onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
                placeholder="Enter cycle length"
              />
              <p className="text-xs text-muted-foreground">
                Typical range: 21-35 days (average 28 days)
              </p>
            </div>
            
            <Button 
              onClick={calculatePregnancy} 
              className="w-full" 
              size="lg"
              disabled={!lmpDate}
            >
              <Clock className="mr-2 h-5 w-5" />
              Calculate Pregnancy Timeline
            </Button>
          </div>

          {isCalculated && results.edd && (
            <div className="space-y-4">
              <Card className="p-4 bg-gradient-card">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Due Date</h3>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {format(results.edd, "MMMM d, yyyy")}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {results.daysRemaining} days remaining
                  </div>
                </div>
              </Card>
              
              <Card className="p-4 bg-gradient-card">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Current Stage</h3>
                  <Badge className={getTrimesterInfo(results.trimester).color}>
                    {getTrimesterInfo(results.trimester).name}
                  </Badge>
                  <div className="text-sm text-muted-foreground mt-2">
                    {getTrimesterInfo(results.trimester).description}
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>

        {isCalculated && results.edd && (
          <div className="space-y-6">
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 text-center">
                <h4 className="font-semibold mb-2">Gestational Age</h4>
                <div className="text-xl font-bold text-primary">
                  {getWeeksDisplay(results.gestationalAge.weeks, results.gestationalAge.days)}
                </div>
                <p className="text-xs text-muted-foreground">From LMP</p>
              </Card>
              
              <Card className="p-4 text-center">
                <h4 className="font-semibold mb-2">Fetal Age</h4>
                <div className="text-xl font-bold text-accent">
                  {getWeeksDisplay(results.fetalAge.weeks, results.fetalAge.days)}
                </div>
                <p className="text-xs text-muted-foreground">From conception</p>
              </Card>
              
              <Card className="p-4 text-center">
                <h4 className="font-semibold mb-2">Conception Date</h4>
                <div className="text-sm font-medium">
                  {results.conceptionDate ? format(results.conceptionDate, "MMM d, yyyy") : 'N/A'}
                </div>
                <p className="text-xs text-muted-foreground">Estimated</p>
              </Card>
              
              <Card className="p-4 text-center">
                <h4 className="font-semibold mb-2">Progress</h4>
                <div className="text-xl font-bold">
                  {((results.gestationalAge.weeks * 7 + results.gestationalAge.days) / 280 * 100).toFixed(1)}%
                </div>
                <p className="text-xs text-muted-foreground">Complete</p>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Pregnancy Milestones</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { week: 12, milestone: 'End of 1st Trimester', description: 'Major organs formed' },
                  { week: 20, milestone: 'Anatomy Scan', description: 'Detailed ultrasound' },
                  { week: 24, milestone: 'Viability', description: 'Baby can survive outside womb' },
                  { week: 28, milestone: '3rd Trimester', description: 'Rapid growth period' },
                  { week: 36, milestone: 'Full Term Soon', description: 'Baby considered mature' },
                  { week: 40, milestone: 'Due Date', description: 'Expected delivery time' }
                ].map((item, index) => {
                  const daysUntil = getDaysUntilMilestone(item.week);
                  const isPassed = daysUntil === 0 && results.gestationalAge.weeks >= item.week;
                  
                  return (
                    <div key={index} className={`p-3 rounded-lg border ${isPassed ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' : 'bg-muted/50'}`}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{item.milestone}</span>
                        <Badge variant={isPassed ? 'default' : 'secondary'} className="text-xs">
                          {item.week}w
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{item.description}</p>
                      <p className="text-xs font-medium">
                        {isPassed ? '✓ Completed' : `${daysUntil} days to go`}
                      </p>
                    </div>
                  );
                })}
              </div>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-4">Calculation Method</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p><strong>Naegele's Rule:</strong> EDD = LMP + 280 days</p>
                <p><strong>Gestational Age:</strong> Time since LMP</p>
                <p><strong>Fetal Age:</strong> Gestational Age - 2 weeks</p>
                <p><strong>Conception Date:</strong> LMP + ovulation day (adjusted for cycle length)</p>
                <p><strong>Trimesters:</strong> T1: 0-13w6d, T2: 14-27w6d, T3: 28w0d+</p>
              </div>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default PregnancyCalculator;