
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { ArrowRight, Clock, DollarSign, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const EmployerHome = () => {
  const navigate = useNavigate();
  
  // Mock data
  const stats = {
    totalEmployees: 48,
    activeAdvances: 12,
    totalAdvanced: '₦580,000',
    repaidAmount: '₦320,000',
  };
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Total Employees</CardTitle>
            <Users className="h-5 w-5 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees}</div>
            <Button 
              variant="ghost" 
              className="w-full mt-4 text-xs"
              onClick={() => navigate('/dashboard/employer/employees')}
            >
              Manage Employees <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Active Advances</CardTitle>
            <DollarSign className="h-5 w-5 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeAdvances}</div>
            <Button 
              variant="ghost" 
              className="w-full mt-4 text-xs"
              onClick={() => navigate('/dashboard/employer/repayments')}
            >
              View Details <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Total Advanced</CardTitle>
            <DollarSign className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalAdvanced}</div>
            <div className="text-xs text-gray-500 mt-1">Since program start</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg font-medium">Total Repaid</CardTitle>
            <Clock className="h-5 w-5 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.repaidAmount}</div>
            <div className="text-xs text-gray-500 mt-1">Since program start</div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Recent Advance Requests</CardTitle>
              <CardDescription>Latest wage advance requests from employees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { employee: 'John Doe', amount: '₦15,000', date: '13 May, 2025', status: 'Approved' },
                  { employee: 'Jane Smith', amount: '₦22,000', date: '12 May, 2025', status: 'Pending' },
                  { employee: 'Mike Johnson', amount: '₦10,000', date: '10 May, 2025', status: 'Approved' },
                  { employee: 'Sarah Williams', amount: '₦18,000', date: '09 May, 2025', status: 'Rejected' },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border-b last:border-0">
                    <div>
                      <div className="font-medium">{item.employee}</div>
                      <div className="text-sm text-gray-500">{item.date}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium">{item.amount}</div>
                      <div className={`text-sm ${
                        item.status === 'Approved' ? 'text-green-500' : 
                        item.status === 'Rejected' ? 'text-red-500' : 'text-yellow-500'
                      }`}>
                        {item.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button variant="ghost" className="mt-4 w-full" onClick={() => navigate('/dashboard/employer/repayments')}>
                View All Requests <ArrowRight className="ml-2 h-4 w-4" />
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
                  onClick={() => navigate('/dashboard/employer/employees')}
                >
                  Add New Employee
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/dashboard/employer/payroll')}
                >
                  Upload Payroll Data
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => navigate('/dashboard/employer/settings')}
                >
                  Configure Advance Rules
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Next Payroll Date</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28 May, 2025</div>
              <p className="text-sm text-gray-500 mt-1">15 days from now</p>
              <p className="text-sm text-gray-500 mt-4">
                {stats.activeAdvances} advances (₦260,000) will be deducted from payroll
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EmployerHome;
