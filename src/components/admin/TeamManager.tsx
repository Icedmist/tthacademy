
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { TeamMember } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Pencil, Trash2, Briefcase, Twitter, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { TeamMemberForm, getTeamMemberFormSchema } from '@/components/admin/TeamMemberForm';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';
import { z } from 'zod';
import { TeamMemberSchema } from '@/lib/types';
import { uploadFile } from '@/services/storage';
import { Badge } from '@/components/ui/badge';

type TeamMemberFormData = z.infer<ReturnType<typeof getTeamMemberFormSchema>>;

export function TeamManager() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const { toast } = useToast();

  const fetchTeamMembers = useCallback(async () => {
    setIsLoading(true);
    try {
      const teamCollection = collection(db, 'team');
      const q = query(teamCollection, orderBy('name', 'asc'));
      const teamSnapshot = await getDocs(q);
      const teamList = teamSnapshot.docs.map(d => TeamMemberSchema.parse({ id: d.id, ...d.data() }));
      setTeamMembers(teamList);
    } catch (error) {
      console.error("Failed to fetch team members", error);
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
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  const handleFormSubmit = async (data: TeamMemberFormData) => {
    setIsSubmitting(true);
    try {
        let avatarUrl = data.avatarUrl;

        if (data.avatarFile && data.avatarFile.length > 0) {
            const file = data.avatarFile[0];
            const filePath = `team/${Date.now()}_${file.name}`;
            avatarUrl = await uploadFile(file, filePath);
        } else if (!avatarUrl && editingMember) {
            avatarUrl = editingMember.avatarUrl;
        }

        if (!avatarUrl) {
            throw new Error("Team member image is required. Please upload an image or provide a URL.");
        }

        const NewTeamMemberSchema = TeamMemberSchema.omit({ id: true });
        const validatedData = NewTeamMemberSchema.parse({
            name: data.name,
            role: data.role,
            bio: data.bio,
            socials: data.socials,
            avatarUrl: avatarUrl,
        });
        
        if (editingMember) {
            const memberDocRef = doc(db, 'team', editingMember.id);
            await updateDoc(memberDocRef, validatedData);
        } else {
            await addDoc(collection(db, 'team'), validatedData);
        }

        await fetchTeamMembers();

        toast({
            title: `Team Member ${editingMember ? 'updated' : 'added'}`,
            description: `The details have been saved successfully.`,
            variant: "success",
        });
        setDialogOpen(false);
        setEditingMember(null);
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


  const openEditDialog = (member: TeamMember) => {
    setEditingMember(member);
    setDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingMember(null);
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    if (!isSubmitting) {
        setDialogOpen(false);
        setEditingMember(null);
    }
  }

  const confirmDelete = async (id: string) => {
    try {
        await deleteDoc(doc(db, 'team', id));
        setTeamMembers(teamMembers.filter(i => i.id !== id));
        toast({
            title: "Team Member Deleted",
            description: "The team member has been removed successfully.",
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
          <Briefcase className="mr-2 h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={onDialogClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingMember ? 'Edit Team Member' : 'Add New Team Member'}</DialogTitle>
            <DialogDescription>
                Provide the details for the team member. This information will be publicly visible.
            </DialogDescription>
          </DialogHeader>
          <TeamMemberForm 
            onSubmit={handleFormSubmit} 
            initialData={editingMember}
            isSubmitting={isSubmitting}
            onCancel={onDialogClose}
            />
        </DialogContent>
      </Dialog>
      
      <Table>
        <TableHeader>
            <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Socials</TableHead>
                <TableHead className="text-right">Actions</TableHead>
            </TableRow>
        </TableHeader>
        <TableBody>
            {teamMembers.length > 0 ? teamMembers.map((member) => (
            <TableRow key={member.id}>
                <TableCell className="font-medium">{member.name}</TableCell>
                <TableCell><Badge variant="secondary">{member.role}</Badge></TableCell>
                <TableCell>
                <div className='flex gap-2'>
                    {member.socials?.twitter && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Link href={member.socials.twitter} target="_blank">
                            <Button variant="outline" size="icon" className="h-8 w-8">
                            <Twitter className="h-4 w-4" />
                            </Button>
                        </Link>
                        </TooltipTrigger>
                        <TooltipContent><p>View Twitter Profile</p></TooltipContent>
                    </Tooltip>
                    )}
                    {member.socials?.linkedin && (
                    <Tooltip>
                        <TooltipTrigger asChild>
                        <Link href={member.socials.linkedin} target="_blank">
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
                          <Button variant="ghost" size="icon" onClick={() => openEditDialog(member)}>
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
                                This action cannot be undone. This will permanently delete the team member's data from our servers.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => confirmDelete(member.id)}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
            </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground">
                  No team members found. Click "Add Team Member" to get started.
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </TooltipProvider>
  );
}
