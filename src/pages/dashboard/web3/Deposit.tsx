
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { PiggyBank, TrendingUp, DollarSign, AlertCircle, Shield, Wallet } from "lucide-react";
import { useLocation } from 'react-router-dom';

// Available pools data with enhanced descriptions
const pools = [
  { 
    id: "usdc", 
    name: "USDC", 
    apy: "3.8%", 
    risk: "Low", 
    minDeposit: "100",
    poolType: "fixed",
    description: "A stable, fixed-return pool backed by salary advances with consistent repayment rates."
  },
  { 
    id: "usdt", 
    name: "USDT", 
    apy: "3.5%", 
    risk: "Low", 
    minDeposit: "100",
    poolType: "fixed",
    description: "Our most conservative option with the lowest risk profile and stable returns."
  },
  { 
    id: "eth", 
    name: "ETH", 
    apy: "8.2%", 
    risk: "Medium", 
    minDeposit: "0.05",
    poolType: "risky",
    description: "Higher return pool that finances higher-yield salary advances with variable rates."
  }
];

// Deposit form schema
const depositFormSchema = z.object({
  pool: z.string().min(1, "Please select a pool"),
  amount: z.string().min(1, "Please enter an amount"),
});

const Deposit = () => {
  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [poolFilter, setPoolFilter] = useState<string | null>(null);
  const { toast } = useToast();
  const location = useLocation();
  
  // Check if user was directed to a specific pool type from parameters or state
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const poolType = params.get('poolType') || 
                    (location.state as any)?.poolType || 
                    null;
    
    if (poolType === 'fixed' || poolType === 'risky') {
      setPoolFilter(poolType);
    }
  }, [location]);

  // Filter pools based on selected type
  const filteredPools = poolFilter 
    ? pools.filter(pool => pool.poolType === poolFilter)
    : pools;
  
  // Deposit form
  const form = useForm<z.infer<typeof depositFormSchema>>({
    resolver: zodResolver(depositFormSchema),
    defaultValues: {
      pool: "",
      amount: "",
    },
  });

  const onSubmit = (data: z.infer<typeof depositFormSchema>) => {
    console.log("Deposit data:", data);
    
    toast({
      title: "Deposit initiated",
      description: `Your deposit of ${data.amount} ${data.pool.toUpperCase()} is being processed.`,
    });
    
    // Reset form
    form.reset();
  };

  // Get selected pool details
  const getPoolDetails = (poolId: string) => {
    return pools.find(pool => pool.id === poolId);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Deposit to Pools</h1>
        <p className="text-muted-foreground">Earn yield by providing liquidity to advance pools</p>
      </div>
      
      <div className="flex items-center justify-center space-x-4">
        <Button 
          variant={poolFilter === 'fixed' ? "default" : "outline"}
          className="flex items-center gap-2"
          onClick={() => setPoolFilter('fixed')}
        >
          <Shield className="h-4 w-4" />
          Fixed Pools
        </Button>
        <Button 
          variant={poolFilter === 'risky' ? "default" : "outline"}
          className="flex items-center gap-2"
          onClick={() => setPoolFilter('risky')}
        >
          <TrendingUp className="h-4 w-4" />
          Risky Pools
        </Button>
        <Button 
          variant={poolFilter === null ? "default" : "outline"}
          className="flex items-center gap-2"
          onClick={() => setPoolFilter(null)}
        >
          All Pools
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Available Pools</CardTitle>
              <CardDescription>
                {poolFilter === 'fixed' 
                  ? 'Low-risk pools with stable returns' 
                  : poolFilter === 'risky'
                    ? 'Higher-risk pools with better yields'
                    : 'Select a pool to deposit your funds'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {filteredPools.map((pool) => (
                  <Card 
                    key={pool.id} 
                    className={`cursor-pointer transition-colors hover:border-primary ${
                      selectedPool === pool.id ? "border-primary" : ""
                    }`}
                    onClick={() => {
                      setSelectedPool(pool.id);
                      form.setValue("pool", pool.id);
                    }}
                  >
                    <CardHeader className="pb-2">
                      <CardTitle className="flex justify-between items-center">
                        <span>{pool.name}</span>
                        {selectedPool === pool.id && (
                          <div className="h-3 w-3 rounded-full bg-primary"></div>
                        )}
                      </CardTitle>
                      <CardDescription>{pool.risk} Risk</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-primary flex items-center">
                        {pool.apy}
                        <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Current APY
                      </p>
                      <p className="text-xs text-muted-foreground mt-2 line-clamp-2">
                        {pool.description}
                      </p>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <p className="text-xs text-muted-foreground">
                        Min deposit: {pool.minDeposit} {pool.name}
                      </p>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Make a Deposit</CardTitle>
              <CardDescription>
                Deposit funds to start earning yield
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="pool"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Select Pool</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a pool" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {filteredPools.map((pool) => (
                              <SelectItem key={pool.id} value={pool.id}>
                                {pool.name} ({pool.apy} APY)
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          Choose the pool you want to deposit into
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="0.00"
                            {...field}
                            type="number"
                            step="0.01"
                            min={selectedPool ? getPoolDetails(selectedPool)?.minDeposit : "0"}
                          />
                        </FormControl>
                        <FormDescription>
                          Enter the amount you want to deposit
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="flex justify-between items-center pt-4">
                    <div>
                      {selectedPool && (
                        <div className="text-sm">
                          <p>Estimated yield: 
                            <span className="font-medium text-green-600 ml-1">
                              {parseFloat(form.watch("amount") || "0") * parseFloat(getPoolDetails(selectedPool)?.apy.replace("%", "") || "0") / 100} {selectedPool.toUpperCase()}/year
                            </span>
                          </p>
                        </div>
                      )}
                    </div>
                    <Button type="submit" disabled={!selectedPool} className="flex items-center gap-2">
                      <Wallet className="h-4 w-4" />
                      Deposit
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Pool Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedPool ? (
                <>
                  <div>
                    <h3 className="text-lg font-medium">{getPoolDetails(selectedPool)?.name} Pool</h3>
                    <p className="text-sm text-muted-foreground">
                      {getPoolDetails(selectedPool)?.risk} risk profile
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Current APY</span>
                      <span className="font-medium">{getPoolDetails(selectedPool)?.apy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Min Deposit</span>
                      <span className="font-medium">{getPoolDetails(selectedPool)?.minDeposit} {getPoolDetails(selectedPool)?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Pool Size</span>
                      <span className="font-medium">
                        {selectedPool === "usdc" ? "1.2M" : selectedPool === "usdt" ? "850K" : "32"} {getPoolDetails(selectedPool)?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Liquidity Providers</span>
                      <span className="font-medium">
                        {selectedPool === "usdc" ? "348" : selectedPool === "usdt" ? "215" : "126"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <h4 className="text-sm font-medium mb-2">Risk Assessment</h4>
                    <div className="text-xs space-y-1">
                      <div className="flex items-start">
                        <AlertCircle className="h-3 w-3 mr-1 mt-0.5 text-amber-500" />
                        <p className="text-muted-foreground">
                          Funds are used to finance salary advances
                        </p>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="h-3 w-3 mr-1 mt-0.5 text-amber-500" />
                        <p className="text-muted-foreground">
                          Returns dependent on repayment rates
                        </p>
                      </div>
                      <div className="flex items-start">
                        <AlertCircle className="h-3 w-3 mr-1 mt-0.5 text-amber-500" />
                        <p className="text-muted-foreground">
                          7-day unstaking period may apply
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <PiggyBank className="h-12 w-12 mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">Select a pool to view details</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>My Wallet</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">USDC Balance</span>
                  <span className="font-medium">1,250 USDC</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">USDT Balance</span>
                  <span className="font-medium">750 USDT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ETH Balance</span>
                  <span className="font-medium">0.25 ETH</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Deposit;
