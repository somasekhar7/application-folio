import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AddJobDialog } from "@/components/AddJobDialog";
import { useAuth } from "@/contexts/AuthContext";
import { Briefcase, Plus, LogOut } from "lucide-react";

export const Header = () => {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const getUserInitial = () => {
    return user?.email?.charAt(0).toUpperCase() || 'U';
  };
  return (
    <header className="bg-gradient-primary text-primary-foreground shadow-elegant">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-white/20 p-2 rounded-lg">
              <Briefcase className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">Resume Collector</h1>
              <p className="text-sm text-primary-foreground/80">Track your job applications</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <AddJobDialog />
            
            <div className="flex items-center space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" />
                <AvatarFallback className="bg-white/20 text-primary-foreground">
                  {getUserInitial()}
                </AvatarFallback>
              </Avatar>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-primary-foreground hover:bg-white/20"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};