
"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DASHBOARD_STATS, PRODUCTION_DATA, ALERTS as MOCK_ALERTS } from "@/lib/mock-data";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";
import { AlertCircle, ArrowUpRight, ArrowDownRight, Info, AlertTriangle, TrendingUp, Package, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCollection, useMemoFirebase, useFirestore, useUser } from "@/firebase";
import { collection, query, limit, orderBy } from "firebase/firestore";

export default function DashboardPage() {
  const { profile } = useUser();
  const firestore = useFirestore();
  const alertsQuery = useMemoFirebase(
    () => query(collection(firestore, "alerts"), orderBy("timestamp", "desc"), limit(5)),
    [firestore]
  );
  const { data: firestoreAlerts } = useCollection(alertsQuery);

  const displayAlerts = useMemo(() => {
    return firestoreAlerts && firestoreAlerts.length > 0 ? firestoreAlerts : MOCK_ALERTS;
  }, [firestoreAlerts]);

  const isOwner = profile?.role === 'owner';

  // Personal metrics for 'user' role
  const userStats = [
    { label: 'My Output Today', value: '342 Units', change: '+12%', icon: Package },
    { label: 'Project Sales', value: '$12,400', change: '+8%', icon: DollarSign },
    { label: 'Fulfillment Rate', value: '94%', change: '+2%', icon: TrendingUp },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="page-heading">
          {isOwner ? "Manufacturing Overview" : "My Operations Hub"}
        </h1>
        <p className="text-muted-foreground mt-1 text-sm font-medium">
          {isOwner 
            ? "Real-time telemetry and excellence metrics across all sites." 
            : "Tracking personal production output and project tracks."}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isOwner ? (
          DASHBOARD_STATS.map((stat) => (
            <Card key={stat.label} className="glass-card border-none bg-white/[0.03] rounded-3xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</CardTitle>
                {stat.change.startsWith('+') ? (
                  <ArrowUpRight className="h-4 w-4 text-emerald-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-rose-500" />
                )}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <p className={cn(
                  "text-[10px] font-bold uppercase tracking-wider mt-1",
                  stat.change.startsWith('+') ? "text-emerald-500" : "text-rose-500"
                )}>
                  {stat.change} <span className="text-muted-foreground">from last month</span>
                </p>
              </CardContent>
            </Card>
          ))
        ) : (
          userStats.map((stat) => (
            <Card key={stat.label} className="glass-card border-none bg-white/[0.03] rounded-3xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</CardTitle>
                <stat.icon className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mt-1">
                  {stat.change} <span className="text-muted-foreground">vs average</span>
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4 glass-card border-none rounded-3xl bg-white/[0.01]">
          <CardHeader>
            <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-300">{isOwner ? "Global Production Yield" : "My Production Tracking"}</CardTitle>
            <CardDescription className="text-xs font-medium">
              {isOwner 
                ? "Actual output vs plan across all active assembly lines." 
                : "Your individual output performance for the current shift."}
            </CardDescription>
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
                  <Bar dataKey="output" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="My Output" />
                  {isOwner && <Bar dataKey="plan" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Site Plan" />}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 glass-card border-none rounded-3xl bg-white/[0.01]">
          <CardHeader>
            <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-300">{isOwner ? "Critical Alerts" : "My Task Alerts"}</CardTitle>
            <CardDescription className="text-xs font-medium">Issues requiring your immediate attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {displayAlerts.map((alert: any) => (
                <div key={alert.id} className="flex items-start gap-4 rounded-xl border border-white/5 p-3 hover:bg-white/5 transition-all">
                  <div className={cn(
                    "mt-1 flex h-8 w-8 items-center justify-center rounded-lg",
                    alert.type === 'critical' || alert.severity === 'High' ? "bg-rose-500/10 text-rose-500" :
                    alert.type === 'warning' || alert.severity === 'Medium' ? "bg-amber-500/10 text-amber-500" : "bg-blue-500/10 text-blue-500"
                  )}>
                    {alert.type === 'critical' || alert.severity === 'High' ? <AlertCircle className="h-4 w-4" /> :
                     alert.type === 'warning' || alert.severity === 'Medium' ? <AlertTriangle className="h-4 w-4" /> : <Info className="h-4 w-4" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold leading-none">{alert.title || alert.message}</p>
                      <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-black">{alert.time || 'Live'}</span>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">{alert.description || alert.type}</p>
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
