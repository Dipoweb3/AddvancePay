
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { DollarSign, Wallet, TrendingUp, Clock } from "lucide-react";

// Mock data for positions
const mockPositions = [
  {
    id: 1,
    pool: "USDC",
    amount: "500",
    dateDeposited: "2025-04-10",
    apy: "3.8%",
    earnings: "3.17",
    status: "Active",
  },
  {
    id: 2,
    pool: "ETH",
    amount: "0.12",
    dateDeposited: "2025-04-18",
    apy: "5.2%",
    earnings: "0.00104",
    status: "Active",
  },
  {
    id: 3,
    pool: "USDT",
    amount: "300",
    dateDeposited: "2025-03-22",
    apy: "3.5%",
    earnings: "2.92",
    status: "Active",
  },
];

// Withdrawal form schema
const withdrawFormSchema = z.object({
  amount: z.string().min(1, "Please enter an amount"),
});

const Positions = () => {
  const [positions, setPositions] = useState(mockPositions);
  const [currentPosition, setCurrentPosition] = useState<typeof mockPositions[0] | null>(null);
  const { toast } = useToast();
  
  // Withdrawal form
  const form = useForm<z.infer<typeof withdrawFormSchema>>({
    resolver: zodResolver(withdrawFormSchema),
    defaultValues: {
      amount: "",
    },
  });

  const onSubmitWithdraw = (data: z.infer<typeof withdrawFormSchema>) => {
    if (!currentPosition) return;
    
    const withdrawAmount = parseFloat(data.amount);
    const positionAmount = parseFloat(currentPosition.amount);
    
    if (withdrawAmount > positionAmount) {
      toast({
        title: "Withdrawal amount too high",
        description: `You can only withdraw up to ${currentPosition.amount} ${currentPosition.pool}`,
        variant: "destructive",
      });
      return;
    }
    
    // Update position
    if (withdrawAmount === positionAmount) {
      // Remove position
      setPositions(positions.filter(pos => pos.id !== currentPosition.id));
    } else {
      // Update position amount
      setPositions(positions.map(pos => {
        if (pos.id === currentPosition.id) {
          return {
            ...pos,
            amount: (positionAmount - withdrawAmount).toString(),
          };
        }
        return pos;
      }));
    }
    
    setCurrentPosition(null);
    form.reset();
    
    toast({
      title: "Withdrawal initiated",
      description: `Your withdrawal of ${data.amount} ${currentPosition.pool} is being processed.`,
    });
  };

  // Claim rewards for a position
  const claimRewards = (position: typeof mockPositions[0]) => {
    setPositions(positions.map(pos => {
      if (pos.id === position.id) {
        return {
          ...pos,
          earnings: "0",
        };
      }
      return pos;
    }));
    
    toast({
      title: "Rewards claimed",
      description: `${position.earnings} ${position.pool} has been added to your wallet.`,
    });
  };

  // Calculate total value
  const getTotalValue = () => {
    // In a real app, this would convert to a common currency
    let total = 0;
    positions.forEach(pos => {
      if (pos.pool === "USDC" || pos.pool === "USDT") {
        total += parseFloat(pos.amount);
      } else if (pos.pool === "ETH") {
        // Mock ETH price of $3000
        total += parseFloat(pos.amount) * 3000;
      }
    });
    return total.toFixed(2);
  };

  // Calculate total earnings
  const getTotalEarnings = () => {
    // In a real app, this would convert to a common currency
    let total = 0;
    positions.forEach(pos => {
      if (pos.pool === "USDC" || pos.pool === "USDT") {
        total += parseFloat(pos.earnings);
      } else if (pos.pool === "ETH") {
        // Mock ETH price of $3000
        total += parseFloat(pos.earnings) * 3000;
      }
    });
    return total.toFixed(2);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Positions</h1>
          <p className="text-muted-foreground">Manage your deposits and earnings</p>
        </div>
        
        <Button 
          className="flex items-center gap-2" 
          onClick={() => window.location.href = '/dashboard/web3/deposit'}
        >
          <Wallet className="h-4 w-4" />
          Deposit Funds
        </Button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${getTotalValue()}</div>
            <p className="text-sm text-muted-foreground">Across all pools</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${getTotalEarnings()}</div>
            <p className="text-sm text-muted-foreground">Unclaimed rewards</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Average APY</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold flex items-center">
              4.2%
              <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground">Weighted average</p>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Active Positions</CardTitle>
          <CardDescription>
            Your current deposits across all pools
          </CardDescription>
        </CardHeader>
        <CardContent>
          {positions.length > 0 ? (
            <div className="space-y-4">
              {positions.map((position) => (
                <div key={position.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border rounded-lg">
                  <div className="mb-3 sm:mb-0">
                    <h3 className="font-medium">{position.pool} Pool</h3>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Deposited: {new Date(position.dateDeposited).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-2 text-sm">
                    <div>
                      <p className="text-muted-foreground">Amount</p>
                      <p className="font-medium">{position.amount} {position.pool}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">APY</p>
                      <p className="font-medium text-green-600">{position.apy}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Earnings</p>
                      <p className="font-medium">{position.earnings} {position.pool}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-3 sm:mt-0">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => {
                            setCurrentPosition(position);
                            form.setValue("amount", position.amount);
                          }}
                        >
                          Withdraw
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Withdraw Funds</DialogTitle>
                          <DialogDescription>
                            Withdraw from your {position.pool} pool position
                          </DialogDescription>
                        </DialogHeader>
                        
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onSubmitWithdraw)} className="space-y-4">
                            <FormField
                              control={form.control}
                              name="amount"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Amount to withdraw</FormLabel>
                                  <FormControl>
                                    <Input
                                      {...field}
                                      type="number"
                                      step="0.000001"
                                      min="0.000001"
                                      max={currentPosition?.amount}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                  <div className="text-xs text-muted-foreground flex justify-between mt-1">
                                    <span>Available: {currentPosition?.amount} {currentPosition?.pool}</span>
                                    <button
                                      type="button"
                                      className="text-primary"
                                      onClick={() => form.setValue("amount", currentPosition?.amount || "")}
                                    >
                                      Max
                                    </button>
                                  </div>
                                </FormItem>
                              )}
                            />
                            
                            <DialogFooter>
                              <Button type="submit">Withdraw</Button>
                            </DialogFooter>
                          </form>
                        </Form>
                      </DialogContent>
                    </Dialog>
                    
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => claimRewards(position)}
                      disabled={parseFloat(position.earnings) === 0}
                    >
                      Claim
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">You don't have any active positions</p>
              <Button onClick={() => window.location.href = '/dashboard/web3/deposit'}>
                Deposit Now
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Positions;
