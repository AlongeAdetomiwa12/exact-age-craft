import { Link } from "react-router-dom";
import { Calculator, LayoutDashboard } from "lucide-react";
import { AuthButton } from "./AuthButton";
import { useAuth } from "@/hooks/useAuth";
import { MobileSidebar } from "./MobileSidebar";
import { useIsMobile } from "@/hooks/use-mobile";

export const Header = () => {
  const { userRole, user } = useAuth();
  const isMobile = useIsMobile();

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {isMobile && <MobileSidebar />}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/lovable-uploads/39e9acce-a282-4ee4-8e48-578e2bf98ccb.png" alt="ChronoSphere" className="h-10 w-10" />
            <span className="font-bold text-xl text-accent">ChronoSphere</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/calculators" className="text-sm font-medium hover:text-primary transition-colors">
            Calculators
          </Link>
          {user && (
            <Link to="/dashboard" className="text-sm font-medium hover:text-primary transition-colors flex items-center gap-1">
              <LayoutDashboard className="h-4 w-4" />
              Dashboard
            </Link>
          )}
          {userRole === 'admin' && (
            <Link to="/admin" className="text-sm font-medium hover:text-primary transition-colors">
              Admin
            </Link>
          )}
        </nav>
        
        <AuthButton />
      </div>
    </header>
  );
};