import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import { Header } from "@/components/Header";
import { AuthProvider } from "@/hooks/useAuth";
import { Card, CardContent } from "@/components/ui/card";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";

// Lazy load pages for better performance on low-end devices
const Index = React.lazy(() => import("./pages/Index"));
const CalculatorNavigation = React.lazy(() => import("@/components/CalculatorNavigation").then(module => ({ default: module.CalculatorNavigation })));
const CalculatorPage = React.lazy(() => import("./pages/CalculatorPage").then(module => ({ default: module.CalculatorPage })));
const AuthPage = React.lazy(() => import("./pages/AuthPage").then(module => ({ default: module.default })));

const SettingsPage = React.lazy(() => import("./pages/SettingsPage"));
const AdminPage = React.lazy(() => import("./pages/AdminPage"));
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const AboutToolPage = React.lazy(() => import("./pages/AboutToolPage"));
const BasicOperationsPage = React.lazy(() => import("./pages/BasicOperationsPage"));
const SpecialFunctionsPage = React.lazy(() => import("./pages/SpecialFunctionsPage"));
const KeyboardShortcutsPage = React.lazy(() => import("./pages/KeyboardShortcutsPage"));
const ResponsiveDesignPage = React.lazy(() => import("./pages/ResponsiveDesignPage"));

// Loading component optimized for low-end devices
const LoadingSpinner = React.memo(() => (
  <div className="flex items-center justify-center min-h-[50vh]">
    <Card className="w-full max-w-md">
      <CardContent className="p-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          <p className="text-sm text-muted-foreground">Loading...</p>
        </div>
      </CardContent>
    </Card>
  </div>
));

// Offline detector component
const OfflineRedirect = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  React.useEffect(() => {
    const handleOffline = () => {
      // Only redirect if not already on calculators page
      if (!location.pathname.startsWith('/calculator')) {
        navigate('/calculators');
      }
    };
    
    window.addEventListener('offline', handleOffline);
    
    // Check if already offline on mount
    if (!navigator.onLine && !location.pathname.startsWith('/calculator')) {
      navigate('/calculators');
    }
    
    return () => window.removeEventListener('offline', handleOffline);
  }, [navigate, location.pathname]);
  
  return null;
};


const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <OfflineRedirect />
          <div className="min-h-screen bg-background">
            <Header />
            <React.Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/calculators" element={<CalculatorNavigation />} />
                <Route path="/calculator/:type" element={<CalculatorPage />} />
                <Route path="/basic-operations" element={<BasicOperationsPage />} />
                <Route path="/special-functions" element={<SpecialFunctionsPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/admin" element={<AdminPage />} />
                <Route path="/about/tool/:id" element={<AboutToolPage />} />
                <Route path="/about/responsive-design" element={<ResponsiveDesignPage />} />
                <Route path="/about/keyboard-shortcuts" element={<KeyboardShortcutsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </React.Suspense>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </ThemeProvider>
);

export default App;
