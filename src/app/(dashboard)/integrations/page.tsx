
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { INTEGRATIONS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Database, Settings, Layers, ShieldCheck, ExternalLink, RefreshCw, Plus } from "lucide-react";
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
        <h1 className="page-heading">Connected Ecosystem</h1>
        <p className="text-muted-foreground mt-1 text-sm font-medium">Monitor connections between FactoryIQ and your enterprise systems.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {INTEGRATIONS.map((sys) => {
          const IconComp = iconMap[sys.icon] || Database;
          return (
            <Card key={sys.name} className="glass-card border-none bg-white/[0.01] rounded-[2rem] overflow-hidden flex flex-col shadow-2xl">
              <CardHeader className="bg-white/5 pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 border border-primary/20">
                    <IconComp className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant={sys.status === 'Connected' ? 'default' : 'destructive'} className={cn(
                    "text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg",
                    sys.status === 'Connected' ? "bg-emerald-500/20 text-emerald-500 border-emerald-500/30" : ""
                  )}>
                    {sys.status}
                  </Badge>
                </div>
                <CardTitle className="mt-4 text-xl font-black text-white">{sys.name}</CardTitle>
                <CardDescription className="text-xs font-medium text-slate-400">{sys.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 pt-6">
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Last Sync</span>
                    <span className="text-white font-bold">2 minutes ago</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-slate-500 font-black uppercase tracking-widest text-[10px]">API Latency</span>
                    <span className="text-emerald-500 font-black">24ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Node Status</span>
                    <span className="text-white font-bold">Operational</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="border-t border-white/5 pt-4 bg-white/[0.02] gap-2">
                <Button variant="ghost" size="sm" className="w-full gap-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all">
                  <RefreshCw className="h-4 w-4" /> Re-sync
                </Button>
                <Button variant="ghost" size="sm" className="w-full gap-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all">
                  <ExternalLink className="h-4 w-4" /> Config
                </Button>
              </CardFooter>
            </Card>
          );
        })}

        <Card className="border-dashed border-2 border-white/10 flex flex-col items-center justify-center p-8 text-center bg-transparent rounded-[2rem] hover:border-primary/40 hover:bg-primary/5 transition-all group cursor-pointer">
          <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-dashed border-slate-500 mb-4 group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-all">
            <Plus className="h-6 w-6 text-slate-500 group-hover:text-white" />
          </div>
          <CardTitle className="text-lg font-black text-white uppercase tracking-widest">Add System</CardTitle>
          <CardDescription className="mt-2 text-xs font-medium text-slate-500">Connect MES, PLM, or ERP node.</CardDescription>
          <Button variant="outline" className="mt-6 border-white/10 text-[10px] font-black uppercase tracking-widest rounded-xl px-8">Marketplace</Button>
        </Card>
      </div>
    </div>
  );
}
