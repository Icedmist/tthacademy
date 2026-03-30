'use client';

import { EventManager } from '../EventManager';
import { Card, CardContent } from '@/components/ui/card';
import { CalendarDays } from 'lucide-react';

export default function AdminEventsPage() {
    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <CalendarDays className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-headline font-bold">
                    Event Management
                </h1>
            </div>
            <p className="text-muted-foreground mb-8">
                 Create, edit, and manage events for your community.
            </p>
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className='pt-6'>
                    <EventManager />
                </CardContent>
            </Card>
        </div>
    );
}
