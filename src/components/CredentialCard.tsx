
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Credential, UserCredential } from "@/types";
import { Award, Calendar, Pencil } from "lucide-react";

interface CredentialCardProps {
  credential: UserCredential | Credential;
  onToggle: (id: string | number, selected: boolean) => void;
  onAddNotes: (id: string | number, notes: string) => void;
}

const CredentialCard = ({ 
  credential, 
  onToggle, 
  onAddNotes 
}: CredentialCardProps) => {
  const [showNotes, setShowNotes] = useState(false);
  const [notes, setNotes] = useState(credential.notes || "");
  
  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNotes(e.target.value);
  };
  
  const handleSaveNotes = () => {
    onAddNotes(credential.id, notes);
    setShowNotes(false);
  };
  
  return (
    <Card className="h-full transition-shadow hover:shadow-md">
      <CardHeader className="pb-2 flex flex-row items-start justify-between">
        <div>
          <CardTitle className="text-lg font-medium">{credential.name}</CardTitle>
        </div>
        <Switch 
          checked={credential.isSelected ?? false} 
          onCheckedChange={(checked) => onToggle(credential.id, checked)}
        />
      </CardHeader>
      <CardContent className="pb-2">
        <div className="text-sm text-muted-foreground mb-1">
          <Award className="h-4 w-4 inline-block mr-1" />
          {credential.issuer}
        </div>
        {credential.year && (
          <div className="text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 inline-block mr-1" />
            {credential.year}
          </div>
        )}
        {credential.skills && credential.skills.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {credential.skills.map((skill, index) => (
              <span 
                key={index} 
                className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
        
        {showNotes ? (
          <div className="mt-4 space-y-2">
            <Textarea 
              placeholder="Add notes about this credential..." 
              value={notes}
              onChange={handleNotesChange}
              className="min-h-[80px]"
            />
            <div className="flex justify-end space-x-2">
              <Button 
                size="sm" 
                variant="outline" 
                onClick={() => setShowNotes(false)}
              >
                Cancel
              </Button>
              <Button 
                size="sm" 
                onClick={handleSaveNotes}
              >
                Save
              </Button>
            </div>
          </div>
        ) : credential.notes ? (
          <div className="mt-3 p-2 bg-muted rounded-md text-sm">
            <p className="font-medium mb-1">Notes:</p>
            <p className="text-muted-foreground">{credential.notes}</p>
          </div>
        ) : null}
      </CardContent>
      <CardFooter>
        {!showNotes && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center" 
            onClick={() => setShowNotes(true)}
          >
            <Pencil className="h-4 w-4 mr-1" />
            {credential.notes ? "Edit Notes" : "Add Notes"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CredentialCard;
