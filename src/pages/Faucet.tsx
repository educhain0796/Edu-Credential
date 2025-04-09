
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useOCID } from "@/context/OCIDContext";
import { Droplet } from "lucide-react";
import { toast } from "sonner";
import AnimatedLoader from "@/components/AnimatedLoader";

const Faucet = () => {
  const { isAuthenticated } = useOCID();
  const [address, setAddress] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleRequestTokens = async () => {
    if (!address.trim()) {
      toast.error("Please enter a valid wallet address");
      return;
    }

    setIsSending(true);
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Tokens sent successfully!", {
        description: `0.1 EDU tokens have been sent to ${address.slice(0, 6)}...${address.slice(-4)}`,
      });
      
      setAddress("");
    } catch (error) {
      toast.error("Failed to send tokens");
      console.error(error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="educhain-container py-10 flex-grow">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">EduChain Faucet</h1>
            <p className="text-muted-foreground">
              Get test EDU tokens to interact with the EduChain platform
            </p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Droplet className="h-6 w-6 text-educhain-blue" />
                Request Test Tokens
              </CardTitle>
              <CardDescription>
                Enter your wallet address to receive 0.1 EDU tokens
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Input
                  placeholder="Enter wallet address (0x...)"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  disabled={isSending || !isAuthenticated}
                />
                
                <Button 
                  className="w-full"
                  onClick={handleRequestTokens}
                  disabled={isSending || !isAuthenticated}
                >
                  {isSending ? (
                    <>
                      <AnimatedLoader size="sm" className="mr-2" />
                      Sending Tokens...
                    </>
                  ) : (
                    <>
                      <Droplet className="mr-2 h-4 w-4" />
                      Request Tokens
                    </>
                  )}
                </Button>
                
                {!isAuthenticated && (
                  <p className="text-sm text-center text-muted-foreground mt-4">
                    You need to connect with OCID to request tokens
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-8 bg-muted p-6 rounded-lg">
            <h3 className="font-medium mb-2">What are EDU tokens?</h3>
            <p className="text-sm text-muted-foreground mb-4">
              EDU tokens are the native cryptocurrency of the EduChain network. 
              They are used to pay for transactions, mint credentials, and interact with 
              the EduChain ecosystem.
            </p>
            <h3 className="font-medium mb-2">Token Details</h3>
            <ul className="text-sm text-muted-foreground list-disc pl-5 space-y-1">
              <li>Token Name: EduChain Token (EDU)</li>
              <li>Network: EduChain Testnet</li>
              <li>Faucet Rate Limit: 1 request per day</li>
              <li>Amount per Request: 0.1 EDU</li>
            </ul>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Faucet;
