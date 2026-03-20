"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { INTEGRATIONS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Settings, Layers, ShieldCheck, ExternalLink, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, any> = {
  Database,
  Settings,
  Layers,
  ShieldCheck,
};

export default function IntegrationsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Connected Ecosystem</h1>
        <p className="text-muted-foreground">Monitor connections between FactoryIQ and your enterprise systems.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {INTEGRATIONS.map((sys) => {
          const IconComp = iconMap[sys.icon] || Database;
          return (
            <Card key={sys.name} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                    <IconComp className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant={sys.status === 'Connected' ? 'default' : 'destructive'} className={cn(
                    sys.status === 'Connected' ? "bg-emerald-500" : ""
                  )}>
                    {sys.status}
                  </Badge>
                </div>
                <CardTitle className="mt-4">{sys.name}</CardTitle>
                <CardDescription>{sys.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Sync</span>
                    <span>2 minutes ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">API Latency</span>
                    <span className="text-emerald-500 font-bold">24ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span>Operational</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button variant="ghost" size="sm" className="w-full gap-2">
                  <RefreshCw className="h-4 w-4" /> Re-sync
                </Button>
                <Button variant="ghost" size="sm" className="w-full gap-2">
                  <ExternalLink className="h-4 w-4" /> Config
                </Button>
              </CardFooter>
            </Card>
          );
        })}

        <Card className="border-dashed flex flex-col items-center justify-center p-8 text-center bg-transparent">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-muted-foreground mb-4">
            <Plus className="h-6 w-6 text-muted-foreground" />
          </div>
          <CardTitle className="text-lg">Add New Integration</CardTitle>
          <CardDescription className="mt-2">Connect your MES, PLM, or ERP system.</CardDescription>
          <Button variant="outline" className="mt-6">Explore Marketplace</Button>
        </Card>
      </div>
    </div>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}