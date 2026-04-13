
'use client';

import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { getStudentProgress } from '@/services/student-data';
import { getRecommendations } from '@/app/actions/recommend';
import type { CourseCategory, Course, StudentProgress } from '@/lib/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Trophy, BookOpen, LineChart, CheckCircle, Lightbulb, AlertTriangle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Skeleton } from '@/components/ui/skeleton';
import { COURSE_CATEGORY_COLORS } from '@/lib/constants';
import { CourseCard } from '@/components/courses/CourseCard';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';


const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
    },
  }),
};

const DashboardSkeleton = () => (
  <div className="container mx-auto px-4 py-8">
    <Skeleton className="h-10 w-1/3 mb-4" />
    <Skeleton className="h-6 w-1/2 mb-10" />
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {[...Array(3)].map((_, i) => (
        <Card key={i} className='bg-card/60 backdrop-blur-sm border-border/50'>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-10 w-1/4" />
            <Skeleton className="h-4 w-full mt-2" />
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3 bg-card/60 backdrop-blur-sm border-border/50">
            <CardHeader>
                <Skeleton className="h-6 w-1/2" />
                <Skeleton className="h-4 w-1/3" />
            </CardHeader>
            <CardContent>
                <Skeleton className="w-full h-72" />
            </CardContent>
        </Card>
        <Card className="lg:col-span-2 bg-card/60 backdrop-blur-sm border-border/50">
             <CardHeader>
                <Skeleton className="h-6 w-1/2" />
            </CardHeader>
             <CardContent className="space-y-4">
                {[...Array(3)].map((_, i) => (
                   <Skeleton key={i} className="w-full h-16" />
                ))}
            </CardContent>
        </Card>
    </div>
  </div>
);

const ErrorState = ({ errorMessage }: { errorMessage: string }) => (
    <div className="container mx-auto p-4 sm:p-8">
        <Card className="bg-destructive/10 border-destructive/50 text-destructive">
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
            <AlertTriangle />
            An Error Occurred
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p>There was a problem loading your dashboard. This might be due to a network issue or a permissions problem.</p>
            <p className='mt-2'>Please ensure your Firestore security rules are set up correctly.</p>
            <pre className="mt-4 text-left bg-destructive/20 p-4 rounded-md text-sm font-mono whitespace-pre-wrap">
            {errorMessage}
            </pre>
        </CardContent>
        </Card>
    </div>
);


export default function DashboardPage() {
  const [data, setData] = useState<StudentProgress | null>(null);
  const [recommendations, setRecommendations] = useState<Course[]>([]);
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isRecsLoading, setIsRecsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, profile, isLoading: isAuthLoading } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (isAuthLoading) return; 
    
    if (!user) {
      router.push('/login');
      return;
    }
    
    // Redirect based on role from the global profile
    if (profile?.role === 'admin') {
        router.push('/admin');
        return;
    }

    if (profile?.role === 'instructor') {
        router.push('/instructor');
        return;
    }

    // Wait for profile to load before proceeding
    if (!profile) {
      setIsDataLoading(true);
      return;
    }

    // Only allow students to stay on this specific dashboard
    if (profile.role !== 'student') {
      setIsDataLoading(false);
      return;
    }

    async function fetchData() {
      if (!user) return;
      try {
        setIsDataLoading(true);
        setError(null);
        // Fetch the full, detailed student progress data for the dashboard
        const progressData = await getStudentProgress(user.uid, user.displayName ?? undefined, user.email ?? undefined, undefined, { includeCourseData: true });
        setData(progressData);
      } catch (error: any) {
        console.error('Failed to fetch student progress:', error);
        setError(error.message || 'An unknown error occurred while fetching your data.');
      } finally {
        setIsDataLoading(false);
      }
    }

    async function fetchRecommendations() {
        if (!user) return;
        try {
            setIsRecsLoading(true);
            const recs = await getRecommendations(user.uid);
            setRecommendations(recs);
        } catch (error) {
            console.error('Failed to fetch recommendations:', error);
        } finally {
            setIsRecsLoading(false);
        }
    }
    
    // Profile is loaded and is a student, fetch data
    fetchData();
    fetchRecommendations();
  }, [user, profile, isAuthLoading, router]);
  
  if (isAuthLoading || isDataLoading || !data) {
    return <DashboardSkeleton />;
  }
  
  if (error) {
     return <ErrorState errorMessage={error} />;
  }

  const inProgressCourses = data.enrolledCourses.filter(
    (c: Course) => c.progress! < 100
  );
  const completedCourses = data.enrolledCourses.filter(
    (c: Course) => c.progress === 100
  );

  const categoryCounts = data.enrolledCourses.reduce((acc: Record<string, number>, course: Course) => {
    acc[course.category] = (acc[course.category] || 0) + 1;
    return acc;
  }, {} as Record<CourseCategory, number>);

  const chartData = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
    fill: COURSE_CATEGORY_COLORS[name as CourseCategory],
  }));

  const stats = [
    { title: 'Overall Progress', value: `${data.overallProgress}%`, icon: <LineChart className="h-6 w-6 text-primary" />, description: 'Across all courses' },
    { title: 'In Progress', value: data.coursesInProgress, icon: <BookOpen className="h-6 w-6 text-secondary" />, description: 'Courses started' },
    { title: 'Completed', value: data.completedCourses, icon: <Trophy className="h-6 w-6 text-success" />, description: 'Courses finished' },
  ]
  
  const getContinueLink = (course: Course) => {
    for (let mIdx = 0; mIdx < course.modules.length; mIdx++) {
        for (let lIdx = 0; lIdx < course.modules[mIdx].lessons.length; lIdx++) {
            if (!(course.modules[mIdx].lessons[lIdx] as any).completed) {
                return `/learn/${course.id}?module=${mIdx}&lesson=${lIdx}`;
            }
        }
    }
    return `/learn/${course.id}`;
  };

  const inProgressCategories = useMemo<string[]>(() => {
    const categories = new Set<string>(inProgressCourses.map(c => c.category));
    return ['All', ...Array.from(categories)];
  }, [inProgressCourses]);


  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="container mx-auto px-4 py-8"
    >
      <motion.h1
        variants={cardVariants}
        custom={0}
        className="text-3xl md:text-4xl font-headline font-bold mb-2"
      >
        Welcome back, {user?.displayName || data.name}!
      </motion.h1>

      {/* Assessment Notifications */}
      {Object.entries(data.assessments || {}).some(([_, status]: [string, any]) => status.status !== 'pending') && (
        <motion.div variants={cardVariants} custom={2} className="mb-8">
            <Card className="bg-primary/5 border-primary/20">
                <CardHeader className="py-4">
                    <CardTitle className="text-sm flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-primary" />
                        Instructor Feedback
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {Object.entries(data.assessments || {}).filter(([_, s]: [string, any]) => s.lastFeedback).map(([courseId, status]: [string, any]) => (
                        <div key={courseId} className="bg-background/50 p-3 rounded-lg border text-sm">
                            <div className="flex justify-between mb-1">
                                <span className="font-bold">Course Ref: {courseId}</span>
                                <Badge variant={status.status === 'approved' ? 'success' : 'destructive'} className="text-[10px] uppercase h-5">
                                    {status.status}
                                </Badge>
                            </div>
                            <p className="text-muted-foreground italic">"{status.lastFeedback}"</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div key={stat.title} variants={cardVariants} custom={i + 2}>
            <Card className="bg-card/60 backdrop-blur-sm border-border/50 h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

       <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <motion.div variants={cardVariants} custom={5} className="lg:col-span-3">
            <Card className="bg-card/60 backdrop-blur-sm border-border/50 h-full">
            <CardHeader>
                <CardTitle>Course Enrollment by Category</CardTitle>
                <CardDescription>
                Your learning focus at a glance.
                </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                    <XAxis
                    dataKey="name"
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={10}
                    tickLine={false}
                    axisLine={false}
                    />
                    <YAxis
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                    />
                    <Tooltip
                        contentStyle={{
                            background: "hsl(var(--background))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "var(--radius)"
                        }}
                    />
                    <Bar dataKey="count" radius={[4, 4, 0, 0]} />
                </BarChart>
                </ResponsiveContainer>
            </CardContent>
            </Card>
        </motion.div>

        <motion.div variants={cardVariants} custom={6} className="lg:col-span-2">
            <Card className="bg-card/60 backdrop-blur-sm border-border/50 h-full">
                <CardHeader>
                    <CardTitle>Continue Learning</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {inProgressCourses.length > 0 ? (
                        <Tabs defaultValue="All" className="w-full">
                          <TabsList className="grid w-full grid-cols-3">
                              {inProgressCategories.slice(0,3).map(cat => (
                                <TabsTrigger key={cat} value={cat} className="text-xs px-1">{cat}</TabsTrigger>
                              ))}
                          </TabsList>
                          {inProgressCategories.map((cat: string) => (
                              <TabsContent key={cat} value={cat} className="space-y-2 mt-4">
                                 {inProgressCourses.filter((c: Course) => cat === 'All' || c.category === cat).slice(0,3).map((course: Course) => {
                                     const assessment = data.assessments?.[course.id];
                                     const isAwaitingReview = assessment?.status === 'pending';
                                     
                                     return (
                                        <div key={course.id} className="bg-card/80 p-3 rounded-lg border border-border/10">
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="flex flex-col truncate pr-4">
                                                    <h4 className="font-semibold text-sm truncate">{course.title}</h4>
                                                    {isAwaitingReview && (
                                                        <span className="text-[10px] text-yellow-500 font-bold flex items-center gap-1">
                                                            <Loader2 className="h-2 w-2 animate-spin" /> Awaiting Review
                                                        </span>
                                                    )}
                                                </div>
                                                <Link href={getContinueLink(course)}>
                                                    <Button size="sm" className="text-xs shrink-0">Continue</Button>
                                                </Link>
                                            </div>
                                            <Progress value={course.progress} className="h-2"/>
                                        </div>
                                     )
                                 })}
                              </TabsContent>
                          ))}
                        </Tabs>
                    ) : (
                        <p className="text-muted-foreground text-sm">No courses in progress. Time to enroll!</p>
                    )}
                </CardContent>
            </Card>
        </motion.div>
      </div>

       <motion.div variants={cardVariants} custom={7} className="mt-8">
            <Card className="bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Lightbulb className="w-6 h-6 text-purple-400" />
                        Recommended For You
                    </CardTitle>
                    <CardDescription>Based on your progress, here are some courses you might like.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isRecsLoading ? (
                         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[...Array(4)].map((_,i) => <Skeleton key={i} className="h-64" />)}
                        </div>
                    ) : recommendations.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {recommendations.slice(0, 4).map(course => (
                                <CourseCard key={course.id} course={course} />
                            ))}
                        </div>
                    ) : (
                       <p className="text-muted-foreground text-sm">No recommendations available right now. Explore our course library to find something new!</p>
                    )}
                </CardContent>
            </Card>
       </motion.div>

       <motion.div variants={cardVariants} custom={8} className="mt-8">
         <Card className="bg-card/60 backdrop-blur-sm border-border/50">
           <CardHeader>
             <CardTitle>Completed Courses</CardTitle>
             <CardDescription>Congratulations on your achievements!</CardDescription>
           </CardHeader>
           <CardContent>
             {completedCourses.length > 0 ? (
               <ul className="space-y-3">
                 {completedCourses.map((course: Course) => (
                   <li key={course.id} className="flex items-center justify-between bg-card/80 p-3 rounded-lg">
                     <div className="flex items-center gap-3">
                       <CheckCircle className="h-5 w-5 text-success" />
                       <span className="font-medium">{course.title}</span>
                     </div>
                     <Link href={`/certificate/${course.id}`}>
                       <Button variant="outline" size="sm">View Certificate</Button>
                     </Link>
                   </li>
                 ))}
               </ul>
             ) : (
               <p className="text-muted-foreground text-sm">No completed courses yet. Keep going!</p>
             )}
           </CardContent>
         </Card>
       </motion.div>
    </motion.div>
  );
}
