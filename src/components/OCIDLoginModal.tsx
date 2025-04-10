import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Shield, Loader2 } from "lucide-react";
import { useOCID } from "@/context/OCIDContext";

interface OCIDLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OCIDLoginModal = ({ isOpen, onClose }: OCIDLoginModalProps) => {
  const { login } = useOCID();
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      await login();
      onClose();
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Sign in with OCID</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center py-6">
          <div className="bg-educhain-blue/10 p-4 rounded-full mb-4">
            <Shield className="h-10 w-10 text-educhain-blue" />
          </div>
          <h3 className="text-xl font-medium mb-2">Connect to OCID</h3>
          <p className="text-sm text-center text-muted-foreground mb-6">
            Sign in securely using OCID to access and manage your educational credentials on the blockchain.
          </p>
          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="bg-educhain-accent hover:bg-educhain-blue hover:text-white w-full py-6 text-black"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Connecting...
              </>
            ) : (
              "Connect with OCID"
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OCIDLoginModal;
