
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, Check, AlertCircle } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

const Payroll = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadStatus('idle');
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a payroll file to upload",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    
    // Simulate file upload
    setTimeout(() => {
      setIsUploading(false);
      setUploadStatus('success');
      
      toast({
        title: "Payroll uploaded",
        description: "Your payroll data has been processed successfully.",
      });
    }, 2000);
  };

  const resetUpload = () => {
    setFile(null);
    setUploadStatus('idle');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Payroll Upload</h1>
        <p className="text-muted-foreground">Upload payroll information for advance processing</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Upload Payroll Data</CardTitle>
              <CardDescription>
                Upload your payroll spreadsheet to process employee advances
              </CardDescription>
            </CardHeader>
            <CardContent>
              {uploadStatus === 'success' ? (
                <div className="flex flex-col items-center justify-center py-10">
                  <div className="rounded-full bg-green-100 p-3 mb-4">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium">Upload Successful</h3>
                  <p className="text-muted-foreground text-center mt-2 mb-4">
                    Your payroll data has been processed successfully.
                  </p>
                  <div className="flex items-center justify-center bg-gray-50 rounded-lg p-4 w-full max-w-md">
                    <FileText className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm font-medium truncate">
                      {file?.name}
                    </span>
                  </div>
                  <Button onClick={resetUpload} className="mt-6">
                    Upload Another File
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div 
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center ${
                      file ? 'border-primary bg-primary/5' : 'border-gray-300'
                    }`}
                  >
                    <div className={`rounded-full p-3 mb-4 ${
                      file ? 'bg-primary/10' : 'bg-gray-100'
                    }`}>
                      <Upload className={`h-6 w-6 ${
                        file ? 'text-primary' : 'text-gray-500'
                      }`} />
                    </div>
                    
                    {file ? (
                      <div className="text-center">
                        <p className="text-sm font-medium mb-1">File selected:</p>
                        <p className="text-sm mb-4 font-medium text-primary">{file.name}</p>
                        <div className="text-xs text-muted-foreground">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-sm font-medium mb-1">
                          Drag and drop your file, or click to browse
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Supports CSV, XLSX up to 10MB
                        </p>
                      </div>
                    )}
                    
                    <input 
                      type="file" 
                      id="payroll-file" 
                      accept=".csv,.xlsx" 
                      className="hidden"
                      onChange={handleFileChange}
                    />
                    <label htmlFor="payroll-file">
                      <Button 
                        variant="outline" 
                        className="mt-4 cursor-pointer"
                      >
                        {file ? 'Change File' : 'Select File'}
                      </Button>
                    </label>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      onClick={handleUpload} 
                      disabled={!file || isUploading} 
                      className="flex items-center gap-2"
                    >
                      {isUploading ? (
                        <>Processing...</>
                      ) : (
                        <>Upload and Process</>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upload Guidelines</CardTitle>
              <CardDescription>
                Ensure your file meets these requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>File must be in CSV or XLSX format</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Include columns for employee ID, name, salary amount and payment date</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Maximum file size is 10MB</span>
                </li>
                <li className="flex items-start">
                  <Check className="h-4 w-4 text-green-500 mr-2 mt-0.5" />
                  <span>Ensure employee IDs match your registered employees</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-amber-500 mr-2 mt-0.5" />
                  <span>Advances will be processed based on eligibility rules</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                Download Template
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>Recent Uploads</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { name: 'May 2025 Payroll.xlsx', date: '14 May, 2025', status: 'Processed' },
                  { name: 'April 2025 Payroll.xlsx', date: '10 Apr, 2025', status: 'Processed' }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 text-sm border-b last:border-0">
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 text-gray-500 mr-2" />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.date}</p>
                      </div>
                    </div>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
