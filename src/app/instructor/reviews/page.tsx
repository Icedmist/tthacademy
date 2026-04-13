
'use client';

import { AssessmentReviewer } from '@/components/admin/AssessmentReviewer';
import { BookCheck } from 'lucide-react';

export default function InstructorReviewsPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <BookCheck className="h-8 w-8 text-primary" />
                <h1 className="text-3xl font-headline font-bold">Assessment Reviews</h1>
            </div>
            
            <AssessmentReviewer />
        </div>
    );
}
