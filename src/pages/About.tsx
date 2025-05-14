
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Users, Wallet } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16 container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-4 text-center">About AdvancePay</h1>
        
        <div className="max-w-3xl mx-auto">
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-neutral mb-6">
              AdvancePay is on a mission to provide financial freedom and liquidity to employees while 
              creating a sustainable yield model for capital providers. We believe that everyone deserves 
              access to their earned wages when they need it most, without predatory fees or interest rates.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Shield className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Financial Inclusion</h3>
                <p className="text-neutral text-sm">Providing access to earned wages for underbanked employees.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Users className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Employer Support</h3>
                <p className="text-neutral text-sm">Enabling employers to provide financial wellness benefits at no cost.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Wallet className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-bold text-lg mb-2">Yield Generation</h3>
                <p className="text-neutral text-sm">Creating sustainable returns for capital providers while keeping costs low.</p>
              </div>
            </div>
          </section>
          
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-neutral mb-6">
              AdvancePay was founded by a team of financial technology experts with experience 
              in traditional finance, blockchain technology, and emerging markets. Our team combines 
              expertise in smart contract development, financial inclusion, and user experience.
            </p>
            
            <div className="bg-gray-50 p-6 rounded-lg my-6">
              <h3 className="font-bold text-xl mb-2">Join Our Team</h3>
              <p className="text-neutral">
                We're growing! If you're passionate about financial inclusion and blockchain technology, 
                check our careers page for open positions.
              </p>
            </div>
          </section>
          
          <section className="mt-12">
            <h2 className="text-2xl font-bold mb-4">Our Roadmap</h2>
            <div className="relative border-l-2 border-primary pl-6 ml-4 py-2">
              <div className="mb-8">
                <div className="absolute -left-[9px] top-0">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                </div>
                <h3 className="font-bold text-lg">Q2 2025 - MVP Launch</h3>
                <p className="text-neutral">Initial platform with basic wage advance functionality.</p>
              </div>
              
              <div className="mb-8">
                <div className="absolute -left-[9px] top-[100px]">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                </div>
                <h3 className="font-bold text-lg">Q3 2025 - Fixed & Risky Pools</h3>
                <p className="text-neutral">Launch of both savings pool options for users.</p>
              </div>
              
              <div className="mb-8">
                <div className="absolute -left-[9px] top-[200px]">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                </div>
                <h3 className="font-bold text-lg">Q4 2025 - Payroll Integration</h3>
                <p className="text-neutral">Direct integration with major payroll systems.</p>
              </div>
              
              <div>
                <div className="absolute -left-[9px] top-[300px]">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                </div>
                <h3 className="font-bold text-lg">Q1 2026 - Mobile App & Expansion</h3>
                <p className="text-neutral">Native mobile apps and expansion to new markets.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
