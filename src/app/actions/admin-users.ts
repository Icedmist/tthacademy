
'use server';

import { adminAuth, adminDb } from '@/lib/firebase-admin';
import { UserRole } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export async function adminCreateUser(data: {
  email: string;
  password?: string;
  name: string;
  role: UserRole;
}) {
  try {
    const auth = adminAuth();
    const db = adminDb();

    // 1. Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email: data.email,
      password: data.password || Math.random().toString(36).slice(-10), // Random password if not provided
      displayName: data.name,
    });

    // 2. Create profile in Firestore studentProgress collection
    await db.collection('studentProgress').doc(userRecord.uid).set({
      studentId: userRecord.uid,
      name: data.name,
      email: data.email,
      role: data.role,
      overallProgress: 0,
      completedCourses: 0,
      enrolledCourses: [],
      assessments: {},
      createdAt: new Date(),
    });

    revalidatePath('/admin/users');
    
    return { success: true, uid: userRecord.uid };
  } catch (error: any) {
    console.error('Error in adminCreateUser:', error);
    return { success: false, error: error.message || 'Failed to create user' };
  }
}
