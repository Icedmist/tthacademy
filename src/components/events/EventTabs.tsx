'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { EventCard } from '@/components/events/EventCard';
import type { PlainEvent } from '@/lib/types';

interface EventTabsProps {
    upcomingEvents: PlainEvent[];
    pastEvents: PlainEvent[];
}

function EventsGrid({ events, status }: { events: PlainEvent[], status: 'upcoming' | 'past' }) {
    if (events.length === 0) {
        return (
             <div className="text-center py-16">
                <h2 className="text-2xl font-semibold mb-2">No {status} events</h2>
                <p className="text-muted-foreground">
                    Please check back later for new events!
                </p>
            </div>
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events.map(event => (
                <EventCard key={event.id} event={event} />
            ))}
        </div>
    );
}

export function EventTabs({ upcomingEvents, pastEvents }: EventTabsProps) {
    return (
        <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-md mx-auto mb-8">
                <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
                <TabsTrigger value="past">Past Events</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming">
                <EventsGrid events={upcomingEvents} status="upcoming" />
            </TabsContent>
            <TabsContent value="past">
                <EventsGrid events={pastEvents} status="past" />
            </TabsContent>
      </Tabs>
    );
}
