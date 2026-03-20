
"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { SUPPLY_CHAIN_POS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Truck, Package, ShoppingCart, Globe, ArrowUpRight, Download, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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
      setIsExporting(false);
      toast({
        title: "Export Success",
        description: "Supply chain records saved to workstation.",
      });
    }, 2000);
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
          <h1 className="text-3xl font-bold tracking-tight">Supply Chain & Logistics</h1>
          <p className="text-muted-foreground">Manage vendor procurement, inventory levels, and shipment visibility.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2 border-white/10" onClick={handleExport} disabled={isExporting}>
            {isExporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
            Export Data
          </Button>
          <Button className="gap-2" onClick={handleNewPO}>
            New Purchase Order
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="glass-card border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Pending POs</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24</div>
            <p className="text-xs text-muted-foreground">Total value: $1.4M</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Inbound Shipments</CardTitle>
            <Truck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">12</div>
            <p className="text-xs text-muted-foreground">3 arriving today</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Inventory Turnover</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">4.8x</div>
            <p className="text-xs text-emerald-500 font-bold">+0.5x this quarter</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Global Suppliers</CardTitle>
            <Globe className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">142</div>
            <p className="text-xs text-muted-foreground">Active vendors</p>
          </CardContent>
        </Card>
      </div>

      <Card className="glass-card border-none overflow-hidden">
        <CardHeader className="bg-white/5">
          <CardTitle>Open Purchase Orders</CardTitle>
          <CardDescription>Procurement pipeline and vendor fulfillment status.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/[0.02]">
              <TableRow className="border-white/5">
                <TableHead className="text-[10px] font-black uppercase tracking-widest pl-8">PO ID</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Vendor</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Amount</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Exp. Delivery</TableHead>
                <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                <TableHead className="text-right pr-8 text-[10px] font-black uppercase tracking-widest">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {SUPPLY_CHAIN_POS.map((po) => (
                <TableRow key={po.id} className="border-white/5 hover:bg-white/5">
                  <TableCell className="pl-8 font-mono text-xs font-bold text-primary">{po.id}</TableCell>
                  <TableCell className="font-bold text-white text-sm">{po.vendor}</TableCell>
                  <TableCell className="text-white font-medium text-sm">{po.amount}</TableCell>
                  <TableCell className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">{po.delivery}</TableCell>
                  <TableCell>
                    <Badge variant={po.status === 'Shipped' ? 'default' : po.status === 'Delivered' ? 'secondary' : 'outline'} className="text-[9px] font-black uppercase tracking-widest">
                      {po.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Button variant="ghost" size="sm" className="rounded-xl hover:bg-primary text-[10px] font-black uppercase">Track <ArrowUpRight className="ml-1 h-3 w-3" /></Button>
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
