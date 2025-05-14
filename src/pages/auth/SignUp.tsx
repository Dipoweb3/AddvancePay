
import { useNavigate, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

const SignUp = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const location = useLocation();
  const { connectWallet } = useAuth();
  const { toast } = useToast();
  
  // Default to web3 dashboard for direct access to staking
  const from = location.state?.from || "/dashboard/web3";
  
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
          <CardFooter className="flex flex-col space-y-2">
            <div className="text-xs text-center text-muted-foreground">
              By connecting your wallet, you agree to our Terms of Service and Privacy Policy
            </div>
            <Button 
              variant="link" 
              onClick={() => navigate('/sign-in')}
              className="text-sm"
            >
              Need an employer demo? Sign in
            </Button>
          </CardFooter>
        </Card>
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

export default SignUp;
