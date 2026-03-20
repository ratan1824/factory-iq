"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { AFTER_SALES_RMAS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Wrench, RefreshCw, HeartPulse, History } from "lucide-react";

export default function AfterSalesPage() {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">After-Sales Service</h1>
        <p className="text-muted-foreground">RMA management, repair tracking, and warranty performance.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active RMAs</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">12 pending inspection</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Repair Efficiency</CardTitle>
            <Wrench className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.2 Days</div>
            <p className="text-xs text-emerald-500 font-bold">-0.8 days YOY</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Warranty Claims</CardTitle>
            <HeartPulse className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$124k</div>
            <p className="text-xs text-muted-foreground">Liability this quarter</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Parts Availability</CardTitle>
            <History className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-xs text-muted-foreground">Critical spares in stock</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>RMA Queue</CardTitle>
          <CardDescription>Ongoing return merchandise authorizations and repair status.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>RMA ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Received Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {AFTER_SALES_RMAS.map((rma) => (
                <TableRow key={rma.id}>
                  <TableCell className="font-mono text-xs font-bold">{rma.id}</TableCell>
                  <TableCell className="font-medium">{rma.customer}</TableCell>
                  <TableCell>{rma.product}</TableCell>
                  <TableCell className="text-muted-foreground text-xs">{rma.date}</TableCell>
                  <TableCell>
                    <Badge variant={rma.status === 'Repairing' ? 'secondary' : rma.status === 'Received' ? 'outline' : 'default'}>
                      {rma.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Manage</Button>
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