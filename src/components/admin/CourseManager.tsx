
'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Course, NewCourse } from '@/lib/types';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Pencil, Trash2, Library, RefreshCw, Loader2, Sparkles, AlertTriangle, UploadCloud } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CourseForm } from '@/components/admin/CourseForm';
import { Skeleton } from '@/components/ui/skeleton';
import { z } from 'zod';
import { NewCourseSchema } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { getCourses } from '@/services/course-data';
import { courses as staticCoursesToSeed } from '@/lib/courses';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type CourseFormData = z.infer<typeof NewCourseSchema>;

export function CourseManager() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [unseededCourses, setUnseededCourses] = useState<Omit<Course, 'progress'>[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSeeding, setIsSeeding] = useState<string | null>(null); // Store the ID of the course being seeded
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const { toast } = useToast();

  const fetchCourses = useCallback(async () => {
    setIsLoading(true);
    try {
      const courseData = await getCourses();
      setCourses(courseData);
      
      const seededIds = new Set(courseData.map(c => c.id));
      const stillUnseeded = staticCoursesToSeed.filter(sc => !seededIds.has(sc.id));
      setUnseededCourses(stillUnseeded);

    } catch (error) {
        console.error("Error fetching courses: ", error);
        toast({
            title: "Error",
            description: `Could not fetch courses: ${(error as Error).message}. This is likely a Firestore security rule issue.`,
            variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const handleSeedSingleCourse = async (courseToSeed: Omit<Course, 'progress'>) => {
    setIsSeeding(courseToSeed.id);
    try {
        const validatedData = NewCourseSchema.parse(courseToSeed);
        await setDoc(doc(db, 'courses', courseToSeed.id), validatedData);

        toast({
            title: "Course Seeded!",
            description: `"${courseToSeed.title}" has been added to the database.`,
            variant: "success",
        });

        await fetchCourses(); // Refresh both lists
    } catch (error: any) {
        console.error("Error seeding course: ", error);
         toast({
            title: "Seeding Failed",
            description: `Could not seed course: ${error.message}. Check console for validation errors.`,
            variant: "destructive",
            duration: 10000,
        });
    } finally {
        setIsSeeding(null);
    }
  };

  const handleFormSubmit = async (data: CourseFormData) => {
    setIsSubmitting(true);
    try {
      const validatedData = NewCourseSchema.parse(data);
      if (editingCourse) {
        const courseDoc = doc(db, 'courses', editingCourse.id);
        await updateDoc(courseDoc, validatedData);
      } else {
        await addDoc(collection(db, 'courses'), validatedData);
      }

      toast({
        title: `Course ${editingCourse ? 'updated' : 'added'}`,
        description: `The course details have been saved successfully.`,
        variant: "success",
      });
      setDialogOpen(false);
      setEditingCourse(null);
      await fetchCourses(); // Refresh list
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unknown error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const openEditDialog = (course: Course) => {
    setEditingCourse(course);
    setDialogOpen(true);
  };

  const openAddDialog = () => {
    setEditingCourse(null);
    setDialogOpen(true);
  };

  const onDialogClose = () => {
    if (!isSubmitting) {
      setDialogOpen(false);
      setEditingCourse(null);
    }
  }

  const confirmDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'courses', id));
      toast({
        title: "Course Deleted",
        description: "The course has been removed successfully.",
        variant: "success",
      });
      await fetchCourses(); // Refresh list
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An unknown error occurred.",
        variant: "destructive",
      });
    }
  };

  const getPriceDisplay = (course: Course | Omit<Course, 'progress'>) => {
    if (course.level === 'Beginner') return 'Free';
    if (course.level === 'Intermediate') return 'Credit-based';
    if (course.level === 'Advanced') return course.price.toLocaleString();
    return course.price > 0 ? course.price.toLocaleString() : 'Free';
  }

  const unseededCoursesByCategory = unseededCourses.reduce((acc, course) => {
    const category = course.category;
    if (!acc[category]) {
        acc[category] = [];
    }
    acc[category].push(course);
    return acc;
  }, {} as Record<string, Omit<Course, 'progress'>[]>);


  if (isLoading) {
    return (
      <div className="space-y-2">
        <div className="flex justify-end mb-4 gap-2">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-32" />
        </div>
        {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="flex justify-end mb-4 gap-2">
        <Button variant="outline" onClick={fetchCourses} disabled={isLoading}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Refresh
        </Button>
        <Button onClick={openAddDialog}>
          <Library className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={onDialogClose}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{editingCourse ? 'Edit Course' : 'Add New Course'}</DialogTitle>
             <DialogDescription>
                Fill in the details for the course. All fields are required.
            </DialogDescription>
          </DialogHeader>
          <CourseForm 
            onSubmit={handleFormSubmit} 
            initialData={editingCourse}
            isSubmitting={isSubmitting}
            onCancel={onDialogClose}
          />
        </DialogContent>
      </Dialog>

      <Card className="mb-8">
        <CardHeader>
            <CardTitle>Seeded Courses ({courses.length})</CardTitle>
            <CardDescription>These courses are currently live in your database.</CardDescription>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Price (₦)</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {courses.length > 0 ? courses.map((course) => (
                    <TableRow key={course.id}>
                    <TableCell className="font-medium">{course.title}</TableCell>
                    <TableCell>{course.category}</TableCell>
                    <TableCell>
                        <Badge variant="outline">{course.level}</Badge>
                    </TableCell>
                    <TableCell>
                        {getPriceDisplay(course)}
                    </TableCell>
                    <TableCell className="text-right space-x-2">
                        <Tooltip>
                        <TooltipTrigger asChild>
                            <Button variant="ghost" size="icon" onClick={() => openEditDialog(course)}>
                            <Pencil className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent><p>Edit course</p></TooltipContent>
                        </Tooltip>
                        <AlertDialog>
                        <Tooltip>
                            <TooltipTrigger asChild>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                                <Trash2 className="h-4 w-4" />
                                </Button>
                            </AlertDialogTrigger>
                            </TooltipTrigger>
                            <TooltipContent><p>Delete course</p></TooltipContent>
                        </Tooltip>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the course and all its data.
                            </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => confirmDelete(course.id)}>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                        </AlertDialog>
                    </TableCell>
                    </TableRow>
                )) : (
                     <TableRow>
                        <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                            No courses have been seeded yet. Use the section below to add them.
                        </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
            <CardTitle>Unseeded Courses ({unseededCourses.length})</CardTitle>
            <CardDescription>These courses exist in your codebase but have not been added to the database. Click 'Seed' to add them one by one.</CardDescription>
        </CardHeader>
        <CardContent>
            {unseededCourses.length > 0 ? (
                <Accordion type="multiple" className="w-full">
                    {Object.entries(unseededCoursesByCategory).map(([category, catCourses]) => (
                        <AccordionItem key={category} value={category}>
                            <AccordionTrigger className="font-headline text-lg">{category} ({catCourses.length})</AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-2">
                                    {catCourses.map(course => (
                                        <div key={course.id} className="flex items-center justify-between p-2 rounded-md border bg-muted/50">
                                            <div>
                                                <p className="font-medium">{course.title}</p>
                                                <p className="text-xs text-muted-foreground">ID: {course.id}</p>
                                            </div>
                                            <Button 
                                                size="sm"
                                                onClick={() => handleSeedSingleCourse(course)}
                                                disabled={isSeeding === course.id}
                                            >
                                                {isSeeding === course.id ? <Loader2 className="mr-2 h-4 w-4 animate-spin"/> : <UploadCloud className="mr-2 h-4 w-4" />}
                                                Seed
                                            </Button>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            ) : (
                <div className="text-center py-8">
                    <Sparkles className="mx-auto h-12 w-12 text-green-500 mb-4"/>
                    <p className="font-semibold text-lg">All courses have been seeded!</p>
                    <p className="text-muted-foreground">Congratulations, your database is up to date.</p>
                </div>
            )}
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
