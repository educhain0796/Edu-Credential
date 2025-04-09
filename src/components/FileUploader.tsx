import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, FileX, FileCheck, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { mockFraudCheck } from "@/utils/mockData";
import { FraudCheckResponse } from "@/types";

interface FileUploaderProps {
  onFileAnalyzed: (file: File, analysis: FraudCheckResponse) => void;
}

const FileUploader = ({ onFileAnalyzed }: FileUploaderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<FraudCheckResponse | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      handleFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (selectedFile: File) => {
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    
    if (!validTypes.includes(selectedFile.type)) {
      toast.error("Invalid file type", {
        description: "Please upload a PDF, PNG, or JPG file"
      });
      return;
    }
    
    setFile(selectedFile);
    setAnalysis(null);
  };

  const analyzeFile = async () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    try {
      const result = await mockFraudCheck(file.name);
      setAnalysis(result);
      onFileAnalyzed(file, result);
      toast[result.status === "Valid" ? "success" : "error"](
        `Credential ${result.status === "Valid" ? "verified" : "suspicious"}`,
        {
          description: `Analysis complete with ${result.confidence}% confidence`
        }
      );
    } catch (error) {
      console.error("Error analyzing file:", error);
      toast.error("Error analyzing credential");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setAnalysis(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragging ? "border-primary bg-primary/5" : "border-gray-300"
          }`}
        >
          <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Drag and drop your credential</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Support for PDF, PNG, and JPG files
          </p>
          <Button 
            onClick={() => fileInputRef.current?.click()}
            variant="outline"
            className="mt-2"
          >
            Browse Files
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept=".pdf,.png,.jpg,.jpeg"
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="border rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center">
              {analysis ? (
                analysis.status === "Valid" ? (
                  <FileCheck className="h-8 w-8 text-green-500 mr-3" />
                ) : (
                  <FileX className="h-8 w-8 text-red-500 mr-3" />
                )
              ) : (
                <div className="h-8 w-8 rounded-full bg-gray-200 mr-3" />
              )}
              <div>
                <h3 className="font-medium text-base">{file.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm" onClick={removeFile}>
              Remove
            </Button>
          </div>
          
          {analysis ? (
            <div className="bg-muted p-3 rounded-md mb-4">
              <p className="font-medium mb-1">Analysis Results:</p>
              <p className={`text-sm ${
                analysis.status === "Valid" ? "text-green-600" : "text-red-600"
              }`}>
                Status: {analysis.status} ({analysis.confidence}% confidence)
              </p>
            </div>
          ) : (
            <Button 
              onClick={analyzeFile} 
              className="w-full"
              disabled={isAnalyzing}
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                "Scan for Fraud"
              )}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUploader;
