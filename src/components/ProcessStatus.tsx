
import React, { useState, useEffect } from "react";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import AnimatedLoader from "@/components/AnimatedLoader";

interface ProcessStatusProps {
  step: number;
  startTime: number;
  error: string | null;
  onRetry: () => void;
}

const ProcessStatus = ({ step, startTime, error, onRetry }: ProcessStatusProps) => {
  const [elapsedTime, setElapsedTime] = useState(0);
  
  useEffect(() => {
    if (step > 0 && startTime > 0) {
      const timer = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [step, startTime]);
  
  const steps = [
    { id: 1, label: "Fetching credentials" },
    { id: 2, label: "Analyzing with AI" },
    { id: 3, label: "Generating insights" },
  ];
  
  const getProgressValue = () => {
    if (step === 0) return 0;
    return (step / steps.length) * 100;
  };
  
  return (
    <div className="space-y-8">
      <div className="relative">
        <Progress value={getProgressValue()} className="h-2" />
        
        <div className="mt-8 space-y-6">
          {steps.map((s) => (
            <div key={s.id} className="flex items-center">
              <div className="flex-shrink-0 mr-4">
                {step > s.id ? (
                  <CheckCircle className="h-6 w-6 text-green-500" />
                ) : step === s.id ? (
                  error ? (
                    <AlertCircle className="h-6 w-6 text-destructive" />
                  ) : (
                    <AnimatedLoader size="sm" />
                  )
                ) : (
                  <div className="h-6 w-6 rounded-full border-2 border-muted" />
                )}
              </div>
              
              <div className="flex-grow">
                <p className={`font-medium ${step === s.id ? 'text-primary' : step > s.id ? 'text-green-500' : 'text-muted-foreground'}`}>
                  [{s.id}/{steps.length}] {s.label}
                </p>
              </div>
              
              {step === s.id && !error && (
                <div className="flex-shrink-0 flex items-center text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 mr-1" />
                  {elapsedTime}s
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {error && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-md p-4 text-center">
          <AlertCircle className="h-8 w-8 text-destructive mx-auto mb-2" />
          <p className="text-destructive mb-4">{error}</p>
          <Button onClick={onRetry}>Try Again</Button>
        </div>
      )}
    </div>
  );
};

export default ProcessStatus;
