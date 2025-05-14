
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Faqs = () => {
  const faqItems = [
    {
      question: "How does the wage advance work?",
      answer: "AdvancePay allows employees to access up to 60% of their already earned wages before payday. The advance is automatically repaid through salary deductions on the next payday. Interest rates range from 2-5%, significantly lower than traditional payday loans."
    },
    {
      question: "Do I need cryptocurrency to use AdvancePay?",
      answer: "No. As an employee or employer, you can use AdvancePay with regular currency. The blockchain technology works in the background to make the system more efficient and transparent, but you don't need to understand or use cryptocurrency directly."
    },
    {
      question: "How much can employees borrow?",
      answer: "Employees can access up to 60% of their already earned wages. The exact amount is determined by their salary, employment status, and the rules set by their employer."
    },
    {
      question: "What is the difference between Fixed and High-Yield Savings?",
      answer: "Fixed Savings offers a stable, predictable return (typically 2-4% APY) with lower risk. High-Yield Savings offers potentially higher returns (5-10% APY) but with more variability and risk. High-Yield participants receive tokenized shares in the pool."
    },
    {
      question: "How do employers benefit from AdvancePay?",
      answer: "Employers can offer a valuable financial wellness benefit to employees at no cost. This can improve employee satisfaction, reduce turnover, and increase productivity. The platform also provides employers with tools to manage payroll advances and repayments."
    },
    {
      question: "Is my personal and financial data secure?",
      answer: "Yes. AdvancePay uses enterprise-grade security measures to protect your personal and financial data. The blockchain elements of our system add an additional layer of transparency and security to transactions."
    },
    {
      question: "What happens if an employee leaves before repaying an advance?",
      answer: "The employer is responsible for ensuring the advance is repaid before final wages are disbursed. If an employee leaves with an outstanding advance, the amount is deducted from their final paycheck."
    },
    {
      question: "Which cryptocurrencies can I deposit as a Web3 user?",
      answer: "Web3 users can deposit ETH, BTC, and USD stablecoins into the Fixed and High-Yield pools. Additional cryptocurrencies may be supported in the future."
    },
    {
      question: "How is the interest rate determined for wage advances?",
      answer: "Interest rates for wage advances typically range from 2-5%, based on factors such as the employee's salary, employment history, and the amount being advanced. These rates are significantly lower than traditional payday loans."
    },
    {
      question: "Can I use AdvancePay in any country?",
      answer: "AdvancePay is initially launching in Nigeria with plans to expand to other markets. The platform will be available in additional countries as we secure the necessary regulatory approvals and partnerships."
    }
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16 container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6 text-center">Frequently Asked Questions</h1>
        
        <div className="max-w-3xl mx-auto mt-10">
          <Accordion type="single" collapsible className="w-full">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium text-lg">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-neutral">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="mt-12 bg-primary/10 p-6 rounded-lg max-w-3xl mx-auto">
          <h2 className="text-xl font-bold mb-2">Can't find an answer?</h2>
          <p className="mb-4">Contact our support team and we'll get back to you as soon as possible.</p>
          <a href="/contact" className="text-primary font-medium hover:underline">Contact Support →</a>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Faqs;
