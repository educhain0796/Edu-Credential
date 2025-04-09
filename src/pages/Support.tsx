
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, Mail, Phone } from "lucide-react";
import { toast } from "sonner";

const Support = () => {
  const handleSubmitSupport = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Support request submitted", {
      description: "We'll get back to you as soon as possible."
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="educhain-container py-10 flex-grow">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Support Center</h1>
            <p className="text-muted-foreground">
              Get help with EduChain Wallet and find answers to common questions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mb-4">
                    <MessageCircle className="h-6 w-6 text-educhain-blue" />
                  </div>
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chat with our support team for instant help
                  </p>
                  <Button variant="outline" size="sm">Start Chat</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mb-4">
                    <Mail className="h-6 w-6 text-educhain-blue" />
                  </div>
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Email us for detailed assistance
                  </p>
                  <Button variant="outline" size="sm">
                    support@educhain.com
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-full mb-4">
                    <Phone className="h-6 w-6 text-educhain-blue" />
                  </div>
                  <h3 className="font-semibold mb-2">Phone Support</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Call us for immediate assistance
                  </p>
                  <Button variant="outline" size="sm">+1 (555) 123-4567</Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
              
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                  <AccordionTrigger>How do I upload a credential?</AccordionTrigger>
                  <AccordionContent>
                    To upload a credential, navigate to the Upload page, select your credential file, 
                    and follow the prompts. Our AI system will verify the authenticity of your credential 
                    before it is minted on the blockchain.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger>Is my data secure on EduChain?</AccordionTrigger>
                  <AccordionContent>
                    Yes, your data is secure on EduChain. We use blockchain technology to ensure that 
                    your credentials are immutable and tamper-proof. Additionally, you have full control 
                    over who can access your credentials.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger>How does credential verification work?</AccordionTrigger>
                  <AccordionContent>
                    Our AI-powered verification system analyzes your credential for authenticity markers 
                    such as watermarks, digital signatures, and issuer verification. It produces a 
                    confidence score that indicates the likelihood of the credential being authentic.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger>What is OCID Connect?</AccordionTrigger>
                  <AccordionContent>
                    OCID Connect is our secure authentication system that allows you to access your 
                    EduChain Wallet account. It provides a single sign-on experience while maintaining 
                    the highest security standards.
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger>How can I share my credentials with employers?</AccordionTrigger>
                  <AccordionContent>
                    From your dashboard, you can generate unique sharing links for any credential. 
                    These links can be set to expire after a certain time or number of views, and 
                    you can track when they are accessed.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Contact Support</h2>
              <Card>
                <CardHeader>
                  <CardTitle>Submit a Support Request</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmitSupport} className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium">Name</label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium">Email</label>
                      <Input id="email" type="email" placeholder="Your email" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                      <Input id="subject" placeholder="Support topic" />
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium">Message</label>
                      <Textarea id="message" placeholder="Describe your issue" rows={4} />
                    </div>
                    
                    <Button type="submit" className="w-full">Submit Request</Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Support;
