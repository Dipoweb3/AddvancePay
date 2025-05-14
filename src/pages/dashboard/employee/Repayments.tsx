
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const Repayments = () => {
  // Mock repayment data
  const repayments = [
    { id: 1, amount: 25000, repaid: 10000, dueDate: "June 15, 2025", status: "In Progress" },
    { id: 2, amount: 15000, repaid: 15000, dueDate: "May 1, 2025", status: "Completed" },
    { id: 3, amount: 30000, repaid: 0, dueDate: "July 10, 2025", status: "Upcoming" }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Repayments</h1>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Repayment Summary</CardTitle>
          <CardDescription>Overview of your advance repayments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-muted-foreground">Total Outstanding</p>
              <p className="text-2xl font-bold">₦45,000</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-muted-foreground">Next Payment</p>
              <p className="text-2xl font-bold">₦5,000</p>
              <p className="text-sm text-muted-foreground">Due: June 1, 2025</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-muted-foreground">Total Repaid</p>
              <p className="text-2xl font-bold">₦25,000</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <h2 className="text-xl font-semibold mt-6">Active Repayments</h2>
      
      <div className="space-y-4">
        {repayments.map(repayment => (
          <Card key={repayment.id}>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row justify-between mb-4">
                <div>
                  <p className="font-medium">Advance #{repayment.id}</p>
                  <p className="text-muted-foreground">Due: {repayment.dueDate}</p>
                </div>
                <div className="md:text-right mt-2 md:mt-0">
                  <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                    repayment.status === "Completed" 
                      ? "bg-green-100 text-green-800" 
                      : repayment.status === "In Progress" 
                        ? "bg-blue-100 text-blue-800" 
                        : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {repayment.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{Math.round((repayment.repaid / repayment.amount) * 100)}%</span>
                </div>
                <Progress value={(repayment.repaid / repayment.amount) * 100} />
                <div className="flex justify-between text-sm">
                  <span>₦{repayment.repaid.toLocaleString()}</span>
                  <span>₦{repayment.amount.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Repayments;
