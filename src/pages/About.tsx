
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Award, Lock, FileCheck } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="educhain-container py-10 flex-grow">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">About EduChain Wallet</h1>
            <p className="text-muted-foreground">
              Securing your educational achievements on the blockchain
            </p>
          </div>
          
          <div className="prose prose-blue max-w-none dark:prose-invert">
            <p className="lead">
              EduChain Wallet is a revolutionary platform for storing, verifying, and sharing 
              educational credentials using blockchain technology. We provide a secure and 
              immutable way to manage your educational achievements.
            </p>
            
            <h2>Our Mission</h2>
            <p>
              Our mission is to empower individuals by giving them ownership and control 
              over their educational credentials, while providing employers and institutions 
              with a reliable way to verify these credentials.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-educhain-blue/10 p-3 rounded-full mb-4">
                      <Shield className="h-8 w-8 text-educhain-blue" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Secure Storage</h3>
                    <p className="text-sm text-muted-foreground">
                      Your credentials are securely stored on the blockchain, making them 
                      tamper-proof and permanently accessible.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-educhain-blue/10 p-3 rounded-full mb-4">
                      <FileCheck className="h-8 w-8 text-educhain-blue" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">AI Verification</h3>
                    <p className="text-sm text-muted-foreground">
                      Our advanced AI technology verifies the authenticity of credentials, 
                      detecting fraud and ensuring trust.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-educhain-blue/10 p-3 rounded-full mb-4">
                      <Lock className="h-8 w-8 text-educhain-blue" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Privacy Control</h3>
                    <p className="text-sm text-muted-foreground">
                      You control who can access your credentials and for how long, 
                      maintaining your privacy.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-educhain-blue/10 p-3 rounded-full mb-4">
                      <Award className="h-8 w-8 text-educhain-blue" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Reputation Building</h3>
                    <p className="text-sm text-muted-foreground">
                      Build a trusted digital representation of your educational journey 
                      and professional achievements.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <h2>Our Technology</h2>
            <p>
              EduChain utilizes cutting-edge blockchain technology to create a decentralized 
              and secure platform for credential management. Our AI-powered verification 
              system ensures that only legitimate credentials are added to the blockchain, 
              maintaining the integrity of the ecosystem.
            </p>
            
            <h2>Join the EduChain Revolution</h2>
            <p>
              Whether you're a student, a professional, or an educational institution, 
              EduChain Wallet offers a modern solution to credential management challenges. 
              Join us in building a more transparent and efficient educational verification system.
            </p>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default About;
