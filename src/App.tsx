
import React from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { OCIDProvider } from "@/context/OCIDContext";
import { ThemeProvider } from "@/context/ThemeContext";
import Index from "./pages/Index";
import UploadPage from "./pages/Upload";
import Dashboard from "./pages/Dashboard";
import Faucet from "./pages/Faucet";
import About from "./pages/About";
import Support from "./pages/Support";
import CredentialDetails from "./pages/CredentialDetails";
import CareerGuide from "./pages/CareerGuide";
import NotFound from "./pages/NotFound";

// Create a new QueryClient instance outside of the component
const queryClient = new QueryClient();

const App = () => {
  return (
    <React.StrictMode>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <OCIDProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/upload" element={<UploadPage />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/credentials/:id" element={<CredentialDetails />} />
                  <Route path="/faucet" element={<Faucet />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/support" element={<Support />} />
                  <Route path="/career" element={<CareerGuide />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </OCIDProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;
