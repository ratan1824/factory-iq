
"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PRODUCTION_DATA } from "@/lib/mock-data";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Factory, Cog, Layers, Box } from "lucide-react";

export default function ProductionPage() {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-2 duration-500">
      <div>
        <h1 className="page-heading">Production Operations</h1>
        <p className="text-muted-foreground mt-1 text-sm font-medium">Real-time WIP tracking and manufacturing throughput monitoring.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card border-none bg-white/[0.03]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Work in Progress</CardTitle>
            <Layers className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">1,429 Units</div>
            <div className="mt-1 flex items-center text-[10px] font-bold uppercase tracking-wider">
              <span className="text-emerald-500 mr-1">↑ 12%</span> <span className="text-muted-foreground">vs last shift</span>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-white/[0.03]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">OEE Score</CardTitle>
            <Cog className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">88.4%</div>
            <div className="mt-1 flex items-center text-[10px] font-bold uppercase tracking-wider">
              <span className="text-rose-500 mr-1">↓ 0.5%</span> <span className="text-muted-foreground">below target</span>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-white/[0.03]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Daily Target</CardTitle>
            <Box className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">3,500 Units</div>
            <div className="mt-1 flex items-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Progress: 82% of shift complete
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-white/[0.03]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Active Lines</CardTitle>
            <Factory className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">12 / 14</div>
            <div className="mt-1 flex items-center text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
              Line 4 & 7 offline (maintenance)
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-none shadow-2xl">
        <CardHeader>
          <CardTitle className="text-lg">Throughput Trend (7-Day)</CardTitle>
          <CardDescription>Actual output vs plan trajectory.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={PRODUCTION_DATA}>
                <defs>
                  <linearGradient id="colorOutput" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="output" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorOutput)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="plan" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  fill="transparent" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="text-lg">Resource Constraints</CardTitle>
            <CardDescription>Bottlenecks identified in current manufacturing cycle.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-sm font-medium text-slate-300">Line 2 Surface Mounting</span>
                <Badge variant="destructive" className="font-bold text-[10px] uppercase tracking-wider">Critical</Badge>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-sm font-medium text-slate-300">Cleanroom Particle Count</span>
                <Badge variant="outline" className="font-bold text-[10px] uppercase tracking-wider border-emerald-500/50 text-emerald-500">Nominal</Badge>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-sm font-medium text-slate-300">Material Feed Rate (Station 4)</span>
                <Badge className="bg-amber-500/20 text-amber-500 font-bold text-[10px] uppercase tracking-wider border-none">Warning</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle className="text-lg">Shift Analytics</CardTitle>
            <CardDescription>Performance breakdown by manufacturing shift.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Morning Shift</p>
                    <p className="text-2xl font-black text-emerald-500">94% Target</p>
                  </div>
                  <div className="bg-white/[0.03] border border-white/5 rounded-2xl p-4 text-center">
                    <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1">Evening Shift</p>
                    <p className="text-2xl font-black text-amber-500">82% Target</p>
                  </div>
               </div>
               <p className="text-[10px] text-muted-foreground font-medium uppercase text-center tracking-wider">Note: Evening shift experienced 45m downtime due to scheduled maintenance.</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
