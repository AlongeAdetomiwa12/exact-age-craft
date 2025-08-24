import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ResponsiveDesignPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Responsive Design</h1>
            <p className="text-muted-foreground mt-2">
              Learn how our calculator adapts to different screen sizes and devices
            </p>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Mobile-First Approach</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  Our Age Calculator is designed with a mobile-first approach, ensuring optimal 
                  performance and usability across all device types, from smartphones to desktop computers.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Badge variant="outline" className="mb-2">Mobile (&lt; 768px)</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• Single column layout</li>
                      <li>• Touch-optimized buttons</li>
                      <li>• Collapsible sidebar menu</li>
                      <li>• Simplified navigation</li>
                    </ul>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Tablet (768px - 1024px)</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• Two-column layout</li>
                      <li>• Adaptive button sizes</li>
                      <li>• Expandable sidebar</li>
                      <li>• Enhanced touch targets</li>
                    </ul>
                  </div>
                  <div>
                    <Badge variant="outline" className="mb-2">Desktop (&gt; 1024px)</Badge>
                    <ul className="text-sm space-y-1">
                      <li>• Multi-column layout</li>
                      <li>• Hover interactions</li>
                      <li>• Persistent sidebar</li>
                      <li>• Keyboard shortcuts</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Adaptive Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">Mobile Navigation</Badge>
                  <p>On mobile devices, the main navigation transforms into a collapsible sidebar menu accessible via a hamburger menu button. This keeps the interface clean while providing easy access to all calculator tools.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Tablet Navigation</Badge>
                  <p>Tablets get a hybrid approach with both traditional navigation and an optional sidebar for quick calculator switching.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Desktop Navigation</Badge>
                  <p>Desktop users enjoy a full navigation bar with dropdown menus and an optional persistent sidebar for power users.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Calculator Layout Adaptations</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Age Calculator</h4>
                  <p>The main age calculator adapts its layout based on screen size:</p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li><strong>Mobile:</strong> Stacked vertical layout with the calculator on top and information tabs below</li>
                    <li><strong>Tablet:</strong> Side-by-side layout with adjustable proportions</li>
                    <li><strong>Desktop:</strong> Two-column layout with enhanced information display</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Mathematical Calculators</h4>
                  <p>Form-based calculators automatically adjust field layouts:</p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li><strong>Mobile:</strong> Single column with full-width inputs</li>
                    <li><strong>Tablet:</strong> Two-column grid for efficient space usage</li>
                    <li><strong>Desktop:</strong> Optimized multi-column layouts with logical grouping</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Touch and Input Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">Touch Targets</Badge>
                  <p>All interactive elements meet accessibility guidelines with minimum 44px touch targets on mobile devices.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Input Methods</Badge>
                  <p>Date pickers, number inputs, and form fields are optimized for each device type:</p>
                  <ul className="list-disc list-inside space-y-1 mt-2">
                    <li>Mobile browsers trigger appropriate virtual keyboards</li>
                    <li>Date inputs show native date pickers when available</li>
                    <li>Number inputs prevent non-numeric input on mobile</li>
                  </ul>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Gesture Support</Badge>
                  <p>Mobile devices support intuitive gestures like swipe-to-dismiss and pinch-to-zoom for enhanced usability.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Optimization</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Mobile Performance</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Lazy loading of calculator components</li>
                    <li>Optimized image sizes for different screen densities</li>
                    <li>Efficient CSS and JavaScript bundling</li>
                    <li>Service worker caching for offline functionality</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Progressive Enhancement</h4>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Core functionality works without JavaScript</li>
                    <li>Enhanced features load progressively</li>
                    <li>Graceful degradation for older browsers</li>
                    <li>Adaptive loading based on connection speed</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Accessibility Features</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Badge variant="secondary" className="mb-2">Screen Reader Support</Badge>
                  <p>All interface elements include proper ARIA labels and semantic HTML for screen reader compatibility.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">High Contrast Support</Badge>
                  <p>The interface automatically adapts to system-level high contrast settings and provides manual contrast controls.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Keyboard Navigation</Badge>
                  <p>Complete keyboard navigation support with visible focus indicators and logical tab ordering across all screen sizes.</p>
                </div>
                <div>
                  <Badge variant="secondary" className="mb-2">Text Scaling</Badge>
                  <p>The interface remains functional and attractive at text sizes up to 200% zoom, accommodating users with visual impairments.</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>PWA Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  Our calculator functions as a Progressive Web App (PWA), providing native app-like experiences across all devices:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Installable:</strong> Add to home screen on mobile devices and install on desktop</li>
                  <li><strong>Offline Capable:</strong> Core calculations work without internet connection</li>
                  <li><strong>App-like Navigation:</strong> Smooth transitions and native-feeling interactions</li>
                  <li><strong>Push Notifications:</strong> Optional reminders for birthdays and milestones</li>
                  <li><strong>Background Sync:</strong> Data syncs when connection is restored</li>
                  <li><strong>Adaptive Icons:</strong> Platform-specific iconography that matches device themes</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponsiveDesignPage;