
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { User, Mail, Lock, Loader2, Gift, Eye, EyeOff } from "lucide-react";
import { SocialLogins } from "./SocialLogins";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getStudentProgress } from "@/services/student-data";


const formSchema = z.object({
  fullName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  referralCode: z.string().optional(),
}).refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
});

export function SignUpForm({ referralCode }: { referralCode: string | null }) {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      referralCode: referralCode || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
        const user = userCredential.user;

        if (user) {
            await updateProfile(user, {
                displayName: values.fullName
            });

            // Create the student progress document immediately
            await getStudentProgress(user.uid, values.fullName, values.email, values.referralCode || undefined);
        }
        
        toast({
            title: "Account Created!",
            description: "You have been successfully signed up.",
        });
        router.push("/dashboard");

    } catch (error: any) {
        let errorMessage = "An unknown error occurred.";
        switch (error.code) {
            case 'auth/email-already-in-use':
                errorMessage = "This email is already in use. Please login or use a different email.";
                break;
            case 'auth/api-key-not-valid':
                errorMessage = "The Firebase API key is not valid. Please check your .env file.";
                break;
            default:
                errorMessage = `Signup failed: ${error.message}`;
                break;
        }

        toast({
            title: "Signup Failed",
            description: errorMessage,
            variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input icon={<User />} placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input icon={<Mail />} placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input 
                  icon={<Lock />} 
                  type={showPassword ? "text" : "password"} 
                  placeholder="********" 
                  {...field} 
                  suffix={
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="focus:outline-none">
                      {showPassword ? <EyeOff /> : <Eye />}
                    </button>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input 
                  icon={<Lock />} 
                  type={showConfirmPassword ? "text" : "password"} 
                  placeholder="********" 
                  {...field} 
                  suffix={
                     <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="focus:outline-none">
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </button>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="referralCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Referral Code (Optional)</FormLabel>
              <FormControl>
                <Input icon={<Gift />} placeholder="Enter referrer's code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full font-bold text-lg" size="lg" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Create Account
        </Button>
      </form>
       <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            Or sign up with
          </span>
        </div>
      </div>
      <SocialLogins />
       <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-primary hover:underline">
                Login
            </Link>
        </p>
    </Form>
  );
}
