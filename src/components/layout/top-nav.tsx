"use client";

import { useState } from "react";
import { Search, Bell, User, PlusCircle, AlertCircle, AlertTriangle, Info, LogOut, Settings, UserCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ALERTS } from "@/lib/mock-data";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useAuth, useUser } from "@/firebase";
import { signOut } from "firebase/auth";
import { CreateProgramDialog } from "@/components/programs/create-program-dialog";

export function TopNav() {
  const { toast } = useToast();
  const auth = useAuth();
  const { user } = useUser();
  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed Out",
        description: "You have been successfully logged out.",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Logout Failed",
        description: "Could not log out. Please try again.",
      });
    }
  };

  const handleAction = (action: string) => {
    if (action === "New Program") {
      setCreateDialogOpen(true);
      return;
    }
    
    toast({
      title: "Action Initiated",
      description: `Opening interface for: ${action}`,
    });
  };

  return (
    <header className="flex h-16 items-center justify-between glass-nav px-8">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search parts, POs, projects..."
            className="pl-9 h-10 border-none bg-secondary/50 focus-visible:ring-primary/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="hidden md:flex gap-2 border-primary/20 hover:bg-primary/5 transition-all">
              <PlusCircle className="h-4 w-4 text-primary" />
              Quick Action
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 glass-card p-2">
            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Manufacturing Actions</DropdownMenuLabel>
            <DropdownMenuSeparator className="mx-1" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="rounded-md focus:bg-primary/10" onClick={() => handleAction("New Program")}>
                Create New Program
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-md focus:bg-primary/10" onClick={() => handleAction("New NCR")}>
                Log Quality Incident (NCR)
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-md focus:bg-primary/10" onClick={() => handleAction("New PO")}>
                Raise Purchase Order
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-md focus:bg-primary/10" onClick={() => handleAction("Shift Log")}>
                Start Shift Handover
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-secondary transition-all">
              <Bell className="h-5 w-5 text-muted-foreground" />
              {ALERTS.length > 0 && (
                <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-destructive border-2 border-white ring-2 ring-white/50" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 glass-card p-0 overflow-hidden">
            <div className="p-4 border-b bg-secondary/20">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">Real-time Telemetry</h3>
                <span className="text-[10px] font-bold uppercase text-primary hover:text-primary/70 transition-colors cursor-pointer">Mark all read</span>
              </div>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {ALERTS.map((alert) => (
                <div key={alert.id} className="p-4 border-b last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer group">
                  <div className="flex gap-4">
                    <div className={cn(
                      "mt-0.5 flex h-8 w-8 items-center justify-center rounded-lg shrink-0 shadow-sm",
                      alert.type === 'critical' ? "bg-rose-500 text-white" :
                      alert.type === 'warning' ? "bg-amber-500 text-white" : "bg-blue-500 text-white"
                    )}>
                      {alert.type === 'critical' ? <AlertCircle className="h-4 w-4" /> :
                       alert.type === 'warning' ? <AlertTriangle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold text-foreground">{alert.title}</p>
                        <span className="text-[9px] text-muted-foreground font-medium">{alert.time}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">{alert.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 border-t bg-secondary/10">
              <Button variant="ghost" size="sm" className="w-full text-[11px] font-semibold text-muted-foreground uppercase tracking-widest">
                View Operational Logs
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 p-1 pl-3 hover:bg-secondary/50 rounded-full transition-all">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-foreground">Ratan Kollabathula</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">Operations Manager</p>
              </div>
              <Avatar className="h-9 w-9 border-2 border-white shadow-md ring-1 ring-secondary/50">
                <AvatarImage src={`https://picsum.photos/seed/${user?.uid || 'ratan'}/200`} alt="Ratan Kollabathula" />
                <AvatarFallback className="bg-primary text-white font-bold">RK</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 glass-card p-2">
            <DropdownMenuLabel className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Account Controls</DropdownMenuLabel>
            <DropdownMenuSeparator className="mx-1" />
            <DropdownMenuGroup>
              <DropdownMenuItem className="rounded-md gap-3 py-2.5" onClick={() => toast({ title: "Profile", description: "Opening your profile settings..." })}>
                <UserCircle className="h-4 w-4 text-muted-foreground" /> Profile Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-md gap-3 py-2.5" onClick={() => toast({ title: "Security", description: "Navigating to security hub..." })}>
                <Settings className="h-4 w-4 text-muted-foreground" /> Security & Access
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="mx-1" />
            <DropdownMenuItem className="text-destructive font-semibold rounded-md gap-3 py-2.5" onClick={handleLogout}>
              <LogOut className="h-4 w-4" /> Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CreateProgramDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />
    </header>
  );
}
