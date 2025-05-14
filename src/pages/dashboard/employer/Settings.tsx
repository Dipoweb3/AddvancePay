
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
import { Switch } from "@/components/ui/switch";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { Save, Wallet, UserCog, Shield } from "lucide-react";
import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";

// Company settings schema
const companyFormSchema = z.object({
  companyName: z.string().min(2, "Company name must be at least 2 characters"),
  contactEmail: z.string().email("Invalid email address"),
  contactPhone: z.string().min(10, "Phone number must be at least 10 digits"),
  address: z.string().min(5, "Address must be at least 5 characters"),
});

// Advance rules schema
const advanceRulesSchema = z.object({
  maxAdvancePercentage: z.coerce.number().min(0, "Must be at least 0").max(100, "Cannot exceed 100%"),
  maxAdvancesPerYear: z.coerce.number().min(0, "Must be at least 0"),
  repaymentPeriodDays: z.coerce.number().min(1, "Must be at least 1 day"),
  interestRate: z.coerce.number().min(0, "Must be at least 0"),
});

// Wallet settings schema
const walletSettingsSchema = z.object({
  bankName: z.string().min(2, "Bank name must be at least 2 characters"),
  accountNumber: z.string().min(10, "Account number must be at least 10 digits"),
  accountName: z.string().min(2, "Account name must be at least 2 characters"),
});

const Settings = () => {
  const [isWeb3Enabled, setIsWeb3Enabled] = useState(false);
  const [allowEmployeeAdvances, setAllowEmployeeAdvances] = useState(true);
  const [advanceApprovalType, setAdvanceApprovalType] = useState("automatic");
  const { toast } = useToast();
  const { user } = useAuth();

  // Fetch user settings on component load
  useEffect(() => {
    const fetchUserSettings = async () => {
      if (!user) return;
      
      try {
        const userDocRef = doc(db, "users", user.id);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          // Update web3 toggle state from database
          if (userData.isWeb3Enabled !== undefined) {
            setIsWeb3Enabled(userData.isWeb3Enabled);
          }
          
          // Update other settings from database if they exist
          if (userData.allowEmployeeAdvances !== undefined) {
            setAllowEmployeeAdvances(userData.allowEmployeeAdvances);
          }
          
          if (userData.advanceApprovalType) {
            setAdvanceApprovalType(userData.advanceApprovalType);
          }
          
          // Update form values if company data exists
          if (userData.company) {
            companyForm.reset(userData.company);
          }
          
          // Update advance rules if they exist
          if (userData.advanceRules) {
            advanceRulesForm.reset(userData.advanceRules);
          }
          
          // Update wallet settings if they exist
          if (userData.wallet) {
            walletForm.reset(userData.wallet);
          }
        }
      } catch (error) {
        console.error("Error fetching user settings:", error);
        toast({
          title: "Error",
          description: "Failed to load your settings. Please try again.",
          variant: "destructive",
        });
      }
    };
    
    fetchUserSettings();
  }, [user]);

  // Handle web3 toggle
  const handleWeb3Toggle = async (checked: boolean) => {
    setIsWeb3Enabled(checked);
    
    if (!user) return;
    
    try {
      const userDocRef = doc(db, "users", user.id);
      
      // Create or update user document with web3 toggle state
      await setDoc(userDocRef, {
        isWeb3Enabled: checked,
        updatedAt: new Date(),
      }, { merge: true });
      
      // If enabling web3 for the first time, create a wallet
      if (checked) {
        // Generate a demo wallet address for this example
        const walletAddress = `0x${Math.random().toString(16).substring(2, 14)}`;
        
        await setDoc(userDocRef, {
          wallet: {
            address: walletAddress,
            createdAt: new Date(),
          }
        }, { merge: true });
        
        toast({
          title: "Web3 Enabled",
          description: `Your wallet has been created with address ${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`,
        });
      } else {
        toast({
          title: "Web3 Disabled",
          description: "Web3 features have been disabled for your account.",
        });
      }
    } catch (error) {
      console.error("Error updating web3 settings:", error);
      setIsWeb3Enabled(!checked); // Revert toggle state on error
      toast({
        title: "Error",
        description: "Failed to update Web3 settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Company settings form
  const companyForm = useForm<z.infer<typeof companyFormSchema>>({
    resolver: zodResolver(companyFormSchema),
    defaultValues: {
      companyName: "Acme Corporation",
      contactEmail: "hr@acmecorp.com",
      contactPhone: "+2348012345678",
      address: "123 Business Ave, Lagos, Nigeria",
    },
  });

  // Advance rules form
  const advanceRulesForm = useForm<z.infer<typeof advanceRulesSchema>>({
    resolver: zodResolver(advanceRulesSchema),
    defaultValues: {
      maxAdvancePercentage: 30,
      maxAdvancesPerYear: 6,
      repaymentPeriodDays: 30,
      interestRate: 10,
    },
  });

  // Wallet settings form
  const walletForm = useForm<z.infer<typeof walletSettingsSchema>>({
    resolver: zodResolver(walletSettingsSchema),
    defaultValues: {
      bankName: "First Bank",
      accountNumber: "0123456789",
      accountName: "Acme Corporation",
    },
  });

  // Submit company settings
  const onSubmitCompany = async (data: z.infer<typeof companyFormSchema>) => {
    if (!user) return;
    
    try {
      const userDocRef = doc(db, "users", user.id);
      await setDoc(userDocRef, {
        company: data,
        updatedAt: new Date(),
      }, { merge: true });
      
      toast({
        title: "Company settings updated",
        description: "Your company information has been saved.",
      });
    } catch (error) {
      console.error("Error saving company settings:", error);
      toast({
        title: "Error",
        description: "Failed to save company settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Submit advance rules
  const onSubmitAdvanceRules = async (data: z.infer<typeof advanceRulesSchema>) => {
    if (!user) return;
    
    try {
      const userDocRef = doc(db, "users", user.id);
      await setDoc(userDocRef, {
        advanceRules: data,
        allowEmployeeAdvances,
        advanceApprovalType,
        updatedAt: new Date(),
      }, { merge: true });
      
      toast({
        title: "Advance rules updated",
        description: "Your advance rules have been saved.",
      });
    } catch (error) {
      console.error("Error saving advance rules:", error);
      toast({
        title: "Error",
        description: "Failed to save advance rules. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Submit wallet settings
  const onSubmitWallet = async (data: z.infer<typeof walletSettingsSchema>) => {
    if (!user) return;
    
    try {
      const userDocRef = doc(db, "users", user.id);
      await setDoc(userDocRef, {
        bankDetails: data,
        updatedAt: new Date(),
      }, { merge: true });
      
      toast({
        title: "Wallet settings updated",
        description: "Your wallet information has been saved.",
      });
    } catch (error) {
      console.error("Error saving wallet settings:", error);
      toast({
        title: "Error",
        description: "Failed to save wallet settings. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your account and advance settings</p>
      </div>
      
      <Tabs defaultValue="company">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="advances">Advance Rules</TabsTrigger>
          <TabsTrigger value="wallet">Wallet</TabsTrigger>
        </TabsList>
        
        <TabsContent value="company">
          <Card>
            <CardHeader>
              <CardTitle>Company Information</CardTitle>
              <CardDescription>
                Update your company details and contact information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...companyForm}>
                <form onSubmit={companyForm.handleSubmit(onSubmitCompany)} className="space-y-4">
                  <FormField
                    control={companyForm.control}
                    name="companyName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={companyForm.control}
                    name="contactEmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={companyForm.control}
                    name="contactPhone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Contact Phone</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={companyForm.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Company Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="pt-4">
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Web3 Features</FormLabel>
                        <FormDescription>
                          Enable Web3 features to access additional financing options and create a wallet
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={isWeb3Enabled}
                          onCheckedChange={handleWeb3Toggle}
                        />
                      </FormControl>
                    </FormItem>
                  </div>
                  
                  <Button type="submit" className="mt-4">Save Company Settings</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="advances">
          <Card>
            <CardHeader>
              <CardTitle>Advance Rules</CardTitle>
              <CardDescription>
                Configure how salary advances work for your employees
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...advanceRulesForm}>
                <form onSubmit={advanceRulesForm.handleSubmit(onSubmitAdvanceRules)} className="space-y-4">
                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Enable Advances</FormLabel>
                      <FormDescription>
                        Allow employees to request salary advances
                      </FormDescription>
                    </div>
                    <Switch
                      checked={allowEmployeeAdvances}
                      onCheckedChange={setAllowEmployeeAdvances}
                    />
                  </div>
                  
                  <div className="my-6">
                    <FormLabel className="text-base">Approval Process</FormLabel>
                    <FormDescription className="mb-3">
                      How advance requests are approved
                    </FormDescription>
                    <ToggleGroup 
                      type="single" 
                      value={advanceApprovalType}
                      onValueChange={(value) => {
                        if (value) setAdvanceApprovalType(value);
                      }}
                      className="justify-start"
                    >
                      <ToggleGroupItem value="automatic" aria-label="Automatic approval">
                        Automatic
                      </ToggleGroupItem>
                      <ToggleGroupItem value="manual" aria-label="Manual approval">
                        Manual
                      </ToggleGroupItem>
                    </ToggleGroup>
                  </div>
                  
                  <FormField
                    control={advanceRulesForm.control}
                    name="maxAdvancePercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Advance (% of salary)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="0" max="100" />
                        </FormControl>
                        <FormDescription>
                          Maximum percentage of monthly salary an employee can request
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={advanceRulesForm.control}
                    name="maxAdvancesPerYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Maximum Advances Per Year</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="0" />
                        </FormControl>
                        <FormDescription>
                          Number of advances an employee can request per year
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={advanceRulesForm.control}
                    name="repaymentPeriodDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Repayment Period (days)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="1" />
                        </FormControl>
                        <FormDescription>
                          Number of days until the advance must be repaid
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={advanceRulesForm.control}
                    name="interestRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Interest Rate (%)</FormLabel>
                        <FormControl>
                          <Input {...field} type="number" min="0" step="0.1" />
                        </FormControl>
                        <FormDescription>
                          Interest rate charged on salary advances
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="mt-4">Save Advance Rules</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="wallet">
          <Card>
            <CardHeader>
              <CardTitle>Wallet Settings</CardTitle>
              <CardDescription>
                Configure your company's payout wallet information
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...walletForm}>
                <form onSubmit={walletForm.handleSubmit(onSubmitWallet)} className="space-y-4">
                  <FormField
                    control={walletForm.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={walletForm.control}
                    name="accountNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Number</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={walletForm.control}
                    name="accountName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button type="submit" className="mt-4">Save Wallet Settings</Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
