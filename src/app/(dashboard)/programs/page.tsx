
"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { PROGRAMS as MOCK_PROGRAMS, Program } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Download, Filter, Search, ArrowUpDown, ChevronRight, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useCollection, useMemoFirebase, useFirestore } from "@/firebase";
import { collection, query, orderBy } from "firebase/firestore";

export default function ProgramsPage() {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<keyof Program>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  
  const firestore = useFirestore();
  const programsQuery = useMemoFirebase(
    () => query(collection(firestore, "programs"), orderBy("createdAt", "desc")),
    [firestore]
  );
  const { data: firestorePrograms, isLoading } = useCollection<Program>(programsQuery);

  const allPrograms = useMemo(() => {
    const fsData = firestorePrograms || [];
    const fsIds = new Set(fsData.map(p => p.id));
    return [...fsData, ...MOCK_PROGRAMS.filter(p => !fsIds.has(p.id))];
  }, [firestorePrograms]);

  const filteredPrograms = useMemo(() => {
    return allPrograms.filter((p) => 
      p.name.toLowerCase().includes(search.toLowerCase()) || 
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      (p.manager && p.manager.toLowerCase().includes(search.toLowerCase()))
    ).sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (typeof aVal === 'number' && typeof bVal === 'number') {
        return sortOrder === "asc" ? (aVal || 0) - (bVal || 0) : (bVal || 0) - (aVal || 0);
      }
      return 0;
    });
  }, [search, sortField, sortOrder, allPrograms]);

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
          <h1 className="text-5xl font-black tracking-tighter text-white py-1">Program Portfolio</h1>
          <p className="text-muted-foreground mt-1 text-sm font-medium">Global engineering lifecycle and NPI milestone visibility.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="glass-card border-white/10 hover:bg-white/5 text-xs font-bold uppercase tracking-widest h-10 px-6">
            <Filter className="mr-2 h-4 w-4" /> Filter
          </Button>
          <Button variant="outline" size="sm" className="glass-card border-white/10 hover:bg-white/5 text-xs font-bold uppercase tracking-widest h-10 px-6">
            <Download className="mr-2 h-4 w-4" /> Export
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4 glass-card p-4 rounded-2xl border-white/10">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
          <Input 
            placeholder="Search by name, ID or manager..." 
            className="pl-11 bg-white/5 border-none h-12 focus-visible:ring-primary/20 text-white placeholder:text-slate-600 rounded-xl" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-2 items-center">
          {isLoading && <Loader2 className="h-4 w-4 animate-spin text-primary mr-2" />}
          <Badge variant="secondary" className="px-6 py-2 rounded-xl bg-white/5 text-slate-300 border-none font-black uppercase tracking-widest text-[10px]">{filteredPrograms.length} Total</Badge>
        </div>
      </div>

      <Card className="glass-card border-none overflow-hidden rounded-3xl shadow-2xl bg-white/[0.01]">
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="hover:bg-transparent border-white/5">
                <TableHead className="cursor-pointer hover:text-white transition-colors py-5 text-slate-500 font-black uppercase tracking-widest text-[10px] pl-8" onClick={() => toggleSort("name")}>
                  Program <ArrowUpDown className="inline ml-1 h-3 w-3" />
                </TableHead>
                <TableHead className="cursor-pointer hover:text-white transition-colors text-slate-500 font-black uppercase tracking-widest text-[10px]" onClick={() => toggleSort("status")}>
                  Status <ArrowUpDown className="inline ml-1 h-3 w-3" />
                </TableHead>
                <TableHead className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Site</TableHead>
                <TableHead className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Manager</TableHead>
                <TableHead className="text-slate-500 font-black uppercase tracking-widest text-[10px]">Phase</TableHead>
                <TableHead className="w-[200px] text-slate-500 font-black uppercase tracking-widest text-[10px]">Completion</TableHead>
                <TableHead className="text-right text-slate-500 font-black uppercase tracking-widest text-[10px] pr-8">View</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPrograms.map((program) => (
                <TableRow key={program.id} className="group hover:bg-white/[0.03] transition-colors border-white/5">
                  <TableCell className="pl-8">
                    <div className="flex flex-col">
                      <span className="font-bold text-white text-base">{program.name}</span>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-relaxed">{program.id}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={cn(
                      "font-black px-3 py-1 rounded-lg text-[9px] uppercase tracking-widest",
                      program.status === 'Green' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                      program.status === 'Yellow' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                    )}>
                      {program.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-xs font-semibold text-slate-400">{program.site}</TableCell>
                  <TableCell className="text-sm text-slate-400 font-semibold">{program.manager || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-accent/20 text-accent bg-accent/5 rounded-lg text-[9px] font-black uppercase tracking-widest px-3 py-1">{program.phase}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[9px] font-black uppercase text-slate-500 tracking-widest">
                        <span>{program.completion || 0}%</span>
                      </div>
                      <Progress value={program.completion || 0} className="h-1.5 bg-white/5" />
                    </div>
                  </TableCell>
                  <TableCell className="text-right pr-8">
                    <Link href={`/programs/${program.id}`}>
                      <Button variant="ghost" size="sm" className="rounded-xl hover:bg-primary hover:text-white transition-all font-black text-[10px] uppercase tracking-widest">
                        Detail <ChevronRight className="ml-1 h-3 w-3" />
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
