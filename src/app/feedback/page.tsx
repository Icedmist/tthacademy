'use client';

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, User, MessageSquare, Loader2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/use-auth";
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const feedbackFormSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Feedback must be at least 10 characters long." }),
});

export default function FeedbackPage() {
    const { user } = useAuth();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof feedbackFormSchema>>({
        resolver: zodResolver(feedbackFormSchema),
        defaultValues: {
            name: user?.displayName || "",
            email: user?.email || "",
            message: "",
        },
    });

    async function onSubmit(values: z.infer<typeof feedbackFormSchema>) {
        setIsLoading(true);
        
        try {
            const feedbackData = {
                ...values,
                userId: user?.uid,
                createdAt: serverTimestamp()
            };
            
            await addDoc(collection(db, 'feedback'), feedbackData);

            toast({
                title: "Feedback Submitted!",
                description: "Thank you for helping us improve our platform.",
                variant: "success",
            });
            
            form.reset();
            form.setValue('name', user?.displayName || "");
            form.setValue('email', user?.email || "");

        } catch (error: any) {
             toast({
                title: "Submission Failed",
                description: error.message || "There was an issue submitting your feedback. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="container mx-auto py-12 px-4 flex justify-center"
        >
            <Card className="w-full max-w-2xl bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-headline">Share Your Feedback</CardTitle>
                    <CardDescription>
                        We value your opinion. Let us know how we can improve.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-6">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Full Name</FormLabel>
                                            <FormControl>
                                                <Input icon={<User />} placeholder="Your Name" {...field} />
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
                                            <FormLabel>Email Address</FormLabel>
                                            <FormControl>
                                                <Input icon={<Mail />} placeholder="your@email.com" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Feedback</FormLabel>
                                        <FormControl>
                                            <Textarea
                                                placeholder="Tell us what you think..."
                                                className="resize-none"
                                                rows={6}
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Submit Feedback
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </motion.div>
    );
}
