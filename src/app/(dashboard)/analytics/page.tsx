
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PRODUCTION_DATA } from "@/lib/mock-data";
import { 
  ResponsiveContainer, 
  ComposedChart, 
  Line, 
  Area, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Button } from "@/components/ui/button";
import { Download, Filter, Calendar, Share2, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const PIE_DATA = [
  { name: 'On-Time', value: 85 },
  { name: 'Late', value: 10 },
  { name: 'Cancelled', value: 5 },
];

const COLORS = ['hsl(var(--primary))', 'hsl(var(--accent))', 'hsl(var(--muted-foreground))'];

export default function AnalyticsPage() {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    toast({
      title: "Compiling Report",
      description: "Aggregating multi-source telemetry data...",
    });

    setTimeout(() => {
      setIsExporting(false);
      toast({
        title: "Report Finalized",
        description: "Your PDF report has been generated and downloaded.",
      });
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Workbench</h1>
          <p className="text-muted-foreground">Deep-dive into manufacturing metrics and custom reporting.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Calendar className="mr-2 h-4 w-4" /> Last 30 Days</Button>
          <Button variant="outline" size="sm"><Filter className="mr-2 h-4 w-4" /> Advanced</Button>
          <Button variant="outline" size="sm"><Share2 className="mr-2 h-4 w-4" /> Share</Button>
          <Button 
            className="bg-primary text-white"
            onClick={handleExport}
            disabled={isExporting}
          >
            {isExporting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Download className="mr-2 h-4 w-4" />}
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle>Historical Efficiency Trends</CardTitle>
            <CardDescription>Multi-metric comparison across historical production cycles.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={PRODUCTION_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Legend />
                  <Area type="monotone" dataKey="plan" fill="hsl(var(--secondary))" stroke="hsl(var(--accent))" />
                  <Bar dataKey="output" barSize={20} fill="hsl(var(--primary))" />
                  <Line type="monotone" dataKey="output" stroke="hsl(var(--primary))" strokeWidth={2} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card border-none">
          <CardHeader>
            <CardTitle>Fulfillment Distribution</CardTitle>
            <CardDescription>Breakdown of delivery performance across all active regions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={PIE_DATA}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {PIE_DATA.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-none">
        <CardHeader>
          <CardTitle>Data Export Configuration</CardTitle>
          <CardDescription>Schedule automated reports to your inbox or cloud storage.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Standard Reports</h4>
              <div className="space-y-2">
                 <Button variant="ghost" className="w-full justify-start text-sm hover:bg-white/5">Monthly Production Yield</Button>
                 <Button variant="ghost" className="w-full justify-start text-sm hover:bg-white/5">Quarterly Quality Audit</Button>
                 <Button variant="ghost" className="w-full justify-start text-sm hover:bg-white/5">Vendor Scorecard 2023</Button>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Export Formats</h4>
              <div className="grid grid-cols-2 gap-2">
                 <Button variant="outline" className="border-white/10">CSV</Button>
                 <Button variant="outline" className="border-white/10">Excel</Button>
                 <Button variant="outline" className="border-white/10">PDF</Button>
                 <Button variant="outline" className="border-white/10">JSON</Button>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Scheduling</h4>
              <p className="text-xs text-muted-foreground">Next scheduled export: <span className="font-bold text-foreground">Monday, 08:00 AM</span></p>
              <Button className="w-full">Configure Automation</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
