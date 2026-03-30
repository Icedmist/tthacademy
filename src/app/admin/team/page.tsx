
'use client';

import { TeamManager } from '@/admin/TeamManager';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

export default function AdminTeamPage() {
    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Briefcase className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-headline font-bold">
                    Team Management
                </h1>
            </div>
            <p className="text-muted-foreground mb-8">
                Add, view, and manage co-founders and other team members for the academy.
            </p>
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className='pt-6'>
                    <TeamManager />
                </CardContent>
            </Card>
        </div>
    );
}
