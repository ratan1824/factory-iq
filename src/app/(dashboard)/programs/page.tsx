"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PROGRAMS, Program } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Download, Filter, Search, ArrowUpDown, ChevronRight } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ProgramsPage() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Program>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const filteredPrograms = useMemo(() => {
    return PROGRAMS.filter((p) => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.manager.toLowerCase().includes(search.toLowerCase())
    ).sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
  }, [search, sortField, sortOrder]);

  const toggleSort = (field: keyof Program) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-primary">Program Portfolio</h1>
          <p className="text-muted-foreground">Global engineering lifecycle and NPI milestone visibility.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg border shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search by name, ID or manager..." 
            className="pl-9" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="px-3 py-1">{filteredPrograms.length} Active</Badge>
          <Badge variant="outline" className="px-3 py-1">2 Archived</Badge>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-secondary/30">
              <TableRow>
                <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => toggleSort("name")}>
                  Program <ArrowUpDown className="inline ml-1 h-3 w-3" />
                </TableHead>
                <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => toggleSort("status")}>
                  Status <ArrowUpDown className="inline ml-1 h-3 w-3" />
                </TableHead>
                <TableHead>Site</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead className="cursor-pointer hover:text-primary transition-colors" onClick={() => toggleSort("phase")}>
                  Phase <ArrowUpDown className="inline ml-1 h-3 w-3" />
                </TableHead>
                <TableHead className="w-[200px] cursor-pointer" onClick={() => toggleSort("completion")}>
                  Completion <ArrowUpDown className="inline ml-1 h-3 w-3" />
                </TableHead>
                <TableHead className="text-right">View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrograms.map((program) => (
                <TableRow key={program.id} className="group hover:bg-secondary/10 transition-colors">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-primary">{program.name}</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase">{program.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "font-bold",
                      program.status === 'Green' ? "bg-emerald-500 hover:bg-emerald-600" :
                      program.status === 'Yellow' ? "bg-amber-500 hover:bg-amber-600" : "bg-rose-500 hover:bg-rose-600"
                    )}>
                      {program.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-medium">{program.site}</TableCell>
                  <TableCell className="text-sm">{program.manager}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-accent text-accent">{program.phase}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                        <span>{program.completion}%</span>
                      </div>
                      <Progress value={program.completion} className="h-1.5" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/programs/${program.id}`}>
                      <Button variant="ghost" size="sm" className="group-hover:bg-primary group-hover:text-white transition-all">
                        Details <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Cycle Time Average</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">14.2 Days</div>
            <p className="text-xs text-emerald-500 font-bold mt-1">↓ 1.5 days since last NPI</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-accent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Resource Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88.4%</div>
            <p className="text-xs text-muted-foreground mt-1">Global engineering capacity</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-emerald-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Quality Readiness</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">92%</div>
            <p className="text-xs text-muted-foreground mt-1">FAI/PPAP documentation health</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
