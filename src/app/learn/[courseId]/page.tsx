
'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { getStudentProgress } from '@/services/student-data';
import { getCourse as getCourseData, getCourses } from '@/services/course-data';
import { handleUpdateLessonStatus as updateLessonStatusAction, handleSubmitAssessment } from '@/app/actions/progress';
import type { StudentProgress, Course, Module, Lesson, AssessmentSubmission } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ArrowRight, CheckCircle, Circle, Home, Loader2, AlertTriangle, BookCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { VideoPlayer } from '@/components/courses/VideoPlayer';

function LearningInterface() {
    const { user } = useAuth();
    const router = useRouter();
    const params = useParams<{ courseId: string }>();
    const searchParams = useSearchParams();
    const { toast } = useToast();

    const [enrolledCourse, setEnrolledCourse] = useState<Course | null>(null);
    const [allCourses, setAllCourses] = useState<Course[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [assessmentAnswers, setAssessmentAnswers] = useState<Record<number, string>>({});
    const [studentProfile, setStudentProfile] = useState<StudentProgress | null>(null);

    const isAssessment = searchParams.get('assessment') === 'final';
    const moduleIndex = parseInt(searchParams.get('module') || '0', 10);
    const lessonIndex = parseInt(searchParams.get('lesson') || '0', 10);

    const currentModule = useMemo(() => enrolledCourse?.modules[moduleIndex], [enrolledCourse, moduleIndex]);
    const currentLesson = useMemo(() => currentModule?.lessons[lessonIndex], [currentModule, lessonIndex]);
    const finalAssessment = useMemo(() => enrolledCourse?.finalAssessment, [enrolledCourse]);

    useEffect(() => {
        async function loadCourseData() {
            if (!user) {
                router.replace(`/login?redirect=/courses/${params.courseId}`);
                return;
            }

            setIsLoading(true);
            try {
                const [allCoursesData, progressData] = await Promise.all([
                    getCourses(),
                    getStudentProgress(user.uid)
                ]);

                setAllCourses(allCoursesData);
                
                setStudentProfile(progressData);
                const courseWithProgress = progressData.enrolledCourses.find(c => c.id === params.courseId);

                if (!courseWithProgress) {
                    router.replace(`/courses/${params.courseId}`);
                    toast({ title: "Not Enrolled", description: "You need to enroll in this course to access it.", variant: 'destructive' });
                    return;
                }

                setEnrolledCourse(courseWithProgress);

            } catch (err) {
                console.error("Failed to load learning data:", err);
                toast({ title: "Error", description: "Could not load course data.", variant: 'destructive' });
                router.replace('/dashboard');
            } finally {
                setIsLoading(false);
            }
        }
        loadCourseData();
    }, [user, params.courseId, router, toast]);

    const { prevLesson, nextLesson } = useMemo(() => {
        if (!enrolledCourse) return { prevLesson: null, nextLesson: null };

        let lessonsFlat: { moduleIndex: number; lessonIndex: number; isAssessment?: boolean }[] = [];
        enrolledCourse.modules.forEach((mod, mIdx) => {
            mod.lessons.forEach((_, lIdx) => {
                lessonsFlat.push({ moduleIndex: mIdx, lessonIndex: lIdx });
            });
        });

        if (enrolledCourse.finalAssessment && enrolledCourse.finalAssessment.length > 0) {
            lessonsFlat.push({ moduleIndex: -1, lessonIndex: -1, isAssessment: true });
        }

        const currentFlatIndex = isAssessment
            ? lessonsFlat.findIndex(l => l.isAssessment)
            : lessonsFlat.findIndex(l => l.moduleIndex === moduleIndex && l.lessonIndex === lessonIndex);

        const prev = currentFlatIndex > 0 ? lessonsFlat[currentFlatIndex - 1] : null;
        const next = currentFlatIndex < lessonsFlat.length - 1 ? lessonsFlat[currentFlatIndex + 1] : null;

        const toUrl = (item: typeof prev) => {
            if (!item) return null;
            if (item.isAssessment) return `/learn/${params.courseId}?assessment=final`;
            return `/learn/${params.courseId}?module=${item.moduleIndex}&lesson=${item.lessonIndex}`;
        };

        return { prevLesson: toUrl(prev), nextLesson: toUrl(next) };
    }, [enrolledCourse, moduleIndex, lessonIndex, params.courseId, isAssessment]);

    const toggleLessonCompletion = async () => {
        if (!user || !currentLesson || !enrolledCourse) return;
        setIsSubmitting(true);
        const newStatus = !currentLesson.completed;
        try {
            await updateLessonStatusAction(user.uid, enrolledCourse.id, moduleIndex, lessonIndex, newStatus);
            toast({
                title: `Lesson ${newStatus ? 'Completed' : 'Unmarked'}!`,
                variant: 'success',
            });
            
            // Optimistically update UI
            const updatedCourse = JSON.parse(JSON.stringify(enrolledCourse));
            updatedCourse.modules[moduleIndex].lessons[lessonIndex].completed = newStatus;
            
            const totalLessons = updatedCourse.modules.reduce((sum: number, mod: Module) => sum + mod.lessons.length, 0);
            const completedLessons = updatedCourse.modules.reduce((sum: number, mod: Module) => sum + mod.lessons.filter(l => l.completed).length, 0);
            updatedCourse.progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

            setEnrolledCourse(updatedCourse);

            if (newStatus && nextLesson) {
                router.push(nextLesson);
            }
        } catch (error) {
            toast({ title: "Error updating status", description: (error as Error).message, variant: 'destructive' });
        }
        setIsSubmitting(false);
    };

    const submitFinalAssessment = async () => {
        if (!user || !enrolledCourse || !finalAssessment) return;
        
        const answersArray = finalAssessment.map((q, idx) => ({
            questionText: q.questionText,
            answerText: assessmentAnswers[idx] || ""
        }));

        if (answersArray.some(a => !a.answerText.trim())) {
            toast({ title: "Incomplete", description: "Please answer all questions before submitting.", variant: 'destructive' });
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await handleSubmitAssessment({
                userId: user.uid,
                courseId: enrolledCourse.id,
                answers: answersArray,
            });

            if (res.success) {
                toast({ title: "Assessment Submitted", description: "Your answers have been forwarded to an instructor for review.", variant: 'success' });
                // Update local status
                if (studentProfile) {
                    const updatedProfile = { ...studentProfile };
                    updatedProfile.assessments = {
                        ...(updatedProfile.assessments || {}),
                        [enrolledCourse.id]: { status: 'pending' as const, submissionId: res.submissionId! }
                    };
                    setStudentProfile(updatedProfile);
                }
            } else {
                throw new Error(res.error);
            }
        } catch (error) {
            toast({ title: "Submission Failed", description: (error as Error).message, variant: 'destructive' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isLoading || !enrolledCourse) {
        return <LearningSkeleton />;
    }

    if (!isAssessment && (!currentLesson || !currentModule)) {
        return (
            <div className="flex h-screen items-center justify-center text-center">
                 <Card className="max-w-md w-full bg-destructive/10 border-destructive text-destructive">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlertTriangle />
                            Lesson Not Found
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>The lesson you are looking for does not exist.</p>
                        <Link href="/dashboard"><Button variant="outline" className="mt-4">Back to Dashboard</Button></Link>
                    </CardContent>
                </Card>
            </div>
        )
    }

    const totalLessons = enrolledCourse.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
    const completedLessons = enrolledCourse.modules.reduce((sum, mod) => sum + mod.lessons.filter(l => l.completed).length, 0);

    const renderContent = () => {
        const assessmentStatus = studentProfile?.assessments?.[params.courseId]?.status;

        if (isAssessment) {
            return (
                <div className="prose dark:prose-invert max-w-none">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className='font-headline m-0'>Final Assessment</h2>
                        {assessmentStatus && (
                            <Badge className={cn(
                                "capitalize text-sm py-1 px-3",
                                assessmentStatus === 'pending' && "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
                                assessmentStatus === 'approved' && "bg-green-500/10 text-green-500 border-green-500/20",
                                assessmentStatus === 'rejected' && "bg-destructive/10 text-destructive border-destructive/20"
                            )} variant="outline">
                                {assessmentStatus}
                            </Badge>
                        )}
                    </div>
                    
                    {assessmentStatus === 'approved' ? (
                        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-6 text-center">
                            <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                            <h3 className="text-xl font-bold text-green-500">Assessment Approved!</h3>
                            <p className="mt-2">Congratulations! You have successfully completed this course. You can now download your certificate from the dashboard.</p>
                        </div>
                    ) : (
                        <>
                            <p>Please answer the following questions to the best of your ability. Your answers will be reviewed by an instructor.</p>
                            <div className="space-y-8 mt-6">
                                {finalAssessment?.map((q, idx) => (
                                    <div key={idx}>
                                        <Label htmlFor={`question-${idx}`} className="text-lg font-semibold">{`Question ${idx + 1}: ${q.questionText}`}</Label>
                                        <Textarea 
                                            id={`question-${idx}`} 
                                            rows={8} 
                                            className="mt-2" 
                                            placeholder="Your answer here..." 
                                            value={assessmentAnswers[idx] ?? ""}
                                            onChange={(e) => setAssessmentAnswers(prev => ({ ...prev, [idx]: e.target.value }))}
                                            disabled={assessmentStatus === 'pending' || (assessmentStatus as string) === 'approved'}
                                        />
                                    </div>
                                ))}
                            </div>
                            {assessmentStatus === 'rejected' && studentProfile?.assessments?.[params.courseId]?.lastFeedback && (
                                <div className="mt-8 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                                    <h4 className="font-bold flex items-center gap-2 mb-2">
                                        <AlertTriangle className="h-4 w-4" /> Instructor Feedback
                                    </h4>
                                    <p className="text-sm">{studentProfile.assessments[params.courseId].lastFeedback}</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            );
        } else {
            return (
                <>
                    <div className="mb-8">
                        {currentLesson?.videoUrl ? (
                            <VideoPlayer videoUrl={currentLesson.videoUrl} title={currentLesson.title} />
                        ) : (
                            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-dashed border-2 border-muted-foreground/20">
                                <p className="text-muted-foreground italic">No video available for this lesson.</p>
                            </div>
                        )}
                    </div>
                    <div className="prose dark:prose-invert max-w-none">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                            <h2 className='font-headline m-0'>About This Lesson</h2>
                            {currentLesson?.duration && (
                                <Badge variant="secondary" className="w-fit">{currentLesson.duration}</Badge>
                            )}
                        </div>
                        <div className="bg-card/30 p-6 rounded-xl border border-border/40 mb-8 whitespace-pre-wrap leading-relaxed shadow-inner">
                            {currentLesson?.content}
                        </div>

                        {currentLesson?.assignment && (
                            <div className="mt-12 bg-primary/5 border border-primary/20 rounded-2xl p-6 sm:p-8 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <BookCheck className="h-24 w-24 text-primary" />
                                </div>
                                <h3 className="text-xl font-headline font-bold text-primary flex items-center gap-2 mb-4">
                                    <Sparkles className="h-5 w-5" /> Assignment
                                </h3>
                                <div className="text-foreground/90 leading-relaxed font-medium">
                                    {currentLesson.assignment}
                                </div>
                                <p className="mt-6 text-sm text-muted-foreground italic border-t pt-4 border-primary/10">
                                    Note: Assignments are for self-practice and to prepare you for the final assessment.
                                </p>
                            </div>
                        )}
                    </div>
                </>
            );
        }
    };
    
    const renderFooter = () => {
        const assessmentStatus = studentProfile?.assessments?.[params.courseId]?.status;

        if (isAssessment) {
            if (assessmentStatus === 'approved') return null;
            
            return (
                 <Button 
                    size="lg" 
                    className="w-full sm:w-auto" 
                    onClick={submitFinalAssessment}
                    disabled={isSubmitting || assessmentStatus === 'pending'}
                >
                    {isSubmitting ? <Loader2 className="mr-2 animate-spin"/> : <BookCheck className="mr-2"/>}
                    {assessmentStatus === 'pending' ? 'Awaiting Instructor Review' : 'Submit for Review'}
                </Button>
            );
        } else {
            return (
                <Button
                    size="lg"
                    variant={currentLesson?.completed ? 'outline' : 'success'}
                    onClick={toggleLessonCompletion}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto"
                >
                    {isSubmitting ? <Loader2 className="mr-2 animate-spin"/> : <CheckCircle className="mr-2"/>}
                    {currentLesson?.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
                </Button>
            );
        }
    }


    return (
        <div className="flex min-h-screen">
            <aside className="w-80 border-r bg-card/50 hidden md:flex flex-col">
                 <div className="p-4 border-b">
                    <Link href={`/courses/${enrolledCourse.id}`} className='hover:underline'>
                        <h2 className="text-lg font-headline font-bold truncate">{enrolledCourse.title}</h2>
                    </Link>
                    <div className="text-xs text-muted-foreground mt-2">
                        <Progress value={enrolledCourse.progress} className="h-2 mb-1" />
                        {completedLessons} of {totalLessons} lessons completed
                    </div>
                 </div>
                 <div className="flex-grow overflow-y-auto">
                    <Accordion type="multiple" defaultValue={[`module-${moduleIndex}`]} className="w-full">
                        {enrolledCourse.modules.map((mod, mIdx) => (
                            <AccordionItem key={mIdx} value={`module-${mIdx}`}>
                                <AccordionTrigger className="px-4 text-base font-semibold">{mod.title}</AccordionTrigger>
                                <AccordionContent>
                                    <ul className="space-y-1">
                                        {mod.lessons.map((lesson, lIdx) => (
                                            <li key={lIdx}>
                                                <Link href={`/learn/${params.courseId}?module=${mIdx}&lesson=${lIdx}`}>
                                                    <div className={cn(
                                                        "flex items-center gap-3 p-3 mx-2 rounded-md text-sm transition-colors",
                                                        !isAssessment && moduleIndex === mIdx && lessonIndex === lIdx ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                                                    )}>
                                                        {lesson.completed ? <CheckCircle className="h-5 w-5 text-green-500 shrink-0" /> : <Circle className="h-5 w-5 text-muted-foreground shrink-0" />}
                                                        <span className='truncate'>{lesson.title}</span>
                                                        <span className="ml-auto text-xs opacity-70 shrink-0">{lesson.duration}</span>
                                                    </div>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                         {finalAssessment && finalAssessment.length > 0 && (
                             <div className="p-2">
                                <Link href={`/learn/${params.courseId}?assessment=final`}>
                                     <div className={cn(
                                        "flex items-center gap-3 p-3 mx-2 rounded-md text-sm transition-colors font-semibold",
                                        isAssessment ? 'bg-primary text-primary-foreground' : 'hover:bg-muted'
                                    )}>
                                        <BookCheck className="h-5 w-5 shrink-0" />
                                        <span>Final Assessment</span>
                                    </div>
                                </Link>
                            </div>
                        )}
                    </Accordion>
                 </div>
                 <div className="p-4 border-t">
                    <Link href="/dashboard">
                        <Button variant="outline" className='w-full'><Home className="mr-2" /> Back to Dashboard</Button>
                    </Link>
                 </div>
            </aside>
            <main className="flex-1 flex flex-col">
                <header className="flex items-center justify-between p-4 border-b">
                    <h1 className="text-xl md:text-2xl font-headline font-bold truncate">
                        {isAssessment ? "Final Assessment" : currentLesson?.title}
                    </h1>
                    <div className="hidden md:flex">
                        <Button variant="ghost" disabled={!prevLesson} onClick={() => prevLesson && router.push(prevLesson)}>
                            <ArrowLeft className="mr-2"/> Previous
                        </Button>
                        <Button variant="ghost" disabled={!nextLesson} onClick={() => nextLesson && router.push(nextLesson)}>
                            Next <ArrowRight className="ml-2"/>
                        </Button>
                    </div>
                </header>
                <div className="flex-grow p-4 md:p-8">
                   {renderContent()}
                </div>
                <footer className="p-4 border-t bg-card/50 flex flex-col sm:flex-row items-center justify-center gap-4">
                     {renderFooter()}
                     <div className="flex md:hidden w-full">
                        <Button className="w-1/2" variant="ghost" disabled={!prevLesson} onClick={() => prevLesson && router.push(prevLesson)}>
                            <ArrowLeft className="mr-2"/> Previous
                        </Button>
                        <Button className="w-1/2" variant="ghost" disabled={!nextLesson} onClick={() => nextLesson && router.push(nextLesson)}>
                            Next <ArrowRight className="ml-2"/>
                        </Button>
                    </div>
                </footer>
            </main>
        </div>
    );
}

function LearningSkeleton() {
    return (
        <div className="flex min-h-screen">
            <aside className="w-80 border-r bg-card/50 hidden md:flex flex-col">
                <div className="p-4 border-b space-y-2">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                </div>
                <div className="flex-grow p-4 space-y-4">
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                    <Skeleton className="h-12 w-full" />
                </div>
                <div className="p-4 border-t">
                    <Skeleton className="h-10 w-full" />
                </div>
            </aside>
            <main className="flex-1 flex flex-col">
                <header className="p-4 border-b flex justify-between items-center">
                    <Skeleton className="h-8 w-1/2" />
                    <div className='flex gap-2'>
                        <Skeleton className="h-10 w-24" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                </header>
                <div className="flex-grow p-4 md:p-8">
                    <Skeleton className="aspect-video w-full mb-8" />
                    <Skeleton className="h-6 w-1/4 mb-4" />
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-2/3" />
                    </div>
                </div>
                 <footer className="p-4 border-t bg-card/50 flex items-center justify-center">
                    <Skeleton className="h-12 w-48" />
                 </footer>
            </main>
        </div>
    );
}

export default function LearnPage() {
    return (
        <Suspense fallback={<LearningSkeleton />}>
            <LearningInterface />
        </Suspense>
    )
}
