
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
          <h1 className="page-heading">Program Portfolio</h1>
          <p className="text-muted-foreground mt-1 text-sm">Global engineering lifecycle and NPI milestone visibility.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="glass-card border-white/10 hover:bg-white/5">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="glass-card border-white/10 hover:bg-white/5">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 glass-card p-4 rounded-2xl border-white/10">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search by name, ID or manager..." 
            className="pl-9 bg-white/5 border-none h-11 focus-visible:ring-primary/20 text-white" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Badge variant="secondary" className="px-4 py-1.5 rounded-full bg-primary/20 text-primary-foreground border-none">{filteredPrograms.length} Active</Badge>
          <Badge variant="outline" className="px-4 py-1.5 rounded-full border-white/10 text-muted-foreground">2 Archived</Badge>
        </div>
      </div>

      <Card className="glass-card border-none overflow-hidden rounded-2xl">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="hover:bg-transparent border-white/5">
                <TableHead className="cursor-pointer hover:text-primary transition-colors py-4 text-slate-300" onClick={() => toggleSort("name")}>
                  Program <ArrowUpDown className="inline ml-1 h-3 w-3" />
                </TableHead>
                <TableHead className="cursor-pointer hover:text-primary transition-colors text-slate-300" onClick={() => toggleSort("status")}>
                  Status <ArrowUpDown className="inline ml-1 h-3 w-3" />
                </TableHead>
                <TableHead className="text-slate-300">Site</TableHead>
                <TableHead className="text-slate-300">Manager</TableHead>
                <TableHead className="text-slate-300">Phase</TableHead>
                <TableHead className="w-[200px] text-slate-300">Completion</TableHead>
                <TableHead className="text-right text-slate-300">View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrograms.map((program) => (
                <TableRow key={program.id} className="group hover:bg-white/5 transition-colors border-white/5">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-semibold text-white">{program.name}</span>
                      <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{program.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "font-bold px-3 py-0.5 rounded-full",
                      program.status === 'Green' ? "bg-emerald-500 hover:bg-emerald-600" :
                      program.status === 'Yellow' ? "bg-amber-500 hover:bg-amber-600" : "bg-rose-500 hover:bg-rose-600"
                    )}>
                      {program.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-medium text-slate-400">{program.site}</TableCell>
                  <TableCell className="text-sm text-slate-400">{program.manager}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-accent/20 text-accent bg-accent/10 rounded-full">{program.phase}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
                        <span>{program.completion}%</span>
                      </div>
                      <Progress value={program.completion} className="h-1.5 bg-white/5" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/programs/${program.id}`}>
                      <Button variant="ghost" size="sm" className="rounded-full hover:bg-primary hover:text-white transition-all">
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
    </div>
  );
}
