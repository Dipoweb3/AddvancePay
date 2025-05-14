
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Hero = () => {
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();
  
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-6 z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              Instant Access to Your <span className="gradient-text">Earned Wages</span>
            </h1>
            <p className="text-base md:text-lg text-neutral mb-8">
              AdvancePay enables immediate access to your earned income through a blockchain-powered system that is transparent, decentralized, and inclusive.
            </p>
            
            {isSignedIn ? (
              <Button className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white text-lg py-6 px-8 mb-4 sm:mb-0 sm:mr-4" onClick={() => navigate('/dashboard/employee')}>
                Go to Dashboard
              </Button>
            ) : (
              <div className="flex flex-col sm:flex-row gap-4">
                <Button className="w-full sm:w-auto bg-primary hover:bg-primary-dark text-white text-lg py-6 px-8 mb-4 sm:mb-0" onClick={() => navigate('/sign-in')}>
                  Sign In
                </Button>
                <Button variant="outline" className="w-full sm:w-auto border-primary text-primary hover:bg-primary/10 text-lg py-6 px-8" onClick={() => navigate('/sign-in')}>
                  Request Demo
                </Button>
              </div>
            )}
            
            <Button variant="ghost" className="mt-6 w-full sm:w-auto text-neutral" onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}>
              Learn More <ArrowDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="md:w-1/2 relative z-10">
            <div className="relative w-full h-[350px] md:h-[450px]">
              <div className="absolute top-0 right-0 w-full h-full rounded-lg bg-gradient-to-br from-primary-light/20 to-primary/30 backdrop-blur-sm animate-float"></div>
              <div className="absolute top-4 left-4 w-full h-full rounded-lg bg-white shadow-xl p-4">
                <div className="bg-primary/10 rounded-t-lg p-3 mb-4">
                  <h3 className="text-lg font-bold text-primary">Wage Advance Dashboard</h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium text-sm">Available Balance</span>
                      <span className="font-bold text-sm">₦45,000</span>
                    </div>
                    <div className="w-full bg-gray-200 h-2 rounded-full">
                      <div className="bg-primary h-2 rounded-full w-[60%]"></div>
                    </div>
                  </div>
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-1">Available for Advance</h4>
                    <p className="text-xl font-bold text-primary">₦27,000</p>
                    <p className="text-xs text-neutral mt-1">60% of earned wages</p>
                  </div>
                  <Button className="w-full bg-primary hover:bg-primary-dark text-sm">Request Advance</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-sky/10 rounded-full blur-3xl -z-10"></div>
    </section>
  );
};

export default Hero;
