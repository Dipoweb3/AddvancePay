
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import AuthLoading from "./AuthLoading";

interface ProtectedRouteProps {
  children: React.ReactNode;
  userType?: "employee" | "employer" | "web3";
}

const ProtectedRoute = ({ children, userType }: ProtectedRouteProps) => {
  const { isSignedIn, user, isLoaded } = useAuth();
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const location = useLocation();

  useEffect(() => {
    const checkAuthorization = async () => {
      // Special case for web3 paths - allow access as requested
      if (userType === "web3") {
        setIsAuthorized(true);
        return;
      }
      
      // Skip authorization check if no specific userType is required
      if (!userType) {
        setIsAuthorized(isSignedIn);
        return;
      }

      // Check user type from our auth context
      if (isLoaded && isSignedIn && user) {
        try {
          // Simple check if user type matches required type
          if (userType === user.type) {
            setIsAuthorized(true);
            return;
          }
          
          // For demo purposes, authorize all users to all dashboards if needed
          setIsAuthorized(false);
        } catch (error) {
          console.error("Error checking authorization:", error);
          setIsAuthorized(false);
        }
      } else {
        setIsAuthorized(false);
      }
    };
    
    checkAuthorization();
  }, [isLoaded, user, userType, isSignedIn]);

  if (!isLoaded || isAuthorized === null) {
    return <AuthLoading />;
  }

  // Special case for web3 routes - allow direct access
  if (userType === "web3") {
    return <>{children}</>;
  }

  if (!isSignedIn) {
    // Save the attempted URL for redirect after sign-in
    return <Navigate to="/sign-in" state={{ from: location.pathname }} replace />;
  }

  if (isSignedIn && !isAuthorized) {
    // User is signed in but doesn't have the right permissions
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
