import { getPostBySlug } from '@/services/blog-data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';
import { User, Calendar, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

  if (!post || post.status !== 'published') {
    notFound();
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <article>
        <header className="mb-8">
          <div className="relative w-full h-64 md:h-96 rounded-lg mb-4 bg-muted flex items-center justify-center">
            <BookOpen className="w-16 h-16 text-muted-foreground" />
          </div>
          <h1 className="text-3xl md:text-5xl font-headline font-bold mb-4">{post.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span>{post.authorName}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt?.toDate().toISOString()}>
                {post.publishedAt ? format(post.publishedAt.toDate(), 'MMMM d, yyyy') : 'Date not available'}
              </time>
            </div>
          </div>
        </header>

        <div className="prose dark:prose-invert max-w-none prose-lg">
           <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {post.content}
           </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
