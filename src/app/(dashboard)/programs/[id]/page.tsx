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
                program.status === 'Green' ? "bg-emerald-500" :
                program.status === 'Yellow' ? "bg-amber-500" : "bg-rose-500"
              )}>
                {program.status}
              </Badge>
            </div>
            <p className="text-muted-foreground font-mono text-sm">{program.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Schedule Review</Button>
          <Button className="bg-primary text-white">Create ECO</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card className="bg-secondary/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <User className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Program Lead</span>
            </div>
            <p className="font-semibold">{program.manager}</p>
          </CardContent>
        </Card>
        <Card className="bg-secondary/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <MapPin className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Manufacturing Site</span>
            </div>
            <p className="font-semibold">{program.site}</p>
          </CardContent>
        </Card>
        <Card className="bg-secondary/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Calendar className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Timeline</span>
            </div>
            <p className="font-semibold">{program.startDate} – {program.endDate}</p>
          </CardContent>
        </Card>
        <Card className="bg-secondary/10">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <Clock className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Current Phase</span>
            </div>
            <p className="font-semibold">{program.phase}</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="timeline" className="w-full">
        <TabsList className="grid w-full grid-cols-4 h-12 bg-secondary/20">
          <TabsTrigger value="timeline" className="data-[state=active]:bg-white data-[state=active]:text-primary font-bold">Timeline & Gates</TabsTrigger>
          <TabsTrigger value="artifacts" className="data-[state=active]:bg-white data-[state=active]:text-primary font-bold">Engineering / BOM</TabsTrigger>
          <TabsTrigger value="quality" className="data-[state=active]:bg-white data-[state=active]:text-primary font-bold">Quality & Evidence</TabsTrigger>
          <TabsTrigger value="ops" className="data-[state=active]:bg-white data-[state=active]:text-primary font-bold">Ops Drill-Down</TabsTrigger>
        </TabsList>

        <TabsContent value="timeline" className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle>Milestone Gantt (Planned vs Actual)</CardTitle>
                <CardDescription>Visual tracker for critical path events.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {program.milestones.map((milestone, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">{milestone.name}</span>
                      <div className="flex gap-4 text-xs font-bold uppercase">
                        <span className="text-muted-foreground">Target: {milestone.date}</span>
                        {milestone.actualDate && <span className="text-emerald-600">Actual: {milestone.actualDate}</span>}
                      </div>
                    </div>
                    <div className="relative h-6 w-full bg-secondary/20 rounded-full overflow-hidden flex items-center">
                      {/* Planned Bar */}
                      <div 
                        className="absolute h-2 bg-primary/20 rounded-full" 
                        style={{ width: '100%', left: '0' }} 
                      />
                      {/* Actual/Status Indicator */}
                      <div 
                        className={cn(
                          "absolute h-3 rounded-full transition-all",
                          milestone.status === 'completed' ? "bg-emerald-500 w-[60%]" : 
                          milestone.status === 'delayed' ? "bg-rose-500 w-[40%]" : "bg-amber-400 w-[20%]"
                        )}
                      />
                      <div className="absolute right-3 flex items-center">
                         {milestone.status === 'completed' ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : <AlertTriangle className="h-4 w-4 text-amber-600" />}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {program.history.map((h, i) => (
                    <div key={i} className="flex gap-3 text-sm border-l-2 border-primary/20 pl-4 pb-4 last:pb-0">
                      <div className="space-y-1">
                        <p className="font-medium text-primary">{h.event}</p>
                        <div className="flex gap-2 text-[10px] text-muted-foreground uppercase font-bold">
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
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Bill of Materials (BOM)</CardTitle>
                  <CardDescription>Major assemblies and critical components.</CardDescription>
                </div>
                <Box className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Part No</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Qty</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {program.bom.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="font-mono text-xs">{item.partNo}</TableCell>
                        <TableCell className="text-sm">{item.desc}</TableCell>
                        <TableCell className="text-xs">{item.qty}</TableCell>
                        <TableCell><Badge variant="outline" className="text-[10px]">{item.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Engineering Artifacts</CardTitle>
                  <CardDescription>Specifications, CAD, and ECO logs.</CardDescription>
                </div>
                <FileText className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="space-y-3">
                   {program.artifacts.map((art) => (
                     <div key={art.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-secondary/10 transition-colors">
                       <div className="flex items-center gap-3">
                         <div className="p-2 bg-secondary rounded text-primary">
                           <FileText className="h-4 w-4" />
                         </div>
                         <div>
                           <p className="text-sm font-medium">{art.name}</p>
                           <p className="text-[10px] text-muted-foreground uppercase font-bold">v{art.version} • {art.type}</p>
                         </div>
                       </div>
                       <Badge variant="secondary" className="text-[10px]">{art.status}</Badge>
                     </div>
                   ))}
                 </div>
                 <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <History className="h-4 w-4" /> Active ECOs
                    </h4>
                    {program.eco.map((eco) => (
                      <div key={eco.id} className="flex justify-between items-center text-sm p-2 bg-secondary/5 rounded">
                        <span>{eco.id}: {eco.title}</span>
                        <Badge className="bg-rose-500 text-[10px]">{eco.impact} Impact</Badge>
                      </div>
                    ))}
                 </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="quality" className="space-y-6 pt-6">
           <Card>
             <CardHeader className="flex flex-row items-center justify-between">
               <div>
                 <CardTitle>Evidence & Compliance Repository</CardTitle>
                 <CardDescription>FAI, PPAP, and Test Plan artifacts for release readiness.</CardDescription>
               </div>
               <ClipboardList className="h-5 w-5 text-muted-foreground" />
             </CardHeader>
             <CardContent className="p-0">
               <Table>
                 <TableHeader>
                   <TableRow>
                     <TableHead>Asset Name</TableHead>
                     <TableHead>Type</TableHead>
                     <TableHead>Upload Date</TableHead>
                     <TableHead>Sign-Off</TableHead>
                     <TableHead className="text-right">Action</TableHead>
                   </TableRow>
                 </TableHeader>
                 <TableBody>
                   {program.evidence.map((ev) => (
                     <TableRow key={ev.id}>
                       <TableCell className="font-medium text-primary">{ev.name}</TableCell>
                       <TableCell><Badge variant="outline">{ev.type}</Badge></TableCell>
                       <TableCell className="text-xs text-muted-foreground">{ev.date}</TableCell>
                       <TableCell>
                         {ev.signedBy ? (
                           <div className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                             <CheckCircle2 className="h-3 w-3" /> {ev.signedBy}
                           </div>
                         ) : (
                           <span className="text-[10px] text-muted-foreground uppercase font-bold">Pending</span>
                         )}
                       </TableCell>
                       <TableCell className="text-right">
                         <Button variant="ghost" size="sm">Download</Button>
                       </TableCell>
                     </TableRow>
                   ))}
                   {program.evidence.length === 0 && (
                     <TableRow>
                       <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">No evidence uploaded for this program yet.</TableCell>
                     </TableRow>
                   )}
                 </TableBody>
               </Table>
               <div className="p-6 border-t flex justify-center">
                  <Button variant="outline" className="border-dashed w-full max-w-md">
                    + Upload PPAP/FAI Evidence
                  </Button>
               </div>
             </CardContent>
           </Card>
        </TabsContent>

        <TabsContent value="ops" className="space-y-6 pt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Manufacturing Stage Progress</CardTitle>
                <CardDescription>Live telemetry from line {program.site} operations.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Assembly Station 1 (Chassis)</span>
                    <span className="font-bold">98% OEE</span>
                  </div>
                  <Progress value={98} className="h-2 bg-emerald-100" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Assembly Station 2 (Internal)</span>
                    <span className="font-bold">72% OEE</span>
                  </div>
                  <Progress value={72} className="h-2 bg-amber-100" />
                  <p className="text-[10px] text-rose-500 font-bold uppercase flex items-center gap-1">
                    <AlertTriangle className="h-3 w-3" /> Potential Bottleneck - Heat Sync Station
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Final QC & Packout</span>
                    <span className="font-bold">94% OEE</span>
                  </div>
                  <Progress value={94} className="h-2 bg-emerald-100" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Throughput & Cycle Time</CardTitle>
                <CardDescription>Real-time shift metrics for {program.name}.</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-[200px]">
                <div className="text-center space-y-2">
                  <p className="text-4xl font-bold text-primary">4.2m</p>
                  <p className="text-sm text-muted-foreground uppercase font-bold tracking-widest">Avg Cycle Time</p>
                  <div className="flex gap-4 mt-4">
                    <div className="bg-secondary/50 p-2 rounded px-4">
                      <p className="text-lg font-bold">142</p>
                      <p className="text-[10px] uppercase text-muted-foreground">Output Today</p>
                    </div>
                    <div className="bg-secondary/50 p-2 rounded px-4">
                      <p className="text-lg font-bold">150</p>
                      <p className="text-[10px] uppercase text-muted-foreground">Target</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
