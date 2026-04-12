
'use client';

import { notFound, useParams, useRouter } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { CheckCircle, Clock, User, Loader2, Library, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { COURSE_CATEGORY_COLORS } from '@/lib/constants';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { useState, useEffect } from 'react';
import { getStudentProgress } from '@/services/student-data';
import type { StudentProgress, Course } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { handleEnroll } from '@/app/actions/enroll';
import { getCourse as getStaticCourse } from '@/services/course-data';
import { Skeleton } from '@/components/ui/skeleton';


function CoursePageSkeleton() {
  return (
    <div>
      <section className="bg-card/60 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex gap-2 mb-2">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-10 w-full mb-4" />
              <Skeleton className="h-20 w-full mb-6" />
              <Skeleton className="h-12 w-48" />
            </div>
            <div>
              <Skeleton className="rounded-lg w-full h-96" />
            </div>
          </div>
        </div>
      </section>
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
            </div>
            <div className="lg:col-span-1">
                 <Card className="sticky top-24 bg-card/60 backdrop-blur-sm border-border/50">
                    <CardHeader>
                        <Skeleton className="h-6 w-1/2" />
                    </CardHeader>
                    <CardContent>
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                 </Card>
            </div>
        </div>
      </section>
    </div>
  )
}


export default function CoursePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { user } = useAuth();
  const { toast } = useToast();

  const [course, setCourse] = useState<Course | null>(null);
  const [studentProgress, setStudentProgress] = useState<StudentProgress | null>(null);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const courseData = await getStaticCourse(params.id);
      if (!courseData) {
        notFound();
        return;
      }
      setCourse(courseData);

      if (user) {
        try {
          const progressData = await getStudentProgress(user.uid, user.displayName ?? undefined, user.email ?? undefined);
          setStudentProgress(progressData);
        } catch (err) {
          console.error("Failed to fetch user progress", err);
        }
      }
      setIsLoading(false);
    }
    fetchData();
  }, [user, params.id]);

  if (isLoading) {
    return <CoursePageSkeleton />;
  }

  if (!course) {
    return notFound();
  }

  const enrolledCourse = studentProgress?.enrolledCourses.find(c => c.id === course.id);
  const isEnrolled = !!enrolledCourse;
  const courseProgress = enrolledCourse?.progress ?? 0;

  const onEnrollClick = async () => {
      if (!user) {
          router.push('/login');
          return;
      }
      setIsEnrolling(true);
      const success = await handleEnroll(user.uid, course.id);

      if (success) {
          toast({
              title: "Enrolled Successfully!",
              description: `Redirecting you to the "${course.title}" course...`,
              variant: "success",
          });
          router.push(`/learn/${course.id}`);
      } else {
          toast({
              title: "Enrollment Failed",
              description: "There was an error enrolling you in the course. Please try again.",
              variant: "destructive"
          });
      }
      setIsEnrolling(false);
  }

  const getFirstIncompleteLessonLink = () => {
    if (!enrolledCourse) return `/learn/${course.id}`;
    for (let mIdx = 0; mIdx < enrolledCourse.modules.length; mIdx++) {
        for (let lIdx = 0; lIdx < enrolledCourse.modules[mIdx].lessons.length; lIdx++) {
            if (!enrolledCourse.modules[mIdx].lessons[lIdx].completed) {
                return `/learn/${course.id}?module=${mIdx}&lesson=${lIdx}`;
            }
        }
    }
    // If all are complete, link to the first lesson
    return `/learn/${course.id}?module=0&lesson=0`;
  };

  const categoryColor = COURSE_CATEGORY_COLORS[course.category];
  
  const renderEnrollmentButton = () => {
    if (!user) {
        return <Button size="lg" onClick={onEnrollClick}>Enroll for Free</Button>;
    }

    if (isEnrolled) {
        if (courseProgress === 100) {
            return <Link href={`/certificate/${course.id}`}><Button size="lg" variant="success">View Certificate</Button></Link>;
        }
        return <Link href={getFirstIncompleteLessonLink()}><Button size="lg">Continue Course</Button></Link>;
    }
    
    switch (course.level) {
        case 'Beginner':
            return (
                <Button size="lg" onClick={onEnrollClick} disabled={isEnrolling}>
                    {isEnrolling && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Enroll for Free
                </Button>
            );
        case 'Intermediate':
            const completedBeginnerCourses = studentProgress?.completedCourses ?? 0;
            // Example credit requirement: must have completed at least 2 courses
            const hasEnoughCredit = completedBeginnerCourses >= 2;
            return (
                 <div className="flex flex-col gap-2 items-start">
                    <Button size="lg" disabled={!hasEnoughCredit} onClick={() => alert("Application logic not yet implemented.")}>
                        Apply with Credits
                    </Button>
                    {!hasEnoughCredit && (
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            You need to complete at least 2 Beginner courses to apply. You have completed {completedBeginnerCourses}.
                        </p>
                    )}
                 </div>
            );
        case 'Advanced':
            return (
                <div className="flex flex-col gap-2 items-start">
                    <Button size="lg" disabled>Content not available yet</Button>
                    <p className="text-xs text-muted-foreground">This is a premium course. Content is currently being finalized.</p>
                </div>
            );
        default:
            return <Button size="lg" disabled>Enrollment not available</Button>;
    }
  };


  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      {/* Hero Section */}
      <section className="bg-card/60 backdrop-blur-sm py-12">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <div>
              <div className="flex gap-2 mb-2">
                <Badge variant="secondary" style={{ backgroundColor: categoryColor, color: 'hsl(var(--primary-foreground))' }}>{course.category}</Badge>
                <Badge variant="outline">{course.level}</Badge>
              </div>
              <h1 className="text-3xl md:text-4xl font-headline font-bold mb-4">{course.title}</h1>
              <p className="text-muted-foreground mb-6">{course.longDescription}</p>
              
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-primary" />
                    <span>Instructor: <span className="font-semibold text-foreground">{course.instructor}</span></span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-primary" />
                    <span>Duration: <span className="font-semibold text-foreground">{course.duration}</span></span>
                </div>
              </div>

              {renderEnrollmentButton()}

            </div>
            <div className="w-full h-64 md:h-96 bg-muted rounded-lg flex items-center justify-center">
              <Library className="w-16 h-16 text-muted-foreground" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <h2 className="text-2xl font-headline font-bold mb-4">Course Curriculum</h2>
            <Accordion type="single" collapsible className="w-full">
              {course.modules.map((module, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="font-headline text-lg">{module.title}</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-2">
                      {module.lessons.map((lesson, lessonIndex) => (
                        <li key={lessonIndex} className="flex justify-between items-center p-2 rounded-md hover:bg-card/80">
                          <span className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {lesson.title}
                          </span>
                          <span className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {lesson.duration}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24 bg-card/60 backdrop-blur-sm border-border/50">
              <CardHeader>
                <CardTitle className="font-headline">Your Progress</CardTitle>
              </CardHeader>
              <CardContent>
                {isEnrolled ? (
                    <>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Completed</span>
                            <span className="text-sm font-bold text-primary">{courseProgress}%</span>
                        </div>
                        <Progress value={courseProgress} />
                        <p className="text-xs text-muted-foreground mt-2">Complete the course to earn your certificate.</p>
                    </>
                ) : (
                    <p className="text-sm text-muted-foreground">Enroll in this course to start tracking your progress.</p>
                )}
              </CardContent>
              <CardFooter>
                  <Link href={`/certificate/${course.id}`} className="w-full">
                     <Button className="w-full" variant="success" disabled={courseProgress < 100}>
                        Get Certificate
                     </Button>
                  </Link>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
