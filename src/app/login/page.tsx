
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useFirestore, useUser } from "@/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Factory, Loader2, Shield, AlertCircle, Key, Mail, Cpu, Fingerprint } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { doc, setDoc } from "firebase/firestore";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";

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

  return (
    <div className="flex min-h-screen items-center justify-center p-6 bg-[#020617] overflow-hidden relative font-body selection:bg-primary/20 selection:text-primary">
      {/* Dynamic aesthetic background */}
      <div className="absolute top-0 -left-1/4 w-[1000px] h-[1000px] bg-primary/5 rounded-full mix-blend-screen filter blur-[140px] opacity-40 animate-pulse" />
      <div className="absolute bottom-0 -right-1/4 w-[1000px] h-[1000px] bg-accent/5 rounded-full mix-blend-screen filter blur-[140px] opacity-40 animate-pulse delay-1000" />
      
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-8 items-center z-10 animate-in fade-in zoom-in-95 duration-700">
        
        {/* Left Side: Brand & Visual */}
        <div className="space-y-8 pr-8 hidden md:block">
          <div className="space-y-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-tr from-primary to-accent text-white shadow-2xl shadow-primary/20 rotate-3">
              <Factory className="h-10 w-10" />
            </div>
            <h1 className="text-7xl font-black tracking-tighter text-white leading-none uppercase">
              Factory<span className="text-primary">IQ</span>
            </h1>
            <p className="text-xl text-slate-400 font-medium max-w-sm">
              The neural interface for next-generation manufacturing excellence.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-3xl glass-card border-none bg-white/[0.03] space-y-2">
              <Cpu className="h-5 w-5 text-primary" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Real-time</p>
              <p className="text-sm font-bold text-white">Telemetry</p>
            </div>
            <div className="p-4 rounded-3xl glass-card border-none bg-white/[0.03] space-y-2">
              <Fingerprint className="h-5 w-5 text-accent" />
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Secure</p>
              <p className="text-sm font-bold text-white">Biometric Auth</p>
            </div>
          </div>
        </div>

        {/* Right Side: Login & Credentials Container */}
        <div className="space-y-6">
          <Card className="glass-card border-none bg-white/[0.01] backdrop-blur-3xl border border-white/5 rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.6)]">
            <div className="grid">
              
              {/* Form Section */}
              <div className="p-8 lg:p-10 space-y-8">
                <div className="space-y-2">
                  <CardTitle className="text-3xl font-black text-white uppercase tracking-tight">Authorization</CardTitle>
                  <CardDescription className="text-slate-500 font-medium text-xs uppercase tracking-widest">Secure Terminal Session</CardDescription>
                </div>

                <form onSubmit={handleSignIn} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Work Directory ID</Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="directory@factoryiq.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white/5 border-white/10 text-white placeholder:text-slate-700 h-14 pl-11 rounded-2xl focus:ring-primary/40 focus:border-primary/40 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Security Key</Label>
                    <div className="relative">
                      <Key className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-600" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-white/5 border-white/10 text-white h-14 pl-11 rounded-2xl focus:ring-primary/40 focus:border-primary/40 transition-all"
                      />
                    </div>
                  </div>
                  <Button type="submit" className="w-full h-14 font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/20 rounded-2xl bg-primary hover:bg-primary/90 transition-all" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : "Initiate Session"}
                  </Button>
                </form>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/5" />
                  </div>
                  <div className="relative flex justify-center text-[9px] uppercase font-black tracking-[0.4em]">
                    <span className="bg-[#020617] px-4 text-slate-600">Access Directory</span>
                  </div>
                </div>

                {/* Credentials Directory (Side-by-side inside card for smaller screens, but visual separation) */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3 group hover:bg-white/[0.05] transition-colors cursor-pointer" onClick={() => {setEmail('admin@factoryiq.com'); setPassword('factory123');}}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-primary">Admin Profile</span>
                      <Shield className="h-3 w-3 text-primary opacity-50" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-slate-400 truncate">admin@factoryiq.com</p>
                      <p className="text-[10px] font-mono text-slate-500">factory123</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3 group hover:bg-white/[0.05] transition-colors cursor-pointer" onClick={() => {setEmail('user@factoryiq.com'); setPassword('factory123');}}>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-black uppercase tracking-widest text-accent">User Profile</span>
                      <Cpu className="h-3 w-3 text-accent opacity-50" />
                    </div>
                    <div className="space-y-1">
                      <p className="text-[10px] font-mono text-slate-400 truncate">user@factoryiq.com</p>
                      <p className="text-[10px] font-mono text-slate-500">factory123</p>
                    </div>
                  </div>
                </div>

                <Alert className="bg-primary/5 border-primary/20 rounded-2xl mt-4">
                  <AlertCircle className="h-4 w-4 text-primary" />
                  <AlertTitle className="text-[9px] font-black uppercase tracking-widest text-primary">Predefined Node Access</AlertTitle>
                  <AlertDescription className="text-[10px] text-slate-500 leading-relaxed mt-1">
                    Select a directory profile above to auto-fill or enter manually.
                  </AlertDescription>
                </Alert>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
