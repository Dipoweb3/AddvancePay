
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';

const WaitlistForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    userType: 'employee',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRadioChange = (value: string) => {
    setFormData(prev => ({ ...prev, userType: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Successfully joined waitlist!",
        description: "We'll notify you when AdvancePay launches.",
      });
      setFormData({
        name: '',
        email: '',
        userType: 'employee',
        company: '',
      });
    }, 1500);
  };

  return (
    <section id="waitlist" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Waitlist</h2>
          <p className="text-lg text-neutral max-w-2xl mx-auto">
            Be among the first to experience the future of wage access. Sign up today to get early access when we launch.
          </p>
        </div>

        <Card className="max-w-xl mx-auto">
          <CardHeader>
            <CardTitle>Reserve Your Spot</CardTitle>
            <CardDescription>
              Fill out the form below to join our waitlist and receive updates on our launch.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label>I am interested as a:</Label>
                <RadioGroup 
                  defaultValue="employee" 
                  value={formData.userType}
                  onValueChange={handleRadioChange}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employee" id="employee" />
                    <Label htmlFor="employee" className="cursor-pointer">Employee</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="employer" id="employer" />
                    <Label htmlFor="employer" className="cursor-pointer">Employer</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="web3" id="web3" />
                    <Label htmlFor="web3" className="cursor-pointer">Web3 Liquidity Provider</Label>
                  </div>
                </RadioGroup>
              </div>
              
              {(formData.userType === 'employee' || formData.userType === 'employer') && (
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="Enter your company name"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Join Waitlist"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default WaitlistForm;
