
'use client';

import { BlogManager } from '@/app/admin/BlogManager';
import { Card, CardContent } from '@/components/ui/card';
import { Newspaper } from 'lucide-react';

export default function AdminBlogPage() {
    return (
        <div>
            <div className="flex items-center gap-2 mb-4">
                <Newspaper className="h-8 w-8 text-primary" />
                <h1 className="text-3xl md:text-4xl font-headline font-bold">
                    Blog Management
                </h1>
            </div>
            <p className="text-muted-foreground mb-8">
                Create, edit, and manage blog posts for your audience.
            </p>
            <Card className="bg-card/80 backdrop-blur-sm border-border/50">
                <CardContent className='pt-6'>
                    <BlogManager />
                </CardContent>
            </Card>
        </div>
    );
}
