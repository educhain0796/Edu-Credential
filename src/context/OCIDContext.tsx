import React, { createContext, useContext, useState, ReactNode } from 'react';
import { toast } from "sonner";

interface OCIDContextType {
  isAuthenticated: boolean;
  userAddress: string | null;
  login: () => void;
  logout: () => void;
}

const OCIDContext = createContext<OCIDContextType>({
  isAuthenticated: false,
  userAddress: null,
  login: () => {},
  logout: () => {},
});

export const useOCID = () => useContext(OCIDContext);

export const OCIDProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userAddress, setUserAddress] = useState<string | null>(null);

  const login = () => {
    // Simulate OCID authentication
    setTimeout(() => {
      const mockAddress = "0x123abc456def789ghi";
      setUserAddress(mockAddress);
      setIsAuthenticated(true);
      toast.success("Successfully connected with OCID", {
        description: `Connected as ${mockAddress.slice(0, 6)}...${mockAddress.slice(-4)}`,
      });
    }, 1000);
  };

  const logout = () => {
    setUserAddress(null);
    setIsAuthenticated(false);
    toast.info("Disconnected from OCID");
  };

  return (
    <OCIDContext.Provider value={{ isAuthenticated, userAddress, login, logout }}>
      {children}
    </OCIDContext.Provider>
  );
};
