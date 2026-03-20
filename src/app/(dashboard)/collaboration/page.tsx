"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MessageSquare, FileText, Search, Send, Clock, BookOpen } from "lucide-react";

export default function CollaborationPage() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Collaboration Hub</h1>
        <p className="text-muted-foreground">Team discussions, knowledge base, and document versioning.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Discussions</CardTitle>
                <Badge variant="outline">12 New Messages</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {[
                  { user: "Sarah Chen", msg: "Can we review the turbine blade QC results for batch 882?", time: "2m ago", project: "Turbine X1" },
                  { user: "Michael Ross", msg: "Line 4 component feed sensor has been replaced. Ready for test run.", time: "1h ago", project: "Assembly L4" },
                  { user: "Emma Watson", msg: "NPI Documentation for the sensor array has been updated to v2.4", time: "3h ago", project: "Sensor Array" },
                ].map((chat, i) => (
                  <div key={i} className="flex gap-4 items-start border-b pb-6 last:border-0 last:pb-0">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`https://picsum.photos/seed/${chat.user}/200`} />
                      <AvatarFallback>{chat.user[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm">{chat.user}</span>
                        <span className="text-[10px] text-muted-foreground font-bold uppercase">{chat.time}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{chat.msg}</p>
                      <div className="flex items-center gap-2 mt-2">
                         <Badge variant="secondary" className="text-[10px] py-0">{chat.project}</Badge>
                         <Button variant="link" className="h-auto p-0 text-xs">Reply</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex gap-2">
                <Input placeholder="Type a message to the team..." className="flex-1" />
                <Button size="icon"><Send className="h-4 w-4" /></Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Knowledge Base</CardTitle>
              <div className="relative mt-2">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Search KB..." className="pl-9 h-9" />
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { title: "Standard QC Procedures", type: "PDF", icon: FileText },
                { title: "Line 4 Troubleshooting Guide", type: "DOCX", icon: BookOpen },
                { title: "Vendor Compliance Handbook", type: "WIKI", icon: FileText },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary cursor-pointer transition-colors">
                  <div className="bg-secondary p-2 rounded-md">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.title}</p>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">{item.type}</p>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-4">View All Documentation</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Activity Logs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { log: "Turbine X1 Stage 2 Completed", time: "10m ago" },
                { log: "User Alex Rivera logged in", time: "2h ago" },
                { log: "CAPA-102 status changed to 'Resolved'", time: "4h ago" },
              ].map((log, i) => (
                <div key={i} className="flex gap-3 text-xs">
                  <Clock className="h-4 w-4 text-muted-foreground shrink-0" />
                  <div className="space-y-1">
                    <p className="text-muted-foreground">{log.log}</p>
                    <span className="text-[10px] font-bold text-muted-foreground/60 uppercase">{log.time}</span>
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