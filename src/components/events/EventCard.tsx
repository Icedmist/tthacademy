
'use client';

import { useState, useEffect } from "react";
import type { PlainEvent } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, MapPin, Ticket, Loader2, CalendarDays } from 'lucide-react';
import { format } from "date-fns";
import { Badge } from "../ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { isUserRegisteredForEvent } from "@/services/event-data";
import { handleEventRegistration } from "@/app/actions/events";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";


interface EventCardProps {
  event: PlainEvent;
}

export function EventCard({ event }: EventCardProps) {
    const { user } = useAuth();
    const { toast } = useToast();
    const router = useRouter();

    const [isRegistered, setIsRegistered] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isRegistering, setIsRegistering] = useState(false);
    const [eventDate, setEventDate] = useState('');

    useEffect(() => {
        // This ensures date formatting happens only on the client, avoiding hydration mismatch.
        // The date string is parsed and then formatted.
        const date = new Date(event.date);
        setEventDate(format(date, 'PPP'));
    }, [event.date]);

    useEffect(() => {
        if (!user) {
            setIsLoading(false);
            return;
        }
        async function checkRegistration() {
            setIsLoading(true);
            const registered = await isUserRegisteredForEvent(event.id, user!.uid);
            setIsRegistered(registered);
            setIsLoading(false);
        }
        checkRegistration();
    }, [user, event.id]);


    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };
    
    const getStatusVariant = (status: PlainEvent['status']) => {
        switch (status) {
            case 'upcoming': return 'success';
            case 'past': return 'secondary';
            case 'cancelled': return 'destructive';
            default: return 'secondary';
        }
    }

    const onRegisterClick = async () => {
        if (!user) {
            router.push('/login');
            return;
        }
        setIsRegistering(true);
        const result = await handleEventRegistration(event.id, user.uid, user.displayName || 'Student', user.email || '');

        if (result.success) {
            toast({
                title: 'Registration Successful!',
                description: `We've sent a confirmation to ${user.email}.`,
                variant: 'success'
            });
            setIsRegistered(true);
        } else {
            toast({
                title: 'Registration Failed',
                description: result.message,
                variant: 'destructive'
            });
        }
        setIsRegistering(false);
    };

    const renderButton = () => {
        if (event.status !== 'upcoming') {
            return <Button variant="outline" className="w-full" disabled>Event {event.status}</Button>;
        }

        if (isLoading) {
            return <Button className="w-full" disabled><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Checking Status...</Button>
        }

        if (isRegistered) {
            return (
                <Link href={`/events/${event.id}/ticket`} className="w-full">
                    <Button variant="outline" className="w-full">
                        <Ticket className="mr-2 h-4 w-4" /> View Ticket
                    </Button>
                </Link>
            )
        }

        return (
            <Button className="w-full" onClick={onRegisterClick} disabled={isRegistering}>
                {isRegistering ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Register Now
            </Button>
        )
    }

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="h-full"
        >
            <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader className="p-0 relative">
                    <div className="relative w-full h-48 bg-muted flex items-center justify-center">
                        <CalendarDays className="w-12 h-12 text-muted-foreground" />
                    </div>
                    <Badge variant={getStatusVariant(event.status)} className="absolute top-2 right-2 capitalize">{event.status}</Badge>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                    <CardTitle className="text-xl font-headline leading-tight mb-2 h-14">
                        {event.title}
                    </CardTitle>
                     <div className="text-sm text-muted-foreground space-y-2 mb-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 shrink-0 text-primary"/>
                            <span>{eventDate || <>&nbsp;</>}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 shrink-0 text-primary"/>
                            <span>{event.location}</span>
                        </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                        {event.description.substring(0, 120)}...
                    </CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0 mt-auto">
                    {renderButton()}
                </CardFooter>
            </Card>
        </motion.div>
    );
}
