
'use client';

import { useState, useEffect, createContext, useContext, type ReactNode } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { StudentProgress } from '@/lib/types';
import { getStudentProgress } from '@/services/student-data';

type AuthContextType = {
  user: User | null;
  profile: StudentProgress | null;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType>({ user: null, profile: null, isLoading: true });

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<StudentProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      if (user) {
        setUser(user);
        // Fetch a lightweight profile for global context (roles, etc.)
        try {
            const studentProfile = await getStudentProgress(user.uid, user.displayName ?? undefined, user.email ?? undefined, undefined, { includeCourseData: false });
            setProfile(studentProfile);
        } catch (error) {
            console.error("Failed to fetch user profile on auth change:", error);
            setProfile(null);
        }

      } else {
        setUser(null);
        setProfile(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, profile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
