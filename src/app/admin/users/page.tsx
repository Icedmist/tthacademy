'use client';
import { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, query, orderBy } from 'firebase/firestore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { UserCog } from 'lucide-react';
import { StudentProfile } from '@/lib/types';

export default function AdminUsersPage() {
    const [users, setUsers] = useState<StudentProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            const q = query(collection(db, 'studentProgress'), orderBy('name', 'asc'));
            const snapshot = await getDocs(q);
            setUsers(snapshot.docs.map(doc => ({ 
                ...doc.data(), 
                studentId: doc.id 
            } as StudentProfile)));
            setLoading(false);
        };
        fetchUsers();
    }, []);

    const updateRole = async (userId: string, newRole: string) => {
        await updateDoc(doc(db, 'studentProgress', userId), { role: newRole });
        setUsers(users.map(u => u.studentId === userId ? { ...u, role: newRole } : u));
    };

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
                <UserCog className="h-8 w-8 text-primary" />
                User Management
            </h1>
            <div className="grid gap-6">
                {users.map(user => (
                    <Card key={user.studentId}>
                        <CardHeader>
                            <CardTitle className="text-lg">{user.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex justify-between items-center">
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                            <div className="flex gap-2">
                                <Button 
                                    size="sm" 
                                    variant={user.role === 'admin' ? 'default' : 'outline'}
                                    onClick={() => updateRole(user.studentId, 'admin')}
                                >Admin</Button>
                                <Button 
                                    size="sm" 
                                    variant={user.role === 'student' ? 'default' : 'outline'}
                                    onClick={() => updateRole(user.studentId, 'student')}
                                >Student</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
