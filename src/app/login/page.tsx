"use client";

import { useState } from "react";
import { useAuth } from "@/firebase";
import { initiateEmailSignIn, initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Factory, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const auth = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      initiateEmailSignIn(auth, email, password);
      // Auth state change will be handled by the layout's AuthGuard
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGuestSignIn = () => {
    setIsLoading(true);
    initiateAnonymousSignIn(auth);
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-slate-950 overflow-hidden relative">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse" />
      <div className="absolute bottom-0 -right-4 w-72 h-72 bg-accent/30 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-pulse delay-700" />
      
      <Card className="w-full max-w-md glass-card border-none bg-white/5 backdrop-blur-2xl text-white">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-lg shadow-primary/20">
              <Factory className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">FactoryIQ</CardTitle>
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
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/10 border-white/10 text-white placeholder:text-slate-500 h-11"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" title="Try 'password123' for demo" className="text-slate-200">Password</Label>
                <Button variant="link" className="px-0 font-normal text-xs text-primary">Forgot password?</Button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-white/10 text-white h-11"
                required
              />
            </div>
            <Button type="submit" className="w-full h-11 font-semibold text-lg" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Sign In"}
            </Button>
          </CardContent>
        </form>
        <div className="relative px-6 pb-4">
          <div className="absolute inset-0 flex items-center px-6">
            <span className="w-full border-t border-white/10" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-slate-950 px-2 text-slate-500">Or continue as</span>
          </div>
        </div>
        <CardFooter className="flex flex-col gap-4">
          <Button variant="outline" onClick={handleGuestSignIn} className="w-full h-11 bg-transparent border-white/10 text-white hover:bg-white/5" disabled={isLoading}>
            Guest Operations Manager
          </Button>
          <div className="flex items-center justify-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-3 w-3" />
            Enterprise-grade secure access
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}