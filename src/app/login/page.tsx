
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useFirestore, useUser } from "@/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Factory, Loader2, Shield, AlertCircle, Key, Mail, Cpu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { doc, setDoc } from "firebase/firestore";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LoginPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isUserLoading && user) {
      router.push("/dashboard");
    }
  }, [user, isUserLoading, router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ variant: "destructive", title: "Missing Credentials", description: "Please enter both email and password." });
      return;
    }
    setIsLoading(true);
    try {
      let userCredential;
      try {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } catch (error: any) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
          if (email === 'admin@factoryiq.com' || email === 'user@factoryiq.com') {
            userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const role = email === 'admin@factoryiq.com' ? 'owner' : 'user';
            const userRef = doc(firestore, 'users', userCredential.user.uid);
            await setDoc(userRef, {
              id: userCredential.user.uid,
              role: role,
              firstName: role === 'owner' ? 'Ratan' : 'Manufacturing',
              lastName: role === 'owner' ? 'Kollabathula' : 'Engineer',
              email: email,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            }, { merge: true });
          } else {
            throw error;
          }
        } else {
          throw error;
        }
      }
      
      toast({ title: "Access Authorized", description: "Welcome to FactoryIQ Excellence Portal." });
      router.push("/dashboard");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Authentication Failed",
        description: error.message || "Invalid credentials.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const fillCredentials = (e: string, p: string) => {
    setEmail(e);
    setPassword(p);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-4 bg-[#020617] overflow-hidden relative font-body">
      {/* Background aesthetic */}
      <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-primary/5 rounded-full mix-blend-screen filter blur-[140px] opacity-40" />
      <div className="absolute bottom-0 -right-1/4 w-[1000px] h-[1000px] bg-accent/5 rounded-full mix-blend-screen filter blur-[140px] opacity-40" />
      
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-8 items-center z-10 animate-in fade-in zoom-in-95 duration-700">
        
        {/* Left Side: Brand & Directory */}
        <div className="space-y-8 flex flex-col justify-center">
          <div className="space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-primary to-accent text-white shadow-xl shadow-primary/20 rotate-3">
              <Factory className="h-7 w-7" />
            </div>
            <h1 className="text-6xl font-black tracking-tighter text-white leading-none uppercase">
              Factory<span className="text-primary">IQ</span>
            </h1>
            <p className="text-sm text-slate-400 font-medium max-w-xs">
              The neural interface for next-generation manufacturing excellence.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Select Access Directory</p>
            <div className="grid grid-cols-1 gap-3 max-w-xs">
              <button 
                type="button"
                onClick={() => fillCredentials('admin@factoryiq.com', 'factory123')}
                className="flex items-center gap-4 text-left p-3 rounded-xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.08] hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Shield className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-primary">Admin Node</p>
                  <p className="text-[11px] font-mono text-slate-400">admin@factoryiq.com</p>
                </div>
              </button>

              <button 
                type="button"
                onClick={() => fillCredentials('user@factoryiq.com', 'factory123')}
                className="flex items-center gap-4 text-left p-3 rounded-xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.08] hover:border-accent/30 transition-all cursor-pointer"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Cpu className="h-5 w-5" />
                </div>
                <div className="space-y-0.5">
                  <p className="text-[10px] font-black uppercase tracking-widest text-accent">Engineer Node</p>
                  <p className="text-[11px] font-mono text-slate-400">user@factoryiq.com</p>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Side: Authorization Card */}
        <div className="flex justify-center">
          <Card className="glass-card border-none bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[2rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)] p-8 w-full max-w-sm space-y-6">
            <div className="space-y-1">
              <CardTitle className="text-2xl font-black text-white uppercase tracking-tight">Authorization</CardTitle>
              <CardDescription className="text-slate-500 font-medium text-[10px] uppercase tracking-widest">Secure Terminal Session</CardDescription>
            </div>

            <form onSubmit={handleSignIn} className="space-y-5">
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] ml-1">Work Directory ID</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="directory@factoryiq.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/5 border-white/10 text-white placeholder:text-slate-700 h-11 pl-10 rounded-xl focus:ring-primary/40 focus:border-primary/40 text-sm transition-all"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="password" className="text-slate-400 text-[9px] font-black uppercase tracking-[0.2em] ml-1">Security Key</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/5 border-white/10 text-white h-11 pl-10 rounded-xl focus:ring-primary/40 focus:border-primary/40 text-sm transition-all"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full h-11 font-black text-xs uppercase tracking-widest shadow-xl shadow-primary/10 rounded-xl bg-primary hover:bg-primary/90 transition-all" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Initiate Session"}
              </Button>
            </form>

            <Alert className="bg-primary/5 border-primary/20 rounded-xl py-2 px-3">
              <AlertCircle className="h-3 w-3 text-primary mt-0.5" />
              <div className="ml-2">
                <AlertTitle className="text-[8px] font-black uppercase tracking-widest text-primary mb-0.5">Predefined Access</AlertTitle>
                <AlertDescription className="text-[9px] text-slate-500 leading-tight">
                  Click a node on the left to auto-fill these security credentials.
                </AlertDescription>
              </div>
            </Alert>
          </Card>
        </div>
      </div>
    </div>
  );
}
