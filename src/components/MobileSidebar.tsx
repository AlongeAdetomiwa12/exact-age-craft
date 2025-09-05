import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Calculator, Info, Keyboard, Zap, MonitorSpeaker, Grid } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
// Import calculator routes data directly
const calculatorRoutes = [
  { name: 'Age Calculator', path: '/calculator/age', icon: Calculator },
  { name: 'Life Expectancy', path: '/calculator/life-expectancy', icon: Calculator },
  { name: 'Biological Age', path: '/calculator/biological-age', icon: Calculator },
  { name: 'Pregnancy Calculator', path: '/calculator/pregnancy', icon: Calculator },
  { name: 'Dog Age', path: '/calculator/dog-age', icon: Calculator },
  { name: 'Cat Age', path: '/calculator/cat-age', icon: Calculator },
];

interface MobileSidebarProps {
  children?: React.ReactNode;
}

export const MobileSidebar = ({ children }: MobileSidebarProps) => {
  const location = useLocation();

  const aboutSections = [
    { name: 'About Tool', path: '/about/tool', icon: Info },
    { name: 'Basic Operations', path: '/about/operations', icon: Calculator },
    { name: 'Special Functions', path: '/about/functions', icon: Zap },
    { name: 'Keyboard Shortcuts', path: '/about/shortcuts', icon: Keyboard },
    { name: 'Responsive Design', path: '/about/responsive', icon: MonitorSpeaker },
  ];

  return (
    <Sheet>
      <SheetTrigger asChild>
        {children || (
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="left" className="w-72 overflow-y-auto animate-slide-in-right transition-transform duration-300 ease-out">
        <SheetHeader>
          <SheetTitle>Age Calculator</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6">
          {/* Calculator Collection Link */}
          <div>
            <Link to="/calculators">
              <Button
                variant={location.pathname === '/calculators' ? "secondary" : "ghost"}
                className="w-full justify-start hover-scale"
                size="sm"
              >
                <Grid className="mr-2 h-4 w-4" />
                Calculator Collection
              </Button>
            </Link>
          </div>

          <Separator />

          {/* Calculators Section */}
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
              Popular Calculators
            </h3>
            <div className="space-y-1">
              {calculatorRoutes.map((route) => {
                const Icon = route.icon;
                const isActive = location.pathname === route.path;
                
                return (
                  <Link key={route.path} to={route.path}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start hover-scale transition-all duration-200"
                      size="sm"
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {route.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* About Section */}
          <div>
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
              About Us
            </h3>
            <div className="space-y-1">
              {aboutSections.map((section) => {
                const Icon = section.icon;
                const isActive = location.pathname === section.path;
                
                return (
                  <Link key={section.path} to={section.path}>
                    <Button
                      variant={isActive ? "secondary" : "ghost"}
                      className="w-full justify-start hover-scale transition-all duration-200"
                      size="sm"
                    >
                      <Icon className="mr-2 h-4 w-4" />
                      {section.name}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};