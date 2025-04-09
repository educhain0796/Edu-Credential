
import { Credential, FraudCheckResponse } from "@/types";
import { 
  Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle 
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, AlertCircle, Award, Calendar, User, ThumbsUp, ThumbsDown, Clock,
  FileType, Download 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface CredentialDetailProps {
  credential: Credential;
}

// Mock analysis for the credential detail
const getMockAnalysis = (fraudStatus: "Valid" | "Suspicious"): FraudCheckResponse => {
  if (fraudStatus === "Valid") {
    return {
      status: "Valid",
      confidence: Math.floor(Math.random() * 20) + 80, // 80-100% confidence
      analysis: {
        watermark: true,
        signature: true,
        textConsistency: true,
        issuerVerified: true
      }
    };
  } else {
    return {
      status: "Suspicious",
      confidence: Math.floor(Math.random() * 30) + 50, // 50-80% confidence
      analysis: {
        watermark: false,
        signature: Math.random() > 0.5,
        textConsistency: false,
        issuerVerified: false
      }
    };
  }
};

// Generate mock voting data
const getMockVotingData = (score: number) => {
  const upvotes = Math.round((score / 100) * 30); // Scale up to 30 based on score
  const downvotes = Math.round(((100 - score) / 100) * 10); // Scale up to 10 based on inversed score
  return { upvotes, downvotes };
};

const CredentialDetail = ({ credential }: CredentialDetailProps) => {
  const { name, issuer, date, fraudStatus, score, image } = credential;
  const analysis = getMockAnalysis(fraudStatus);
  const { upvotes, downvotes } = getMockVotingData(score);
  
  // Calculate time decay
  const issuedDate = new Date(date);
  const now = new Date();
  const monthsDiff = (now.getFullYear() - issuedDate.getFullYear()) * 12 + 
                     (now.getMonth() - issuedDate.getMonth());
  const timeDecay = monthsDiff > 0 ? -Math.min(monthsDiff * 0.5, 20) : 0; // -0.5% per month, max -20%
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <CardTitle className="text-2xl">{name}</CardTitle>
              <CardDescription className="flex items-center mt-1">
                <Award className="h-4 w-4 mr-1" />
                {issuer}
              </CardDescription>
            </div>
            <Badge 
              variant={fraudStatus === "Valid" ? "default" : "destructive"}
              className="flex items-center gap-1 text-sm h-6 px-3"
            >
              {fraudStatus === "Valid" ? 
                <CheckCircle className="h-3 w-3" /> : 
                <AlertCircle className="h-3 w-3" />
              }
              {fraudStatus}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="bg-muted rounded-lg overflow-hidden mb-4">
                <img 
                  src={image || "/placeholder.svg"} 
                  alt={name} 
                  className="w-full h-48 object-contain"
                />
              </div>
              <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(date).toLocaleDateString('en-US', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <div className="flex items-center">
                  <FileType className="h-4 w-4 mr-1" />
                  PDF
                </div>
              </div>
              <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                <Download className="h-4 w-4" />
                Download Certificate
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2">Fraud Analysis</h3>
                <ul className="space-y-2">
                  <li className="flex items-center justify-between">
                    <span>Watermark Detection</span>
                    {analysis.analysis.watermark ? 
                      <Badge variant="outline" className="bg-green-50 text-green-700">Verified</Badge> :
                      <Badge variant="outline" className="bg-red-50 text-red-700">Not Found</Badge>
                    }
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Digital Signature</span>
                    {analysis.analysis.signature ? 
                      <Badge variant="outline" className="bg-green-50 text-green-700">Verified</Badge> :
                      <Badge variant="outline" className="bg-red-50 text-red-700">Invalid</Badge>
                    }
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Text Consistency</span>
                    {analysis.analysis.textConsistency ? 
                      <Badge variant="outline" className="bg-green-50 text-green-700">Consistent</Badge> :
                      <Badge variant="outline" className="bg-red-50 text-red-700">Inconsistent</Badge>
                    }
                  </li>
                  <li className="flex items-center justify-between">
                    <span>Issuer Verification</span>
                    {analysis.analysis.issuerVerified ? 
                      <Badge variant="outline" className="bg-green-50 text-green-700">Verified</Badge> :
                      <Badge variant="outline" className="bg-red-50 text-red-700">Not Verified</Badge>
                    }
                  </li>
                </ul>
              </div>
              
              <Separator />
              
              <div>
                <h3 className="font-medium mb-3">Trust Score Breakdown</h3>
                <ul className="space-y-3">
                  <li>
                    <div className="flex justify-between items-center mb-1">
                      <span className="flex items-center">
                        <User className="h-4 w-4 mr-1" />
                        Issuer Reputation
                      </span>
                      <span className="font-medium">+45</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                    </div>
                  </li>
                  <li>
                    <div className="flex justify-between items-center mb-1">
                      <span className="flex items-center">
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Employer DAO Votes
                      </span>
                      <span className="font-medium">+{upvotes - downvotes}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <span className="flex items-center text-green-600">
                        <ThumbsUp className="h-3 w-3 mr-1" />
                        {upvotes}
                      </span>
                      <span className="flex items-center text-red-600">
                        <ThumbsDown className="h-3 w-3 mr-1" />
                        {downvotes}
                      </span>
                    </div>
                  </li>
                  <li>
                    <div className="flex justify-between items-center mb-1">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        Time Decay
                      </span>
                      <span className="font-medium text-red-600">{timeDecay}%</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <h3 className="font-medium mb-2">Overall Trust Score</h3>
          <div className="w-full">
            <div className="flex justify-between items-center mb-1">
              <span>Score</span>
              <span className="font-medium">{score}/100</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full ${
                  score >= 75 ? 'bg-green-500' : 
                  score >= 50 ? 'bg-yellow-500' : 
                  'bg-red-500'
                }`} 
                style={{ width: `${score}%` }}
              ></div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CredentialDetail;
