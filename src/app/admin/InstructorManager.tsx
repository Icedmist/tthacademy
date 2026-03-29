
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Instructor } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Pencil, Trash2, UserPlus, Twitter, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { InstructorForm, getInstructorFormSchema } from '@/components/admin/InstructorForm';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { z } from 'zod';
import { InstructorSchema } from '@/lib/types';
import { getInstructors } from '@/services/instructor-data';
import { uploadFile } from '@/services/storage';

type InstructorFormData = z.infer<ReturnType<typeof getInstructorFormSchema>>;

export function InstructorManager() {
  const [instructors, setInstructors] = useState<Instructor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingInstructor, setEditingInstructor] = useState<Instructor | null>(null);
  const { toast } = useToast();

  const fetchInstructors = useCallback(async () => {
    setIsLoading(true);
    try {
      const instructorList = await getInstructors();
      setInstructors(instructorList);
    } catch (error) {
      console.error("Failed to fetch instructors", error);
      toast({
        title: "Error",
        description: `Could not fetch team members: ${(error as Error).message}.`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchInstructors();
  }, [fetchInstructors]);

  const handleFormSubmit = async (data: InstructorFormData) => {
    setIsSubmitting(true);
    try {
        let avatarUrl = data.avatarUrl;

        // Check if a new file is being uploaded
        if (data.avatarFile && data.avatarFile.length > 0) {
            const file = data.avatarFile[0];
            const filePath = `instructors/${Date.now()}_${file.name}`;
            avatarUrl = await uploadFile(file, filePath);
        } else if (!avatarUrl && editingInstructor) {
            // Retain the existing URL if no new file is provided during an edit
            avatarUrl = editingInstructor.avatarUrl;
        }

        if (!avatarUrl) {
            throw new Error("Instructor image is required. Please upload an image or provide a URL.");
        }

        const NewInstructorSchema = InstructorSchema.omit({ id: true });
        const validatedData = NewInstructorSchema.parse({
            name: data.name,
            bio: data.bio,
            socials: data.socials,
            avatarUrl: avatarUrl, // Use the potentially new URL
        });
        
        if (editingInstructor) {
            const instructorDocRef = doc(db, 'instructors', editingInstructor.id);
            await updateDoc(instructorDocRef, validatedData);
        } else {
            await addDoc(collection(db, 'instructors'), validatedData);
        }

        await fetchInstructors();

        toast({
            title: `Instructor ${editingInstructor ? 'updated' : 'added'}`,
            description: `The instructor details have been saved successfully.`,
            variant: "success",
        });
        setDialogOpen(false);
        setEditingInstructor(null);
    } catch (error: any) {
        toast({
            title: "Error",
            description: error.message || "An unknown error occurred.",
            variant: "destructive",
        });
    } finally {
        setIsSubmitting(false);
    }
  };


  const openEditDialog = (instructor: Instructor) => {
    setEditingInstructor(instructor);
    setDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingInstructor(null);
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    if (!isSubmitting) {
        setDialogOpen(false);
        setEditingInstructor(null);
    }
  }

  const confirmDelete = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'instructors', id));
        setInstructors(instructors.filter(i => i.id !== id));
        toast({
            title: "Instructor Deleted",
            description: "The instructor has been removed successfully.",
            variant: "success",
        });
    } catch (error: any) {
        toast({
            title: "Error",
            description: error.message || "An unknown error occurred.",
            variant: "destructive",
        });
    }
  };

  if (isLoading) {
    return (
        <div className="space-y-2">
            {[...Array(3)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
        </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex justify-end mb-4">
        <Button onClick={openAddDialog}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add Instructor
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={onDialogClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingInstructor ? 'Edit Instructor' : 'Add New Instructor'}</DialogTitle>
            <DialogDescription>
                Provide the details for the instructor. This information will be publicly visible.
            </DialogDescription>
          </DialogHeader>
          <InstructorForm 
            onSubmit={handleFormSubmit} 
            initialData={editingInstructor}
            isSubmitting={isSubmitting}
            onCancel={onDialogClose}
            />
        </DialogContent>
      </Dialog>
      
      <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Bio</TableHead>
                <TableHead>Socials</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {instructors.length > 0 ? instructors.map((instructor) => (
            <TableRow key={instructor.id}>
                <TableCell className="font-medium">{instructor.name}</TableCell>
                <TableCell className="text-muted-foreground max-w-sm">{instructor.bio}</TableCell>
                <TableCell>
                <div className='flex gap-2'>
                    {instructor.socials?.twitter && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Link href={instructor.socials.twitter} target="_blank">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                            <Twitter className="h-4 w-4" />
                            </Button>
                        </Link>
                        </TooltipTrigger>
                        <TooltipContent><p>View Twitter Profile</p></TooltipContent>
                    </Tooltip>
                    )}
                    {instructor.socials?.linkedin && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Link href={instructor.socials.linkedin} target="_blank">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                            <Linkedin className="h-4 w-4" />
                            </Button>
                        </Link>
                        </TooltipTrigger>
                        <TooltipContent><p>View LinkedIn Profile</p></TooltipContent>
                    </Tooltip>
                    )}
                </div>
                </TableCell>
                <TableCell className="text-right space-x-2">
                  <Tooltip>
                      <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(instructor)}>
                              <Pencil className="h-4 w-4" />
                          </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Edit member</p></TooltipContent>
                  </Tooltip>
                  <AlertDialog>
                    <Tooltip>
                        <TooltipTrigger asChild>
                             <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </AlertDialogTrigger>
                        </TooltipTrigger>
                        <TooltipContent><p>Delete member</p></TooltipContent>
                    </Tooltip>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the instructor's data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => confirmDelete(instructor.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
            </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No instructors found. Click "Add Instructor" to get started.
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}

    