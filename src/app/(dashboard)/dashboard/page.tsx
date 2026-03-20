"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DASHBOARD_STATS, PRODUCTION_DATA, ALERTS, PROGRAMS } from "@/lib/mock-data";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, ArrowUpRight, ArrowDownRight, Info, AlertTriangle } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="page-heading">Manufacturing Overview</h1>
        <p className="text-muted-foreground mt-1 text-sm">Real-time telemetry and excellence metrics across all sites.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {DASHBOARD_STATS.map((stat) => (
          <Card key={stat.label} className="glass-card border-none">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.label}</CardTitle>
              {stat.change.startsWith('+') ? (
                <ArrowUpRight className="h-4 w-4 text-emerald-500" />
              ) : (
                <ArrowDownRight className="h-4 w-4 text-rose-500" />
              )}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={cn(
                "text-xs font-medium",
                stat.change.startsWith('+') ? "text-emerald-500" : "text-rose-500"
              )}>
                {stat.change} <span className="text-muted-foreground">from last month</span>
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 glass-card border-none">
          <CardHeader>
            <CardTitle>Production Output vs Plan</CardTitle>
            <CardDescription>Daily manufacturing yield across active assembly lines.</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={PRODUCTION_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" fontSize={12} tickLine={false} axisLine={false} stroke="#64748b" />
                  <YAxis fontSize={12} tickLine={false} axisLine={false} stroke="#64748b" />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Bar dataKey="output" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Actual Output" />
                  <Bar dataKey="plan" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Planned Output" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 glass-card border-none">
          <CardHeader>
            <CardTitle>Critical Alerts</CardTitle>
            <CardDescription>Active issues requiring immediate attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ALERTS.map((alert) => (
                <div key={alert.id} className="flex items-start gap-4 rounded-xl border border-white/5 p-3 hover:bg-white/5 transition-all">
                  <div className={cn(
                    "mt-1 flex h-8 w-8 items-center justify-center rounded-lg",
                    alert.type === 'critical' ? "bg-rose-500/10 text-rose-500" :
                    alert.type === 'warning' ? "bg-amber-500/10 text-amber-500" : "bg-blue-500/10 text-blue-500"
                  )}>
                    {alert.type === 'critical' ? <AlertCircle className="h-4 w-4" /> :
                     alert.type === 'warning' ? <AlertTriangle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold leading-none">{alert.title}</p>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-bold">{alert.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}