
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <div className="pt-24 pb-16 container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold mt-8 mb-6 text-center">Contact Us</h1>
        
        <div className="max-w-5xl mx-auto mt-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <Mail className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">Email</h3>
              <p className="text-neutral mb-2">For general inquiries:</p>
              <a href="mailto:hello@advancepay.app" className="text-primary hover:underline">hello@advancepay.app</a>
              <p className="text-neutral mt-2 mb-2">For support:</p>
              <a href="mailto:support@advancepay.app" className="text-primary hover:underline">support@advancepay.app</a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <Phone className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">Phone</h3>
              <p className="text-neutral mb-2">Customer Service:</p>
              <a href="tel:+2349012345678" className="text-primary hover:underline">+234 901 234 5678</a>
              <p className="text-neutral mt-2 mb-2">Business Inquiries:</p>
              <a href="tel:+2349087654321" className="text-primary hover:underline">+234 908 765 4321</a>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center text-center">
              <MapPin className="h-10 w-10 text-primary mb-4" />
              <h3 className="font-bold text-lg mb-2">Location</h3>
              <p className="text-neutral">5 Tech Drive</p>
              <p className="text-neutral">Yaba, Lagos</p>
              <p className="text-neutral">Nigeria</p>
              <p className="text-neutral mt-2">Mon-Fri: 9am-5pm WAT</p>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your Name</Label>
                  <Input 
                    id="name" 
                    name="name" 
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
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input 
                  id="subject" 
                  name="subject" 
                  value={formData.subject} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={formData.message} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full md:w-auto bg-primary hover:bg-primary-dark"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </Button>
            </form>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Contact;
