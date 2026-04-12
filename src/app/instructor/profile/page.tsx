
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, User, Linkedin, Twitter, Image as ImageIcon, BookUser } from 'lucide-react';
import { getInstructors } from '@/services/instructor-data';
import { db } from '@/lib/firebase';
import { doc, updateDoc, setDoc } from 'firebase/firestore';
import type { Instructor } from '@/lib/types';
import { uploadFile } from '@/services/storage';

const profileFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  avatarUrl: z.string().url('Must be a valid URL for the avatar image').optional().or(z.literal('')),
  avatarFile: z.any().optional(),
  socials: z.object({
    twitter: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
  }).optional(),
});

type ProfileFormData = z.infer<typeof profileFormSchema>;

export default function InstructorProfilePage() {
    const { user, profile, isLoading: isAuthLoading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [instructorData, setInstructorData] = useState<Instructor | null>(null);

    const form = useForm<ProfileFormData>({
        resolver: zodResolver(profileFormSchema)
    });

    useEffect(() => {
        if (isAuthLoading) return;
        if (!user || profile?.role !== 'instructor') {
            router.push('/login');
            return;
        }

        async function fetchInstructorData() {
            const instructors = await getInstructors();
            const currentInstructor = instructors.find(inst => inst.id === user.uid);
            if (currentInstructor) {
                setInstructorData(currentInstructor);
                form.reset({
                    name: currentInstructor.name,
                    bio: currentInstructor.bio,
                    avatarUrl: currentInstructor.avatarUrl,
                    socials: {
                        twitter: currentInstructor.socials?.twitter || '',
                        linkedin: currentInstructor.socials?.linkedin || '',
                    }
                });
            } else {
                 form.reset({
                    name: user.displayName || '',
                    bio: '',
                    avatarUrl: '',
                    socials: { twitter: '', linkedin: ''}
                 });
            }
        }
        fetchInstructorData();
    }, [user, profile, isAuthLoading, router, form]);

    async function onSubmit(data: ProfileFormData) {
        if (!user) return;
        setIsSubmitting(true);
        try {
            let finalAvatarUrl = data.avatarUrl;
            
            if (data.avatarFile && data.avatarFile.length > 0) {
                const file = data.avatarFile[0];
                const filePath = `instructors/${user.uid}/${Date.now()}_${file.name}`;
                finalAvatarUrl = await uploadFile(file, filePath);
            }

            if (!finalAvatarUrl) {
                throw new Error("Avatar image is required. Please upload an image or provide a URL.");
            }
            
            const instructorDocRef = doc(db, 'instructors', user.uid);

            const dataToSave = {
                name: data.name,
                bio: data.bio,
                avatarUrl: finalAvatarUrl,
                socials: data.socials,
            };

            if (instructorData) {
                await updateDoc(instructorDocRef, dataToSave);
            } else {
                await setDoc(instructorDocRef, dataToSave);
            }

            toast({
                title: "Profile Updated",
                description: "Your instructor profile has been saved successfully.",
                variant: "success",
            });

        } catch (error: any) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    }

    if (isAuthLoading) {
        return <div className="h-screen w-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
    }

    return (
        <div className="container mx-auto py-12 px-4 max-w-2xl">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookUser className="h-6 w-6 text-primary" />
                        Edit Instructor Profile
                    </CardTitle>
                    <CardDescription>
                        This information will be displayed publicly on the "About Us" page and on your assigned courses.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input icon={<User />} {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="bio"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Bio</FormLabel>
                                    <FormControl>
                                        <Textarea rows={5} placeholder="Tell us about your expertise and background..." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="avatarUrl"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Avatar Image URL</FormLabel>
                                    <FormControl>
                                        <Input icon={<ImageIcon />} placeholder="https://example.com/image.png" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="avatarFile"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Or Upload Avatar</FormLabel>
                                        <FormControl>
                                            <Input type="file" onChange={(e) => field.onChange(e.target.files)} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="socials.twitter"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>Twitter URL (Optional)</FormLabel>
                                    <FormControl>
                                        <Input icon={<Twitter />} placeholder="https://twitter.com/username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="socials.linkedin"
                                render={({ field }) => (
                                    <FormItem>
                                    <FormLabel>LinkedIn URL (Optional)</FormLabel>
                                    <FormControl>
                                        <Input icon={<Linkedin />} placeholder="https://linkedin.com/in/username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex justify-end gap-2">
                                <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
                                <Button type="submit" disabled={isSubmitting}>
                                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                    Save Profile
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}
