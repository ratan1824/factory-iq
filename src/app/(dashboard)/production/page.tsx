
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
        <Card className="glass-card border-none bg-white/[0.03] rounded-3xl">
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
        <Card className="glass-card border-none bg-white/[0.03] rounded-3xl">
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
        <Card className="glass-card border-none bg-white/[0.03] rounded-3xl">
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
        <Card className="glass-card border-none bg-white/[0.03] rounded-3xl">
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

      <Card className="glass-card border-none shadow-2xl rounded-3xl overflow-hidden bg-white/[0.01]">
        <CardHeader>
          <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-300">Throughput Trend (7-Day)</CardTitle>
          <CardDescription className="text-xs font-medium">Actual output vs plan trajectory.</CardDescription>
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
    </div>
  );
}
