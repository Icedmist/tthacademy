'use client';

import { FeedbackManager } from '../FeedbackManager';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare } from 'lucide-react';

export default function AdminFeedbackPage() {
    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <MessageSquare className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-headline font-bold">
                    Feedback Management
                </h1>
            </div>
            <p className="text-muted-foreground mb-8">
                View and manage feedback submitted by your users.
            </p>
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className='pt-6'>
                    <FeedbackManager />
                </CardContent>
            </Card>
        </div>
    );
}
