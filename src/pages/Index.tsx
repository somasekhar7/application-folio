import { Header } from "@/components/Header";
import { JobApplicationCard } from "@/components/JobApplicationCard";
import { AddJobDialog } from "@/components/AddJobDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Users, Clock, CheckCircle } from "lucide-react";
import heroImage from "@/assets/dashboard-hero.jpg";

// Mock data - replace with Supabase integration
const mockApplications = [
  {
    id: "1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    jobId: "REQ-2024-001",
    appliedDate: "2024-01-15",
    status: "interview" as const,
    description: "Looking for an experienced React developer to join our team. Must have 5+ years experience with modern frameworks and strong TypeScript skills.",
    additionalInfo: "Reached out via LinkedIn connection",
    resumeAttached: true,
  },
  {
    id: "2", 
    jobTitle: "Full Stack Engineer",
    company: "StartupXYZ",
    jobId: "ENG-2024-05",
    appliedDate: "2024-01-12",
    status: "pending" as const,
    description: "Join our fast-growing startup building the next generation of fintech products. Looking for someone passionate about React and Node.js.",
    resumeAttached: true,
  },
  {
    id: "3",
    jobTitle: "React Developer",
    company: "Digital Agency Pro",
    jobId: "DEV-456",
    appliedDate: "2024-01-10",
    status: "offer" as const,
    description: "Remote-first company seeking a React developer for client projects. Strong communication skills required.",
    additionalInfo: "Salary negotiation in progress",
    resumeAttached: true,
  },
];

const Index = () => {
  const totalApplications = mockApplications.length;
  const pendingApplications = mockApplications.filter(app => app.status === "pending").length;
  const interviewsScheduled = mockApplications.filter(app => app.status === "interview").length;
  const offersReceived = mockApplications.filter(app => app.status === "offer").length;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-hero py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={heroImage} 
            alt="Professional dashboard"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-6 relative">
          <div className="text-center text-white">
            <h1 className="text-5xl font-bold mb-6">Track Your Career Journey</h1>
            <p className="text-xl mb-8 opacity-90">
              Keep all your job applications organized in one place
            </p>
            <AddJobDialog />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <Card className="bg-gradient-card shadow-card border-0">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Total Applications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{totalApplications}</div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card border-0">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
                  <Clock className="h-4 w-4 mr-2" />
                  Pending
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-foreground">{pendingApplications}</div>
                  <Badge className="bg-warning text-warning-foreground">Waiting</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card border-0">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
                  <Users className="h-4 w-4 mr-2" />
                  Interviews
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-foreground">{interviewsScheduled}</div>
                  <Badge className="bg-accent text-accent-foreground">Scheduled</Badge>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-card shadow-card border-0">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center text-sm font-medium text-muted-foreground">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Offers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-foreground">{offersReceived}</div>
                  <Badge className="bg-success text-success-foreground">Received</Badge>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Applications Grid */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Your Applications</h2>
              <AddJobDialog />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockApplications.map((application) => (
                <JobApplicationCard 
                  key={application.id} 
                  application={application} 
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
