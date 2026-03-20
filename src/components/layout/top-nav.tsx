"use client";

import { Search, Bell, User, PlusCircle, AlertCircle, AlertTriangle, Info, CheckCircle2 } from "lucide-react";
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

export function TopNav() {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    toast({
      title: "Action Initiated",
      description: `Opening interface for: ${action}`,
    });
  };

  const handleProfileItem = (item: string) => {
    toast({
      title: "Navigation",
      description: `Redirecting to ${item}...`,
    });
  };

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-8">
      <div className="flex flex-1 items-center gap-4">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search parts, POs, projects..."
            className="pl-9 h-9 border-none bg-muted/50 focus-visible:ring-1"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="hidden md:flex gap-2 border-primary/20 hover:bg-primary/5">
              <PlusCircle className="h-4 w-4 text-primary" />
              Quick Action
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Manufacturing Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => handleAction("New Program")}>
                Create New Program
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("New NCR")}>
                Log Quality Incident (NCR)
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("New PO")}>
                Raise Purchase Order
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleAction("Shift Log")}>
                Start Shift Handover
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative hover:bg-secondary">
              <Bell className="h-5 w-5 text-muted-foreground" />
              {ALERTS.length > 0 && (
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive border-2 border-white" />
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 p-0">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Recent Alerts</h3>
                <span className="text-[10px] font-bold uppercase text-primary cursor-pointer hover:underline">Mark all read</span>
              </div>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {ALERTS.map((alert) => (
                <div key={alert.id} className="p-4 border-b last:border-0 hover:bg-secondary/50 transition-colors cursor-pointer group">
                  <div className="flex gap-3">
                    <div className={cn(
                      "mt-0.5 flex h-7 w-7 items-center justify-center rounded-full shrink-0",
                      alert.type === 'critical' ? "bg-rose-100 text-rose-600" :
                      alert.type === 'warning' ? "bg-amber-100 text-amber-600" : "bg-blue-100 text-blue-600"
                    )}>
                      {alert.type === 'critical' ? <AlertCircle className="h-3.5 w-3.5" /> :
                       alert.type === 'warning' ? <AlertTriangle className="h-3.5 w-3.5" /> : <Info className="h-3.5 w-3.5" />}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold leading-none">{alert.title}</p>
                        <span className="text-[9px] text-muted-foreground font-medium">{alert.time}</span>
                      </div>
                      <p className="text-[11px] text-muted-foreground line-clamp-2">{alert.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 border-t text-center">
              <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground">
                View All Activity
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 p-1 hover:bg-secondary/50">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-primary">Ratan Kollabathula</p>
                <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tight">Operations Manager</p>
              </div>
              <Avatar className="h-8 w-8 ring-2 ring-primary/10">
                <AvatarImage src="https://picsum.photos/seed/ratan/200" alt="Ratan Kollabathula" />
                <AvatarFallback className="bg-primary text-white">RK</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => handleProfileItem("Profile Settings")}>
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleProfileItem("Active Sessions")}>
              Active Sessions
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleProfileItem("Security & Access")}>
              Security & Access
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive font-semibold" onClick={() => handleProfileItem("Log out")}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
