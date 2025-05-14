import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { WalletService } from "@/services/walletService";
import { 
  ArrowUpRight, 
  CreditCard, 
  Wallet as WalletIcon, 
  Banknote,
  ChevronRight
} from "lucide-react";

const Wallet = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  
  // Mock data - in a real app this would come from a database
  const walletBalance = 45000;
  const transactions = [
    { id: 1, title: 'Salary Advance', date: 'May 10, 2025', amount: 25000, type: 'credit' },
    { id: 2, title: 'Withdrawal', date: 'May 8, 2025', amount: 10000, type: 'debit' },
    { id: 3, title: 'Transfer to James', date: 'May 5, 2025', amount: 5000, type: 'debit' },
  ];

  const handleDeposit = () => {
    // Navigate directly to the web3 deposit page
    navigate('/dashboard/web3/deposit');
  };

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to withdraw",
        variant: "destructive"
      });
      return;
    }

    if (amount > walletBalance) {
      toast({
        title: "Insufficient funds",
        description: "Your withdrawal amount exceeds your available balance",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would call a backend API
    // WalletService.withdraw(amount);
    
    toast({
      title: "Withdrawal successful",
      description: `₦${amount.toLocaleString()} has been processed for withdrawal`
    });
    
    setWithdrawAmount('');
    setIsWithdrawOpen(false);
  };

  const handleTransfer = () => {
    const amount = parseFloat(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid amount to transfer",
        variant: "destructive"
      });
      return;
    }

    if (amount > walletBalance) {
      toast({
        title: "Insufficient funds",
        description: "Your transfer amount exceeds your available balance",
        variant: "destructive"
      });
      return;
    }

    if (!transferTo.trim()) {
      toast({
        title: "Invalid recipient",
        description: "Please enter a valid recipient",
        variant: "destructive"
      });
      return;
    }

    // In a real app, this would call a backend API
    // WalletService.transfer(amount, transferTo);
    
    toast({
      title: "Transfer successful",
      description: `₦${amount.toLocaleString()} has been transferred to ${transferTo}`
    });
    
    setTransferAmount('');
    setTransferTo('');
    setIsTransferOpen(false);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Your Wallet</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Available Balance</CardTitle>
            <CardDescription>Your current wallet balance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">₦{walletBalance.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground mt-2">Last updated: Today at 12:30 PM</p>
            
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Dialog open={isWithdrawOpen} onOpenChange={setIsWithdrawOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">Withdraw</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Withdraw Funds</DialogTitle>
                    <DialogDescription>
                      Enter the amount you wish to withdraw from your wallet.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="withdraw-amount">Amount (₦)</Label>
                      <Input
                        id="withdraw-amount"
                        placeholder="Enter amount"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                        type="number"
                        min="1"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsWithdrawOpen(false)}>Cancel</Button>
                    <Button onClick={handleWithdraw}>Withdraw</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
              
              <Dialog open={isTransferOpen} onOpenChange={setIsTransferOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">Transfer</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Transfer Funds</DialogTitle>
                    <DialogDescription>
                      Send money to another user's wallet.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="transfer-to">Recipient</Label>
                      <Input
                        id="transfer-to"
                        placeholder="Enter recipient's name or ID"
                        value={transferTo}
                        onChange={(e) => setTransferTo(e.target.value)}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="transfer-amount">Amount (₦)</Label>
                      <Input
                        id="transfer-amount"
                        placeholder="Enter amount"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        type="number"
                        min="1"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsTransferOpen(false)}>Cancel</Button>
                    <Button onClick={handleTransfer}>Transfer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <CardDescription>Recent wallet activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">{transaction.title}</p>
                    <p className="text-sm text-muted-foreground">{transaction.date}</p>
                  </div>
                  <p className={transaction.type === 'credit' ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
                    {transaction.type === 'credit' ? '+' : '-'}₦{transaction.amount.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            
            <Button variant="link" className="mt-4 px-0">View all transactions</Button>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staking Opportunities</CardTitle>
          <CardDescription>Earn interest on your wallet balance</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Card className="border-2 hover:border-primary cursor-pointer transition-all" onClick={() => navigate('/dashboard/web3/deposit')}>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center text-lg">
                  Fixed Pool
                  <ArrowUpRight className="h-4 w-4" />
                </CardTitle>
                <CardDescription>Low risk, steady returns</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="text-xl font-bold text-primary">3.8% APY</div>
                <Button 
                  variant="secondary" 
                  className="w-full mt-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/dashboard/web3/deposit');
                  }}
                >
                  Stake Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-primary cursor-pointer transition-all" onClick={() => navigate('/dashboard/web3/deposit')}>
              <CardHeader className="pb-2">
                <CardTitle className="flex justify-between items-center text-lg">
                  Risky Pool
                  <ArrowUpRight className="h-4 w-4" />
                </CardTitle>
                <CardDescription>Higher risk, higher returns</CardDescription>
              </CardHeader>
              <CardContent className="pb-4">
                <div className="text-xl font-bold text-primary">8.2% APY</div>
                <Button 
                  variant="secondary" 
                  className="w-full mt-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate('/dashboard/web3/deposit');
                  }}
                >
                  Stake Now
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleDeposit} 
            className="w-full"
          >
            Go to Web3 Staking Portal
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Wallet;
