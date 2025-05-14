
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, DollarSign, PiggyBank } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployeeHome = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Available for Advance</CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦27,000</div>
            <p className="text-xs text-gray-500 mt-1">60% of earned wages</p>
            <div className="mt-4">
              <Button 
                className="w-full bg-primary hover:bg-primary-dark text-white"
                onClick={() => navigate('/dashboard/employee/request')}
              >
                Request Advance
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Next Salary Date</CardTitle>
            <Clock className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28 May, 2025</div>
            <p className="text-xs text-gray-500 mt-1">15 days from now</p>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/dashboard/employee/repayments')}
              >
                View Repayment Schedule
              </Button>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Savings Balance</CardTitle>
            <PiggyBank className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₦15,200</div>
            <p className="text-xs text-gray-500 mt-1">Earning 4.2% APY</p>
            <div className="mt-4">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => navigate('/dashboard/employee/savings')}
              >
                Manage Savings
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your recent transactions and requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { type: 'Wage Advance', amount: '₦10,000', date: '12 May, 2025', status: 'Approved' },
                  { type: 'Repayment', amount: '₦5,500', date: '30 Apr, 2025', status: 'Completed' },
                  { type: 'Savings Deposit', amount: '₦5,000', date: '25 Apr, 2025', status: 'Completed' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border-b last:border-0">
                    <div>
                      <div className="font-medium">{item.type}</div>
                      <div className="text-sm text-gray-500">{item.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{item.amount}</div>
                      <div className={`text-sm ${
                        item.status === 'Approved' ? 'text-green-500' : 'text-blue-500'
                      }`}>
                        {item.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="ghost" className="mt-4 w-full" onClick={() => navigate('/dashboard/employee/wallet')}>
                View All Transactions <ArrowRight className="ml-2 h-4 w-4" />
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
                  onClick={() => navigate('/dashboard/employee/request')}
                >
                  Request New Advance
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/dashboard/employee/wallet')}
                >
                  Transfer Funds
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/dashboard/employee/savings')}
                >
                  Deposit to Savings
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/dashboard/employee/profile')}
                >
                  Update Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployeeHome;
