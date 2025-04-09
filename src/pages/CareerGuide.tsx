
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CareerWizard } from "@/components/CareerWizard";
import { Toaster } from "sonner";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import CredentialStats from "@/components/CredentialStats";
import { UserCredential } from "@/types";

const CareerGuide = () => {
  const [credentials, setCredentials] = useState<UserCredential[]>([]);
  
  useEffect(() => {
    // Get credentials from localStorage or use empty array
    const storedCredentials = localStorage.getItem('userCredentials');
    if (storedCredentials) {
      setCredentials(JSON.parse(storedCredentials));
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="educhain-container py-10 flex-grow">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Career Path Wizard</h1>
            <p className="text-muted-foreground">
              Select your credentials to get personalized career suggestions
            </p>
          </div>
          
          {credentials.length > 0 && (
            <div className="mb-10 animate-fade-in">
              <CredentialStats credentials={credentials} />
            </div>
          )}
          
          <Alert className="mb-8 border-primary/20 bg-primary/5">
            <Info className="h-4 w-4" />
            <AlertDescription>
              As you select credentials, we'll analyze your skills and generate personalized career recommendations.
            </AlertDescription>
          </Alert>
          
          <CareerWizard />
        </div>
      </div>
      
      <Footer />
      
      {/* Toaster component for notifications */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          className: "animate-enter"
        }}
      />
    </div>
  );
};

export default CareerGuide;
