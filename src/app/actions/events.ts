import { registerForEvent, getEvent } from '@/services/event-data';
import { safeRevalidatePath } from '@/lib/revalidate';

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
            // TODO: Integrate a standard email service (e.g., Resend, SMTP) 
            // for event registration confirmations.
            console.log(`User ${userName} registered for event: ${event.title}`);
        }

        await safeRevalidatePath('/events');
        await safeRevalidatePath(`/events/${eventId}/ticket`);

        return { success: true, message: "Successfully registered!" };
    } catch (error) {
        console.error("Event registration failed:", error);
        return { success: false, message: (error as Error).message || "An unknown error occurred." };
    }
}
