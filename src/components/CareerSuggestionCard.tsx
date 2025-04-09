
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CareerSuggestion } from "@/types";
import { ChevronDown, ChevronUp, DollarSign, Clock, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface CareerSuggestionCardProps {
  suggestion: CareerSuggestion;
}

const CareerSuggestionCard = ({ suggestion }: CareerSuggestionCardProps) => {
  const [openSection, setOpenSection] = useState<string | null>("criteria");
  
  // Extract work-life balance rating as a number
  const wlbRating = parseFloat(suggestion.work_life_balance_rating.split("/")[0]);
  const wlbPercentage = (wlbRating / 5) * 100;
  
  const toggleSection = (section: string) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold">{suggestion.role}</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">
          {suggestion.description}
        </p>
        
        <div className="space-y-4">
          <Collapsible open={openSection === "criteria"} className="space-y-2">
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex w-full justify-between p-0 h-auto"
                onClick={() => toggleSection("criteria")}
              >
                <span className="font-medium">Eligibility Criteria</span>
                {openSection === "criteria" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              <ul className="list-disc pl-5 text-sm space-y-1">
                {suggestion.eligibility_criteria.map((item, i) => (
                  <li key={i} className="text-muted-foreground">{item}</li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
          
          <Collapsible open={openSection === "perks"} className="space-y-2">
            <CollapsibleTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex w-full justify-between p-0 h-auto"
                onClick={() => toggleSection("perks")}
              >
                <span className="font-medium">Perks</span>
                {openSection === "perks" ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-1">
              <ul className="list-disc pl-5 text-sm space-y-1">
                {suggestion.perks.map((item, i) => (
                  <li key={i} className="text-muted-foreground">{item}</li>
                ))}
              </ul>
            </CollapsibleContent>
          </Collapsible>
          
          <div className="grid grid-cols-2 gap-4">
            <Collapsible open={openSection === "pros"} className="space-y-2">
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex w-full justify-between p-0 h-auto"
                  onClick={() => toggleSection("pros")}
                >
                  <span className="font-medium text-green-600">Pros</span>
                  {openSection === "pros" ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1">
                <ul className="text-sm space-y-1">
                  {suggestion.pros.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-4 w-4 text-green-600 mr-1 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
            
            <Collapsible open={openSection === "cons"} className="space-y-2">
              <CollapsibleTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="flex w-full justify-between p-0 h-auto"
                  onClick={() => toggleSection("cons")}
                >
                  <span className="font-medium text-red-500">Cons</span>
                  {openSection === "cons" ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-1">
                <ul className="text-sm space-y-1">
                  {suggestion.cons.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <X className="h-4 w-4 text-red-500 mr-1 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </div>
          
          <div className="pt-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium">Work-Life Balance</span>
              <span className="text-sm text-muted-foreground">{suggestion.work_life_balance_rating}</span>
            </div>
            <Progress value={wlbPercentage} className="h-2" />
          </div>
          
          <div className="space-y-2 mt-4">
            <div className="flex items-center">
              <DollarSign className="h-5 w-5 text-green-600 mr-1" />
              <span className="font-medium">Salary Expectations</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xs text-muted-foreground">Entry Level</p>
                <p className="font-medium">{suggestion.package.entry_level}</p>
              </div>
              <div className="bg-muted p-2 rounded-md">
                <p className="text-xs text-muted-foreground">After 5 Years</p>
                <p className="font-medium">{suggestion.package.after_5_years}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start pt-0">
        <div className="mt-4 pt-4 border-t w-full">
          <p className="text-sm font-medium mb-1">How Your Experience Helps:</p>
          <p className="text-sm text-muted-foreground">{suggestion.how_ssoc_participation_helps}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default CareerSuggestionCard;
