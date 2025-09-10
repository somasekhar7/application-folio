import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface JobApplication {
  id: string;
  jobTitle: string;
  company: string;
  jobId: string;
  appliedDate: string;
  status: "pending" | "interview" | "rejected" | "offer";
  description: string;
  additionalInfo?: string;
  resumeAttached: boolean;
  cvAttached?: boolean;
}

interface AddJobDialogProps {
  onAdd?: (application: Omit<JobApplication, 'id'>) => void;
}

export const AddJobDialog = ({ onAdd }: AddJobDialogProps) => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  // Form state
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [jobId, setJobId] = useState("");
  const [appliedDate, setAppliedDate] = useState("");
  const [status, setStatus] = useState<"pending" | "interview" | "rejected" | "offer">("pending");
  const [description, setDescription] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newApplication = {
      jobTitle,
      company,
      jobId,
      appliedDate,
      status,
      description,
      additionalInfo,
      resumeAttached: !!resumeFile,
      cvAttached: !!cvFile,
    };

    if (onAdd) {
      onAdd(newApplication);
    }
    
    toast({
      title: "Application saved!",
      description: "Your job application has been successfully added to your dashboard.",
    });
    
    setOpen(false);
    // Reset form
    setJobTitle("");
    setCompany("");
    setJobId("");
    setAppliedDate("");
    setStatus("pending");
    setDescription("");
    setAdditionalInfo("");
    setResumeFile(null);
    setCvFile(null);
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };

  const handleCvUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCvFile(e.target.files[0]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary hover:shadow-hover transition-all duration-300">
          <Plus className="h-4 w-4 mr-2" />
          Add New Application
        </Button>
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Job Application</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input 
                id="jobTitle" 
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="e.g. Senior Frontend Developer" 
                required 
                className="focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company Name *</Label>
              <Input 
                id="company" 
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="e.g. Google" 
                required 
                className="focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobId">Job ID</Label>
              <Input 
                id="jobId" 
                value={jobId}
                onChange={(e) => setJobId(e.target.value)}
                placeholder="e.g. REQ-2024-001" 
                className="focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="appliedDate">Applied Date *</Label>
              <Input 
                id="appliedDate" 
                type="date" 
                value={appliedDate}
                onChange={(e) => setAppliedDate(e.target.value)}
                required 
                className="focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Application Status</Label>
            <Select value={status} onValueChange={(value: "pending" | "interview" | "rejected" | "offer") => setStatus(value)}>
              <SelectTrigger className="focus:ring-primary">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="interview">Interview</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="offer">Offer</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Job Description</Label>
            <Textarea 
              id="description" 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Paste the job description here..."
              className="min-h-[100px] focus:ring-primary" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Notes (Optional)</Label>
            <Textarea 
              id="additionalInfo" 
              value={additionalInfo}
              onChange={(e) => setAdditionalInfo(e.target.value)}
              placeholder="Any additional information about this application..."
              className="focus:ring-primary"
            />
          </div>
          
          {/* Resume Upload */}
          <div className="space-y-4">
            <Label>Resume Upload</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <div className="space-y-2">
                  <Label htmlFor="resume" className="cursor-pointer">
                    <span className="text-sm font-medium text-primary hover:underline">
                      {resumeFile ? resumeFile.name : 'Click to upload resume'}
                    </span>
                    <Input
                      id="resume"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleResumeUpload}
                      className="hidden"
                    />
                  </Label>
                  <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (max 5MB)</p>
                </div>
              </div>
            </div>
          </div>

          {/* CV Upload */}
          <div className="space-y-4">
            <Label>CV Upload (Optional)</Label>
            <div className="border-2 border-dashed border-border rounded-lg p-6">
              <div className="text-center">
                <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <div className="space-y-2">
                  <Label htmlFor="cv" className="cursor-pointer">
                    <span className="text-sm font-medium text-primary hover:underline">
                      {cvFile ? cvFile.name : 'Click to upload CV'}
                    </span>
                    <Input
                      id="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleCvUpload}
                      className="hidden"
                    />
                  </Label>
                  <p className="text-xs text-muted-foreground">PDF, DOC, DOCX (max 5MB)</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-primary hover:shadow-hover">
              Save Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};