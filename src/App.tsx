import * as React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
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

// Optimized query client for low-end devices
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes - reduce network requests
      gcTime: 10 * 60 * 1000, // 10 minutes (garbage collection time)
      retry: 1, // Reduce retries to save bandwidth
      refetchOnWindowFocus: false, // Prevent unnecessary refetches
    },
    mutations: {
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
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
  </QueryClientProvider>
);

export default App;
