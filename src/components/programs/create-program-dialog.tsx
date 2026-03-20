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
import { collection, doc, serverTimestamp } from "firebase/firestore";
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
  const { firestore } = useFirestore();
  const { user } = useUser();
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
        ownerId: user.uid,
        manager: user.displayName || "Ratan Kollabathula",
        completion: 0,
        startDate: new Date().toISOString().split('T')[0],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        _members: {
          [user.uid]: "owner"
        }
      };

      addDocumentNonBlocking(programsRef, programData);
      
      toast({
        title: "Success",
        description: "Program has been created and initialized.",
      });
      
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create program. Please try again.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Program</DialogTitle>
          <DialogDescription>
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
                  <FormLabel>Program Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. NextGen Turbine X2" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="site"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufacturing Site</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. Shanghai Giga" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Initial Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
                    <FormLabel>Current Phase</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Phase" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
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
                  <FormLabel>Brief Description</FormLabel>
                  <FormControl>
                    <Input placeholder="Scope and objectives..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter className="pt-4">
              <Button type="submit" className="w-full">
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
