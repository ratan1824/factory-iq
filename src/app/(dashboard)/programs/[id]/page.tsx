
"use client";

import { useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PROGRAMS } from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  ChevronLeft, 
  Calendar, 
  User, 
  MapPin, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  History,
  Box,
  ClipboardList
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";

export default function ProgramDetailPage() {
  const { id } = useParams();
  const router = useRouter();

  const program = useMemo(() => {
    return PROGRAMS.find((p) => p.id === id);
  }, [id]);

  if (!program) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">Program Not Found</h2>
        <Button onClick={() => router.push("/programs")}>Back to Portfolio</Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()}>
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight text-primary">{program.name}</h1>
              <Badge className={cn(
                "font-black uppercase tracking-widest text-[10px] px-3 py-1",
                program.status === 'Green' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                program.status === 'Yellow' ? "bg-amber-500/10 text-amber-500 border-amber-500/20" : "bg-rose-500/10 text-rose-500 border-rose-500/20"
              )}>
                {program.status}
              </Badge>
            </div>
            <p className="text-muted-foreground font-mono text-sm">{program.id}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="glass-card border-none bg-white/[0.03]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <User className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Program Lead</span>
            </div>
            <p className="font-bold text-white">{program.manager}</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-white/[0.03]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Manufacturing Site</span>
            </div>
            <p className="font-bold text-white">{program.site}</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-white/[0.03]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Timeline</span>
            </div>
            <p className="font-bold text-white">{program.startDate} – {program.endDate}</p>
          </CardContent>
        </Card>
        <Card className="glass-card border-none bg-white/[0.03]">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              <span className="text-[10px] font-black uppercase tracking-widest">Current Phase</span>
            </div>
            <p className="font-bold text-white">{program.phase}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-12 bg-white/5 border border-white/5 rounded-xl p-1">
          <TabsTrigger value="timeline" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest">Timeline & Gates</TabsTrigger>
          <TabsTrigger value="artifacts" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest">Engineering / BOM</TabsTrigger>
          <TabsTrigger value="quality" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest">Quality & Evidence</TabsTrigger>
          <TabsTrigger value="ops" className="rounded-lg data-[state=active]:bg-primary data-[state=active]:text-white font-bold text-[10px] uppercase tracking-widest">Ops Drill-Down</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2 glass-card border-none">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-300">Milestone Gantt (Planned vs Actual)</CardTitle>
                <CardDescription className="text-xs">Visual tracker for critical path events.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {program.milestones.map((milestone, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-bold text-white">{milestone.name}</span>
                      <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest">
                        <span className="text-muted-foreground">Target: {milestone.date}</span>
                        {milestone.actualDate && <span className="text-emerald-500">Actual: {milestone.actualDate}</span>}
                      </div>
                    </div>
                    <div className="relative h-2 w-full bg-white/5 rounded-full overflow-hidden flex items-center">
                      <div 
                        className={cn(
                          "absolute h-full rounded-full transition-all",
                          milestone.status === 'completed' ? "bg-emerald-500 w-[100%]" : 
                          milestone.status === 'delayed' ? "bg-rose-500 w-[60%]" : "bg-amber-400 w-[20%]"
                        )}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="glass-card border-none">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-300">Status History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {program.history.map((h, i) => (
                    <div key={i} className="flex gap-3 text-sm border-l border-white/10 pl-4 pb-4 last:pb-0">
                      <div className="space-y-1">
                        <p className="font-bold text-primary text-xs">{h.event}</p>
                        <div className="flex gap-2 text-[10px] text-muted-foreground uppercase font-black tracking-widest">
                          <span>{h.date}</span>
                          <span>•</span>
                          <span>{h.user}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="artifacts" className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="glass-card border-none">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-300">Bill of Materials (BOM)</CardTitle>
                  <CardDescription className="text-xs">Major assemblies and critical components.</CardDescription>
                </div>
                <Box className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader className="bg-white/5">
                    <TableRow className="border-white/5">
                      <TableHead className="text-[10px] font-black uppercase tracking-widest">Part No</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest">Description</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest">Qty</TableHead>
                      <TableHead className="text-[10px] font-black uppercase tracking-widest">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {program.bom.map((item, idx) => (
                      <TableRow key={idx} className="border-white/5">
                        <TableCell className="font-mono text-[10px] font-black text-primary">{item.partNo}</TableCell>
                        <TableCell className="text-xs font-bold text-white">{item.desc}</TableCell>
                        <TableCell className="text-xs font-bold text-slate-400">{item.qty}</TableCell>
                        <TableCell><Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest">{item.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card className="glass-card border-none">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-300">Engineering Artifacts</CardTitle>
                  <CardDescription className="text-xs">Specifications, CAD, and ECO logs.</CardDescription>
                </div>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-3">
                   {program.artifacts.map((art) => (
                     <div key={art.id} className="flex items-center justify-between p-3 border border-white/5 rounded-xl hover:bg-white/5 transition-colors">
                       <div className="flex items-center gap-3">
                         <div className="p-2 bg-primary/10 rounded-lg text-primary">
                           <FileText className="h-4 w-4" />
                         </div>
                         <div>
                           <p className="text-xs font-bold text-white">{art.name}</p>
                           <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">v{art.version} • {art.type}</p>
                         </div>
                       </div>
                       <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest bg-white/5">{art.status}</Badge>
                     </div>
                   ))}
                 </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6 pt-6">
           <Card className="glass-card border-none">
             <CardHeader className="flex flex-row items-center justify-between">
               <div>
                 <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-300">Evidence & Compliance Repository</CardTitle>
                 <CardDescription className="text-xs">FAI, PPAP, and Test Plan artifacts for release readiness.</CardDescription>
               </div>
               <ClipboardList className="h-5 w-5 text-muted-foreground" />
             </CardHeader>
             <CardContent className="p-0">
               <Table>
                 <TableHeader className="bg-white/5">
                   <TableRow className="border-white/5">
                     <TableHead className="text-[10px] font-black uppercase tracking-widest pl-8">Asset Name</TableHead>
                     <TableHead className="text-[10px] font-black uppercase tracking-widest">Type</TableHead>
                     <TableHead className="text-[10px] font-black uppercase tracking-widest">Upload Date</TableHead>
                     <TableHead className="text-[10px] font-black uppercase tracking-widest">Sign-Off</TableHead>
                     <TableHead className="text-right text-[10px] font-black uppercase tracking-widest pr-8">Action</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {program.evidence.map((ev) => (
                     <TableRow key={ev.id} className="border-white/5">
                       <TableCell className="font-bold text-white text-xs pl-8">{ev.name}</TableCell>
                       <TableCell><Badge variant="outline" className="text-[9px] font-black tracking-widest uppercase">{ev.type}</Badge></TableCell>
                       <TableCell className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{ev.date}</TableCell>
                       <TableCell>
                         {ev.signedBy ? (
                           <div className="flex items-center gap-1 text-emerald-500 text-[10px] font-black uppercase tracking-widest">
                             <CheckCircle2 className="h-3 w-3" /> {ev.signedBy}
                           </div>
                         ) : (
                           <span className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">Pending</span>
                         )}
                       </TableCell>
                       <TableCell className="text-right pr-8">
                         <Button variant="ghost" size="sm" className="text-[9px] font-black uppercase tracking-widest rounded-lg hover:bg-primary">Download</Button>
                       </TableCell>
                     </TableRow>
                   ))}
                 </TableBody>
               </Table>
             </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="ops" className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="glass-card border-none">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-300">Manufacturing Stage Progress</CardTitle>
                <CardDescription className="text-xs">Live telemetry from site operations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">Assembly Station 1 (Chassis)</span>
                    <span className="text-emerald-500">98% OEE</span>
                  </div>
                  <Progress value={98} className="h-1 bg-white/5" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                    <span className="text-slate-400">Assembly Station 2 (Internal)</span>
                    <span className="text-amber-500">72% OEE</span>
                  </div>
                  <Progress value={72} className="h-1 bg-white/5" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-none">
              <CardHeader>
                <CardTitle className="text-lg font-black uppercase tracking-widest text-slate-300">Throughput & Cycle Time</CardTitle>
                <CardDescription className="text-xs">Real-time shift metrics for {program.name}.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-[200px]">
                <div className="text-center space-y-2">
                  <p className="text-5xl font-black text-primary tracking-tighter">4.2m</p>
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest">Avg Cycle Time</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
