"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AFTER_SALES_RMAS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Wrench, RefreshCw, HeartPulse, History, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function AfterSalesPage() {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-5xl font-black tracking-tighter text-white py-1">After-Supply Analysis</h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">Post-delivery performance tracking, RMA management, and service health.</p>
        </div>
        <Button variant="outline" className="glass-card border-white/10 text-xs font-black uppercase tracking-widest">
          <History className="mr-2 h-4 w-4" /> Export History
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card border-none bg-white/[0.03]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Active RMAs</CardTitle>
            <RefreshCw className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">32</div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-1">12 pending inspection</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-white/[0.03]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Repair Efficiency</CardTitle>
            <Wrench className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">4.2 Days</div>
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider mt-1">-0.8 days vs avg</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-white/[0.03]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Warranty Claims</CardTitle>
            <HeartPulse className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">$124k</div>
            <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-1">Projected liability</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-white/[0.03]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Critical Spares</CardTitle>
            <History className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">96%</div>
            <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-wider mt-1">Stock availability</p>
          </CardContent>
        </Card>
      </div>

      <div className="glass-card p-4 rounded-3xl border-white/10 flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input placeholder="Filter by RMA ID or Customer..." className="pl-11 bg-white/5 border-none h-12 rounded-xl text-white placeholder:text-slate-600 focus-visible:ring-primary/20" />
        </div>
      </div>

      <Card className="glass-card border-none overflow-hidden rounded-3xl">
        <CardHeader className="bg-white/5">
          <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-300">Analysis Queue</CardTitle>
          <CardDescription className="text-xs font-medium">Ongoing return merchandise authorizations and repair tracking.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/[0.02]">
              <TableRow className="border-white/5">
                <TableHead className="pl-8 text-[10px] font-black uppercase tracking-widest text-slate-500 py-4">RMA ID</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Customer</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Product Track</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Received</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest text-slate-500">Status</TableHead>
                <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest text-slate-500">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {AFTER_SALES_RMAS.map((rma) => (
                <TableRow key={rma.id} className="border-white/5 group hover:bg-white/5 transition-colors">
                  <TableCell className="pl-8 font-mono text-[10px] font-black text-primary">{rma.id}</TableCell>
                  <TableCell className="font-bold text-white text-sm">{rma.customer}</TableCell>
                  <TableCell className="text-slate-400 font-medium text-xs">{rma.product}</TableCell>
                  <TableCell className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">{rma.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(
                      "text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg",
                      rma.status === 'Repairing' ? "border-amber-500/30 text-amber-500 bg-amber-500/5" : 
                      rma.status === 'Received' ? "border-primary/30 text-primary bg-primary/5" : "border-emerald-500/30 text-emerald-500 bg-emerald-500/5"
                    )}>
                      {rma.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button variant="ghost" size="sm" className="rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-primary hover:text-white transition-all">Manage</Button>
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
