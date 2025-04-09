
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Upload, ShieldCheck, Award } from "lucide-react";
import OCIDLoginModal from "@/components/OCIDLoginModal";
import Footer from "@/components/Footer";

const Index = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <OCIDLoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
      />
      
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/30">
        <div className="educhain-container">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="lg:w-1/2 mb-10 lg:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-educhain-blue mb-6 leading-tight">
                Store, Verify, and Rate Your Credentials—Securely on Blockchain
              </h1>
              <p className="text-lg mb-8 text-muted-foreground max-w-lg">
                EduChain Wallet is the future of credential management. Upload your certificates, get AI-powered fraud detection, and build trust with employers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/upload">
                  <Button className="bg-educhain-accent hover:bg-educhain-blue text-lg py-6 px-8 rounded-full">
                    Upload Your First Credential
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  className="text-lg py-6 px-8 rounded-full"
                  onClick={() => setIsLoginModalOpen(true)}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <img 
                src="/placeholder.svg" 
                alt="EduChain Wallet" 
                className="w-full max-w-md object-contain"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="py-16 bg-background">
        <div className="educhain-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Three simple steps to secure and showcase your educational achievements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="bg-muted/50 rounded-xl p-8 text-center">
              <div className="bg-educhain-blue/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Upload className="h-8 w-8 text-educhain-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Upload</h3>
              <p className="text-muted-foreground">
                Drag & drop your certificates for verification.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="bg-muted/50 rounded-xl p-8 text-center">
              <div className="bg-educhain-blue/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <ShieldCheck className="h-8 w-8 text-educhain-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Verify</h3>
              <p className="text-muted-foreground">
                Our AI system detects fraud in seconds, ensuring the authenticity of your credentials.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="bg-muted/50 rounded-xl p-8 text-center">
              <div className="bg-educhain-blue/10 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <Award className="h-8 w-8 text-educhain-blue" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Rated</h3>
              <p className="text-muted-foreground">
                Receive dynamic scoring from employers, building trust and credibility over time.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-educhain-blue text-white">
        <div className="educhain-container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Secure Your Credentials?</h2>
          <p className="text-lg mb-8 max-w-xl mx-auto">
            Join thousands of professionals who trust EduChain Wallet for their credential management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/upload">
              <Button className="bg-white text-educhain-blue hover:bg-gray-100 text-lg py-6 px-8 rounded-full">
                Get Started
              </Button>
            </Link>
            <Button 
              variant="outline" 
              className="text-white border-white hover:bg-educhain-blue/80 text-lg py-6 px-8 rounded-full"
              onClick={() => setIsLoginModalOpen(true)}
            >
              Connect with OCID
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
