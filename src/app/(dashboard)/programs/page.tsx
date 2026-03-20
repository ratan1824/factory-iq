"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PROGRAMS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Download, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ProgramsPage() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Program Portfolio</h1>
          <p className="text-muted-foreground">End-to-end visibility of product lifecycles and NPI milestones.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search programs..." className="pl-9" />
        </div>
        <Badge variant="secondary">4 Active Programs</Badge>
        <Badge variant="outline">2 Completed</Badge>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Program Name</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead>Phase</TableHead>
                <TableHead>Timeline Progression</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {PROGRAMS.map((program) => (
                <TableRow key={program.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold">{program.name}</span>
                      <span className="text-xs text-muted-foreground">{program.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      program.status === 'Green' ? "bg-emerald-500 hover:bg-emerald-600" :
                      program.status === 'Yellow' ? "bg-amber-500 hover:bg-amber-600" : "bg-rose-500 hover:bg-rose-600"
                    )}>
                      {program.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{program.manager}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{program.phase}</Badge>
                  </TableCell>
                  <TableCell className="w-[250px]">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                        <span>Progress</span>
                        <span>{program.completion}%</span>
                      </div>
                      <Progress value={program.completion} className="h-2" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Stage-Gate Velocity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">12.5 Days</div>
            <p className="text-xs text-muted-foreground mt-1">Average time in NPI gate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Resource Load</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">92%</div>
            <p className="text-xs text-muted-foreground mt-1">Engineering utilization</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Budget Tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">$1.2M</div>
            <p className="text-xs text-muted-foreground mt-1">YTD Program Spend</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}