
"use client";

import { useState } from "react";
import { Search, Bell, User, PlusCircle, AlertCircle, AlertTriangle, Info, LogOut, Settings, UserCircle, Shield, Loader2 } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";

export function TopNav() {
  const { toast } = useToast();
  const auth = useAuth();
  const { user, profile } = useUser();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast({ title: "Signed Out", description: "Session closed successfully." });
    } catch (error) {
      toast({ variant: "destructive", title: "Logout Failed" });
    }
  };

  const handleAction = (action: string) => {
    // Simulate active processing for system operations
    toast({ 
      title: "Executing Command", 
      description: `Initiating ${action} sequence...`,
    });
    
    setTimeout(() => {
      toast({ 
        title: "Action Recorded", 
        description: `${action} has been logged in the system audit.`,
      });
    }, 1500);
  };

  return (
    <header className="flex h-16 items-center justify-between glass-nav px-8 border-b border-white/5">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search telemetry, parts, projects..."
            className="pl-9 h-10 border-none bg-white/5 rounded-xl focus-visible:ring-primary/30"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {profile?.role === 'owner' && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden md:flex gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10 rounded-xl transition-all">
                <PlusCircle className="h-4 w-4 text-primary" />
                <span className="font-bold">Operations</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-64 glass-card p-2 border-white/10">
              <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Master Control</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-white/5" />
              <DropdownMenuGroup>
                <DropdownMenuItem className="rounded-lg focus:bg-primary/20 text-sm font-medium cursor-pointer" onClick={() => handleAction("Quality Incident")}>
                  Log Quality Incident
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg focus:bg-primary/20 text-sm font-medium cursor-pointer" onClick={() => handleAction("Supply Chain Audit")}>
                  Initiate Supply Audit
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg focus:bg-primary/20 text-sm font-medium cursor-pointer" onClick={() => handleAction("Emergency Stop")}>
                  Trigger Emergency Stop
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-white/5 rounded-xl transition-all">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 glass-card p-0 border-white/10">
            <div className="p-4 border-b border-white/5 bg-white/5">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-xs uppercase tracking-widest">Active Alerts</h3>
                <Badge variant="secondary" className="text-[9px] h-4">Live</Badge>
              </div>
            </div>
            <div className="max-h-[300px] overflow-y-auto">
              {ALERTS.map((alert) => (
                <div key={alert.id} className="p-4 border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors cursor-pointer">
                  <div className="flex gap-3">
                    <div className={cn(
                      "mt-0.5 flex h-7 w-7 items-center justify-center rounded-lg shrink-0",
                      alert.type === 'critical' ? "bg-rose-500/20 text-rose-500" :
                      alert.type === 'warning' ? "bg-amber-500/20 text-amber-500" : "bg-primary/20 text-primary"
                    )}>
                      {alert.type === 'critical' ? <AlertCircle className="h-4 w-4" /> :
                       alert.type === 'warning' ? <AlertTriangle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                    </div>
                    <div className="space-y-0.5">
                      <p className="text-xs font-bold">{alert.title}</p>
                      <p className="text-[10px] text-muted-foreground line-clamp-2">{alert.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 p-1 pl-3 hover:bg-white/5 rounded-xl transition-all">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-white uppercase tracking-tighter">
                  {profile?.firstName || 'User'} {profile?.lastName || ''}
                </p>
                <div className="flex items-center justify-end gap-1">
                  {profile?.role === 'owner' && <Shield className="h-2 w-2 text-primary" />}
                  <span className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.15em]">
                    {profile?.role || 'Guest'}
                  </span>
                </div>
              </div>
              <Avatar className="h-10 w-10 border border-white/10 rounded-xl">
                <AvatarImage src={`https://picsum.photos/seed/${user?.uid || 'ratan'}/200`} />
                <AvatarFallback className="bg-primary text-white font-black text-xs">RK</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64 glass-card p-2 border-white/10">
            <DropdownMenuLabel className="px-2 py-1.5 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Session Control</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem className="text-rose-500 focus:bg-rose-500/10 font-bold rounded-lg py-2.5 cursor-pointer" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" /> Terminate Session
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
