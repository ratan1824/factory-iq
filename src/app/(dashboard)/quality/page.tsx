
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { QUALITY_REPORTS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ClipboardCheck, FileText, Activity, ShieldCheck, Plus, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { exportToCSV } from "@/lib/utils";

export default function QualityPage() {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    toast({
      title: "Preparing Audit Log",
      description: "Compiling quality records for export...",
    });

    setTimeout(() => {
      exportToCSV(QUALITY_REPORTS, "FactoryIQ_Quality_Reports");
      setIsExporting(false);
      toast({
        title: "Logs Exported",
        description: "Quality incident history has been downloaded.",
      });
    }, 1500);
  };

  const handleNewIncident = () => {
    toast({
      title: "Module Loading",
      description: "Opening new incident report terminal...",
    });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-top-2 duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="page-heading">Quality & Compliance</h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">Manage NCRs, CAPAs, and global compliance audit logs.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-white/10 h-11 px-6 rounded-xl text-xs font-bold uppercase tracking-widest" onClick={handleExport} disabled={isExporting}>
            {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Export Logs
          </Button>
          <Button className="gap-2 h-11 px-6 rounded-xl text-xs font-bold uppercase tracking-widest" onClick={handleNewIncident}>
            <Plus className="h-4 w-4" /> New Incident Report
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="bg-primary text-white border-none rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-foreground/70">Compliance Index</CardTitle>
            <ShieldCheck className="h-4 w-4 opacity-70" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">100%</div>
            <p className="text-[10px] font-bold uppercase tracking-wider opacity-70 mt-1">ISO 9001, AS9100 Certified</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-white/[0.03] rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Active NCRs</CardTitle>
            <FileText className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">8</div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mt-1">-2 from last week</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-white/[0.03] rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Internal Audits</CardTitle>
            <ClipboardCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">14</div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-1">Next audit: 3 days</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-white/[0.03] rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Yield Deviation</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">0.15%</div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-rose-500 mt-1">+0.02% vs shift avg</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-none overflow-hidden rounded-3xl bg-white/[0.01]">
        <CardHeader className="bg-white/5">
          <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-300">Incident Logs</CardTitle>
          <CardDescription className="text-xs font-medium">Audit-ready tracking for all quality incidents.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/[0.02]">
              <TableRow className="border-white/5">
                <TableHead className="text-[10px] font-black uppercase tracking-widest pl-8 py-4">Report ID</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Part / Module</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Issue</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Log Date</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {QUALITY_REPORTS.map((report) => (
                <TableRow key={report.id} className="border-white/5 hover:bg-white/5 group transition-colors">
                  <TableCell className="pl-8 font-mono text-[10px] font-black text-primary">{report.id}</TableCell>
                  <TableCell className="font-bold text-white text-sm">{report.part}</TableCell>
                  <TableCell className="text-slate-400 text-sm font-medium">{report.issue}</TableCell>
                  <TableCell className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">{report.date}</TableCell>
                  <TableCell>
                    <Badge variant={report.status === 'Closed' ? 'outline' : 'secondary'} className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">
                      {report.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button variant="ghost" size="sm" className="rounded-xl hover:bg-primary hover:text-white font-black text-[10px] uppercase tracking-widest h-9 px-6">Audit</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
