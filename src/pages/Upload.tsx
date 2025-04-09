
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import FileUploader from "@/components/FileUploader";
import { useOCID } from "@/context/OCIDContext";
import OCIDLoginModal from "@/components/OCIDLoginModal";
import { toast } from "sonner";
import { mockMintCredential } from "@/utils/mockData";
import { FraudCheckResponse } from "@/types";
import { Loader2, UploadIcon, CheckCircle, FileCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";
import AnimatedLoader from "@/components/AnimatedLoader";

interface AnalyzedCredential {
  file: File;
  analysis: FraudCheckResponse;
}

const UploadPage = () => {
  const { isAuthenticated } = useOCID();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [analyzedCredential, setAnalyzedCredential] = useState<AnalyzedCredential | null>(null);
  const [isMinting, setIsMinting] = useState(false);
  const [mintSuccess, setMintSuccess] = useState(false);
  const navigate = useNavigate();

  const handleFileAnalyzed = (file: File, analysis: FraudCheckResponse) => {
    setAnalyzedCredential({ file, analysis });
  };

  const handleMintCredential = async () => {
    if (!analyzedCredential) return;
    
    if (!isAuthenticated) {
      setIsLoginModalOpen(true);
      return;
    }
    
    setIsMinting(true);
    try {
      const credentialData = {
        name: analyzedCredential.file?.name || "Untitled Credential",
        issuer: "Derived from document",
        date: new Date().toISOString().split('T')[0],
        fraudStatus: analyzedCredential.analysis.status,
        score: analyzedCredential.analysis.confidence
      };
      
      const txHash = await mockMintCredential(credentialData);
      
      setMintSuccess(true);
      toast.success("Credential minted successfully!", {
        description: `Transaction hash: ${txHash.slice(0, 8)}...${txHash.slice(-6)}`
      });
      
      // Navigate to dashboard after successful minting
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error minting credential:", error);
      toast.error("Error minting credential");
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <OCIDLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      
      <div className="educhain-container py-10 flex-grow">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">Upload Your Credential</h1>
            <p className="text-muted-foreground">
              Upload your certificate for verification and secure it on the blockchain
            </p>
          </div>
          
          {!mintSuccess ? (
            <>
              <Card className="mb-8">
                <CardContent className="pt-6">
                  <FileUploader onFileAnalyzed={handleFileAnalyzed} />
                </CardContent>
              </Card>
              
              {analyzedCredential && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      Verification Results
                      {analyzedCredential.analysis.status === "Valid" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <CheckCircle className="h-5 w-5 text-red-500" />
                      )}
                    </CardTitle>
                    <CardDescription>
                      AI analysis completed with {analyzedCredential.analysis.confidence}% confidence
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="bg-muted p-4 rounded-md">
                        <h3 className="font-medium mb-2">Analysis Details:</h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <li className="flex items-center justify-between">
                            <span>Watermark Detection:</span>
                            <span className={analyzedCredential.analysis.analysis.watermark ? 
                              "text-green-600" : "text-red-600"}>
                              {analyzedCredential.analysis.analysis.watermark ? "Detected ✓" : "Not Found ✗"}
                            </span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>Digital Signature:</span>
                            <span className={analyzedCredential.analysis.analysis.signature ? 
                              "text-green-600" : "text-red-600"}>
                              {analyzedCredential.analysis.analysis.signature ? "Valid ✓" : "Invalid ✗"}
                            </span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>Text Consistency:</span>
                            <span className={analyzedCredential.analysis.analysis.textConsistency ? 
                              "text-green-600" : "text-red-600"}>
                              {analyzedCredential.analysis.analysis.textConsistency ? "Consistent ✓" : "Inconsistent ✗"}
                            </span>
                          </li>
                          <li className="flex items-center justify-between">
                            <span>Issuer Verification:</span>
                            <span className={analyzedCredential.analysis.analysis.issuerVerified ? 
                              "text-green-600" : "text-red-600"}>
                              {analyzedCredential.analysis.analysis.issuerVerified ? "Verified ✓" : "Not Verified ✗"}
                            </span>
                          </li>
                        </ul>
                      </div>
                      
                      <Button 
                        className="w-full py-6"
                        onClick={handleMintCredential}
                        disabled={isMinting}
                      >
                        {isMinting ? (
                          <>
                            <AnimatedLoader size="sm" className="mr-2" />
                            Minting Credential...
                          </>
                        ) : (
                          <>
                            <UploadIcon className="mr-2 h-4 w-4" />
                            Mint on EduChain
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          ) : (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="pt-8 pb-6 text-center">
                <div className="bg-green-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                  <FileCheck className="h-8 w-8 text-green-600" />
                </div>
                <h2 className="text-2xl font-bold text-green-700 mb-2">Credential Minted Successfully!</h2>
                <p className="text-green-600 mb-6">
                  Your credential has been securely added to the EduChain blockchain.
                </p>
                <Button onClick={() => navigate("/dashboard")}>
                  View in Dashboard
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default UploadPage;
