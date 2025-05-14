import React, { createContext, useContext, useState, useEffect } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { createWeb3User, getUserByWallet } from '@/services/userService';

type UserType = 'employee' | 'employer' | 'web3';

interface User {
  id: string;
  email?: string;
  name?: string;
  type: UserType;
  walletAddress?: string;
}

interface AuthContextType {
  user: User | null;
  isLoaded: boolean;
  isSignedIn: boolean;
  connectWallet: () => Promise<boolean>;
  signOut: () => void;
  createMagicLinkSession: (token: string, email: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const sessionData = localStorage.getItem('userSession');
        
        if (sessionData) {
          const parsedSession = JSON.parse(sessionData);
          
          // Validate the session with the database
          if (parsedSession.id) {
            const userDoc = await getDoc(doc(db, "users", parsedSession.id));
            
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUser({
                id: userDoc.id,
                email: userData.email,
                name: userData.name,
                type: userData.type,
                walletAddress: userData.walletAddress
              });
              setIsSignedIn(true);
            } else {
              // Invalid session, clear it
              localStorage.removeItem('userSession');
            }
          }
        }
        
        // Special case - check for wallet connection
        const walletAddress = localStorage.getItem('walletAddress');
        if (walletAddress && !user) {
          const walletUser = await getUserByWallet(walletAddress);
          
          if (walletUser) {
            setUser({
              id: walletUser.id,
              type: 'web3',
              walletAddress: walletAddress
            });
            setIsSignedIn(true);
            
            // Save session
            localStorage.setItem('userSession', JSON.stringify({
              id: walletUser.id,
              type: 'web3',
              walletAddress: walletAddress
            }));
          }
        }
      } catch (error) {
        console.error("Error checking session:", error);
      } finally {
        setIsLoaded(true);
      }
    };
    
    checkSession();
  }, []);

  const connectWallet = async (): Promise<boolean> => {
    try {
      // Simulate wallet connection - in a real app, this would use Web3.js or ethers.js
      // For now we'll generate a mock wallet address
      const mockWalletAddress = `0x${Math.random().toString(16).substring(2, 14)}`;
      
      // Check if this wallet is already in our database
      const existingUser = await getUserByWallet(mockWalletAddress);
      
      let userId;
      
      if (existingUser) {
        // Existing user with this wallet
        userId = existingUser.id;
      } else {
        // Create a new user for this wallet
        userId = await createWeb3User(mockWalletAddress);
      }
      
      // Get the user data
      const userDoc = await getDoc(doc(db, "users", userId));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Set the user state
        setUser({
          id: userId,
          type: 'web3',
          walletAddress: mockWalletAddress,
          name: userData.name,
          email: userData.email
        });
        
        setIsSignedIn(true);
        
        // Save wallet address and session
        localStorage.setItem('walletAddress', mockWalletAddress);
        localStorage.setItem('userSession', JSON.stringify({
          id: userId,
          type: 'web3',
          walletAddress: mockWalletAddress
        }));
        
        return true;
      }
      
      return false;
    } catch (error) {
      console.error("Error connecting wallet:", error);
      return false;
    }
  };

  const signOut = () => {
    setUser(null);
    setIsSignedIn(false);
    localStorage.removeItem('userSession');
    localStorage.removeItem('walletAddress');
  };

  const createMagicLinkSession = async (token: string, email: string): Promise<boolean> => {
    try {
      // In a real app, this would validate the token against a database
      // For now, we'll just create a simple user session
      
      // Check if this is an employee or employer magic link
      // For simplicity, we'll assume token format determines the type
      const isEmployer = token.startsWith('emp-');
      
      const newUser = {
        email,
        type: isEmployer ? 'employer' as UserType : 'employee' as UserType,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      // Create/update user in database
      await setDoc(doc(db, "users", token), newUser);
      
      // Set the user state
      setUser({
        id: token,
        email,
        type: isEmployer ? 'employer' : 'employee'
      });
      
      setIsSignedIn(true);
      
      // Save session
      localStorage.setItem('userSession', JSON.stringify({
        id: token,
        email,
        type: isEmployer ? 'employer' : 'employee'
      }));
      
      return true;
    } catch (error) {
      console.error("Error creating magic link session:", error);
      return false;
    }
  };

  const value = {
    user,
    isLoaded,
    isSignedIn,
    connectWallet,
    signOut,
    createMagicLinkSession
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
