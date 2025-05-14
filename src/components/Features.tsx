
import React from 'react';
import { CreditCard, Wallet, Shield, Users } from 'lucide-react';

const featureItems = [
  {
    icon: <CreditCard className="h-10 w-10 text-primary" />,
    title: "Instant Wage Access",
    description: "Access up to 60% of your earned wages before payday, all without hidden fees or excessive interest."
  },
  {
    icon: <Wallet className="h-10 w-10 text-primary" />,
    title: "Dual Savings Options",
    description: "Choose between Fixed Savings with predictable returns or High-Yield Savings for those with higher risk appetite."
  },
  {
    icon: <Shield className="h-10 w-10 text-primary" />,
    title: "Transparent & Secure",
    description: "Built on blockchain technology for maximum transparency, security, and trust in every transaction."
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: "Employer Integration",
    description: "Seamless integration with employer payroll systems to verify employment and automate repayments."
  }
];

const Features = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Core Features</h2>
          <p className="text-lg text-neutral max-w-2xl mx-auto">
            AdvancePay combines the best of blockchain technology with real-world financial inclusion to create a new paradigm in wage access.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featureItems.map((item, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-neutral">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
