
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { UserCredential, CareerResponse } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import AnimatedLoader from "@/components/AnimatedLoader";
import ProcessStatus from "@/components/ProcessStatus";
import CareerSuggestionCard from "@/components/CareerSuggestionCard";
import NextStepsCard from "@/components/NextStepsCard";
import CredentialCard from "@/components/CredentialCard";

// Mock credentials data
const mockCredentials: UserCredential[] = [
  {
    id: "1",
    name: "Foundations of Cybersecurity",
    issuer: "Google and Coursera",
    skills: ["Cybersecurity"],
    year: 2024,
    isSelected: true,
  },
  {
    id: "2",
    name: "SSOC Season 3 Participation",
    issuer: "Social Summer of Code",
    skills: [],
    year: null,
    isSelected: true,
  },
  {
    id: "3",
    name: "JavaScript Fundamentals",
    issuer: "freeCodeCamp",
    skills: ["JavaScript", "Web Development"],
    year: 2023,
    isSelected: true,
  },
  {
    id: "4",
    name: "Introduction to Machine Learning",
    issuer: "Coursera",
    skills: ["Python", "Machine Learning"],
    year: 2022,
    isSelected: true,
  },
];

// Mock API call to /ai endpoint
const analyzeCredentials = async (credentials: UserCredential[]): Promise<UserCredential[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  return credentials.filter(cred => cred.isSelected);
};

// Mock API call to /career endpoint
const getCareerSuggestions = async (credentials: UserCredential[]): Promise<CareerResponse> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 3000));
  
  // Sample response data (as provided in the requirements)
  return {
    career_suggestions: [
      {
        role: "Cybersecurity Analyst",
        description: "Cybersecurity Analysts are responsible for protecting an organization's computer systems and networks from cyber threats. They monitor for security breaches, investigate incidents, and implement security measures. Your 'Foundations of Cybersecurity' certificate directly aligns with this role.",
        eligibility_criteria: [
          "Bachelor's degree in Computer Science, Cybersecurity, or a related field (preferred, but not always required)",
          "Relevant certifications (e.g., CompTIA Security+, Certified Ethical Hacker (CEH)) - your Google certificate is a great start",
          "Strong understanding of networking protocols, operating systems, and security technologies",
          "Analytical and problem-solving skills"
        ],
        perks: [
          "High demand and job security",
          "Opportunity to work on cutting-edge technologies",
          "Intellectually stimulating work",
          "Making a tangible impact on protecting organizations from cybercrime"
        ],
        pros: [
          "Challenging and rewarding work",
          "Continuous learning and development opportunities",
          "Relatively high earning potential"
        ],
        cons: [
          "Can be stressful, especially during security incidents",
          "Requires constant vigilance and staying up-to-date on the latest threats",
          "May involve on-call duties"
        ],
        package: {
          entry_level: "$60,000 - $90,000 per year",
          after_5_years: "$90,000 - $150,000+ per year (depending on experience, certifications, and location)"
        },
        work_life_balance_rating: "3.5/5 (Can vary depending on the company and the role's responsibilities.  Incident response can impact work-life balance.)",
        how_ssoc_participation_helps: "While SSOC participation may not be directly related to cybersecurity, it demonstrates your commitment to contributing to projects and working in a collaborative environment. This experience is valuable for teamwork and communication skills, which are essential for a Cybersecurity Analyst."
      },
      {
        role: "Security Operations Center (SOC) Analyst",
        description: "SOC Analysts monitor security systems, analyze security events, and respond to incidents in real-time.  The 'Foundations of Cybersecurity' certificate is directly relevant to this role, and your SSOC participation, although not cybersecurity-focused, shows your ability to work within a team on projects.",
        eligibility_criteria: [
          "Associate's or Bachelor's degree in a relevant field (preferred)",
          "Certifications like CompTIA Security+, Network+, or CySA+ are highly beneficial",
          "Experience with security information and event management (SIEM) systems",
          "Understanding of network security principles"
        ],
        perks: [
          "Fast-paced and dynamic environment",
          "Hands-on experience with security technologies",
          "Opportunity to develop incident response skills"
        ],
        pros: [
          "Opportunity to learn from experienced security professionals",
          "Develop valuable technical skills",
          "Good entry point into the cybersecurity field"
        ],
        cons: [
          "Can involve shift work and on-call duties",
          "May be repetitive at times",
          "Can be stressful during security incidents"
        ],
        package: {
          entry_level: "$55,000 - $85,000 per year",
          after_5_years: "$80,000 - $130,000+ per year (with experience and potentially moving into a lead analyst role)"
        },
        work_life_balance_rating: "3/5 (Shift work is common in SOC roles. Work-life balance can be challenging.)",
        how_ssoc_participation_helps: "Your SSOC participation demonstrates teamwork and collaboration skills.  These are vital in a SOC environment where analysts must work together to identify and respond to threats."
      },
      {
        role: "IT Support Specialist (with a Cybersecurity Focus)",
        description: "Start as a general IT support specialist but proactively seek opportunities to handle security-related tasks, eventually specializing in security. Your Google certificate provides a foundation. The SSOC participation shows that you're willing to learn and contribute.",
        eligibility_criteria: [
          "Associate's degree or equivalent experience",
          "CompTIA A+ or similar certifications",
          "Strong troubleshooting skills",
          "Interest in cybersecurity"
        ],
        perks: [
          "Entry point into the IT field",
          "Opportunity to learn about a wide range of technologies",
          "Good career progression opportunities"
        ],
        pros: [
          "Relatively easy to get started",
          "Develop a broad skillset",
          "Can transition into more specialized roles"
        ],
        cons: [
          "Can be repetitive at times",
          "May require dealing with challenging customers",
          "Cybersecurity responsibilities may be limited initially"
        ],
        package: {
          entry_level: "$40,000 - $60,000 per year",
          after_5_years: "$60,000 - $90,000+ (with a specialization in cybersecurity)"
        },
        work_life_balance_rating: "3.5/5 (Generally good, but can vary depending on the company and workload.)",
        how_ssoc_participation_helps: "SSOC shows your dedication to learning, collaboration, and problem-solving, valuable assets when providing IT support and addressing user concerns."
      }
    ],
    next_steps: [
      "Consider obtaining further certifications such as CompTIA Security+ or Certified Ethical Hacker (CEH).",
      "Network with cybersecurity professionals through online communities or local events.",
      "Build a portfolio of security projects to demonstrate your skills.  This could involve setting up a home lab, participating in Capture the Flag (CTF) competitions, or contributing to open-source security projects.",
      "Tailor your resume to highlight your cybersecurity skills and experience."
    ]
  };
};

export const CareerWizard = () => {
  const [credentials, setCredentials] = useState<UserCredential[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [processingStep, setProcessingStep] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [careerSuggestions, setCareerSuggestions] = useState<CareerResponse | null>(null);
  const [activeTab, setActiveTab] = useState<string>("credentials");
  const [error, setError] = useState<string | null>(null);

  // Load credentials
  useEffect(() => {
    const loadCredentials = async () => {
      setIsLoading(true);
      setProcessingStep(1);
      setStartTime(Date.now());
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Load from localStorage or use mock data
        const storedCredentials = localStorage.getItem('userCredentials');
        const parsedCredentials = storedCredentials 
          ? JSON.parse(storedCredentials) 
          : mockCredentials;
        
        setCredentials(parsedCredentials);
        // Save to localStorage for other components to use
        localStorage.setItem('userCredentials', JSON.stringify(parsedCredentials));
        
        setError(null);
        toast.success("Credentials loaded successfully");
      } catch (err) {
        console.error("Error loading credentials:", err);
        setError("Failed to load credentials. Please try again.");
        toast.error("Failed to load credentials");
      } finally {
        setIsLoading(false);
        setProcessingStep(0);
      }
    };
    
    loadCredentials();
  }, []);

  // Toggle selection of all credentials
  const toggleAllCredentials = (selected: boolean) => {
    setCredentials(prev => 
      prev.map(cred => ({
        ...cred,
        isSelected: selected
      }))
    );
  };

  // Toggle selection of a single credential
  const toggleCredential = (id: string, selected: boolean) => {
    setCredentials(prev => 
      prev.map(cred => 
        cred.id === id 
          ? { ...cred, isSelected: selected } 
          : cred
      )
    );
  };

  // Add notes to a credential
  const addNotes = (id: string, notes: string) => {
    setCredentials(prev => 
      prev.map(cred => 
        cred.id === id 
          ? { ...cred, notes } 
          : cred
      )
    );
  };

  // Analyze credentials and get career suggestions
  const analyzeAndGetSuggestions = async () => {
    setIsAnalyzing(true);
    setCareerSuggestions(null);
    setActiveTab("processing");
    setError(null);
    
    try {
      // Step 1: Analyze credentials
      setProcessingStep(1);
      setStartTime(Date.now());
      toast.info("Analyzing your credentials...", {
        id: "analyze-step-1"
      });
      const selectedCredentials = await analyzeCredentials(credentials);
      
      if (selectedCredentials.length === 0) {
        toast.error("Please select at least one credential");
        setIsAnalyzing(false);
        setActiveTab("credentials");
        return;
      }
      
      // Step 2: Get career suggestions
      setProcessingStep(2);
      setStartTime(Date.now());
      toast.info("Generating career suggestions...", {
        id: "analyze-step-2"
      });
      const aiResults = await getCareerSuggestions(selectedCredentials);
      
      // Step 3: Generate insights
      setProcessingStep(3);
      setStartTime(Date.now());
      toast.info("Finalizing recommendations...", {
        id: "analyze-step-3"
      });
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCareerSuggestions(aiResults);
      setActiveTab("results");
      toast.success("Career analysis complete!", {
        description: `Found ${aiResults.career_suggestions.length} career paths that match your credentials.`
      });
    } catch (err) {
      console.error("Error analyzing credentials:", err);
      setError("Failed to analyze credentials. Please try again.");
      toast.error("Analysis failed", {
        description: "Please try again or contact support if the issue persists."
      });
    } finally {
      setIsAnalyzing(false);
      setProcessingStep(0);
    }
  };

  // Retry analysis
  const retryAnalysis = () => {
    setError(null);
    setActiveTab("credentials");
  };

  return (
    <div className="space-y-8">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="credentials" disabled={isAnalyzing}>
            Select Credentials
          </TabsTrigger>
          <TabsTrigger value="processing" disabled={!isAnalyzing}>
            Processing
          </TabsTrigger>
          <TabsTrigger value="results" disabled={!careerSuggestions}>
            Career Suggestions
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="credentials" className="mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Your Credentials</CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-muted-foreground">Select All</span>
                <Switch 
                  checked={credentials.length > 0 && credentials.every(c => c.isSelected)}
                  onCheckedChange={toggleAllCredentials}
                />
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex justify-center items-center h-40">
                  <AnimatedLoader size="lg" />
                </div>
              ) : error ? (
                <div className="text-center p-6">
                  <p className="text-destructive mb-4">{error}</p>
                  <Button onClick={() => window.location.reload()}>Retry</Button>
                </div>
              ) : credentials.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2">
                  {credentials.map((credential) => (
                    <CredentialCard 
                      key={credential.id}
                      credential={credential}
                      onToggle={toggleCredential}
                      onAddNotes={addNotes}
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center p-6">
                  <p className="text-muted-foreground">No credentials found.</p>
                </div>
              )}
              
              <div className="mt-6 flex justify-center">
                <Button 
                  size="lg"
                  onClick={analyzeAndGetSuggestions}
                  disabled={isLoading || isAnalyzing || credentials.every(c => !c.isSelected)}
                >
                  {isAnalyzing ? (
                    <>
                      <AnimatedLoader size="sm" className="mr-2" />
                      Analyzing...
                    </>
                  ) : (
                    "Analyze Career Options"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="processing" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Analyzing Your Career Options</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="py-10">
                <ProcessStatus 
                  step={processingStep} 
                  startTime={startTime}
                  error={error}
                  onRetry={retryAnalysis}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="results" className="mt-6">
          {careerSuggestions ? (
            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {careerSuggestions.career_suggestions.map((suggestion, index) => (
                  <CareerSuggestionCard key={index} suggestion={suggestion} />
                ))}
              </div>
              
              <NextStepsCard nextSteps={careerSuggestions.next_steps} />
              
              <div className="flex justify-center">
                <Button 
                  variant="outline" 
                  className="mr-4"
                  onClick={() => setActiveTab("credentials")}
                >
                  Back to Credentials
                </Button>
                <Button onClick={() => window.print()}>
                  Export Results
                </Button>
              </div>
            </div>
          ) : (
            <Card className="text-center py-8">
              <CardContent>
                <p className="text-muted-foreground">No results to display. Please analyze your credentials first.</p>
                <Button 
                  className="mt-4" 
                  onClick={() => setActiveTab("credentials")}
                >
                  Back to Credentials
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
