import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import { Calculator, Settings, Zap, Keyboard, Smartphone } from 'lucide-react';

export const InfoTabs: React.FC = () => {
  return (
    <Tabs defaultValue="about" className="w-full">
      <TabsList className="grid w-full grid-cols-5 bg-secondary/50">
        <TabsTrigger value="about" className="flex items-center gap-2">
          <Calculator className="h-4 w-4" />
          <span className="hidden sm:inline">About Tool</span>
        </TabsTrigger>
        <TabsTrigger value="basic" className="flex items-center gap-2">
          <Settings className="h-4 w-4" />
          <span className="hidden sm:inline">Basic Operations</span>
        </TabsTrigger>
        <TabsTrigger value="special" className="flex items-center gap-2">
          <Zap className="h-4 w-4" />
          <span className="hidden sm:inline">Special Functions</span>
        </TabsTrigger>
        <TabsTrigger value="shortcuts" className="flex items-center gap-2">
          <Keyboard className="h-4 w-4" />
          <span className="hidden sm:inline">Keyboard Shortcuts</span>
        </TabsTrigger>
        <TabsTrigger value="responsive" className="flex items-center gap-2">
          <Smartphone className="h-4 w-4" />
          <span className="hidden sm:inline">Responsive Design</span>
        </TabsTrigger>
      </TabsList>
      
      <div className="mt-6">
        <TabsContent value="about" className="space-y-4">
          <Card className="bg-gradient-card border-border">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-accent mb-2">Precision Age Calculation</h3>
                  <p className="text-muted-foreground">
                    Our advanced age calculator provides precise calculations down to the minute, 
                    giving you the most accurate representation of your age across multiple time units. 
                    Whether you need to know your exact age in years, months, weeks, days, hours, or minutes, 
                    our calculator delivers instant and reliable results.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-accent mb-2">Zodiac Sign Reveal</h3>
                  <p className="text-muted-foreground">
                    Discover your astrological sign automatically based on your birth date. 
                    Our calculator instantly determines your zodiac sign according to traditional 
                    astrological calendar dates, helping you explore your celestial personality traits.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-accent mb-2">Birthday Countdown</h3>
                  <p className="text-muted-foreground">
                    Never miss your special day again! Get an automatic countdown to your next birthday, 
                    complete with the exact number of days remaining and the day of the week it will fall on. 
                    Perfect for planning celebrations and anticipating your next milestone.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="basic" className="space-y-4">
          <Card className="bg-gradient-card border-border">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-accent mb-4">Basic Operations</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Select your birth date using the dropdown menus</li>
                  <li>• Click "Calculate Age" to get instant results</li>
                  <li>• View your age in multiple time units simultaneously</li>
                  <li>• See your zodiac sign and birthday information</li>
                  <li>• Toggle date comparison for custom calculations</li>
                  <li>• All calculations are performed in real-time</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="special" className="space-y-4">
          <Card className="bg-gradient-card border-border">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-accent mb-4">Special Functions</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Multi-unit Display:</strong> See your age in 6 different time units</li>
                  <li>• <strong>Zodiac Integration:</strong> Automatic astrological sign detection</li>
                  <li>• <strong>Birthday Prediction:</strong> Know what day your next birthday falls on</li>
                  <li>• <strong>Countdown Timer:</strong> Days remaining until your next celebration</li>
                  <li>• <strong>Leap Year Handling:</strong> Accurate calculations for February 29th birthdays</li>
                  <li>• <strong>Historical Dates:</strong> Calculate ages for any date in the past</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="shortcuts" className="space-y-4">
          <Card className="bg-gradient-card border-border">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-accent mb-4">Keyboard Shortcuts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Calculate Age:</span>
                      <code className="bg-secondary px-2 py-1 rounded text-accent">Enter</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Reset Form:</span>
                      <code className="bg-secondary px-2 py-1 rounded text-accent">Ctrl + R</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Focus Day:</span>
                      <code className="bg-secondary px-2 py-1 rounded text-accent">Tab</code>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Focus Month:</span>
                      <code className="bg-secondary px-2 py-1 rounded text-accent">Shift + Tab</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Focus Year:</span>
                      <code className="bg-secondary px-2 py-1 rounded text-accent">Ctrl + Tab</code>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Toggle Compare:</span>
                      <code className="bg-secondary px-2 py-1 rounded text-accent">Ctrl + T</code>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="responsive" className="space-y-4">
          <Card className="bg-gradient-card border-border">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-accent mb-4">Responsive Design Features</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Mobile-First:</strong> Optimized for smartphones and tablets</li>
                  <li>• <strong>Adaptive Layout:</strong> Seamlessly adjusts to any screen size</li>
                  <li>• <strong>Touch-Friendly:</strong> Large tap targets for mobile users</li>
                  <li>• <strong>Flexible Grid:</strong> Results display adapts to available space</li>
                  <li>• <strong>Readable Typography:</strong> Scales appropriately across devices</li>
                  <li>• <strong>Performance Optimized:</strong> Fast loading on all networks</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </Tabs>
  );
};