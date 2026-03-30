'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, orderBy, query, type DocumentData } from "firebase/firestore";
import type { Feedback } from '@/lib/types';
import { FeedbackSchema } from '@/lib/types';

// Helper to convert Firestore doc to Feedback type
const toFeedback = (doc: DocumentData): Feedback => {
    const data = doc.data();
    // Use safeParse and handle potential errors if necessary
    const result = FeedbackSchema.safeParse({
        ...data,
        id: doc.id,
    });
    if (!result.success) {
        console.error("Failed to parse feedback:", result.error.issues);
        // Fallback to a default structure or throw an error
        throw new Error(`Invalid feedback data structure for doc ${doc.id}`);
    }
    return result.data;
};

export async function getFeedback(): Promise<Feedback[]> {
    if (!db) throw new Error("Firestore not initialized.");
    
    const feedbackCol = collection(db, 'feedback');
    const q = query(feedbackCol, orderBy('createdAt', 'desc'));
    
    const feedbackSnapshot = await getDocs(q);
    
    const feedbackList = feedbackSnapshot.docs.map(doc => toFeedback(doc));
    
    return feedbackList;
}
