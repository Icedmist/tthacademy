
'use client';

import { notFound, useRouter, useParams } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { getCourse } from '@/services/course-data';
import { getStudentProgress } from '@/services/student-data';
import type { Course, StudentProgress } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';
import Link from 'next/link';

export default function CertificatePage() {
  const params = useParams<{ id: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [profile, setProfile] = useState<StudentProgress | null>(null);
  const { user } = useAuth();
  const router = useRouter();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isEligible, setIsEligible] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUrl(window.location.href);
    }
    
    async function checkEligibility() {
      if (!params.id || !user) return;
      
      try {
        const [courseData, progressData] = await Promise.all([
            getCourse(params.id),
            getStudentProgress(user.uid)
        ]);

        if (!courseData) {
            notFound();
            return;
        }

        setCourse(courseData);
        setProfile(progressData);

        const courseProgress = progressData.enrolledCourses.find(c => c.id === params.id);
        const assessmentStatus = progressData.assessments?.[params.id]?.status;

        // Eligibility: 100% progress AND assessment approved (if it exists)
        const hasAssessment = courseData.finalAssessment && courseData.finalAssessment.length > 0;
        const isComplete = (courseProgress?.progress ?? 0) === 100;
        
        if (isComplete && (!hasAssessment || assessmentStatus === 'approved')) {
            setIsEligible(true);
        } else {
            setIsEligible(false);
        }
      } catch (err) {
          console.error("Eligibility check failed:", err);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (user) {
        checkEligibility();
    } else if (!isLoading) {
        setIsLoading(false);
    }
  }, [params.id, user, isLoading]);

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>;
  }

  if (!isEligible || !course) {
    return (
        <div className="h-screen w-screen flex items-center justify-center p-4">
             <Card className="max-w-md w-full border-yellow-500/50 bg-yellow-500/5">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-600">
                        <AlertTriangle />
                        Not Yet Eligible
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-yellow-700">
                        To access your certificate, you must complete all course lessons and receive instructor approval for your final assessment.
                    </p>
                    <div className="flex gap-2">
                         <Link href={`/learn/${params.id}?assessment=final`} className="flex-1">
                            <Button className="w-full">Check Assessment Status</Button>
                        </Link>
                        <Link href="/dashboard" className="flex-1">
                            <Button variant="outline" className="w-full">Back to Dashboard</Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
  }

  const studentName = profile?.name || user?.displayName || user?.email || "Student";
  const completionDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const finalScore = 100; // Success is binary in this subjective model

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-background py-12 px-4 flex flex-col items-center"
    >
      <div className="w-full max-w-4xl mx-auto flex justify-between items-center mb-4">
        <h1 className="text-2xl font-headline font-bold">Your Certificate</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Download PDF
        </Button>
      </div>

      <div className="w-full max-w-4xl bg-card border-4 border-primary/80 aspect-[1.414/1] flex flex-col text-center shadow-2xl rounded-2xl overflow-hidden relative">
        {/* Techy background */}
        <div className="absolute inset-0 w-full h-full bg-grid-slate-900/[0.04] bg-[bottom_1px_left_1px] dark:bg-grid-slate-400/[0.05] dark:bg-bottom-slate-400/10" />

        <div className="relative z-10 flex flex-col h-full p-8 text-foreground">
            <div className="flex justify-between items-start mb-4">
                <div className="text-foreground">
                    <Logo />
                </div>
                <div className="text-right text-foreground">
                    <p className="font-semibold">TechTradeHub Academy</p>
                    <p className="text-xs text-muted-foreground">Master the Future</p>
                </div>
            </div>
            
            <div className="flex-grow flex flex-col justify-center">
              <p className="font-headline text-3xl md:text-5xl font-bold text-primary mb-2">Certificate of Completion</p>
              <p className="text-muted-foreground mb-6">This certifies that</p>
              <p className="font-headline text-4xl md:text-6xl font-bold mb-6">{studentName}</p>
              <p className="text-muted-foreground mb-4">has successfully completed the course</p>
              <p className="font-headline text-2xl md:text-3xl font-bold mb-8">{course.title}</p>
            </div>

            <div className="flex justify-between items-end">
                <div className="text-left">
                    <p className="font-bold border-b border-foreground pb-1">{completionDate}</p>
                    <p className="text-xs text-muted-foreground mt-1">Date</p>
                </div>

                <div className="flex items-end gap-4">
                    {url ? (
                      <div className="bg-white p-1 rounded-md">
                        <QRCode value={url} size={80} level="L" />
                      </div>
                    ) : (
                      <div className="w-[88px] h-[88px] bg-muted/20 rounded-md animate-pulse" />
                    )}
                    <div className="text-left text-xs text-muted-foreground">
                        <p>Course ID: TTH-{course.id.padStart(4, '0')}</p>
                        <p>Final Score: {finalScore}%</p>
                        <p className="truncate max-w-[150px]">Verify at: {url}</p>
                    </div>
                </div>

                <div className="text-left">
                    <p className="font-headline text-lg font-bold border-b border-foreground pb-1">Jane Doe</p>
                    <p className="text-xs text-muted-foreground mt-1">Head Instructor</p>
                </div>
            </div>
        </div>
      </div>
    </motion.div>
  );
}

    