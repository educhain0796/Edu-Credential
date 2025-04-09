
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface NextStepsCardProps {
  nextSteps: string[];
}

const NextStepsCard = ({ nextSteps }: NextStepsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Next Steps</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {nextSteps.map((step, index) => (
            <li key={index} className="flex items-start">
              <ArrowRight className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>{step}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default NextStepsCard;
