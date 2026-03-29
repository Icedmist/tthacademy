
'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, type DocumentData, query, orderBy } from "firebase/firestore";
import type { TeamMember } from '@/lib/types';
import { TeamMemberSchema } from '@/lib/types';

// Helper to convert Firestore doc to TeamMember type
const toTeamMember = (doc: DocumentData): TeamMember => {
    const data = doc.data();
    return TeamMemberSchema.parse({
        id: doc.id,
        ...data,
    });
};

export async function getTeamMembers(): Promise<TeamMember[]> {
    if (!db) throw new Error("Firestore not initialized.");
    
    const teamCol = collection(db, 'team');
    const q = query(teamCol, orderBy('name', 'asc'));
    
    try {
        const teamSnapshot = await getDocs(q);
        const teamList = teamSnapshot.docs.map(doc => toTeamMember(doc));
        return teamList;
    } catch (error: any) {
        console.error("Firestore error fetching team members:", error);
        throw new Error(`Failed to fetch team members: ${error.message}`);
    }
}
