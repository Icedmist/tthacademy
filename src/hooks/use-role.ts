
'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './use-auth';
import { getStudentProgress } from '@/services/student-data';
import { UserRole } from '@/lib/types';

export function useRole() {
    const { user, isLoading: isAuthLoading } = useAuth();
    const [role, setRole] = useState<UserRole | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchRole() {
            if (!user) {
                setRole(null);
                setIsLoading(isAuthLoading);
                return;
            }

            try {
                // We pass the email to ensure the instructor role resolution works
                const profile = await getStudentProgress(user.uid, user.displayName || '', user.email || '');
                setRole(profile.role);
            } catch (error) {
                console.error("Error fetching role:", error);
                setRole('student');
            } finally {
                setIsLoading(false);
            }
        }

        if (!isAuthLoading) {
            fetchRole();
        }
    }, [user, isAuthLoading]);

    return { role, isLoading, isAdmin: role === 'admin', isInstructor: role === 'instructor' || role === 'admin' };
}
