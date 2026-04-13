
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { getPendingSubmissions } from '@/services/assessment-data';
import { getAllStudentProgress } from '@/services/student-data';
import { BookCheck, Users, GraduationCap, ArrowRight, Activity } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

import { useAuth } from '@/hooks/use-auth';
import { getCourses } from '@/services/course-data';
import type { Course } from '@/lib/types';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function InstructorDashboard() {
    const { user } = useAuth();
    const [stats, setStats] = useState({
        pendingReviews: 0,
        totalStudents: 0,
        completedCourses: 0,
        averageProgress: 0
    });
    const [courses, setCourses] = useState<(Course & { studentCount: number })[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            if (!user) return;
            setIsLoading(true);
            try {
                const [submissions, students, allCourses] = await Promise.all([
                    getPendingSubmissions(),
                    getAllStudentProgress(),
                    getCourses()
                ]);

                // Filter courses where this user is the instructor
                const instructorCourses = allCourses.filter(c => c.instructor === user.displayName);
                
                const coursesWithCount = instructorCourses.map(course => {
                    const studentCount = students.filter(s => s.enrolledCourses.some(ec => ec.id === course.id)).length;
                    return { ...course, studentCount };
                });
                setCourses(coursesWithCount);

                const totalProgress = students.reduce((sum, s) => sum + (s.overallProgress || 0), 0);
                const totalCompleted = students.reduce((sum, s) => sum + (s.completedCourses || 0), 0);

                setStats({
                    pendingReviews: submissions.length,
                    totalStudents: students.length,
                    completedCourses: totalCompleted,
                    averageProgress: students.length > 0 ? Math.round(totalProgress / students.length) : 0
                });
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, [user]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">Instructor Dashboard</h1>
                <p className="text-muted-foreground">Monitor your students' progress and evaluation tasks.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
                        <BookCheck className="h-4 w-4 text-primary" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.pendingReviews}</div>
                        <p className="text-xs text-muted-foreground">Requires your attention</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalStudents}</div>
                        <p className="text-xs text-muted-foreground">Across all courses</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Completed Courses</CardTitle>
                        <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.completedCourses}</div>
                        <p className="text-xs text-muted-foreground">Certificates issued</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Student Progress</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.averageProgress}%</div>
                        <Progress value={stats.averageProgress} className="h-1 mt-2" />
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Frequent Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <Link href="/instructor/reviews" className="block">
                            <Button variant="outline" className="w-full justify-between">
                                Review Pending Assessments
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                        <Link href="/admin/users" className="block">
                            <Button variant="outline" className="w-full justify-between">
                                View Student Directory
                                <ArrowRight className="h-4 w-4" />
                            </Button>
                        </Link>
                    </CardContent>
                </Card>

                <Card className="bg-muted/30 border-dashed">
                    <CardHeader>
                        <CardTitle className="text-muted-foreground italic">Upcoming Features</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="text-sm text-muted-foreground space-y-2">
                            <li>• Direct messaging with students</li>
                            <li>• Multi-instructor course collaboration</li>
                            <li>• Advanced analytics and engagement reports</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Your Courses</CardTitle>
                    <CardDescription>An overview of the courses you are instructing.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Course Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Level</TableHead>
                                <TableHead className="text-right">Enrolled Students</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {courses.length > 0 ? courses.map(course => (
                                <TableRow key={course.id}>
                                    <TableCell className="font-medium">{course.title}</TableCell>
                                    <TableCell>{course.category}</TableCell>
                                    <TableCell>{course.level}</TableCell>
                                    <TableCell className="text-right font-semibold">{course.studentCount}</TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center h-24 text-muted-foreground">
                                        No courses are currently assigned to you.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
