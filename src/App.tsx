
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import AuthLoading from "./components/auth/AuthLoading";

// Pages
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import About from "./pages/About";
import Faqs from "./pages/Faqs";
import Contact from "./pages/Contact";

// Dashboard Pages
import EmployeeDashboard from "./pages/dashboard/employee/Dashboard";
import EmployerDashboard from "./pages/dashboard/employer/Dashboard";
import Web3Dashboard from "./pages/dashboard/web3/Dashboard";

// Protected Route Component
import ProtectedRoute from "./components/auth/ProtectedRoute";

const queryClient = new QueryClient();

// Component to conditionally render loading or content
const AuthLoadingWrapper = ({ children }: { children: React.ReactNode }) => {
  const { isLoaded } = useAuth();
  
  if (!isLoaded) {
    return <AuthLoading />;
  }
  
  return <>{children}</>;
};

// Component to conditionally redirect signed in users
const SignedInRedirect = ({ to }: { to: string }) => {
  const { isSignedIn } = useAuth();
  
  if (isSignedIn) {
    return <Navigate to={to} replace />;
  }
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthLoadingWrapper>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Auth Routes */}
            <Route path="/sign-in/*" element={<SignIn />} />
            <Route path="/sign-up/*" element={<SignUp />} />
            
            {/* Protected Dashboard Routes */}
            <Route 
              path="/dashboard/employee/*" 
              element={
                <ProtectedRoute userType="employee">
                  <EmployeeDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/employer/*" 
              element={
                <ProtectedRoute userType="employer">
                  <EmployerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard/web3/*" 
              element={
                <ProtectedRoute userType="web3">
                  <Web3Dashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Redirects */}
            <Route 
              path="/dashboard" 
              element={<Navigate to="/dashboard/web3" replace />} 
            />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthLoadingWrapper>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
