
import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import HowItWorks from '@/components/HowItWorks';
import UserTypes from '@/components/UserTypes';
import ComparisonSection from '@/components/ComparisonSection';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="mt-16"> {/* Add margin-top to account for fixed navbar */}
        <Hero />
        <Features />
        <HowItWorks />
        <UserTypes />
        <ComparisonSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
