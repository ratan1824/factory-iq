
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, useFirestore, useUser } from "@/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Factory, Loader2, Shield, AlertCircle, Key, Mail } from "lucide-react";
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

  // Redirect if already logged in
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
      // Prototype-friendly logic: attempt to sign in, if fails with user-not-found, create the user
      // This ensures the predefined credentials work even if the Firebase project is fresh.
      let userCredential;
      try {
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } catch (error: any) {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/invalid-credential') {
          // Only auto-create for the predefined demo emails to keep things simple for the user
          if (email === 'admin@factoryiq.com' || email === 'user@factoryiq.com') {
            userCredential = await createUserWithEmailAndPassword(auth, email, password);
            // Initialize the profile
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
        description: error.message || "Invalid credentials. Please use the provided details below.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-4 bg-[#020617] overflow-hidden relative font-body">
      {/* Aesthetic mesh background */}
      <div className="absolute top-0 -left-4 w-[600px] h-[600px] bg-primary/10 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse" />
      <div className="absolute bottom-0 -right-4 w-[600px] h-[600px] bg-accent/10 rounded-full mix-blend-screen filter blur-[120px] opacity-30 animate-pulse delay-700" />
      
      <Card className="w-full max-w-md glass-card border-none bg-white/[0.02] backdrop-blur-3xl text-white shadow-2xl z-10 border border-white/5">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="flex justify-center mb-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-[2.5rem] bg-gradient-to-tr from-primary to-accent text-white shadow-2xl shadow-primary/20 rotate-6 hover:rotate-0 transition-transform duration-500">
              <Factory className="h-12 w-12" />
            </div>
          </div>
          <CardTitle className="text-4xl font-black tracking-tight text-white uppercase">FactoryIQ</CardTitle>
          <CardDescription className="text-slate-400 font-medium tracking-wider text-xs uppercase">
            Enterprise Intelligence & Excellence
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Work Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@factoryiq.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white placeholder:text-slate-600 h-12 rounded-xl focus:ring-primary/40 focus:border-primary/40 transition-all"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300 text-[10px] font-black uppercase tracking-[0.2em] ml-1">Security Key</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white h-12 rounded-xl focus:ring-primary/40 focus:border-primary/40 transition-all"
              />
            </div>
            <Button type="submit" className="w-full h-12 font-bold text-sm uppercase tracking-widest shadow-lg shadow-primary/20 rounded-xl bg-primary hover:bg-primary/80 transition-all" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Authorize Session"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-white/5" />
            </div>
            <div className="relative flex justify-center text-[10px] uppercase font-black tracking-[0.3em]">
              <span className="bg-[#020617] px-4 text-slate-500">Access Directory</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Admin Credentials</span>
                </div>
                <Badge variant="outline" className="text-[8px] uppercase tracking-tighter border-primary/30 text-primary">Full Access</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Mail className="h-3 w-3" /> admin@factoryiq.com
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Key className="h-3 w-3" /> factory123
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Factory className="h-4 w-4 text-accent" />
                  <span className="text-[10px] font-black uppercase tracking-widest">User Credentials</span>
                </div>
                <Badge variant="outline" className="text-[8px] uppercase tracking-tighter border-accent/30 text-accent">Restricted</Badge>
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Mail className="h-3 w-3" /> user@factoryiq.com
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <Key className="h-3 w-3" /> factory123
                </div>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pb-8">
          <Alert className="bg-primary/5 border-primary/20 rounded-xl">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-[10px] font-black uppercase tracking-widest text-primary">Predefined Access</AlertTitle>
            <AlertDescription className="text-[10px] text-slate-400 leading-relaxed mt-1">
              Enter the credentials above to authorize your session and explore the specific role capabilities.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  );
}

function Badge({ className, variant, children }: any) {
  return (
    <div className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
      {children}
    </div>
  )
}
