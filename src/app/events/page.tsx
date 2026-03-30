import { getEvents } from '@/services/event-data';
import { CalendarDays } from 'lucide-react';
import type { Event, PlainEvent } from '@/lib/types';
import { EventTabs } from '@/components/events/EventTabs';

export default async function EventsPage() {
    const upcomingEvents: Event[] = await getEvents('upcoming');
    const pastEvents: Event[] = await getEvents('past');

    const toPlain = (event: Event): PlainEvent => ({
        ...event,
        date: event.date.toDate().toISOString(),
    });

    const plainUpcomingEvents: PlainEvent[] = upcomingEvents.map(toPlain);
    const plainPastEvents: PlainEvent[] = pastEvents.map(toPlain);

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="flex items-center gap-2 mb-4">
                <CalendarDays className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-headline font-bold">
                    Events & Webinars
                </h1>
            </div>
            <p className="text-muted-foreground mb-12">
                Join our live events to learn from experts and connect with the community.
            </p>
            <EventTabs 
                upcomingEvents={plainUpcomingEvents}
                pastEvents={plainPastEvents}
            />
        </div>
    );
}
