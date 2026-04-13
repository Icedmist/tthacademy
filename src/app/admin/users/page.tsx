'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, Pencil, UserCog, Loader2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useEffect, useState, useCallback } from 'react';
import type { StudentProgress, UserRole } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, getDoc, query } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/hooks/use-auth';
import { updateUserRole } from '@/services/student-data';
import { ADMIN_UIDS } from '@/lib/admin';

const ProgressBadge = ({ progress }: { progress: number }) => {
    let variant: "success" | "warning" | "destructive" | "secondary" = "secondary";
    if (progress === 100) {
        variant = "success";
    } else if (progress > 0) {
        variant = "warning";
    } else {
        variant = "destructive";
    }
    return <Badge variant={variant}>{progress}%</Badge>
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<StudentProgress[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [referrers, setReferrers] = useState<Record<string, string>>({});
  const [editingUser, setEditingUser] = useState<StudentProgress | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();
  const { user } = useAuth();

  const fetchUsers = useCallback(async () => {
    if (!user) return; 

    try {
      setIsLoadingUsers(true);
      if (!db) {
          throw new Error("Firestore is not initialized.");
      }
      const progressCol = collection(db, 'studentProgress');
      const q = query(progressCol);
      const progressSnapshot = await getDocs(q);
      const userProgresses = progressSnapshot.docs.map(doc => doc.data() as StudentProgress);
      setUsers(userProgresses);

      const referrerIds = new Set(userProgresses.map(u => u.referredBy).filter(Boolean) as string[]);
      const referrerData: Record<string, string> = {};

      for (const uid of referrerIds) {
        if (!referrerData[uid]) { // Fetch only if not already fetched
          const userDoc = await getDoc(doc(db, 'studentProgress', uid));
          if (userDoc.exists()) {
              referrerData[uid] = userDoc.data().name;
          } else {
              referrerData[uid] = 'Unknown User';
          }
        }
      }
      setReferrers(referrerData);

    } catch (error: any) {
      console.error("Error fetching user list:", error);
      toast({
          title: "Error Fetching Users",
          description: `Could not load student list. This might be a permissions issue. Error: ${error.message}`,
          variant: "destructive",
      })
    } finally {
      setIsLoadingUsers(false);
    }
  }, [toast, user]);
  
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const openRoleDialog = (user: StudentProgress) => {
    setEditingUser(user);
    setSelectedRole(user.role);
    setIsSubmitting(false);
  }

  const handleRoleUpdate = async () => {
    if (!editingUser) return;
    setIsSubmitting(true);
    try {
      await updateUserRole(editingUser.studentId, selectedRole);
      toast({
        title: "Role Updated",
        description: `${editingUser.name}'s role has been changed to ${selectedRole}.`,
        variant: "success"
      });
      await fetchUsers(); // Refresh the user list
      setEditingUser(null);
    } catch(error: any) {
      toast({
        title: "Error Updating Role",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  const getRoleBadgeVariant = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'default';
      default: return 'outline';
    }
  }

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 mb-4">
          <Users className="h-8 w-8 text-primary" />
          <h1 className="text-3xl md:text-4xl font-headline font-bold">
              User Management
          </h1>
      </div>
      <p className="text-muted-foreground mb-8">
          Manage user roles and monitor student progress across the academy.
      </p>

      <Dialog open={!!editingUser} onOpenChange={(isOpen) => !isOpen && setEditingUser(null)}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Manage Role for {editingUser?.name}</DialogTitle>
                <DialogDescription>
                    Assign a new role to this user. Changing roles will alter their permissions and dashboard view.
                </DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="instructor">Instructor</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <DialogFooter>
                <Button variant="ghost" onClick={() => setEditingUser(null)}>Cancel</Button>
                <Button onClick={handleRoleUpdate} disabled={isSubmitting || editingUser?.role === selectedRole}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Changes
                </Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      <Card className="bg-card/80 backdrop-blur-sm border-border/50">
        <CardContent className='pt-6'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Referred By</TableHead>
                <TableHead>Overall Progress</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoadingUsers ? (
                [...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell colSpan={6}>
                      <Skeleton className="h-8 w-full" />
                    </TableCell>
                  </TableRow>
                ))
              ) : users.length > 0 ? (
                users.map((user) => (
                <TableRow key={user.studentId}>
                  <TableCell className="font-medium">{user.name}</TableCell>
                  <TableCell className="text-muted-foreground">{user.email}</TableCell>
                  <TableCell>
                      <Badge variant={getRoleBadgeVariant(user.role)} className="capitalize">
                        {user.role}
                      </Badge>
                  </TableCell>
                  <TableCell>
                      {user.referredBy ? referrers[user.referredBy] || 'N/A' : 'N/A'}
                  </TableCell>
                    <TableCell>
                      <ProgressBadge progress={user.overallProgress} />
                  </TableCell>
                  <TableCell className="text-right space-x-2">
                    <Tooltip>
                        <TooltipTrigger asChild>
                           <Button variant="ghost" size="icon" onClick={() => openRoleDialog(user)} disabled={ADMIN_UIDS.includes(user.studentId)}>
                               <UserCog className="h-4 w-4" />
                           </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Manage Role</p></TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" disabled>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent><p>Edit user (Not implemented)</p></TooltipContent>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground">
                    No users have created a profile yet, or your security rules are preventing access.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
