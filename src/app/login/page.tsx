"use client";

import { useState } from "react";
import { useAuth } from "@/firebase";
import { initiateEmailSignIn, initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Factory, Loader2, ShieldCheck, AlertCircle } from "lucide-react";
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
    
    // Attempting sign in. Error handling is now internal to the call via toast
    // or through standard rejection handling.
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

  const handleGuestSignIn = async () => {
    setIsLoading(true);
    try {
      await initiateAnonymousSignIn(auth);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Guest Access Failed",
        description: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-950 overflow-hidden relative">
      <div className="absolute top-0 -left-4 w-96 h-96 bg-primary/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-pulse" />
      <div className="absolute bottom-0 -right-4 w-96 h-96 bg-accent/20 rounded-full mix-blend-screen filter blur-3xl opacity-50 animate-pulse delay-700" />
      
      <Card className="w-full max-w-md glass-card border-none bg-white/5 backdrop-blur-3xl text-white">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-white shadow-2xl shadow-primary/40">
              <Factory className="h-10 w-10" />
            </div>
          </div>
          <CardTitle className="text-4xl font-bold tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent">FactoryIQ</CardTitle>
          <CardDescription className="text-slate-400">
            Manufacturing Excellence & Intelligence Portal
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSignIn}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="ratan@factoryiq.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 h-12"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" title="Try 'password123' for demo" className="text-slate-200">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white h-12"
                required
              />
            </div>
            <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/10 border border-primary/20 text-xs text-primary-foreground/80">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>Use <strong>ratan@factoryiq.com</strong> and <strong>factory123</strong> for demo access.</span>
            </div>
            <Button type="submit" className="w-full h-12 font-bold text-lg shadow-lg shadow-primary/20" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Sign In"}
            </Button>
          </CardContent>
        </form>
        <div className="relative px-6 pb-4">
          <div className="absolute inset-0 flex items-center px-6">
            <span className="w-full border-t border-white/5" />
          </div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest">
            <span className="bg-[#020617] px-3 text-slate-500">Secure Gateway</span>
          </div>
        </div>
        <CardFooter className="flex flex-col gap-4 pb-8">
          <Button variant="outline" onClick={handleGuestSignIn} className="w-full h-12 bg-transparent border-white/10 text-white hover:bg-white/5 hover:text-white" disabled={isLoading}>
            Guest Operations Manager
          </Button>
          <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
            <ShieldCheck className="h-3 w-3" />
            Enterprise-grade encrypted access
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}