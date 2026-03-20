"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, Search, Send, Clock, BookOpen, Shield } from "lucide-react";
import { useUser } from "@/firebase";

export default function CollaborationPage() {
  const { profile } = useUser();
  const isAdmin = profile?.role === 'owner';

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Collaboration Hub</h1>
          <p className="text-muted-foreground">Team discussions, knowledge base, and secure messaging.</p>
        </div>
        {!isAdmin && (
          <Badge className="bg-primary/20 text-primary border-primary/20 px-4 py-1">
            Connected to Admin Terminal
          </Badge>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <Card className="glass-card border-none">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{isAdmin ? "Team Direct Messages" : "Direct Message to Admin"}</CardTitle>
                <Badge variant="outline" className="border-emerald-500/50 text-emerald-500">Secure Line Active</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 scrollbar-hide">
                {isAdmin ? (
                  [
                    { user: "Sarah Chen", msg: "Can we review the turbine blade QC results for batch 882?", time: "2m ago", project: "Turbine X1" },
                    { user: "Michael Ross", msg: "Line 4 component feed sensor has been replaced. Ready for test run.", time: "1h ago", project: "Assembly L4" },
                    { user: "Engineer User", msg: "Admin, I have a question regarding the supply chain analysis for Q4.", time: "3h ago", project: "Logistics" },
                  ].map((chat, i) => (
                    <div key={i} className="flex gap-4 items-start border-b border-white/5 pb-6 last:border-0 last:pb-0">
                      <Avatar className="h-10 w-10 border border-white/10">
                        <AvatarImage src={`https://picsum.photos/seed/${chat.user}/200`} />
                        <AvatarFallback>{chat.user[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-white">{chat.user}</span>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">{chat.time}</span>
                        </div>
                        <p className="text-sm text-slate-400">{chat.msg}</p>
                        <div className="flex items-center gap-2 mt-2">
                           <Badge variant="secondary" className="text-[9px] font-black uppercase tracking-widest py-0 bg-white/5">{chat.project}</Badge>
                           <Button variant="link" className="h-auto p-0 text-[10px] font-black uppercase text-primary tracking-widest">Reply</Button>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="space-y-4">
                    <div className="flex gap-4 items-start">
                      <Avatar className="h-10 w-10 border border-primary/20">
                        <AvatarImage src={`https://picsum.photos/seed/admin/200`} />
                        <AvatarFallback>A</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 space-y-1 bg-primary/5 p-4 rounded-2xl border border-primary/10">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-primary flex items-center gap-2">
                            <Shield className="h-3 w-3" /> System Admin
                          </span>
                          <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Online</span>
                        </div>
                        <p className="text-sm text-slate-300 italic">"Welcome to the secure terminal. Please send your queries or analysis reports here for immediate review."</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="mt-8 flex gap-3 p-4 bg-white/5 rounded-2xl border border-white/5">
                <Input placeholder={isAdmin ? "Type a message to the team..." : "Secure message to Admin..."} className="flex-1 bg-transparent border-none focus-visible:ring-0 text-white placeholder:text-slate-600" />
                <Button size="icon" className="rounded-xl shadow-lg shadow-primary/20"><Send className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="text-lg uppercase tracking-widest font-black text-slate-300">Resources</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search KB..." className="pl-9 h-10 bg-white/5 border-none rounded-xl" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Standard QC Procedures", type: "PDF", icon: FileText },
                { title: "Line 4 Troubleshooting Guide", type: "DOCX", icon: BookOpen },
                { title: "Vendor Compliance Handbook", type: "WIKI", icon: FileText },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/5 cursor-pointer transition-all border border-transparent hover:border-white/5">
                  <div className="bg-primary/10 p-2 rounded-lg">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-300">{item.title}</p>
                    <p className="text-[9px] text-muted-foreground uppercase font-black tracking-widest">{item.type}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4 rounded-xl border-white/10 hover:bg-white/5 text-[10px] font-black uppercase tracking-widest">View All Documentation</Button>
            </CardContent>
          </Card>

          <Card className="glass-card border-none">
            <CardHeader>
              <CardTitle className="text-lg uppercase tracking-widest font-black text-slate-300">System Logs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { log: "Secure channel established", time: "Live" },
                { log: "Admin available for review", time: "Now" },
                { log: "Shift data uploaded", time: "4h ago" },
              ].map((log, i) => (
                <div key={i} className="flex gap-3 text-xs border-l border-white/5 pl-4 py-1">
                  <div className="space-y-1">
                    <p className="text-slate-400 font-medium">{log.log}</p>
                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">{log.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
