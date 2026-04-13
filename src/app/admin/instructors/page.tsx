
'use client';

import { InstructorManager } from '../InstructorManager';
import { UserCog } from 'lucide-react';

export default function AdminInstructorsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <UserCog className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-headline font-bold">Instructor Management</h1>
            </div>
            <p className="text-muted-foreground">
                Manage the roster of instructors who can review assessments and are displayed on the site.
            </p>
            
            <InstructorManager />
        </div>
    );
}
