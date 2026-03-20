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
        <h1 className="text-3xl font-bold tracking-tight">Production Operations</h1>
        <p className="text-muted-foreground">Real-time WIP tracking and manufacturing throughput monitoring.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Work in Progress</CardTitle>
            <Layers className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,429 Units</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <span className="text-emerald-500 font-bold mr-1">↑ 12%</span> vs last shift
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">OEE Score</CardTitle>
            <Cog className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88.4%</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              <span className="text-rose-500 font-bold mr-1">↓ 0.5%</span> below target
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Daily Target</CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,500 Units</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              Progress: 82% of shift complete
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Lines</CardTitle>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12 / 14</div>
            <div className="mt-1 flex items-center text-xs text-muted-foreground">
              Line 4 & 7 offline (maintenance)
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Throughput Trend (7-Day)</CardTitle>
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
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--muted))" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip 
                   contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))' }}
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
        <Card>
          <CardHeader>
            <CardTitle>Resource Constraints</CardTitle>
            <CardDescription>Bottlenecks identified in current manufacturing cycle.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm font-medium">Line 2 Surface Mounting</span>
                <Badge variant="destructive">Critical</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm font-medium">Cleanroom Particle Count</span>
                <Badge variant="outline">Nominal</Badge>
              </div>
              <div className="flex items-center justify-between border-b pb-2">
                <span className="text-sm font-medium">Material Feed Rate (Station 4)</span>
                <Badge className="bg-amber-500">Warning</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shift Analytics</CardTitle>
            <CardDescription>Performance breakdown by manufacturing shift.</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground uppercase font-bold">Morning Shift</p>
                    <p className="text-xl font-bold">94% Target</p>
                  </div>
                  <div className="bg-secondary/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground uppercase font-bold">Evening Shift</p>
                    <p className="text-xl font-bold">82% Target</p>
                  </div>
               </div>
               <p className="text-xs text-muted-foreground">Note: Evening shift experienced 45m downtime due to scheduled maintenance.</p>
             </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}