
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PiggyBank, TrendingUp } from "lucide-react";

const Savings = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Savings</h1>
      <p className="text-muted-foreground">Grow your money with our savings products</p>
      
      <Tabs defaultValue="fixed" className="mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="fixed">Fixed Savings</TabsTrigger>
          <TabsTrigger value="high-yield">High-Yield Savings</TabsTrigger>
        </TabsList>
        <TabsContent value="fixed" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <PiggyBank className="h-5 w-5 text-primary" />
                <CardTitle>Fixed Savings</CardTitle>
              </div>
              <CardDescription>Stable returns with minimal risk</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-muted-foreground">Current Balance</p>
                  <p className="text-2xl font-bold">₦120,000</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-muted-foreground">Interest Rate</p>
                  <p className="text-2xl font-bold">4% <span className="text-sm font-normal">APR</span></p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-muted-foreground">Next Payout</p>
                  <p className="text-2xl font-bold">₦400</p>
                  <p className="text-xs">June 1, 2025</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Deposit</p>
                    <p className="text-sm text-muted-foreground">May 1, 2025</p>
                  </div>
                  <p className="text-green-600 font-medium">+₦50,000</p>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Interest Earned</p>
                    <p className="text-sm text-muted-foreground">April 30, 2025</p>
                  </div>
                  <p className="text-green-600 font-medium">+₦400</p>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Deposit</p>
                    <p className="text-sm text-muted-foreground">April 1, 2025</p>
                  </div>
                  <p className="text-green-600 font-medium">+₦70,000</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button className="flex-1">Deposit</Button>
              <Button variant="outline" className="flex-1">Withdraw</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        <TabsContent value="high-yield" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                <CardTitle>High-Yield Savings</CardTitle>
              </div>
              <CardDescription>Higher returns with managed risk</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-muted-foreground">Current Balance</p>
                  <p className="text-2xl font-bold">₦75,000</p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-muted-foreground">Interest Rate</p>
                  <p className="text-2xl font-bold">8% <span className="text-sm font-normal">APY</span></p>
                </div>
                <div className="bg-muted p-4 rounded-lg">
                  <p className="text-muted-foreground">Token Shares</p>
                  <p className="text-2xl font-bold">150 <span className="text-sm font-normal">APS</span></p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Deposit</p>
                    <p className="text-sm text-muted-foreground">May 5, 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-medium">+₦25,000</p>
                    <p className="text-xs">+50 APS</p>
                  </div>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Yield Earned</p>
                    <p className="text-sm text-muted-foreground">April 30, 2025</p>
                  </div>
                  <p className="text-green-600 font-medium">+₦500</p>
                </div>
                <div className="flex justify-between items-center border-b pb-2">
                  <div>
                    <p className="font-medium">Deposit</p>
                    <p className="text-sm text-muted-foreground">April 10, 2025</p>
                  </div>
                  <div className="text-right">
                    <p className="text-green-600 font-medium">+₦50,000</p>
                    <p className="text-xs">+100 APS</p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row gap-2">
              <Button className="flex-1">Deposit</Button>
              <Button variant="outline" className="flex-1">Withdraw</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Savings;
