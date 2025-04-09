import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import CredentialDetail from "@/components/CredentialDetail";
import { useOCID } from "@/context/OCIDContext";
import OCIDLoginModal from "@/components/OCIDLoginModal";
import { mockCredentials } from "@/utils/mockData";
import { Credential } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Footer from "@/components/Footer";

const CredentialDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [credential, setCredential] = useState<Credential | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useOCID();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check authentication
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    }
    
    // Fetch credential data
    const fetchCredential = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate loading
      
      const foundCredential = mockCredentials.find(
        cred => cred.id === parseInt(id || "0")
      );
      
      setCredential(foundCredential || null);
      setIsLoading(false);
    };
    
    fetchCredential();
  }, [id, isAuthenticated]);
  
  const handleCloseLoginModal = () => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      setIsLoginModalOpen(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="educhain-container py-10 flex-grow">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={() => navigate("/dashboard")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : credential ? (
          <CredentialDetail credential={credential} />
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold mb-2">Credential Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The credential you are looking for does not exist or has been removed.
            </p>
            <Button onClick={() => navigate("/dashboard")}>
              Return to Dashboard
            </Button>
          </div>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default CredentialDetails;
