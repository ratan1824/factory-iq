"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useFirestore, useUser } from "@/firebase";
import { collection, serverTimestamp } from "firebase/firestore";
import { addDocumentNonBlocking } from "@/firebase/non-blocking-updates";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  status: z.string().default("Green"),
  phase: z.string().default("R&D"),
  site: z.string().min(2, "Site location is required"),
});

interface CreateProgramDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CreateProgramDialog({ open, onOpenChange }: CreateProgramDialogProps) {
  const firestore = useFirestore();
  const { user, profile } = useUser();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "Green",
      phase: "R&D",
      site: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!user) return;

    try {
      const programsRef = collection(firestore, "programs");
      const programData = {
        ...values,
        id: `PRJ-${Math.floor(1000 + Math.random() * 9000)}`,
        ownerId: user.uid,
        manager: profile?.firstName ? `${profile.firstName} ${profile.lastName}` : "Ratan Kollabathula",
        completion: 0,
        startDate: new Date().toISOString().split('T')[0],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        _members: {
          [user.uid]: "owner"
        }
      };

      // Initiate write without awaiting to maintain responsive UI
      addDocumentNonBlocking(programsRef, programData);
      
      toast({
        title: "Success",
        description: "Program initialization sequence started.",
      });
      
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to initialize program. Please try again.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] glass-card border-white/10 bg-slate-950/90 backdrop-blur-2xl rounded-3xl overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-black uppercase tracking-tight text-white">Create New Program</DialogTitle>
          <DialogDescription className="text-slate-400 text-xs font-medium">
            Initialize a new manufacturing program. Fill in the baseline details.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">Program Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. NextGen Turbine X2" {...field} className="bg-white/5 border-white/10 rounded-xl h-11 focus-visible:ring-primary/20" />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="site"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">Manufacturing Site</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Shanghai Giga" {...field} className="bg-white/5 border-white/10 rounded-xl h-11 focus-visible:ring-primary/20" />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">Initial Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-11 focus:ring-primary/20">
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="glass-card border-white/10 bg-slate-900">
                        <SelectItem value="Green">Green</SelectItem>
                        <SelectItem value="Yellow">Yellow</SelectItem>
                        <SelectItem value="Red">Red</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phase"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">Current Phase</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-white/5 border-white/10 rounded-xl h-11 focus:ring-primary/20">
                          <SelectValue placeholder="Phase" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="glass-card border-white/10 bg-slate-900">
                        <SelectItem value="R&D">R&D</SelectItem>
                        <SelectItem value="NPI">NPI</SelectItem>
                        <SelectItem value="Production">Production</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[10px] font-black uppercase tracking-widest text-slate-500">Brief Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Scope and objectives..." {...field} className="bg-white/5 border-white/10 rounded-xl h-11 focus-visible:ring-primary/20" />
                  </FormControl>
                  <FormMessage className="text-[10px]" />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="submit" className="w-full h-11 rounded-xl bg-primary hover:bg-primary/90 font-black text-xs uppercase tracking-widest transition-all">
                {form.formState.isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Program
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
