import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Kbd } from '@/components/ui/kbd';

const KeyboardShortcutsPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Keyboard Shortcuts</h1>
            <p className="text-muted-foreground mt-2">
              Speed up your calculations with these handy keyboard shortcuts
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>General Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center py-2">
                    <span>Navigate to Home</span>
                    <div className="flex gap-1">
                      <Kbd>Alt</Kbd>
                      <span>+</span>
                      <Kbd>H</Kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Navigate to Calculators</span>
                    <div className="flex gap-1">
                      <Kbd>Alt</Kbd>
                      <span>+</span>
                      <Kbd>C</Kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Open Profile</span>
                    <div className="flex gap-1">
                      <Kbd>Alt</Kbd>
                      <span>+</span>
                      <Kbd>P</Kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Open Settings</span>
                    <div className="flex gap-1">
                      <Kbd>Alt</Kbd>
                      <span>+</span>
                      <Kbd>S</Kbd>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Age Calculator Shortcuts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center py-2">
                    <span>Focus Date Input</span>
                    <div className="flex gap-1">
                      <Kbd>Ctrl</Kbd>
                      <span>+</span>
                      <Kbd>D</Kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Clear Date</span>
                    <div className="flex gap-1">
                      <Kbd>Ctrl</Kbd>
                      <span>+</span>
                      <Kbd>Delete</Kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Today's Date</span>
                    <div className="flex gap-1">
                      <Kbd>Ctrl</Kbd>
                      <span>+</span>
                      <Kbd>T</Kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Calculate Age</span>
                    <div className="flex gap-1">
                      <Kbd>Enter</Kbd>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mathematical Calculator Shortcuts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center py-2">
                    <span>Clear All Fields</span>
                    <div className="flex gap-1">
                      <Kbd>Ctrl</Kbd>
                      <span>+</span>
                      <Kbd>R</Kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Calculate Result</span>
                    <div className="flex gap-1">
                      <Kbd>Ctrl</Kbd>
                      <span>+</span>
                      <Kbd>Enter</Kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Copy Result</span>
                    <div className="flex gap-1">
                      <Kbd>Ctrl</Kbd>
                      <span>+</span>
                      <Kbd>C</Kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Switch Calculator</span>
                    <div className="flex gap-1">
                      <Kbd>Ctrl</Kbd>
                      <span>+</span>
                      <Kbd>Tab</Kbd>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center py-2">
                    <span>Next Field</span>
                    <div className="flex gap-1">
                      <Kbd>Tab</Kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Previous Field</span>
                    <div className="flex gap-1">
                      <Kbd>Shift</Kbd>
                      <span>+</span>
                      <Kbd>Tab</Kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Select All Text</span>
                    <div className="flex gap-1">
                      <Kbd>Ctrl</Kbd>
                      <span>+</span>
                      <Kbd>A</Kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Submit Form</span>
                    <div className="flex gap-1">
                      <Kbd>Ctrl</Kbd>
                      <span>+</span>
                      <Kbd>Enter</Kbd>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility Shortcuts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Badge variant="secondary" className="mb-2">Screen Reader Support</Badge>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex justify-between items-center py-2">
                        <span>Skip to Main Content</span>
                        <div className="flex gap-1">
                          <Kbd>Alt</Kbd>
                          <span>+</span>
                          <Kbd>M</Kbd>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span>Read Current Result</span>
                        <div className="flex gap-1">
                          <Kbd>Alt</Kbd>
                          <span>+</span>
                          <Kbd>R</Kbd>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Badge variant="secondary" className="mb-2">Theme & Display</Badge>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex justify-between items-center py-2">
                        <span>Toggle Dark Mode</span>
                        <div className="flex gap-1">
                          <Kbd>Ctrl</Kbd>
                          <span>+</span>
                          <Kbd>Shift</Kbd>
                          <span>+</span>
                          <Kbd>D</Kbd>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-2">
                        <span>Increase Font Size</span>
                        <div className="flex gap-1">
                          <Kbd>Ctrl</Kbd>
                          <span>+</span>
                          <Kbd>+</Kbd>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Mobile Gestures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    On mobile devices, you can use these gestures for faster navigation:
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Swipe Right:</strong> Open mobile sidebar menu</li>
                    <li><strong>Swipe Left:</strong> Close mobile sidebar menu</li>
                    <li><strong>Double Tap:</strong> Focus on input field</li>
                    <li><strong>Long Press:</strong> Copy calculation result</li>
                    <li><strong>Pinch to Zoom:</strong> Adjust display size</li>
                    <li><strong>Three-Finger Tap:</strong> Toggle theme</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Browser Shortcuts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex justify-between items-center py-2">
                    <span>Refresh Page</span>
                    <div className="flex gap-1">
                      <Kbd>F5</Kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Hard Refresh</span>
                    <div className="flex gap-1">
                      <Kbd>Ctrl</Kbd>
                      <span>+</span>
                      <Kbd>F5</Kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Open in New Tab</span>
                    <div className="flex gap-1">
                      <Kbd>Ctrl</Kbd>
                      <span>+</span>
                      <Kbd>Click</Kbd>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span>Print Page</span>
                    <div className="flex gap-1">
                      <Kbd>Ctrl</Kbd>
                      <span>+</span>
                      <Kbd>P</Kbd>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcutsPage;