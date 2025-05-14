
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "@/hooks/use-toast";
import { ArrowRight, Calendar, CreditCard, Info } from 'lucide-react';

const RequestAdvance = () => {
  const [amount, setAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Mock data
  const maxAvailable = 27000;
  const nextSalaryDate = '28 May, 2025';
  const interestRate = 3.5;
  
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow numbers
    const value = e.target.value.replace(/[^0-9]/g, '');
    setAmount(value);
  };
  
  const calculateFee = () => {
    const amountNum = Number(amount) || 0;
    return (amountNum * interestRate / 100).toFixed(2);
  };
  
  const calculateTotal = () => {
    const amountNum = Number(amount) || 0;
    const fee = Number(calculateFee());
    return (amountNum + fee).toFixed(2);
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid advance amount.",
        variant: "destructive",
      });
      return;
    }
    
    if (Number(amount) > maxAvailable) {
      toast({
        title: "Amount exceeds available balance",
        description: `You can request up to ₦${maxAvailable.toLocaleString()}.`,
        variant: "destructive",
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      toast({
        title: "Advance request successful!",
        description: `₦${Number(amount).toLocaleString()} has been credited to your wallet.`,
      });
      setAmount('');
      setIsProcessing(false);
    }, 2000);
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Request Wage Advance</CardTitle>
          <CardDescription>
            Request access to your earned wages before payday
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-md flex items-start">
                <Info className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-blue-900">
                    You can request up to <strong>₦{maxAvailable.toLocaleString()}</strong> from your 
                    earned wages. This will be automatically repaid from your salary on <strong>{nextSalaryDate}</strong>.
                  </p>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Advance Amount (₦)</Label>
                <Input
                  id="amount"
                  placeholder="Enter amount"
                  value={amount}
                  onChange={handleAmountChange}
                  className="text-lg"
                />
                <p className="text-xs text-gray-500">
                  Available: ₦{maxAvailable.toLocaleString()}
                </p>
              </div>
              
              {amount && Number(amount) > 0 && (
                <div className="mt-6 space-y-4">
                  <h3 className="font-medium">Advance Summary</h3>
                  
                  <div className="space-y-2 bg-gray-50 p-4 rounded-md">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <CreditCard className="h-4 w-4 text-gray-500 mr-2" />
                        <span>Advance Amount</span>
                      </div>
                      <span>₦{Number(amount).toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Info className="h-4 w-4 text-gray-500 mr-2" />
                        <span>Fee ({interestRate}%)</span>
                      </div>
                      <span>₦{Number(calculateFee()).toLocaleString()}</span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-500 mr-2" />
                        <span>Repayment Date</span>
                      </div>
                      <span>{nextSalaryDate}</span>
                    </div>
                    
                    <div className="pt-2 mt-2 border-t border-gray-200 flex justify-between items-center font-medium">
                      <span>Total Repayment</span>
                      <span>₦{Number(calculateTotal()).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full mt-6 bg-primary hover:bg-primary-dark"
                disabled={!amount || Number(amount) <= 0 || Number(amount) > maxAvailable || isProcessing}
              >
                {isProcessing ? 'Processing...' : 'Confirm Request'}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <p className="text-sm text-gray-500">
            By requesting an advance, you agree to the repayment terms and authorize AdvancePay to deduct the total amount from your next salary payment.
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RequestAdvance;
