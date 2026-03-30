
'use client';

import type { Event as EventType } from "@/lib/types";
import { format } from "date-fns";
import { Logo } from "@/components/Logo";
import { Calendar, MapPin, User } from "lucide-react";

interface TicketProps {
    event: EventType;
    attendeeName: string;
}

export function Ticket({ event, attendeeName }: TicketProps) {
    const eventDate = format(event.date.toDate(), "MMMM d, yyyy");
    const eventTime = format(event.date.toDate(), "h:mm a");

    return (
        <div className="w-full max-w-2xl bg-card/80 backdrop-blur-lg border border-border/50 shadow-2xl rounded-2xl overflow-hidden flex flex-col md:flex-row aspect-[16/9] md:aspect-[2/1] print:shadow-none print:border-none">
            <div className="p-6 md:p-8 flex flex-col justify-between flex-grow bg-background/20">
                <div>
                    <h2 className="text-2xl md:text-3xl font-headline font-bold text-primary mb-2">{event.title}</h2>
                    <p className="text-muted-foreground text-sm">Official Attendee Ticket</p>
                </div>
                <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-3">
                        <User className="w-4 h-4 text-primary" />
                        <span className="font-semibold">{attendeeName}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{eventDate} at {eventTime}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{event.location}</span>
                    </div>
                </div>
                <div className="text-xs text-muted-foreground/50">
                    Ticket ID: {event.id.slice(0,8)}-{attendeeName.replace(/\s+/g, '').slice(0,4).toUpperCase()}
                </div>
            </div>
            <div className="bg-primary/10 p-6 md:w-48 flex flex-col items-center justify-center text-center border-t md:border-l md:border-t-0 border-dashed border-border">
                <div className="mb-4">
                    <Logo />
                </div>
                <p className="text-xs text-muted-foreground">This ticket grants entry for one person.</p>
            </div>
        </div>
    );
}
