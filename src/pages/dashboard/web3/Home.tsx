
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight, BarChart, DollarSign, PiggyBank } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Web3Home = () => {
  const navigate = useNavigate();
  
  // Mock data
  const stats = {
    totalDeposited: '43.5 ETH',
    currentValue: '$130,500',
    fixedPoolAPY: '3.8%',
    riskyPoolAPY: '8.2%',
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Total Deposited</CardTitle>
            <DollarSign className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDeposited}</div>
            <div className="text-sm text-gray-500 mt-1">≈ {stats.currentValue}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Fixed Pool APY</CardTitle>
            <PiggyBank className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.fixedPoolAPY}</div>
            <div className="text-sm text-gray-500 mt-1">Last 30 days</div>
            <Button 
              variant="ghost" 
              className="w-full mt-4 text-xs"
              onClick={() => navigate('/dashboard/web3/deposit')}
            >
              Deposit to Fixed Pool <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Risky Pool APY</CardTitle>
            <BarChart className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.riskyPoolAPY}</div>
            <div className="text-sm text-gray-500 mt-1">Last 30 days</div>
            <Button 
              variant="ghost" 
              className="w-full mt-4 text-xs"
              onClick={() => navigate('/dashboard/web3/deposit')}
            >
              Deposit to Risky Pool <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">My Earnings</CardTitle>
            <DollarSign className="h-5 w-5 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$3,250</div>
            <div className="text-sm text-gray-500 mt-1">Since first deposit</div>
            <Button 
              variant="ghost" 
              className="w-full mt-4 text-xs"
              onClick={() => navigate('/dashboard/web3/positions')}
            >
              View Positions <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Pool Performance</CardTitle>
              <CardDescription>APY trends for Fixed and Risky pools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                <p className="text-gray-500">Performance Chart (Mock)</p>
              </div>
              
              <Button variant="ghost" className="mt-4 w-full" onClick={() => navigate('/dashboard/web3/analytics')}>
                View Detailed Analytics <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Button 
                  className="w-full justify-start bg-primary/10 text-primary hover:bg-primary/20"
                  onClick={() => navigate('/dashboard/web3/deposit')}
                >
                  Deposit Funds
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/dashboard/web3/positions')}
                >
                  Withdraw Funds
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/dashboard/web3/positions')}
                >
                  Claim Rewards
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/dashboard/web3/settings')}
                >
                  Connect Wallet
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Pool Stats</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total Value Locked</span>
                  <span className="font-medium">$8.2M</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Active Loans</span>
                  <span className="font-medium">1,256</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Avg. Loan Size</span>
                  <span className="font-medium">$320</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Repayment Rate</span>
                  <span className="font-medium">98.7%</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Web3Home;
