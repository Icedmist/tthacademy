
'use client';

import { AssessmentReviewer } from '@/components/admin/AssessmentReviewer';
import { BookCheck } from 'lucide-react';

export default function AdminAssessmentsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <BookCheck className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-headline font-bold">Unified Assessment Review</h1>
            </div>
            <p className="text-muted-foreground">
                Review all pending submissions across the academy. These are visible to both admins and assigned instructors.
            </p>
            
            <AssessmentReviewer 
                title="Global Pending Submissions" 
                description="Manage evaluations for all courses."
            />
        </div>
    );
}
