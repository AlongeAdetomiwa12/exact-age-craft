import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSwipeable } from 'react-swipeable';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Menu, Calculator, Info, Keyboard, Zap, MonitorSpeaker, Grid, ChevronRight, LayoutDashboard } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/useAuth';
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
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Hide swipe hint after first interaction or after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowSwipeHint(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  // Swipe handlers for opening the sidebar
  const swipeHandlers = useSwipeable({
    onSwipedRight: () => setIsOpen(true),
    trackMouse: false,
    trackTouch: true,
    delta: 50, // minimum swipe distance
  });

  const aboutSections = [
    { name: 'About Tool', path: '/about/tool', icon: Info },
    { name: 'Basic Operations', path: '/about/operations', icon: Calculator },
    { name: 'Special Functions', path: '/about/functions', icon: Zap },
    { name: 'Keyboard Shortcuts', path: '/about/shortcuts', icon: Keyboard },
    { name: 'Responsive Design', path: '/about/responsive', icon: MonitorSpeaker },
  ];

  return (
    <>
      {/* Swipe detection area */}
      <div
        {...swipeHandlers}
        className="fixed left-0 top-0 bottom-0 w-8 z-40 md:hidden pointer-events-auto"
        aria-label="Swipe right to open menu"
      />

      {/* Swipe hint indicator */}
      <AnimatePresence>
        {showSwipeHint && !isOpen && (
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.5, repeat: 3, repeatDelay: 2 }}
            className="fixed left-0 top-1/2 -translate-y-1/2 z-50 md:hidden pointer-events-none"
            onClick={() => setShowSwipeHint(false)}
          >
            <motion.div
              animate={{ x: [0, 20, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="bg-primary/90 text-primary-foreground px-3 py-2 rounded-r-lg shadow-lg flex items-center gap-2"
            >
              <ChevronRight className="h-4 w-4" />
              <span className="text-xs font-medium">Swipe</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          {children || (
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden active:scale-95 transition-transform"
              onClick={() => setShowSwipeHint(false)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          )}
        </SheetTrigger>
        <SheetContent 
          side="left" 
          className="w-72 overflow-y-auto animate-slide-in-right"
          onInteractOutside={() => setShowSwipeHint(false)}
        >
        <SheetHeader>
          <SheetTitle>Age Calculator</SheetTitle>
        </SheetHeader>
        
        <div className="mt-6 space-y-6 animate-fade-in">
          {/* Calculator Collection Link */}
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link to="/calculators" onClick={() => setIsOpen(false)}>
              <Button
                variant={location.pathname === '/calculators' ? "secondary" : "ghost"}
                className="w-full justify-start hover-scale group active:scale-95"
                size="sm"
              >
                <Grid className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                Calculator Collection
              </Button>
            </Link>
          </motion.div>

          {user && (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/dashboard" onClick={() => setIsOpen(false)}>
                <Button
                  variant={location.pathname === '/dashboard' ? "secondary" : "ghost"}
                  className="w-full justify-start hover-scale group active:scale-95"
                  size="sm"
                >
                  <LayoutDashboard className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                  Dashboard
                </Button>
              </Link>
            </motion.div>
          )}

          <Separator />

          {/* Calculators Section */}
          <div className="animate-fade-in">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
              Popular Calculators
            </h3>
            <div className="space-y-1">
              {calculatorRoutes.map((route, index) => {
                const Icon = route.icon;
                const isActive = location.pathname === route.path;
                
                return (
                  <motion.div 
                    key={route.path} 
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to={route.path} onClick={() => setIsOpen(false)}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className="w-full justify-start hover-scale transition-all duration-200 group active:scale-95"
                        size="sm"
                      >
                        <Icon className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                        {route.name}
                      </Button>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* About Section */}
          <div className="animate-fade-in">
            <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider mb-3">
              About Us
            </h3>
            <div className="space-y-1">
              {aboutSections.map((section, index) => {
                const Icon = section.icon;
                const isActive = location.pathname === section.path;
                
                return (
                  <motion.div 
                    key={section.path}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: (index + calculatorRoutes.length) * 0.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to={section.path} onClick={() => setIsOpen(false)}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className="w-full justify-start hover-scale transition-all duration-200 group active:scale-95"
                        size="sm"
                      >
                        <Icon className="mr-2 h-4 w-4 group-hover:rotate-12 transition-transform duration-200" />
                        {section.name}
                      </Button>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
    </>
  );
};