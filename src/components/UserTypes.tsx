
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Check } from 'lucide-react';

const userTypes = [
  {
    id: "employee",
    title: "Employee",
    description: "Access your earned wages before payday",
    features: [
      "Request wage advances up to 60% of earned salary",
      "Withdraw funds to personal wallet or bank account",
      "Transfer funds to other wallet users",
      "Access Fixed and High-Yield Savings products",
      "View repayment schedule and progress"
    ],
    loginType: "Email + Password",
    onboarding: "Registered via Employer dashboard"
  },
  {
    id: "employer",
    title: "Employer",
    description: "Offer financial wellness without cost",
    features: [
      "Manage payroll entries and employment status",
      "Control employee access to the platform",
      "Repay employee advances via salary deductions",
      "View advance history and repayment compliance",
      "Set wage advance rules and limits"
    ],
    loginType: "Email + Password",
    onboarding: "Manually onboarded by Platform Admin"
  },
  {
    id: "web3",
    title: "Web3 User",
    description: "Provide liquidity and earn returns",
    features: [
      "Deposit crypto (ETH, BTC, USD stablecoins) into savings pools",
      "Claim and track tokenized shares in High-Yield pool",
      "Monitor APY performance and withdraw funds",
      "Participate in future governance",
      "Earn between 2-10% APY depending on pool choice"
    ],
    loginType: "Web3 Wallet Connection",
    onboarding: "Direct registration upon wallet connection"
  }
];

const UserTypes = () => {
  const [activeTab, setActiveTab] = useState("employee");
  
  return (
    <section id="for-users" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">For Every User Type</h2>
          <p className="text-lg text-neutral max-w-2xl mx-auto">
            AdvancePay caters to different user needs with tailored experiences for employees, employers, and Web3 enthusiasts.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Tabs 
            defaultValue="employee" 
            value={activeTab} 
            onValueChange={setActiveTab} 
            className="w-full"
          >
            <TabsList className="grid grid-cols-3 mb-8">
              {userTypes.map(type => (
                <TabsTrigger 
                  key={type.id} 
                  value={type.id}
                  className="text-sm sm:text-base py-3"
                >
                  {type.title}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {userTypes.map(type => (
              <TabsContent key={type.id} value={type.id} className="mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-2xl">{type.title}</CardTitle>
                    <CardDescription className="text-lg">{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-neutral mb-3">Key Features</h4>
                        <ul className="space-y-3">
                          {type.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <span className="mr-2 mt-1">
                                <Check className="h-5 w-5 text-primary" />
                              </span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <div className="mb-6">
                          <h4 className="font-medium text-neutral mb-2">Login Type</h4>
                          <p className="bg-primary/10 p-3 rounded-lg">{type.loginType}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-neutral mb-2">Onboarding Process</h4>
                          <p className="bg-primary/10 p-3 rounded-lg">{type.onboarding}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
};

export default UserTypes;
