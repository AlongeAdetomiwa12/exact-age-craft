import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, Star, Gift } from 'lucide-react';

interface AgeResult {
  years: number;
  months: number;
  weeks: number;
  days: number;
  hours: number;
  minutes: number;
  nextBirthday: {
    daysRemaining: number;
    date: string;
  };
  zodiacSign: string;
  birthdayDay: string;
}

const zodiacSigns = [
  { name: "Capricorn", start: { month: 12, day: 22 }, end: { month: 1, day: 19 } },
  { name: "Aquarius", start: { month: 1, day: 20 }, end: { month: 2, day: 18 } },
  { name: "Pisces", start: { month: 2, day: 19 }, end: { month: 3, day: 20 } },
  { name: "Aries", start: { month: 3, day: 21 }, end: { month: 4, day: 19 } },
  { name: "Taurus", start: { month: 4, day: 20 }, end: { month: 5, day: 20 } },
  { name: "Gemini", start: { month: 5, day: 21 }, end: { month: 6, day: 20 } },
  { name: "Cancer", start: { month: 6, day: 21 }, end: { month: 7, day: 22 } },
  { name: "Leo", start: { month: 7, day: 23 }, end: { month: 8, day: 22 } },
  { name: "Virgo", start: { month: 8, day: 23 }, end: { month: 9, day: 22 } },
  { name: "Libra", start: { month: 9, day: 23 }, end: { month: 10, day: 22 } },
  { name: "Scorpio", start: { month: 10, day: 23 }, end: { month: 11, day: 21 } },
  { name: "Sagittarius", start: { month: 11, day: 22 }, end: { month: 12, day: 21 } }
];

const months = [
  { value: "1", label: "January" },
  { value: "2", label: "February" },
  { value: "3", label: "March" },
  { value: "4", label: "April" },
  { value: "5", label: "May" },
  { value: "6", label: "June" },
  { value: "7", label: "July" },
  { value: "8", label: "August" },
  { value: "9", label: "September" },
  { value: "10", label: "October" },
  { value: "11", label: "November" },
  { value: "12", label: "December" }
];

const days = Array.from({ length: 31 }, (_, i) => ({
  value: (i + 1).toString(),
  label: (i + 1).toString()
}));

const currentYear = new Date().getFullYear();
const years = Array.from({ length: 120 }, (_, i) => ({
  value: (currentYear - i).toString(),
  label: (currentYear - i).toString()
}));

const getZodiacSign = (month: number, day: number): string => {
  for (const sign of zodiacSigns) {
    if (
      (month === sign.start.month && day >= sign.start.day) ||
      (month === sign.end.month && day <= sign.end.day) ||
      (sign.start.month === 12 && sign.end.month === 1 && (month === 12 || month === 1))
    ) {
      return sign.name;
    }
  }
  return "Unknown";
};

const calculateAge = (birthDate: Date, compareDate: Date = new Date()): AgeResult => {
  const birth = new Date(birthDate);
  const compare = new Date(compareDate);
  
  const totalMilliseconds = compare.getTime() - birth.getTime();
  const totalMinutes = Math.floor(totalMilliseconds / (1000 * 60));
  const totalHours = Math.floor(totalMilliseconds / (1000 * 60 * 60));
  const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  
  let years = compare.getFullYear() - birth.getFullYear();
  let months = compare.getMonth() - birth.getMonth();
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  if (compare.getDate() < birth.getDate()) {
    months--;
    if (months < 0) {
      years--;
      months += 12;
    }
  }
  
  // Calculate next birthday
  const nextBirthday = new Date(compare.getFullYear(), birth.getMonth(), birth.getDate());
  if (nextBirthday < compare) {
    nextBirthday.setFullYear(compare.getFullYear() + 1);
  }
  
  const daysToNextBirthday = Math.ceil((nextBirthday.getTime() - compare.getTime()) / (1000 * 60 * 60 * 24));
  
  const zodiacSign = getZodiacSign(birth.getMonth() + 1, birth.getDate());
  const birthdayDay = birth.toLocaleDateString('en-US', { weekday: 'long' });
  
  return {
    years,
    months,
    weeks: totalWeeks,
    days: totalDays,
    hours: totalHours,
    minutes: totalMinutes,
    nextBirthday: {
      daysRemaining: daysToNextBirthday,
      date: nextBirthday.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      })
    },
    zodiacSign,
    birthdayDay
  };
};

export const AgeCalculator: React.FC = () => {
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [selectedYear, setSelectedYear] = useState<string>("");
  const [compareToAnother, setCompareToAnother] = useState(false);
  const [result, setResult] = useState<AgeResult | null>(null);

  const handleCalculate = () => {
    if (!selectedDay || !selectedMonth || !selectedYear) {
      return;
    }

    const birthDate = new Date(
      parseInt(selectedYear),
      parseInt(selectedMonth) - 1,
      parseInt(selectedDay)
    );

    const ageResult = calculateAge(birthDate);
    setResult(ageResult);
  };

  return (
    <Card className="bg-gradient-card border-border shadow-card">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          Modern Age Calculator
        </CardTitle>
        <p className="text-center text-muted-foreground">
          Discover your exact age in multiple units with our sleek calculator
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Date Input Section */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="day">Day</Label>
            <Select value={selectedDay} onValueChange={setSelectedDay}>
              <SelectTrigger>
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                {days.map((day) => (
                  <SelectItem key={day.value} value={day.value}>
                    {day.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="month">Month</Label>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger>
                <SelectValue placeholder="Month" />
              </SelectTrigger>
              <SelectContent>
                {months.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="year">Year</Label>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger>
                <SelectValue placeholder="Year" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Compare Toggle */}
        <div className="flex items-center space-x-2">
          <Switch
            id="compare-toggle"
            checked={compareToAnother}
            onCheckedChange={setCompareToAnother}
          />
          <Label htmlFor="compare-toggle">Compare to another date</Label>
        </div>

        {/* Calculate Button */}
        <Button 
          onClick={handleCalculate} 
          variant="blue"
          className="w-full py-3 text-lg font-semibold"
          disabled={!selectedDay || !selectedMonth || !selectedYear}
        >
          Calculate Age
        </Button>

        {/* Results Section */}
        {result && (
          <div className="space-y-6 mt-8">
            {/* Age Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent">{result.years}</div>
                <div className="text-sm text-muted-foreground">Years</div>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent">{result.months}</div>
                <div className="text-sm text-muted-foreground">Months</div>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent">{result.weeks}</div>
                <div className="text-sm text-muted-foreground">Weeks</div>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent">{result.days}</div>
                <div className="text-sm text-muted-foreground">Days</div>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent">{result.hours}</div>
                <div className="text-sm text-muted-foreground">Hours</div>
              </div>
              <div className="bg-secondary rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-accent">{result.minutes}</div>
                <div className="text-sm text-muted-foreground">Minutes</div>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                <Gift className="mx-auto mb-2 h-6 w-6" />
                <div className="font-semibold">Next Birthday</div>
                <div className="text-sm">{result.nextBirthday.daysRemaining} days</div>
                <div className="text-xs opacity-90">{result.nextBirthday.date}</div>
              </div>
              <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                <Star className="mx-auto mb-2 h-6 w-6" />
                <div className="font-semibold">Zodiac Sign</div>
                <div className="text-sm">{result.zodiacSign}</div>
              </div>
              <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                <Calendar className="mx-auto mb-2 h-6 w-6" />
                <div className="font-semibold">Birthday Day</div>
                <div className="text-sm">{result.birthdayDay}</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};