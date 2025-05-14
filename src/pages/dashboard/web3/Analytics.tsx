
import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { BarChart, TrendingUp, DollarSign, Users } from 'lucide-react';

const Analytics = () => {
  // In a real app, this would use actual data from the API
  // Mock data for demonstration purposes
  
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Pool performance and statistics</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Total Value Locked</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$8.2M</div>
            <p className="text-sm text-muted-foreground">Across all pools</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Active Advances</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,256</div>
            <p className="text-sm text-muted-foreground">Currently outstanding</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Repayment Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">98.7%</div>
            <p className="text-sm text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="performance">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="allocation">Pool Allocation</TabsTrigger>
          <TabsTrigger value="utilization">Utilization</TabsTrigger>
        </TabsList>
        
        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Pool Performance</CardTitle>
              <CardDescription>
                Historical APY trends for each pool
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                <div className="text-center">
                  <BarChart className="h-8 w-8 mb-2 mx-auto text-gray-400" />
                  <p className="text-gray-500">Performance Chart (Mock)</p>
                  <p className="text-xs text-gray-400 mt-1">In a real app, this would show an interactive chart of APY performance</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm font-medium">USDC</span>
                  </div>
                  <p className="text-2xl font-bold">3.8%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +0.2% past month
                  </p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm font-medium">USDT</span>
                  </div>
                  <p className="text-2xl font-bold">3.5%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +0.1% past month
                  </p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm font-medium">ETH</span>
                  </div>
                  <p className="text-2xl font-bold">5.2%</p>
                  <p className="text-xs text-green-600 flex items-center">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +0.8% past month
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="allocation">
          <Card>
            <CardHeader>
              <CardTitle>Pool Allocation</CardTitle>
              <CardDescription>
                Distribution of funds across pools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                <div className="text-center">
                  <DollarSign className="h-8 w-8 mb-2 mx-auto text-gray-400" />
                  <p className="text-gray-500">Allocation Chart (Mock)</p>
                  <p className="text-xs text-gray-400 mt-1">In a real app, this would show a pie chart of fund allocation</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm font-medium">USDC</span>
                  </div>
                  <p className="text-2xl font-bold">$4.5M</p>
                  <p className="text-xs text-muted-foreground">55% of total</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm font-medium">USDT</span>
                  </div>
                  <p className="text-2xl font-bold">$2.7M</p>
                  <p className="text-xs text-muted-foreground">33% of total</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
                    <span className="text-sm font-medium">ETH</span>
                  </div>
                  <p className="text-2xl font-bold">$1.0M</p>
                  <p className="text-xs text-muted-foreground">12% of total</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="utilization">
          <Card>
            <CardHeader>
              <CardTitle>Pool Utilization</CardTitle>
              <CardDescription>
                How funds are being used
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md">
                <div className="text-center">
                  <Users className="h-8 w-8 mb-2 mx-auto text-gray-400" />
                  <p className="text-gray-500">Utilization Chart (Mock)</p>
                  <p className="text-xs text-gray-400 mt-1">In a real app, this would show utilization metrics</p>
                </div>
              </div>
              
              <div className="space-y-4 mt-6">
                <div>
                  <h3 className="text-sm font-medium mb-2">Key Metrics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Average Loan Size</p>
                      <p className="text-lg font-medium">$320</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Avg. Loan Duration</p>
                      <p className="text-lg font-medium">18 days</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Active Borrowers</p>
                      <p className="text-lg font-medium">4,832</p>
                    </div>
                    <div className="border rounded-lg p-3">
                      <p className="text-xs text-muted-foreground">Utilization Rate</p>
                      <p className="text-lg font-medium">78%</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2">Advance Distribution</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs">$0-$100</span>
                      <div className="w-2/3 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '15%' }}></div>
                      </div>
                      <span className="text-xs">15%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">$100-$250</span>
                      <div className="w-2/3 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '42%' }}></div>
                      </div>
                      <span className="text-xs">42%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">$250-$500</span>
                      <div className="w-2/3 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '28%' }}></div>
                      </div>
                      <span className="text-xs">28%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs">$500+</span>
                      <div className="w-2/3 h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div className="bg-blue-500 h-full rounded-full" style={{ width: '15%' }}></div>
                      </div>
                      <span className="text-xs">15%</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Analytics;
