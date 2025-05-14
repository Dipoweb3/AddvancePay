
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Shield, Wallet, Info, AlertCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

// KYC form schema
const kycFormSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  dateOfBirth: z.string().min(10, "Please enter a valid date"),
  idNumber: z.string().min(5, "ID number must be at least 5 characters"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
});

// Wallet settings schema
const walletSettingsSchema = z.object({
  ethAddress: z.string().min(10, "Please enter a valid wallet address"),
});

const Settings = () => {
  const [isAutoCompoundEnabled, setIsAutoCompoundEnabled] = useState(true);
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isWeb3Enabled, setIsWeb3Enabled] = useState(false);
  const [kycStatus, setKycStatus] = useState<'not_submitted' | 'pending' | 'approved' | 'rejected'>('not_submitted');
  const { toast } = useToast();
  const { user, connectWallet } = useAuth();
  
  // KYC form
  const kycForm = useForm<z.infer<typeof kycFormSchema>>({
    resolver: zodResolver(kycFormSchema),
    defaultValues: {
      fullName: "",
      dateOfBirth: "",
      idNumber: "",
      address: "",
      city: "",
      country: "",
    },
  });
  
  // Wallet settings form
  const walletForm = useForm<z.infer<typeof walletSettingsSchema>>({
    resolver: zodResolver(walletSettingsSchema),
    defaultValues: {
      ethAddress: user?.walletAddress || "0x1234567890abcdef1234567890abcdef12345678",
    },
  });

  // Load user settings
  useEffect(() => {
    const loadUserSettings = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, "users", user.id));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            
            // Update form values if we have data
            if (userData.walletAddress) {
              walletForm.setValue("ethAddress", userData.walletAddress);
            }
            
            if (userData.isWeb3Enabled !== undefined) {
              setIsWeb3Enabled(userData.isWeb3Enabled);
            }
            
            // Set KYC status if available
            if (userData.kycStatus) {
              setKycStatus(userData.kycStatus);
            }
            
            // Load other settings
            if (userData.settings) {
              if (userData.settings.autoCompound !== undefined) {
                setIsAutoCompoundEnabled(userData.settings.autoCompound);
              }
              if (userData.settings.notifications !== undefined) {
                setIsNotificationsEnabled(userData.settings.notifications);
              }
            }
          }
        } catch (error) {
          console.error("Error loading user settings:", error);
        }
      }
    };
    
    loadUserSettings();
  }, [user, walletForm]);

  // Handle web3 toggle
  const handleWeb3Toggle = async (enabled: boolean) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please sign in to enable Web3 features",
        variant: "destructive",
      });
      return;
    }
    
    setIsWeb3Enabled(enabled);
    
    try {
      if (enabled) {
        // Generate wallet if user doesn't have one
        if (!user.walletAddress) {
          const success = await connectWallet();
          
          if (success) {
            toast({
              title: "Wallet created",
              description: "A new wallet has been created for your account",
            });
          } else {
            // Reset toggle if wallet creation failed
            setIsWeb3Enabled(false);
            toast({
              title: "Error",
              description: "Failed to create wallet",
              variant: "destructive",
            });
            return;
          }
        }
      }
      
      // Update user preferences in database
      await updateDoc(doc(db, "users", user.id), {
        isWeb3Enabled: enabled,
        updatedAt: new Date()
      });
      
      toast({
        title: enabled ? "Web3 features enabled" : "Web3 features disabled",
        description: enabled 
          ? "You can now use Web3 features" 
          : "Web3 features have been disabled",
      });
    } catch (error) {
      console.error("Error toggling Web3 features:", error);
      setIsWeb3Enabled(!enabled); // Reset toggle
      toast({
        title: "Error",
        description: "Failed to update settings",
        variant: "destructive",
      });
    }
  };

  // Submit KYC
  const onSubmitKyc = async (data: z.infer<typeof kycFormSchema>) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please sign in to submit KYC",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Save KYC data to database
      await updateDoc(doc(db, "users", user.id), {
        kyc: {
          ...data,
          submittedAt: new Date(),
        },
        kycStatus: 'pending',
        updatedAt: new Date()
      });
      
      setKycStatus('pending');
      
      toast({
        title: "KYC submitted",
        description: "Your KYC information has been submitted for review.",
      });
    } catch (error) {
      console.error("Error submitting KYC:", error);
      toast({
        title: "Error",
        description: "Failed to submit KYC",
        variant: "destructive",
      });
    }
  };

  // Update wallet settings
  const onSubmitWallet = async (data: z.infer<typeof walletSettingsSchema>) => {
    if (!user) {
      toast({
        title: "Error",
        description: "Please sign in to update wallet settings",
        variant: "destructive",
      });
      return;
    }
    
    try {
      // Update wallet settings in database
      await updateDoc(doc(db, "users", user.id), {
        walletAddress: data.ethAddress,
        settings: {
          autoCompound: isAutoCompoundEnabled,
          notifications: isNotificationsEnabled
        },
        updatedAt: new Date()
      });
      
      toast({
        title: "Wallet settings updated",
        description: "Your wallet address has been updated.",
      });
    } catch (error) {
      console.error("Error updating wallet settings:", error);
      toast({
        title: "Error",
        description: "Failed to update wallet settings",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and wallet settings</p>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Web3 Features</CardTitle>
          <CardDescription>
            Enable or disable Web3 functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">Enable Web3</FormLabel>
              <FormDescription>
                Toggle to enable wallet connectivity and Web3 features
              </FormDescription>
            </div>
            <FormControl>
              <Switch
                checked={isWeb3Enabled}
                onCheckedChange={handleWeb3Toggle}
              />
            </FormControl>
          </div>
          
          {isWeb3Enabled && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start">
              <Info className="h-5 w-5 text-green-600 mr-2 mt-0.5" />
              <p className="text-sm text-green-800">
                Web3 features are enabled. Your wallet address will be saved and used for transactions.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>KYC Verification</CardTitle>
              <CardDescription>
                Complete KYC verification to unlock higher limits
              </CardDescription>
            </CardHeader>
            <CardContent>
              {kycStatus === 'not_submitted' && (
                <Form {...kycForm}>
                  <form onSubmit={kycForm.handleSubmit(onSubmitKyc)} className="space-y-4">
                    <FormField
                      control={kycForm.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={kycForm.control}
                      name="dateOfBirth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={kycForm.control}
                      name="idNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>ID Number</FormLabel>
                          <FormControl>
                            <Input placeholder="National ID / Passport" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={kycForm.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Address</FormLabel>
                          <FormControl>
                            <Input placeholder="123 Main St" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={kycForm.control}
                        name="city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input placeholder="Lagos" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={kycForm.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input placeholder="Nigeria" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex items-start border rounded-lg p-4 bg-amber-50 border-amber-200">
                      <AlertCircle className="h-5 w-5 text-amber-500 mr-2 mt-0.5" />
                      <p className="text-sm text-amber-800">
                        By submitting your KYC information, you agree to allow us to verify your identity. 
                        This process typically takes 1-2 business days.
                      </p>
                    </div>
                    
                    <Button type="submit" className="w-full">Submit KYC Information</Button>
                  </form>
                </Form>
              )}
              
              {kycStatus === 'pending' && (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="rounded-full bg-amber-100 p-4 mb-4">
                    <Info className="h-8 w-8 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-bold">KYC Under Review</h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    Your KYC information is currently being reviewed. This process typically takes 1-2 business days.
                  </p>
                </div>
              )}
              
              {kycStatus === 'approved' && (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="rounded-full bg-green-100 p-4 mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold">KYC Approved</h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    Your KYC verification has been approved. You now have access to higher limits.
                  </p>
                </div>
              )}
              
              {kycStatus === 'rejected' && (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="rounded-full bg-red-100 p-4 mb-4">
                    <AlertCircle className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-bold">KYC Rejected</h3>
                  <p className="text-muted-foreground mt-2 max-w-md">
                    Your KYC verification was rejected. Please review the reason below and resubmit.
                  </p>
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-left w-full max-w-md">
                    <p className="text-sm text-red-800">
                      Reason: ID document unclear or expired. Please upload a clear, valid ID.
                    </p>
                  </div>
                  <Button className="mt-6" onClick={() => setKycStatus('not_submitted')}>
                    Resubmit KYC
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Wallet Settings</CardTitle>
              <CardDescription>
                Configure your wallet and withdrawal settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...walletForm}>
                <form onSubmit={walletForm.handleSubmit(onSubmitWallet)} className="space-y-4">
                  <FormField
                    control={walletForm.control}
                    name="ethAddress"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>ETH Wallet Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormDescription>
                          Your Ethereum wallet address for deposits and withdrawals
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Auto-Compound</FormLabel>
                        <FormDescription>
                          Automatically reinvest rewards
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={isAutoCompoundEnabled}
                          onCheckedChange={setIsAutoCompoundEnabled}
                        />
                      </FormControl>
                    </FormItem>
                    
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Notifications</FormLabel>
                        <FormDescription>
                          Receive earning updates
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={isNotificationsEnabled}
                          onCheckedChange={setIsNotificationsEnabled}
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                  
                  <Button type="submit" className="mt-4">Save Wallet Settings</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Account Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium">KYC Status</h3>
                  <div className={`rounded-full px-3 py-1 text-xs inline-flex items-center mt-1 ${
                    kycStatus === 'approved' 
                      ? 'bg-green-100 text-green-800' 
                      : kycStatus === 'pending' 
                        ? 'bg-amber-100 text-amber-800' 
                        : kycStatus === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                  }`}>
                    {kycStatus === 'approved' 
                      ? 'Approved' 
                      : kycStatus === 'pending' 
                        ? 'Pending Review' 
                        : kycStatus === 'rejected'
                          ? 'Rejected'
                          : 'Not Submitted'}
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium">Current Limits</h3>
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Max Deposit</span>
                      <span className="font-medium">
                        {kycStatus === 'approved' ? '$100,000' : '$5,000'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Max Withdrawal</span>
                      <span className="font-medium">
                        {kycStatus === 'approved' ? '$50,000' : '$2,000'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <h3 className="text-sm font-medium">Your Wallet</h3>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg break-all text-xs">
                    {walletForm.getValues().ethAddress}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Security</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-row justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                  <p className="text-xs text-muted-foreground">Increase your account security</p>
                </div>
                <Button variant="outline" size="sm">Enable</Button>
              </div>
              
              <div className="flex flex-row justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium">Transaction Notifications</h3>
                  <p className="text-xs text-muted-foreground">Get notified for all transactions</p>
                </div>
                <Switch checked={isNotificationsEnabled} onCheckedChange={setIsNotificationsEnabled} />
              </div>
              
              <div className="flex flex-row justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium">Auto-logout</h3>
                  <p className="text-xs text-muted-foreground">Automatically logout after inactivity</p>
                </div>
                <Switch checked={true} onCheckedChange={() => {}} />
              </div>
              
              <div className="pt-2">
                <Button variant="destructive" size="sm" className="w-full">
                  Reset Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;
