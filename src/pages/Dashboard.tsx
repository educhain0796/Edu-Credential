
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import CredentialCard from "@/components/CredentialCard";
import CredentialStats from "@/components/CredentialStats";
import { Credential } from "@/types";
import { mockCredentials } from "@/utils/mockData";
import { useOCID } from "@/context/OCIDContext";
import OCIDLoginModal from "@/components/OCIDLoginModal";
import { useNavigate } from "react-router-dom";
import { Shield, Upload } from "lucide-react";

const Dashboard = () => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useOCID();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulating data fetching
    const fetchCredentials = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate loading
      setCredentials(mockCredentials);
      setIsLoading(false);
    };
    
    fetchCredentials();
  }, []);
  
  // Check if user is authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
    }
  }, [isAuthenticated]);
  
  const handleCloseLoginModal = () => {
    if (!isAuthenticated) {
      navigate("/");
    } else {
      setIsLoginModalOpen(false);
    }
  };

  // Handler functions for CredentialCard
  const handleToggleCredential = (id: string | number, selected: boolean) => {
    setCredentials(prev => 
      prev.map(cred => 
        cred.id === id 
          ? { ...cred, isSelected: selected } 
          : cred
      )
    );
  };

  const handleAddNotes = (id: string | number, notes: string) => {
    setCredentials(prev => 
      prev.map(cred => 
        cred.id === id 
          ? { ...cred, notes } 
          : cred
      )
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="educhain-container py-10 flex-grow">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Your Credential Dashboard</h1>
            <p className="text-muted-foreground">
              Manage and monitor all your educational achievements
            </p>
          </div>
          <Button 
            onClick={() => navigate("/upload")}
            className="mt-4 md:mt-0 flex items-center gap-2"
          >
            <Upload className="h-4 w-4" />
            Upload New Credential
          </Button>
        </div>
        
        {isLoading ? (
          <div className="grid gap-6">
            {Array.from({ length: 2 }).map((_, index) => (
              <Card key={index} className="w-full">
                <CardHeader className="pb-2">
                  <div className="h-6 bg-gray-200 rounded w-1/3 animate-pulse" />
                </CardHeader>
                <CardContent>
                  <div className="h-24 bg-gray-200 rounded animate-pulse" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : credentials.length > 0 ? (
          <div className="space-y-10">
            <CredentialStats credentials={credentials} />
            
            <Tabs defaultValue="all" className="w-full">
              <TabsList>
                <TabsTrigger value="all">All ({credentials.length})</TabsTrigger>
                <TabsTrigger value="valid">
                  Valid ({credentials.filter(c => c.fraudStatus === "Valid").length})
                </TabsTrigger>
                <TabsTrigger value="suspicious">
                  Suspicious ({credentials.filter(c => c.fraudStatus === "Suspicious").length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {credentials.map(credential => (
                    <CredentialCard 
                      key={credential.id} 
                      credential={credential} 
                      onToggle={handleToggleCredential}
                      onAddNotes={handleAddNotes}
                    />
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="valid" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {credentials
                    .filter(credential => credential.fraudStatus === "Valid")
                    .map(credential => (
                      <CredentialCard 
                        key={credential.id} 
                        credential={credential} 
                        onToggle={handleToggleCredential}
                        onAddNotes={handleAddNotes}
                      />
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="suspicious" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {credentials
                    .filter(credential => credential.fraudStatus === "Suspicious")
                    .map(credential => (
                      <CredentialCard 
                        key={credential.id} 
                        credential={credential} 
                        onToggle={handleToggleCredential}
                        onAddNotes={handleAddNotes}
                      />
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <div className="mx-auto w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-medium mb-2">No Credentials Yet</h3>
              <p className="text-muted-foreground mb-6">
                Upload your first credential to get started with EduChain Wallet
              </p>
              <Button onClick={() => navigate("/upload")}>
                Upload Credential
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
