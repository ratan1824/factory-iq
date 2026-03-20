
"use client";

import { useState } from "react";
import { useAuth, useFirestore } from "@/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Factory, Loader2, User, Shield, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { doc, setDoc } from "firebase/firestore";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function LoginPage() {
  const auth = useAuth();
  const firestore = useFirestore();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Manual sign-in handler
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({ variant: "destructive", title: "Missing Credentials", description: "Please enter both email and password." });
      return;
    }
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({ title: "Welcome Back", description: "Access authorized successfully." });
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

  /**
   * Prototype-friendly login: 
   * Attempts to sign in with predefined credentials. 
   * If the user doesn't exist, it creates them and initializes the profile.
   */
  const quickLogin = async (role: 'owner' | 'user') => {
    setIsLoading(true);
    const demoEmail = role === 'owner' ? 'admin@factoryiq.com' : 'user@factoryiq.com';
    const demoPassword = 'factory123';

    try {
      let userCredential;
      try {
        // Attempt sign-in
        userCredential = await signInWithEmailAndPassword(auth, demoEmail, demoPassword);
      } catch (signInError: any) {
        // If user doesn't exist, create them (only for this demo prototype)
        if (signInError.code === 'auth/user-not-found' || signInError.code === 'auth/invalid-credential') {
          userCredential = await createUserWithEmailAndPassword(auth, demoEmail, demoPassword);
        } else {
          throw signInError;
        }
      }

      // Initialize/Update the user profile in Firestore
      const userRef = doc(firestore, 'users', userCredential.user.uid);
      await setDoc(userRef, {
        id: userCredential.user.uid,
        role: role,
        firstName: role === 'owner' ? 'Ratan' : 'Manufacturing',
        lastName: role === 'owner' ? 'Kollabathula' : 'Engineer',
        email: demoEmail,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }, { merge: true });

      toast({
        title: "Profile Synchronized",
        description: `Logged in as ${role === 'owner' ? 'Admin' : 'User'}.`,
      });
    } catch (error: any) {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Access Error",
        description: "Make sure Email/Password is enabled in Firebase Console.",
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
                placeholder="name@factoryiq.com"
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
              <span className="bg-[#020617] px-4 text-slate-500">Instant Role Access</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              onClick={() => quickLogin('owner')} 
              className="h-20 bg-white/[0.03] border-white/10 text-white hover:bg-primary/20 hover:border-primary/40 rounded-2xl group transition-all flex flex-col items-center justify-center gap-2"
              disabled={isLoading}
            >
              <Shield className="h-5 w-5 text-primary group-hover:scale-110 transition-transform" />
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-widest leading-none">Admin</p>
                <p className="text-[8px] text-slate-500 mt-1 lowercase font-mono">admin@factoryiq.com</p>
              </div>
            </Button>
            <Button 
              variant="outline" 
              onClick={() => quickLogin('user')} 
              className="h-20 bg-white/[0.03] border-white/10 text-white hover:bg-accent/20 hover:border-accent/40 rounded-2xl group transition-all flex flex-col items-center justify-center gap-2"
              disabled={isLoading}
            >
              <User className="h-5 w-5 text-accent group-hover:scale-110 transition-transform" />
              <div className="text-center">
                <p className="text-[10px] font-black uppercase tracking-widest leading-none">User</p>
                <p className="text-[8px] text-slate-500 mt-1 lowercase font-mono">user@factoryiq.com</p>
              </div>
            </Button>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-4 pb-8">
          <Alert className="bg-primary/5 border-primary/20 rounded-xl">
            <AlertCircle className="h-4 w-4 text-primary" />
            <AlertTitle className="text-[10px] font-black uppercase tracking-widest text-primary">Predefined Access</AlertTitle>
            <AlertDescription className="text-[10px] text-slate-400 leading-relaxed mt-1">
              Select a role above to instantly authorize access using the two predefined accounts.
            </AlertDescription>
          </Alert>
        </CardFooter>
      </Card>
    </div>
  );
}
