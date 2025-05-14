
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Wallet } from "lucide-react";

const SignIn = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const location = useLocation();
  const { toast } = useToast();
  const { connectWallet } = useAuth();
  const [demoEmail, setDemoEmail] = useState("");
  const [isRequestingDemo, setIsRequestingDemo] = useState(false);
  const [showDemoForm, setShowDemoForm] = useState(false);
  
  // Default to web3 dashboard for direct access to staking
  const from = location.state?.from || "/dashboard/web3";
  
  const handleDemoRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!demoEmail) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    setIsRequestingDemo(true);
    
    try {
      // Save demo request to Firestore
      await addDoc(collection(db, "demoRequests"), {
        email: demoEmail,
        status: "pending",
        requestedAt: new Date(),
      });
      
      // In a real app, this would trigger a cloud function to send a magic link
      toast({
        title: "Demo requested",
        description: "We've received your request. Check your email for a magic link to access the demo.",
      });
      
      setDemoEmail("");
      setShowDemoForm(false);
    } catch (error) {
      console.error("Error requesting demo:", error);
      toast({
        title: "Error",
        description: "Failed to request demo. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsRequestingDemo(false);
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
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
      <h1 className="text-2xl font-bold text-dark mb-6">
        <span className="text-primary">Advance</span>Pay
      </h1>
      
      <div className="w-full max-w-md">
        {!showDemoForm ? (
          <Card>
            <CardHeader>
              <CardTitle>Web3 Access Portal</CardTitle>
              <CardDescription>
                Connect your wallet to access the staking platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center py-4">
                <Wallet className="h-16 w-16 mx-auto mb-4 text-primary" />
                <p className="text-sm text-muted-foreground mb-4">
                  Access our decentralized staking platform without registration. 
                  Simply connect your wallet to get started.
                </p>
              </div>
              <Button 
                onClick={handleConnectWallet}
                className="w-full"
                size="lg"
              >
                Connect Wallet
              </Button>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-xs text-center text-muted-foreground">
                By connecting your wallet, you agree to our Terms of Service and Privacy Policy
              </div>
              
              <div className="w-full">
                <Button 
                  variant="outline" 
                  onClick={() => setShowDemoForm(true)}
                  className="w-full"
                >
                  Request Employer Demo
                </Button>
              </div>
            </CardFooter>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Request Employer Demo</CardTitle>
              <CardDescription>
                Enter your email to receive a magic link for demo access
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleDemoRequest}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@company.com"
                      value={demoEmail}
                      onChange={(e) => setDemoEmail(e.target.value)}
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isRequestingDemo}
                  >
                    {isRequestingDemo ? "Sending Request..." : "Request Demo"}
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button 
                variant="link" 
                onClick={() => setShowDemoForm(false)}
                className="text-sm text-gray-600"
              >
                Back to Connect Wallet
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
      
      <button 
        onClick={() => navigate('/')}
        className="mt-8 text-primary hover:text-primary-dark"
      >
        Back to Home
      </button>
    </div>
  );
};

export default SignIn;
