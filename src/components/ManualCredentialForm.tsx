import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FraudCheckResponse } from "@/types";
import { mockFraudCheck } from "@/utils/mockData";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface FormData {
  name: string;
  issuer: string;
  date: string;
  skills: string;
}

interface ManualCredentialFormProps {
  onCredentialAnalyzed: (data: FormData, analysis: FraudCheckResponse) => void;
}

const ManualCredentialForm = ({ onCredentialAnalyzed }: ManualCredentialFormProps) => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    issuer: "",
    date: new Date().toISOString().split('T')[0],
    skills: ""
  });
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.issuer) {
      toast.error("Required fields missing", {
        description: "Please fill in all required fields"
      });
      return;
    }
    
    setIsAnalyzing(true);
    try {
      // Use the credential name as the basis for fraud check
      const result = await mockFraudCheck(formData.name);
      onCredentialAnalyzed(formData, result);
      toast[result.status === "Valid" ? "success" : "error"](
        `Credential ${result.status === "Valid" ? "verified" : "suspicious"}`,
        {
          description: `Analysis complete with ${result.confidence}% confidence`
        }
      );
    } catch (error) {
      console.error("Error analyzing credential:", error);
      toast.error("Error analyzing credential");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Manual Input</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Credential Name *</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Bachelor of Computer Science"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="issuer">Issuer *</Label>
            <Input
              id="issuer"
              name="issuer"
              value={formData.issuer}
              onChange={handleChange}
              placeholder="e.g. Stanford University"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="date">Date Issued</Label>
            <Input
              id="date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="skills">Skills (comma separated)</Label>
            <Input
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="e.g. Python, Data Analysis, Machine Learning"
            />
          </div>
          
          <Button type="submit" className="w-full" disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Analyzing...
              </>
            ) : (
              "Scan for Fraud"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ManualCredentialForm;
