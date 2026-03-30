
'use server';

import { registerForEvent, getEvent } from '@/services/event-data';
import { sendEventConfirmationEmail } from '@/ai/flows/send-event-confirmation-email-flow';
import { revalidatePath } from 'next/cache';

interface RegistrationResult {
    success: boolean;
    message: string;
}

export async function handleEventRegistration(
    eventId: string,
    userId: string,
    userName: string,
    userEmail: string
): Promise<RegistrationResult> {
    try {
        await registerForEvent(eventId, userId, userName, userEmail);

        const event = await getEvent(eventId);
        if (event) {
            // Trigger the email flow, but don't wait for it to complete
            sendEventConfirmationEmail({
                eventName: event.title,
                eventDate: event.date.toDate().toString(),
                eventLocation: event.location,
                userName,
                userEmail,
            }).catch(console.error); // Log email errors without blocking the user
        }

        revalidatePath('/events');
        revalidatePath(`/events/${eventId}/ticket`);

        return { success: true, message: "Successfully registered!" };
    } catch (error) {
        console.error("Event registration failed:", error);
        return { success: false, message: (error as Error).message || "An unknown error occurred." };
    }
}
