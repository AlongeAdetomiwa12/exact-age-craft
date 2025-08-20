import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

interface Course {
  id: number;
  name: string;
  grade: string;
  credits: string;
  gradePoints: number;
}

const gradePoints = {
  'A+': 4.0, 'A': 4.0, 'A-': 3.7,
  'B+': 3.3, 'B': 3.0, 'B-': 2.7,
  'C+': 2.3, 'C': 2.0, 'C-': 1.7,
  'D+': 1.3, 'D': 1.0, 'D-': 0.7,
  'F': 0.0
};

export const GPACalculator: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([
    { id: 1, name: '', grade: '', credits: '', gradePoints: 0 }
  ]);
  const [gpa, setGPA] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [workings, setWorkings] = useState<string[]>([]);

  useEffect(() => {
    calculateGPA();
  }, [courses]);

  const calculateGPA = () => {
    const validCourses = courses.filter(course => 
      course.grade && course.credits && parseFloat(course.credits) > 0
    );

    if (validCourses.length === 0) {
      setGPA(0);
      setTotalCredits(0);
      setWorkings([]);
      return;
    }

    const totalPoints = validCourses.reduce((sum, course) => {
      const credits = parseFloat(course.credits) || 0;
      const points = gradePoints[course.grade as keyof typeof gradePoints] || 0;
      return sum + (points * credits);
    }, 0);

    const totalCreditHours = validCourses.reduce((sum, course) => {
      return sum + (parseFloat(course.credits) || 0);
    }, 0);

    const calculatedGPA = totalCreditHours > 0 ? totalPoints / totalCreditHours : 0;

    setGPA(calculatedGPA);
    setTotalCredits(totalCreditHours);

    // Generate workings
    const workingSteps = [
      'GPA Calculation Formula:',
      'GPA = Σ(Grade Points × Credit Hours) / Σ(Credit Hours)',
      '',
      'Course Details:'
    ];

    validCourses.forEach((course, index) => {
      const credits = parseFloat(course.credits) || 0;
      const points = gradePoints[course.grade as keyof typeof gradePoints] || 0;
      workingSteps.push(
        `Course ${index + 1}: ${course.name || `Course ${index + 1}`}`,
        `  Grade: ${course.grade} (${points} points) × ${credits} credits = ${(points * credits).toFixed(2)} grade points`
      );
    });

    workingSteps.push('');
    workingSteps.push('Calculation:');
    workingSteps.push(`Total Grade Points = ${totalPoints.toFixed(2)}`);
    workingSteps.push(`Total Credit Hours = ${totalCreditHours}`);
    workingSteps.push(`GPA = ${totalPoints.toFixed(2)} ÷ ${totalCreditHours} = ${calculatedGPA.toFixed(3)}`);

    setWorkings(workingSteps);
  };

  const addCourse = () => {
    const newCourse: Course = {
      id: courses.length + 1,
      name: '',
      grade: '',
      credits: '',
      gradePoints: 0
    };
    setCourses([...courses, newCourse]);
  };

  const removeCourse = (id: number) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const updateCourse = (id: number, field: keyof Course, value: string) => {
    setCourses(courses.map(course => 
      course.id === id ? { ...course, [field]: value } : course
    ));
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-card border-border shadow-card">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-accent">
            GPA Calculator
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Calculate your Grade Point Average
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-accent">Courses</h3>
                <Button onClick={addCourse} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </Button>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {courses.map((course, index) => (
                  <div key={course.id} className="grid grid-cols-12 gap-2 items-end p-3 bg-secondary rounded-lg">
                    <div className="col-span-4">
                      <Label className="text-xs">Course Name</Label>
                      <Input
                        placeholder={`Course ${index + 1}`}
                        value={course.name}
                        onChange={(e) => updateCourse(course.id, 'name', e.target.value)}
                        className="h-8"
                      />
                    </div>
                    <div className="col-span-3">
                      <Label className="text-xs">Grade</Label>
                      <Select 
                        value={course.grade} 
                        onValueChange={(value) => updateCourse(course.id, 'grade', value)}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue placeholder="Grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {Object.keys(gradePoints).map(grade => (
                            <SelectItem key={grade} value={grade}>
                              {grade} ({gradePoints[grade as keyof typeof gradePoints]})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="col-span-3">
                      <Label className="text-xs">Credits</Label>
                      <Input
                        type="number"
                        placeholder="Credits"
                        value={course.credits}
                        onChange={(e) => updateCourse(course.id, 'credits', e.target.value)}
                        className="h-8"
                      />
                    </div>
                    <div className="col-span-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeCourse(course.id)}
                        disabled={courses.length === 1}
                        className="h-8 w-full"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {gpa > 0 && (
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div className="bg-gradient-primary rounded-lg p-4 text-center text-white">
                    <div className="text-sm opacity-90">GPA</div>
                    <div className="text-2xl font-bold">{gpa.toFixed(3)}</div>
                  </div>
                  <div className="bg-secondary rounded-lg p-4 text-center">
                    <div className="text-sm text-muted-foreground">Total Credits</div>
                    <div className="text-xl font-bold text-accent">{totalCredits}</div>
                  </div>
                </div>
              )}
            </div>

            {workings.length > 0 && (
              <div className="bg-secondary rounded-lg p-4">
                <h3 className="text-lg font-semibold text-accent mb-3">Step-by-Step Calculation</h3>
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {workings.map((step, index) => (
                    <div key={index} className="text-sm text-muted-foreground font-mono">
                      {step}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};