
"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, Loader2, Eye, EyeOff } from "lucide-react";
import { SocialLogins } from "./SocialLogins";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  remember: z.boolean().default(false).optional(),
});

export function LoginForm() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({
        title: "Login Successful",
        description: "Welcome back!",
      });
      router.push("/dashboard");
    } catch (error: any) {
        let errorMessage = "An unknown error occurred.";
        switch (error.code) {
            case 'auth/invalid-api-key':
                errorMessage = "The Firebase API key is not valid. Please check your .env file and ensure it matches the configuration in your Firebase console.";
                break;
            case 'auth/invalid-credential':
                 errorMessage = "Incorrect email or password. Please check your credentials and try again.";
                 break;
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                 errorMessage = "Incorrect email or password. Please check your credentials and try again.";
                 break;
            default:
                errorMessage = `Login failed: ${error.message}`;
                break;
        }
      toast({
        title: "Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input icon={<Mail />} placeholder="your@email.com" {...field} />
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
                  placeholder="Enter your password" 
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
        <div className="flex items-center justify-between">
            <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                    <FormControl>
                    <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                    />
                    </FormControl>
                    <FormLabel className="font-normal text-sm text-muted-foreground">Remember me</FormLabel>
                </FormItem>
                )}
            />
             <p className="text-sm">
                <Link href="/forgot-password" className="font-semibold text-primary hover:underline">
                    Forgot your password?
                </Link>
            </p>
        </div>

        <Button type="submit" className="w-full font-bold text-lg" size="lg" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Login to Account
        </Button>
      </form>
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">
            or continue with
          </span>
        </div>
      </div>
      <SocialLogins />
        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="font-semibold text-primary hover:underline">
            Sign up
          </Link>
        </p>
    </Form>
  );
}
