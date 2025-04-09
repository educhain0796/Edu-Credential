
import { Credential, FraudCheckResponse } from "@/types";

export const mockCredentials: Credential[] = [
  {
    id: 1,
    name: "Bachelor of Computer Science",
    issuer: "Stanford University",
    date: "2023-05-15",
    fraudStatus: "Valid",
    score: 88,
    image: "/placeholder.svg"
  },
  {
    id: 2,
    name: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    date: "2022-11-20",
    fraudStatus: "Suspicious",
    score: 45,
    image: "/placeholder.svg"
  },
  {
    id: 3,
    name: "Machine Learning Specialization",
    issuer: "DeepLearning.AI",
    date: "2023-01-10",
    fraudStatus: "Valid",
    score: 92,
    image: "/placeholder.svg"
  },
  {
    id: 4,
    name: "Blockchain Fundamentals",
    issuer: "MIT OpenCourseWare",
    date: "2022-08-05",
    fraudStatus: "Valid",
    score: 76,
    image: "/placeholder.svg"
  }
];

export const mockFraudCheck = (filename: string): Promise<FraudCheckResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const isSuspicious = filename.toLowerCase().includes('fake') || 
                           Math.random() < 0.2; // 20% chance of being suspicious
      
      if (isSuspicious) {
        resolve({
          status: "Suspicious",
          confidence: Math.floor(Math.random() * 30) + 50, // 50-80% confidence
          analysis: {
            watermark: false,
            signature: Math.random() > 0.5,
            textConsistency: false,
            issuerVerified: false
          }
        });
      } else {
        resolve({
          status: "Valid",
          confidence: Math.floor(Math.random() * 20) + 80, // 80-100% confidence
          analysis: {
            watermark: true,
            signature: true,
            textConsistency: true,
            issuerVerified: true
          }
        });
      }
    }, 1000); // Simulate API delay
  });
};

export const mockMintCredential = async (credential: Partial<Credential>): Promise<string> => {
  // Simulate blockchain minting delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Generate a fake transaction hash
  const hash = "0x" + Array.from({length: 40}, () => 
    Math.floor(Math.random() * 16).toString(16)).join('');
    
  console.log("Minted on EduChain!", { credential, txHash: hash });
  return hash;
};

export const mockOCIDLogin = (): Promise<{address: string}> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        address: "0x123abc456def789ghi"
      });
    }, 1000);
  });
};
