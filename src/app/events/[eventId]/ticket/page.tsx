
'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { getEvent, isUserRegisteredForEvent } from '@/services/event-data';
import type { Event as EventType } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { Ticket } from '@/components/events/Ticket';
import { Button } from '@/components/ui/button';
import { Download, Loader2, Home } from 'lucide-react';
import Link from 'next/link';

function TicketPageSkeleton() {
    return (
        <div className="container mx-auto py-12 px-4 flex flex-col items-center">
            <div className="w-full max-w-2xl mx-auto mb-4">
                 <Skeleton className="h-10 w-48" />
            </div>
            <Skeleton className="w-full max-w-2xl h-[300px]" />
        </div>
    )
}

export default function EventTicketPage() {
    const { user, isLoading: isAuthLoading } = useAuth();
    const params = useParams<{ eventId: string }>();
    const router = useRouter();

    const [event, setEvent] = useState<EventType | null>(null);
    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (isAuthLoading) return;
        if (!user) {
            router.replace(`/login?redirect=/events/${params.eventId}`);
            return;
        }

        async function fetchData() {
            try {
                const [eventData, registrationStatus] = await Promise.all([
                    getEvent(params.eventId),
                    isUserRegisteredForEvent(params.eventId, user!.uid)
                ]);

                if (!eventData || !registrationStatus) {
                    router.replace('/events');
                    return;
                }
                
                setEvent(eventData);
                setIsRegistered(registrationStatus);

            } catch (error) {
                console.error("Failed to load ticket data:", error);
                router.replace('/events');
            } finally {
                setIsLoading(false);
            }
        }
        fetchData();
    }, [user, isAuthLoading, params.eventId, router]);

    const handlePrint = () => {
        window.print();
    }

    if (isLoading) {
        return <TicketPageSkeleton />;
    }

    if (!event || !user) {
        return <div className="text-center p-8">Redirecting...</div>
    }

    return (
        <div className="container mx-auto py-12 px-4 flex flex-col items-center print:py-0">
             <div className="w-full max-w-2xl mx-auto mb-6 flex justify-between items-center print:hidden">
                <Link href="/events">
                    <Button variant="outline">
                        <Home className="mr-2 h-4 w-4" />
                        Back to Events
                    </Button>
                </Link>
                <Button onClick={handlePrint}>
                    <Download className="mr-2 h-4 w-4" />
                    Download / Print
                </Button>
            </div>
            <Ticket event={event} attendeeName={user.displayName || 'Valued Attendee'} />
        </div>
    );
}
