
'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Type, Image as ImageIcon, Check, BookUser } from 'lucide-react';
import type { Blog } from '@/lib/types';
import { NewBlogSchema } from '@/lib/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/hooks/use-auth';

type BlogFormData = z.infer<typeof NewBlogSchema>;

interface BlogFormProps {
  onSubmit: (data: BlogFormData) => Promise<void>;
  initialData?: Blog | null;
  isSubmitting: boolean;
  onCancel: () => void;
}

export function BlogForm({ onSubmit, initialData, isSubmitting, onCancel }: BlogFormProps) {
  const { user } = useAuth();
  const form = useForm<BlogFormData>({
    resolver: zodResolver(NewBlogSchema),
    defaultValues: initialData
      ? NewBlogSchema.parse(initialData)
      : {
          title: '',
          content: '',
          imageUrl: 'https://placehold.co/800x400.png',
          status: 'draft',
          authorName: user?.displayName ?? 'Admin',
        },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 max-h-[80vh] overflow-y-auto p-1 pr-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Post Title</FormLabel>
              <FormControl>
                <Input icon={<Type />} placeholder="Your amazing blog post title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea rows={10} placeholder="Write your content here. Markdown is supported." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Featured Image URL</FormLabel>
                    <FormControl>
                        <Input icon={<ImageIcon />} placeholder="https://placehold.co/800x400.png" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="authorName"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Author Name</FormLabel>
                    <FormControl>
                        <Input icon={<BookUser />} placeholder="Jane Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
        </div>
        <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
                <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                        </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                </Select>
                <FormMessage />
                </FormItem>
            )}
        />
        <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
                Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {initialData ? 'Update Post' : 'Create Post'}
            </Button>
        </div>
      </form>
    </Form>
  );
}

    