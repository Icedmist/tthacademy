
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, getDoc, doc, query, type DocumentData } from "firebase/firestore";
import type { Course } from '@/lib/types';
import { CourseSchema } from '@/lib/types';
import { errorEmitter } from '@/firebase/error-emitter';
import { cache } from 'react';

// Helper to convert Firestore doc to Course type
const toCourse = (doc: DocumentData): Course => {
    const data = doc.data();
    // Merge static data with progress data to form a complete Course object
    const courseWithProgress = {
        ...data,
        id: doc.id,
        progress: data.progress || 0, // Default progress to 0 if not set
    };
    return CourseSchema.parse(courseWithProgress);
};

export const getCourses = cache(async (): Promise<Course[]> => {
    if (!db) {
        throw new Error("Firestore not initialized. Check your Firebase configuration.");
    }
    
    const coursesCollection = collection(db, 'courses');
    const q = query(coursesCollection);
    
    try {
        const coursesSnapshot = await getDocs(q);
        const courseList = coursesSnapshot.docs.map(doc => toCourse(doc));
        return courseList;
    } catch (error: any) {
         if (error.code === 'permission-denied') {
            errorEmitter.emit('permission-error', {
                path: `collection '${coursesCollection.path}'`,
                operation: 'list'
            });
         }
         console.error("Firestore error fetching courses:", error);
         throw new Error(`Failed to fetch courses: ${error.message}`);
    }
});

export const getCourse = cache(async (id: string): Promise<Course | null> => {
    if (!db) {
        throw new Error("Firestore not initialized.");
    }
    const courseDocRef = doc(db, 'courses', id);
    try {
        const courseSnapshot = await getDoc(courseDocRef);
        if (courseSnapshot.exists()) {
            return toCourse(courseSnapshot);
        }
        return null;
    } catch (error: any) {
         if (error.code === 'permission-denied') {
            errorEmitter.emit('permission-error', {
                path: `document '${courseDocRef.path}'`,
                operation: 'get'
            });
         }
        console.error(`Firestore error fetching course ${id}:`, error);
        throw new Error(`Failed to fetch course: ${error.message}`);
    }
});
