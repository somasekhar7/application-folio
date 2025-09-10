import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Edit, Upload, FileText } from "lucide-react";

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

interface EditJobDialogProps {
  application: JobApplication;
  onUpdate: (application: JobApplication) => void;
}

export const EditJobDialog = ({ application, onUpdate }: EditJobDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(application);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedApplication: JobApplication = {
      ...formData,
      resumeAttached: resumeFile ? true : formData.resumeAttached,
      cvAttached: cvFile ? true : formData.cvAttached,
    };

    onUpdate(updatedApplication);
    
    toast({
      title: "Application updated!",
      description: "Your job application has been successfully updated.",
    });
    
    setOpen(false);
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
        <Button variant="ghost" size="sm">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Job Application</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title *</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                placeholder="e.g. Senior Frontend Developer"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. Google"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobId">Job ID</Label>
              <Input
                id="jobId"
                value={formData.jobId}
                onChange={(e) => setFormData({ ...formData, jobId: e.target.value })}
                placeholder="e.g. REQ-2024-001"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="appliedDate">Application Date *</Label>
              <Input
                id="appliedDate"
                type="date"
                value={formData.appliedDate}
                onChange={(e) => setFormData({ ...formData, appliedDate: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select 
              value={formData.status} 
              onValueChange={(value: "pending" | "interview" | "rejected" | "offer") => 
                setFormData({ ...formData, status: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
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
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Paste the job description here..."
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Notes</Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo || ''}
              onChange={(e) => setFormData({ ...formData, additionalInfo: e.target.value })}
              placeholder="Any additional information about this application..."
              className="min-h-[80px]"
            />
          </div>

          {/* Resume Upload */}
          <div className="space-y-4">
            <Label>Resume</Label>
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
                  {formData.resumeAttached && !resumeFile && (
                    <div className="flex items-center justify-center text-xs text-success">
                      <FileText className="h-3 w-3 mr-1" />
                      Resume currently attached
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* CV Upload */}
          <div className="space-y-4">
            <Label>CV (Optional)</Label>
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
                  {formData.cvAttached && !cvFile && (
                    <div className="flex items-center justify-center text-xs text-success">
                      <FileText className="h-3 w-3 mr-1" />
                      CV currently attached
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">
              Update Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};