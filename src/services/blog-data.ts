
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, getDoc, doc, query, where, type DocumentData, orderBy } from "firebase/firestore";
import type { Blog } from '@/lib/types';
import { BlogSchema } from '@/lib/types';

// Helper to convert Firestore doc to Blog type
const toBlog = (doc: DocumentData): Blog => {
    const data = doc.data();
    return BlogSchema.parse({
        id: doc.id,
        ...data,
    });
};

export async function getPosts(status?: 'published' | 'draft'): Promise<Blog[]> {
    if (!db) throw new Error("Firestore not initialized.");
    
    let q;
    const blogPostsCollection = collection(db, 'blogPosts');
    
    if (status) {
        // We query only by status to avoid needing a composite index.
        // Sorting will be done in-memory after fetching.
        q = query(blogPostsCollection, where('status', '==', status));
    } else {
        // For internal use (like the admin panel), we can still sort.
        q = query(blogPostsCollection, orderBy('createdAt', 'desc'));
    }

    const postsSnapshot = await getDocs(q);
    let postList = postsSnapshot.docs.map(doc => toBlog(doc));
    
    // Sort posts by creation date descending if we filtered by status
    postList.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate().getTime() : 0;
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate().getTime() : 0;
        return dateB - dateA;
    });
    
    return postList;
}

export async function getPost(id: string): Promise<Blog | null> {
    if (!db) throw new Error("Firestore not initialized.");
    const postDoc = doc(db, 'blogPosts', id);
    const postSnapshot = await getDoc(postDoc);
    if (postSnapshot.exists()) {
        return toBlog(postSnapshot);
    }
    return null;
}

export async function getPostBySlug(slug: string): Promise<Blog | null> {
    if (!db) throw new Error("Firestore not initialized.");
    const q = query(collection(db, 'blogPosts'), where('slug', '==', slug), where('status', '==', 'published'));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
        return null;
    }
    return toBlog(snapshot.docs[0]);
}
