
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SUPPLY_CHAIN_POS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Truck, Package, ShoppingCart, Globe, ArrowUpRight, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { exportToCSV } from "@/lib/utils";

export default function SupplyChainPage() {
  const { toast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    toast({
      title: "Inventory Snapshot",
      description: "Extracting supply chain performance data...",
    });

    setTimeout(() => {
      exportToCSV(SUPPLY_CHAIN_POS, "FactoryIQ_SupplyChain_Orders");
      setIsExporting(false);
      toast({
        title: "Export Success",
        description: "Supply chain records saved to workstation.",
      });
    }, 1500);
  };

  const handleNewPO = () => {
    toast({
      title: "Procurement Interface",
      description: "Loading vendor catalog...",
    });
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-left-2 duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="page-heading">Supply Chain Logistics</h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">Manage vendor procurement, inventory levels, and shipment visibility.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-white/10 h-11 px-6 rounded-xl text-xs font-bold uppercase tracking-widest" onClick={handleExport} disabled={isExporting}>
            {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Export Data
          </Button>
          <Button className="gap-2 h-11 px-6 rounded-xl text-xs font-bold uppercase tracking-widest" onClick={handleNewPO}>
            New Purchase Order
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card border-none bg-white/[0.03] rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Pending POs</CardTitle>
            <ShoppingCart className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">24</div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-1">Total value: $1.4M</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-white/[0.03] rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Inbound Shipments</CardTitle>
            <Truck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">12</div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mt-1">3 arriving today</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-white/[0.03] rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Inventory Turnover</CardTitle>
            <Package className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">4.8x</div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-emerald-500 mt-1">+0.5x this quarter</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-white/[0.03] rounded-3xl">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Global Suppliers</CardTitle>
            <Globe className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black text-white">142</div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mt-1">Active vendors</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-none overflow-hidden rounded-3xl bg-white/[0.01]">
        <CardHeader className="bg-white/5">
          <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-300">Open Purchase Orders</CardTitle>
          <CardDescription className="text-xs font-medium">Procurement pipeline and vendor fulfillment status.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/[0.02]">
              <TableRow className="border-white/5">
                <TableHead className="text-[10px] font-black uppercase tracking-widest pl-8 py-4">PO ID</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Vendor</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Amount</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Delivery</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SUPPLY_CHAIN_POS.map((po) => (
                <TableRow key={po.id} className="border-white/5 hover:bg-white/5 group transition-colors">
                  <TableCell className="pl-8 font-mono text-[10px] font-black text-primary">{po.id}</TableCell>
                  <TableCell className="font-bold text-white text-sm">{po.vendor}</TableCell>
                  <TableCell className="text-white font-black text-sm">{po.amount}</TableCell>
                  <TableCell className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">{po.delivery}</TableCell>
                  <TableCell>
                    <Badge variant={po.status === 'Shipped' ? 'default' : po.status === 'Delivered' ? 'secondary' : 'outline'} className="text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-lg">
                      {po.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button variant="ghost" size="sm" className="rounded-xl hover:bg-primary hover:text-white transition-all h-9 px-6 font-black text-[10px] uppercase tracking-widest">Track <ArrowUpRight className="ml-1 h-3 w-3" /></Button>
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
