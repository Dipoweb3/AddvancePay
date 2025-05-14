
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, Bell, ChevronDown, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

interface DashboardLayoutProps {
  children: React.ReactNode;
  navItems: NavItem[];
  userType: string;
  userName: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ 
  children, 
  navItems, 
  userType,
  userName
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { signOut } = useAuth();
  
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navigation */}
      <header className="w-full bg-white border-b border-gray-200 py-3 px-4 fixed top-0 z-50">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Button 
              variant="ghost" 
              size="icon"
              className="mr-2 md:hidden" 
              onClick={toggleSidebar}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Link to="/" className="text-xl font-bold">
              <span className="text-primary">Advance</span>Pay
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 cursor-pointer">
                  <AvatarFallback>{getInitials(userName || 'User')}</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate(`/dashboard/${userType.toLowerCase().replace(' ', '-')}`)}>
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate(`/dashboard/${userType.toLowerCase().replace(' ', '-')}/settings`)}>
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  signOut();
                  navigate('/');
                }}>
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      
      <div className="flex flex-1 pt-16">
        {/* Sidebar - Desktop (always visible) and Mobile (conditionally visible) */}
        <aside 
          className={`
            bg-white border-r border-gray-200 fixed left-0 top-16 bottom-0 w-64 z-40
            transition-transform duration-300 ease-in-out
            md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-gray-200">
              <div className="text-sm text-gray-500">Logged in as</div>
              <div className="font-medium">{userType}</div>
            </div>
            
            <nav className="flex-1 overflow-y-auto p-4">
              <ul className="space-y-2">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <Link
                      to={item.path}
                      className="flex items-center p-2 rounded-md hover:bg-gray-100 transition-colors"
                      onClick={() => isMobile && setIsSidebarOpen(false)}
                    >
                      <item.icon className="h-5 w-5 text-gray-500 mr-3" />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            <div className="p-4 border-t border-gray-200">
              <Link to="/" className="flex items-center text-gray-500 hover:text-primary transition-colors">
                <ChevronLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </aside>
        
        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ease-in-out p-4 md:p-6 md:ml-64`}>
          <div className="mb-6">
            <h1 className="text-2xl font-bold">{userName}</h1>
            <p className="text-gray-500">Welcome to your dashboard</p>
          </div>
          
          {children}
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default DashboardLayout;

// Helper component for backwards navigation
const ChevronLeft = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m15 18-6-6 6-6" />
  </svg>
);
