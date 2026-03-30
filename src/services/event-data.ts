'use server';

import { db } from '@/lib/firebase';
import { collection, getDocs, getDoc, doc, query, where, orderBy, type DocumentData, setDoc, serverTimestamp } from "firebase/firestore";
import type { Event, Attendee } from '@/lib/types';
import { EventSchema, AttendeeSchema } from '@/lib/types';

// Helper to convert Firestore doc to Event type
const toEvent = (doc: DocumentData): Event => {
    const data = doc.data();
    return EventSchema.parse({
        id: doc.id,
        ...data,
    });
};

export async function getEvents(status?: 'upcoming' | 'past' | 'cancelled'): Promise<Event[]> {
    if (!db) throw new Error("Firestore not initialized.");
    
    const eventsCollection = collection(db, 'events');
    let q;

    if (status) {
        // Query by status first to avoid needing a composite index
        q = query(eventsCollection, where('status', '==', status));
    } else {
        // If no status, just order by date
        q = query(eventsCollection, orderBy('date', 'desc'));
    }

    const eventsSnapshot = await getDocs(q);
    let eventList = eventsSnapshot.docs.map(doc => toEvent(doc));

    // If we filtered by status, we need to sort in-memory
    if (status) {
        eventList.sort((a, b) => {
            const dateA = a.date?.toDate ? a.date.toDate().getTime() : 0;
            const dateB = b.date?.toDate ? b.date.toDate().getTime() : 0;
            return dateB - dateA; // Sort descending
        });
    }
    
    return eventList;
}

export async function getEvent(id: string): Promise<Event | null> {
    if (!db) throw new Error("Firestore not initialized.");
    const eventDoc = doc(db, 'events', id);
    const eventSnapshot = await getDoc(eventDoc);
    if (eventSnapshot.exists()) {
        return toEvent(eventSnapshot);
    }
    return null;
}


// New functions for event registration

export async function registerForEvent(eventId: string, userId: string, userName: string, userEmail: string): Promise<void> {
    if (!db) throw new Error("Firestore not initialized.");
    
    const attendeeRef = doc(db, `events/${eventId}/attendees`, userId);
    
    const newAttendee = {
        userId,
        name: userName,
        email: userEmail,
        registeredAt: serverTimestamp(),
    };

    await setDoc(attendeeRef, newAttendee);
}

export async function isUserRegisteredForEvent(eventId: string, userId: string): Promise<boolean> {
    if (!db) throw new Error("Firestore not initialized.");
    const attendeeRef = doc(db, `events/${eventId}/attendees`, userId);
    const docSnap = await getDoc(attendeeRef);
    return docSnap.exists();
}

export async function getEventAttendees(eventId: string): Promise<Attendee[]> {
    if (!db) throw new Error("Firestore not initialized.");
    const attendeesCol = collection(db, `events/${eventId}/attendees`);
    const q = query(attendeesCol, orderBy('registeredAt', 'desc'));
    const snapshot = await getDocs(q);
    
    return snapshot.docs.map(d => AttendeeSchema.parse({ id: d.id, ...d.data() }));
}
