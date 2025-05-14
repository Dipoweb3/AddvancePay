
import { collection, doc, getDoc, setDoc, updateDoc, query, where, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase";

// User types
export type UserType = "employer" | "employee" | "web3";

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  type: UserType;
  walletAddress?: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Web3Profile extends UserProfile {
  walletAddress: string;
}

// Create or update a user when they authenticate
export const createOrUpdateUser = async (
  userId: string, 
  userData: Partial<UserProfile>
) => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists()) {
    // Update existing user
    await updateDoc(userRef, {
      ...userData,
      updatedAt: new Date()
    });
  } else {
    // Create new user
    await setDoc(userRef, {
      ...userData,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }
  
  return userId;
};

// Create a web3 user when they connect their wallet
export const createWeb3User = async (walletAddress: string) => {
  // Check if the user already exists with this wallet
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("walletAddress", "==", walletAddress));
  const querySnapshot = await getDocs(q);
  
  // If user exists, return their ID
  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    
    // Update last login time
    await updateDoc(doc(db, "users", userDoc.id), {
      lastLoginAt: new Date()
    });
    
    return userDoc.id;
  }
  
  // Create new user with wallet
  const newUser = {
    walletAddress,
    type: "web3" as UserType,
    createdAt: new Date(),
    updatedAt: new Date()
  };
  
  const docRef = await addDoc(collection(db, "users"), newUser);
  return docRef.id;
};

// Get user by ID
export const getUserById = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  const userDoc = await getDoc(userRef);
  
  if (userDoc.exists()) {
    return {
      id: userDoc.id,
      ...userDoc.data() as Omit<UserProfile, 'id'>
    };
  }
  
  return null;
};

// Get user by wallet address
export const getUserByWallet = async (walletAddress: string) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("walletAddress", "==", walletAddress));
  const querySnapshot = await getDocs(q);
  
  if (!querySnapshot.empty) {
    const userDoc = querySnapshot.docs[0];
    return {
      id: userDoc.id,
      ...userDoc.data() as Omit<Web3Profile, 'id'>
    };
  }
  
  return null;
};

// Create or verify a user from magic link
export const processEmployeeMagicLink = async (token: string, email: string) => {
  // Get the employee record from the token
  const employeeRef = doc(db, "employees", token);
  const employeeDoc = await getDoc(employeeRef);
  
  if (!employeeDoc.exists()) {
    throw new Error("Invalid invitation token");
  }
  
  const employeeData = employeeDoc.data();
  
  if (employeeData.email !== email) {
    throw new Error("Email mismatch");
  }
  
  // Create a user for this employee if they don't exist
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("email", "==", email));
  const querySnapshot = await getDocs(q);
  
  let userId: string;
  
  if (querySnapshot.empty) {
    // Create new user
    const newUserRef = await addDoc(collection(db, "users"), {
      email,
      name: employeeData.name,
      type: "employee" as UserType,
      employerId: employeeData.employerId,
      employeeId: token,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    userId = newUserRef.id;
  } else {
    userId = querySnapshot.docs[0].id;
    
    // Update existing user
    await updateDoc(doc(db, "users", userId), {
      employerId: employeeData.employerId,
      employeeId: token,
      updatedAt: new Date()
    });
  }
  
  // Update employee status
  await updateDoc(employeeRef, {
    status: "Active",
    userId,
    activatedAt: new Date()
  });
  
  return userId;
};

// Request an employer demo
export const requestEmployerDemo = async (email: string) => {
  const demoRef = await addDoc(collection(db, "demoRequests"), {
    email,
    status: "pending",
    requestedAt: serverTimestamp()
  });
  
  // In a real application, this would trigger a cloud function to send the email
  
  return demoRef.id;
};

// Enable web3 features for a user and create wallet
export const enableWeb3Features = async (userId: string) => {
  const userRef = doc(db, "users", userId);
  
  // Generate a demo wallet address
  const walletAddress = `0x${Math.random().toString(16).substring(2, 14)}`;
  
  await updateDoc(userRef, {
    isWeb3Enabled: true,
    wallet: {
      address: walletAddress,
      createdAt: new Date()
    },
    updatedAt: new Date()
  });
  
  return walletAddress;
};
