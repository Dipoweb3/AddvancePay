
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, User, Wallet } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isSignedIn, connectWallet, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Determine which dashboard to navigate to based on user type
  const getDashboardPath = () => {
    if (!user) return "/dashboard/web3";
    
    const userType = user.type;
    
    if (userType === "employer") {
      return "/dashboard/employer";
    } else if (userType === "web3") {
      return "/dashboard/web3";
    } else {
      return "/dashboard/employee";
    }
  };

  const handleConnectWallet = async () => {
    const success = await connectWallet();
    
    if (success) {
      toast({
        title: "Wallet connected",
        description: "You've successfully connected your wallet",
      });
      navigate('/dashboard/web3');
    } else {
      toast({
        title: "Connection failed",
        description: "Failed to connect your wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const getInitials = (name?: string) => {
    if (!name) return "U";
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <nav className="w-full py-4 bg-white/95 backdrop-blur-sm fixed top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-dark">
            <span className="text-primary">Advance</span>Pay
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/about" className="text-dark hover:text-primary transition-colors">About</Link>
          <Link to="/faqs" className="text-dark hover:text-primary transition-colors">FAQs</Link>
          <Link to="/contact" className="text-dark hover:text-primary transition-colors">Contact</Link>
          
          {isSignedIn ? (
            <div className="flex items-center space-x-4">
              <Button 
                className="bg-primary hover:bg-primary-dark text-white"
                onClick={() => navigate(getDashboardPath())}
              >
                Dashboard
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="h-8 w-8 cursor-pointer">
                    <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate(getDashboardPath())}>
                    Dashboard
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate(`${getDashboardPath()}/settings`)}>
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={signOut}>
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Button 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary/10 flex items-center gap-2"
                onClick={handleConnectWallet}
              >
                <Wallet className="h-4 w-4" />
                Connect Wallet
              </Button>
              <Button 
                variant="ghost"
                onClick={() => navigate('/sign-in')}
              >
                Sign In
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          {isSignedIn ? (
            <Button 
              variant="ghost"
              className="mr-2" 
              onClick={() => navigate(getDashboardPath())}
            >
              <User className="h-5 w-5" />
            </Button>
          ) : (
            <Button 
              variant="ghost"
              className="mr-2" 
              onClick={handleConnectWallet}
            >
              <Wallet className="h-5 w-5" />
            </Button>
          )}
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu />
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg animate-fade-in">
          <div className="container mx-auto py-4 flex flex-col space-y-4 px-4">
            <Link 
              to="/about" 
              className="text-dark hover:text-primary transition-colors px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              to="/faqs" 
              className="text-dark hover:text-primary transition-colors px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQs
            </Link>
            <Link 
              to="/contact" 
              className="text-dark hover:text-primary transition-colors px-4 py-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
            
            {isSignedIn ? (
              <div className="border-t pt-4">
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-2"
                  onClick={() => {
                    navigate(getDashboardPath());
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Dashboard
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start px-4 py-2"
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign out
                </Button>
              </div>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary/10 mx-4 flex items-center gap-2"
                  onClick={() => {
                    handleConnectWallet();
                    setIsMobileMenuOpen(false);
                  }}
                >
                  <Wallet className="h-4 w-4" />
                  Connect Wallet
                </Button>
                <Button 
                  variant="ghost"
                  className="mx-4"
                  onClick={() => {
                    navigate('/sign-in');
                    setIsMobileMenuOpen(false);
                  }}
                >
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
