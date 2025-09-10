import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Calendar, FileText, MoreHorizontal } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EditJobDialog } from "@/components/EditJobDialog";
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
}

interface JobApplicationCardProps {
  application: JobApplication;
  onUpdate?: (application: JobApplication) => void;
  onDelete?: (id: string) => void;
}

const statusColors = {
  pending: "bg-warning text-warning-foreground",
  interview: "bg-accent text-accent-foreground", 
  rejected: "bg-destructive text-destructive-foreground",
  offer: "bg-success text-success-foreground"
};

export const JobApplicationCard = ({ application, onUpdate, onDelete }: JobApplicationCardProps) => {
  const { toast } = useToast();

  const handleDelete = () => {
    if (onDelete) {
      onDelete(application.id);
      toast({
        title: "Application deleted",
        description: "The job application has been removed.",
      });
    }
  };

  const handleViewResume = () => {
    toast({
      title: "Feature coming soon",
      description: "Resume viewing will be available once backend is connected.",
    });
  };

  return (
    <Card className="bg-gradient-card shadow-card hover:shadow-hover transition-all duration-300 border-0">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <h3 className="font-semibold text-lg text-foreground">{application.jobTitle}</h3>
            <div className="flex items-center text-muted-foreground text-sm">
              <Building2 className="h-4 w-4 mr-1" />
              {application.company}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={statusColors[application.status]} variant="secondary">
              {application.status}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  {onUpdate && <EditJobDialog application={application} onUpdate={onUpdate} />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleViewResume}>View Resume</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={handleDelete}>Delete</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="h-4 w-4 mr-1" />
            Applied: {new Date(application.appliedDate).toLocaleDateString()}
          </div>
          <div className="text-muted-foreground">
            ID: #{application.jobId}
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground line-clamp-2">
          {application.description}
        </p>
        
        {application.additionalInfo && (
          <p className="text-xs text-muted-foreground italic">
            Note: {application.additionalInfo}
          </p>
        )}
        
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center text-xs text-muted-foreground">
            <FileText className="h-3 w-3 mr-1" />
            {application.resumeAttached ? "Resume attached" : "No resume"}
          </div>
          <Button variant="outline" size="sm" className="text-xs">
            View Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};