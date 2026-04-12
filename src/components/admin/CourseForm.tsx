
'use client';

import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, PlusCircle, Trash2, BookText, Clock, Tag, DollarSign, Image as ImageIcon, BookOpen, Clock4 } from 'lucide-react';
import type { Course } from '@/lib/types';
import { NewCourseSchema } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { COURSE_CATEGORIES, COURSE_LEVELS } from '@/lib/constants';

type CourseFormData = z.infer<typeof NewCourseSchema>;

interface CourseFormProps {
  onSubmit: (data: CourseFormData) => Promise<void>;
  initialData?: Course | null;
  isSubmitting: boolean;
  onCancel: () => void;
}

export function CourseForm({ onSubmit, initialData, isSubmitting, onCancel }: CourseFormProps) {
  
  const form = useForm<CourseFormData>({
    resolver: zodResolver(NewCourseSchema),
    defaultValues: initialData 
      ? NewCourseSchema.parse({
            ...initialData,
            modules: initialData.modules.map(m => ({...m, quiz: m.quiz || []})),
            finalAssessment: initialData.finalAssessment || [],
        })
      : {
        title: '',
        description: '',
        longDescription: '',
        category: 'Tech Skills',
        level: 'Beginner',
        imageUrl: 'https://picsum.photos/seed/placeholder/600/400',
        modules: [{ title: '', lessons: [{ title: '', duration: '', content: '', completed: false }], quiz: [] }],
        finalAssessment: [],
        price: 0,
        duration: '',
      },
  });

  const { fields: moduleFields, append: appendModule, remove: removeModule } = useFieldArray({
    control: form.control,
    name: "modules"
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-h-[80vh] overflow-y-auto p-1 pr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                    <Input icon={<BookText/>} placeholder="e.g., Introduction to React" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
             <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Total Duration</FormLabel>
                    <FormControl>
                        <Input icon={<Clock/>} placeholder="e.g., 8h 30m" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Short Description</FormLabel>
              <FormControl>
                <Input placeholder="A brief summary of the course." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Long Description</FormLabel>
              <FormControl>
                <Textarea rows={4} placeholder="A detailed description for the course page." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Category</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {COURSE_CATEGORIES.map(cat => (
                                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                            ))}
                        </SelectContent>
                     </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />
             <FormField
                control={form.control}
                name="level"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Level</FormLabel>
                     <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                            <SelectTrigger>
                                <SelectValue placeholder="Select a level" />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {COURSE_LEVELS.map(lvl => (
                                <SelectItem key={lvl} value={lvl}>{lvl}</SelectItem>
                            ))}
                        </SelectContent>
                     </Select>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Price (₦)</FormLabel>
                <FormControl>
                    <Input icon={<DollarSign/>} type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value, 10) || 0)} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
            />
        </div>
        
        <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl>
                    <Input icon={<ImageIcon/>} placeholder="https://picsum.photos/seed/placeholder/600/400" {...field} />
                </FormControl>
                <FormMessage />
                </FormItem>
            )}
        />
        
        <div className="space-y-4 rounded-md border p-4">
            <h3 className="font-semibold text-lg">Curriculum</h3>
             {moduleFields.map((moduleItem, moduleIndex) => (
                <div key={moduleItem.id} className="space-y-3 rounded-md border bg-card/50 p-3 relative">
                    <Button type="button" variant="destructive" size="icon" className="absolute -top-3 -right-3 h-6 w-6" onClick={() => removeModule(moduleIndex)}>
                        <Trash2 className="h-4 w-4" />
                    </Button>
                    <FormField
                        control={form.control}
                        name={`modules.${moduleIndex}.title`}
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Module {moduleIndex + 1} Title</FormLabel>
                            <FormControl>
                                <Input icon={<BookOpen />} placeholder="e.g., Core Concepts" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="pl-4 border-l-2 space-y-2">
                         <h4 className='font-medium text-sm'>Lessons</h4>
                         <Controller
                            control={form.control}
                            name={`modules.${moduleIndex}.lessons`}
                            render={() => {
                                const { fields: lessonFields, append: appendLesson, remove: removeLesson } = useFieldArray({
                                    control: form.control,
                                    name: `modules.${moduleIndex}.lessons`
                                });
                                return (
                                    <>
                                        {lessonFields.map((lessonItem, lessonIndex) => (
                                            <div key={lessonItem.id} className="flex gap-2 items-start">
                                                <div className="flex-1 grid grid-cols-1 gap-2">
                                                    <FormField
                                                    control={form.control}
                                                    name={`modules.${moduleIndex}.lessons.${lessonIndex}.title`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                        <FormLabel>Lesson {lessonIndex + 1}</FormLabel>
                                                        <FormControl>
                                                            <Input placeholder="e.g., What is React?" {...field} />
                                                        </FormControl>
                                                         <FormMessage />
                                                        </FormItem>
                                                    )}
                                                    />
                                                     <FormField
                                                    control={form.control}
                                                    name={`modules.${moduleIndex}.lessons.${lessonIndex}.content`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                        <FormLabel className="sr-only">Content</FormLabel>
                                                        <FormControl>
                                                            <Textarea rows={3} placeholder="Lesson content..." {...field} />
                                                        </FormControl>
                                                         <FormMessage />
                                                        </FormItem>
                                                    )}
                                                    />
                                                    <FormField
                                                    control={form.control}
                                                    name={`modules.${moduleIndex}.lessons.${lessonIndex}.duration`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                        <FormLabel className="sr-only">Duration</FormLabel>
                                                        <FormControl>
                                                            <Input icon={<Clock4/>} placeholder="e.g., 1h 45m" {...field} />
                                                        </FormControl>
                                                         <FormMessage />
                                                        </FormItem>
                                                    )}
                                                    />
                                                </div>
                                                <Button type="button" variant="outline" size="icon" onClick={() => removeLesson(lessonIndex)}>
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        ))}
                                        <Button type="button" variant="outline" size="sm" onClick={() => appendLesson({ title: '', duration: '', content: '', completed: false })}>
                                            <PlusCircle className="mr-2 h-4 w-4" /> Add Lesson
                                        </Button>
                                    </>
                                );
                            }}
                         />
                    </div>
                </div>
            ))}
            <Button type="button" variant="secondary" onClick={() => appendModule({ title: '', lessons: [{ title: '', duration: '', content: '', completed: false }], quiz: [] })}>
                 <PlusCircle className="mr-2 h-4 w-4" /> Add Module
            </Button>
        </div>

        <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
                Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Update Course' : 'Add Course'}
            </Button>
        </div>
      </form>
    </Form>
  );
}
