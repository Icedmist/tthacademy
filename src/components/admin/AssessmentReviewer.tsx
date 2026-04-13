
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { getPendingSubmissions, reviewSubmission } from '@/services/assessment-data';
import { AssessmentSubmission } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, BookCheck, ClipboardCheck, XCircle, Eye } from 'lucide-react';

interface AssessmentReviewerProps {
    title?: string;
    description?: string;
}

export function AssessmentReviewer({ 
    title = "Assessment Reviews", 
    description = "Review student answers and approve completion for their courses." 
}: AssessmentReviewerProps) {
    const { user } = useAuth();
    const { toast } = useToast();
    const [submissions, setSubmissions] = useState<AssessmentSubmission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSubmission, setSelectedSubmission] = useState<AssessmentSubmission | null>(null);
    const [feedback, setFeedback] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const loadSubmissions = useCallback(async () => {
        setIsLoading(true);
        try {
            const data = await getPendingSubmissions();
            setSubmissions(data);
        } catch (error) {
            toast({ title: "Error", description: "Failed to load submissions.", variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        loadSubmissions();
    }, [loadSubmissions]);

    const handleReview = async (status: 'approved' | 'rejected') => {
        if (!selectedSubmission || !user) return;
        
        if (status === 'rejected' && !feedback.trim()) {
            toast({ title: "Feedback Required", description: "Please provide feedback when rejecting a submission.", variant: 'destructive' });
            return;
        }

        setIsProcessing(true);
        try {
            await reviewSubmission(
                selectedSubmission.id!,
                status,
                user.uid,
                user.displayName || 'Reviewer',
                feedback
            );
            
            toast({ 
                title: status === 'approved' ? "Approved!" : "Rejected", 
                description: `Submission for ${selectedSubmission.courseId} has been processed.`,
                variant: status === 'approved' ? 'success' : 'destructive'
            });

            setSelectedSubmission(null);
            setFeedback('');
            loadSubmissions();
        } catch (error) {
            toast({ title: "Review Failed", description: (error as Error).message, variant: 'destructive' });
        } finally {
            setIsProcessing(false);
        }
    };

    if (isLoading) return <div className="flex h-64 items-center justify-center"><Loader2 className="animate-spin h-8 w-8" /></div>;

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>{title} ({submissions.length})</CardTitle>
                    <CardDescription>{description}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Date</TableHead>
                                <TableHead>Student</TableHead>
                                <TableHead>Course</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {submissions.length > 0 ? submissions.map((sub) => (
                                <TableRow key={sub.id}>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {sub.submittedAt.toDate().toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className="font-semibold">{sub.studentName || sub.userId}</TableCell>
                                    <TableCell className="text-sm">{sub.courseTitle || sub.courseId}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="outline" size="sm" onClick={() => setSelectedSubmission(sub)}>
                                            <Eye className="mr-2 h-4 w-4" /> Review
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                                        No pending submissions at this time.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Dialog open={!!selectedSubmission} onOpenChange={() => !isProcessing && setSelectedSubmission(null)}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Review Submission</DialogTitle>
                        <DialogDescription>
                            Course: {selectedSubmission?.courseTitle || selectedSubmission?.courseId} | Student: {selectedSubmission?.studentName || selectedSubmission?.userId}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-6 py-4">
                        {selectedSubmission?.answers.map((answer, idx) => (
                            <div key={idx} className="space-y-2 border-b pb-4 last:border-0">
                                <h4 className="font-bold text-sm text-primary">Question {idx + 1}</h4>
                                <p className="text-sm font-medium">{answer.questionText}</p>
                                <div className="p-3 bg-muted rounded-md text-sm whitespace-pre-wrap">
                                    {answer.answerText}
                                </div>
                            </div>
                        ))}

                        <div className="space-y-2">
                            <Label htmlFor="feedback">Instructor Feedback (required for rejections)</Label>
                            <Textarea 
                                id="feedback" 
                                placeholder="Provide guidance or praise..." 
                                value={feedback} 
                                onChange={(e) => setFeedback(e.target.value)}
                                rows={4}
                            />
                        </div>
                    </div>

                    <DialogFooter className="gap-2 sm:gap-0">
                        <Button 
                            variant="destructive" 
                            disabled={isProcessing} 
                            onClick={() => handleReview('rejected')}
                        >
                            {isProcessing ? <Loader2 className="mr-2 animate-spin" /> : <XCircle className="mr-2" />}
                            Reject & Request Revision
                        </Button>
                        <Button 
                            variant="success" 
                            disabled={isProcessing} 
                            onClick={() => handleReview('approved')}
                        >
                            {isProcessing ? <Loader2 className="mr-2 animate-spin" /> : <ClipboardCheck className="mr-2" />}
                            Approve Course Completion
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
