
'use client';

import { SignUpForm } from "@/components/auth/SignUpForm";
import { LineChart, Sparkles, Loader2 } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { useAuth } from "@/hooks/use-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function SignUpPageContent() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const refCode = searchParams.get('ref');

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);

  if (user) {
    return <div className="h-screen w-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md mx-auto"
    >
        <Card className="bg-card/60 backdrop-blur-sm border-border/50 p-6 sm:p-8 rounded-xl shadow-2xl">
            <div className="flex flex-col items-center text-center">
                <div className="space-y-2 mb-8">
                <div className="flex items-center justify-center gap-3 text-foreground/80">
                    <LineChart className="w-5 h-5 text-primary" />
                    <span>Track your learning progress</span>
                </div>
                <div className="flex items-center justify-center gap-3 text-foreground/80">
                    <Sparkles className="w-5 h-5 text-primary" />
                    <span>Earn verifiable certificates</span>
                </div>
                </div>

                <h1 className="text-4xl font-headline font-bold text-primary">
                Tech Trade Hub
                </h1>
                <p className="text-muted-foreground mt-2 mb-8">
                Master The Future
                </p>
            </div>

            <div className="flex justify-center border-b border-border/40 mb-8">
                <Link href="/login" className="px-8 py-3 font-medium text-muted-foreground hover:text-foreground">
                    Login
                </Link>
                <Link href="/signup" className="px-8 py-3 font-medium border-b-2 border-primary text-foreground -mb-px">
                    Sign Up
                </Link>
            </div>
            
            <SignUpForm referralCode={refCode} />
        </Card>
    </motion.div>
  );
}

export default function SignUpPage() {
    return (
        <Suspense fallback={<div className="h-screen w-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
            <SignUpPageContent />
        </Suspense>
    )
}

    