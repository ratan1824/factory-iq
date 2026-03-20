
"use client";

import { useState } from "react";
import { useAuth } from "@/firebase";
import { initiateEmailSignIn } from "@/firebase/non-blocking-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Factory, Loader2, ShieldCheck, AlertCircle, User, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const auth = useAuth();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await initiateEmailSignIn(auth, email, password);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message || "Invalid credentials. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const quickLogin = async (role: 'owner' | 'user') => {
    setIsLoading(true);
    const email = role === 'owner' ? 'admin@factoryiq.com' : 'user@factoryiq.com';
    try {
      await initiateEmailSignIn(auth, email, 'factory123');
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Quick Login Failed",
        description: "Credentials not initialized. Please use the form.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-950 overflow-hidden relative">
      <div className="absolute top-0 -left-4 w-[500px] h-[500px] bg-primary/20 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse" />
      <div className="absolute bottom-0 -right-4 w-[500px] h-[500px] bg-accent/20 rounded-full mix-blend-screen filter blur-[120px] opacity-40 animate-pulse delay-700" />
      
      <Card className="w-full max-w-md glass-card border-none bg-white/5 backdrop-blur-3xl text-white shadow-2xl">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-tr from-primary to-accent text-white shadow-2xl shadow-primary/40 rotate-12 hover:rotate-0 transition-transform duration-500">
              <Factory className="h-12 w-12" />
            </div>
          </div>
          <CardTitle className="text-5xl font-black tracking-tighter bg-gradient-to-b from-white to-slate-500 bg-clip-text text-transparent">FactoryIQ</CardTitle>
          <CardDescription className="text-slate-400 font-medium tracking-wide">
            Enterprise Excellence & Intelligence
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignIn}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200 text-xs font-bold uppercase tracking-widest">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="ratan@factoryiq.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 h-12 rounded-xl focus:ring-primary/40"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200 text-xs font-bold uppercase tracking-widest">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-primary/40"
                required
              />
            </div>
            <Button type="submit" className="w-full h-12 font-bold text-lg shadow-lg shadow-primary/30 rounded-xl bg-primary hover:bg-primary/80 transition-all" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Authorize Access"}
            </Button>
          </CardContent>
        </form>
        
        <div className="relative px-6 py-4">
          <div className="absolute inset-0 flex items-center px-6">
            <span className="w-full border-t border-white/5" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.2em]">
            <span className="bg-[#020617] px-4 text-slate-500">Select Access Persona</span>
          </div>
        </div>

        <CardFooter className="flex flex-col gap-3 pb-8">
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button 
              variant="outline" 
              onClick={() => quickLogin('owner')} 
              className="h-14 bg-white/5 border-white/10 text-white hover:bg-primary/20 hover:border-primary/40 rounded-xl group"
              disabled={isLoading}
            >
              <div className="flex flex-col items-center gap-1">
                <Shield className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase">Owner (Full)</span>
              </div>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => quickLogin('user')} 
              className="h-14 bg-white/5 border-white/10 text-white hover:bg-accent/20 hover:border-accent/40 rounded-xl group"
              disabled={isLoading}
            >
              <div className="flex flex-col items-center gap-1">
                <User className="h-4 w-4 text-accent group-hover:scale-110 transition-transform" />
                <span className="text-[10px] font-bold uppercase">User (Limited)</span>
              </div>
            </Button>
          </div>
          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-2">
            <ShieldCheck className="h-3 w-3 text-emerald-500" />
            Multi-Role Encrypted Tunnel
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
