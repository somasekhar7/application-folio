import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AddJobDialog = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Application Added",
      description: "Your job application has been saved successfully.",
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-primary hover:shadow-hover transition-all duration-300">
          <Plus className="h-4 w-4 mr-2" />
          Add New Application
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Add Job Application</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input 
                id="jobTitle" 
                placeholder="Software Engineer" 
                required 
                className="focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company">Company Name</Label>
              <Input 
                id="company" 
                placeholder="Tech Corp Inc." 
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
                placeholder="REQ-2024-001" 
                required 
                className="focus:ring-primary"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="appliedDate">Applied Date</Label>
              <Input 
                id="appliedDate" 
                type="date" 
                required 
                className="focus:ring-primary"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="status">Application Status</Label>
            <Select defaultValue="pending">
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
              placeholder="Brief description of the role and requirements..."
              className="min-h-[100px] focus:ring-primary" 
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="additionalInfo">Additional Notes (Optional)</Label>
            <Textarea 
              id="additionalInfo" 
              placeholder="Any additional information about the application..."
              className="focus:ring-primary"
            />
          </div>
          
          <div className="space-y-2">
            <Label>Resume Upload</Label>
            <div className="border-2 border-dashed border-muted rounded-lg p-6 text-center hover:border-primary transition-colors">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-2">
                Drag and drop your resume or click to browse
              </p>
              <Button type="button" variant="outline" size="sm">
                Choose File
              </Button>
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