
import React from 'react';

const steps = [
  {
    number: "01",
    title: "Employee Signs Up",
    description: "Employees register through their employer's AdvancePay dashboard using email and password.",
    highlight: "No technical knowledge required"
  },
  {
    number: "02",
    title: "Request Wage Advance",
    description: "Access up to 60% of already earned wages with transparent fees and instant approval.",
    highlight: "As low as 2-5% interest"
  },
  {
    number: "03",
    title: "Receive Funds Instantly",
    description: "Funds are transferred immediately to the employee's wallet or bank account.",
    highlight: "No waiting periods"
  },
  {
    number: "04",
    title: "Automatic Repayment",
    description: "Repayment is handled automatically through salary deductions on the next payday.",
    highlight: "No manual repayments needed"
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How AdvancePay Works</h2>
          <p className="text-lg text-neutral max-w-2xl mx-auto">
            Our blockchain-powered platform makes accessing your earned wages simple and transparent.
          </p>
        </div>
        
        <div className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-8">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="relative group"
            >
              <div className="bg-white rounded-xl p-6 border border-gray-200 group-hover:border-primary transition-colors duration-300 h-full">
                <div className="gradient-bg text-white text-2xl font-bold rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-neutral mb-4">{step.description}</p>
                <div className="bg-primary/10 text-primary px-3 py-1 rounded-full inline-block text-sm font-medium">
                  {step.highlight}
                </div>
              </div>
              
              {/* Connecting line between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-8 h-0.5 bg-gray-300 -translate-y-1/2 z-0">
                  <div className="absolute right-0 w-2 h-2 bg-primary rounded-full -translate-y-1/2 top-1/2"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
