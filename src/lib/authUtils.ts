
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/contexts/AuthContext';

// Helper to determine the right dashboard based on user metadata
export const determineUserDashboard = async (user: any) => {
  if (!user) return '/dashboard/web3';
  
  try {
    // Check if user exists in our database
    const userDoc = await getDoc(doc(db, "users", user.id));
    
    if (userDoc.exists()) {
      const userData = userDoc.data();
      
      // Check user type in our database
      if (userData.type === 'employer') return '/dashboard/employer';
      if (userData.type === 'employee') return '/dashboard/employee';
      if (userData.type === 'web3' || userData.isWeb3Enabled) return '/dashboard/web3';
    } else {
      // Create user in our database if they don't exist
      await setDoc(doc(db, "users", user.id), {
        email: user.email,
        name: user.name,
        // Default to web3 type for new users as requested
        type: 'web3',
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    // Check user type directly
    if (user.type === 'employer') return '/dashboard/employer';
    if (user.type === 'employee') return '/dashboard/employee';
    if (user.type === 'web3') return '/dashboard/web3';
  } catch (error) {
    console.error("Error determining user dashboard:", error);
  }
  
  // Default to web3 dashboard for direct wallet access as requested
  return '/dashboard/web3';
};

// Hook to redirect to the right dashboard after sign-in
export const useRedirectToDashboard = () => {
  const { user, isSignedIn, isLoaded } = useAuth();
  const navigate = useNavigate();
  const [isRedirecting, setIsRedirecting] = useState(false);
  
  useEffect(() => {
    const redirect = async () => {
      if (isLoaded && isSignedIn && user && !isRedirecting) {
        setIsRedirecting(true);
        try {
          const dashboardPath = await determineUserDashboard(user);
          navigate(dashboardPath);
        } catch (error) {
          console.error("Error redirecting to dashboard:", error);
          // Default fallback
          navigate('/dashboard/web3');
        } finally {
          setIsRedirecting(false);
        }
      }
    };
    
    redirect();
  }, [isLoaded, isSignedIn, user, navigate, isRedirecting]);
  
  return null;
};
