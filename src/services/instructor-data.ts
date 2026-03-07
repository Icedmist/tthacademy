'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import type { Instructor } from '@/lib/types';

/**
 * Fetches all instructors from Firestore.
 * @returns An array of all instructor documents.
 */
export async function getInstructors(): Promise<Instructor[]> {
    if (!db) {
        throw new Error("Firestore is not initialized.");
    }

    try {
        const instructorsCollection = collection(db, 'instructors');
        const snapshot = await getDocs(instructorsCollection);
        
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        })) as Instructor[];
    } catch (error) {
        console.error('Failed to fetch instructors:', error);
        return [];
    }
}
