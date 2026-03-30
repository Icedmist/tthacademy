import { getPosts } from '@/services/blog-data';
import { PostCard } from '@/components/blog/PostCard';
import { Newspaper } from 'lucide-react';
import type { Blog, PlainBlog } from '@/lib/types';

export default async function BlogListPage() {
  const posts: Blog[] = await getPosts('published');
  
  // Convert Firestore Timestamp objects to plain strings for the client component
  const plainPosts: PlainBlog[] = posts.map(post => ({
    ...post,
    createdAt: post.createdAt.toDate().toISOString(),
    publishedAt: post.publishedAt?.toDate().toISOString(),
  }));


  return (
    <div className="container mx-auto py-12 px-4">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="h-8 w-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-headline font-bold">
          The TechTradeHub Blog
        </h1>
      </div>
      <p className="text-muted-foreground mb-12">
        Insights, tutorials, and news from the forefront of tech and finance.
      </p>

      {plainPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plainPosts.map(post => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold mb-2">No Posts Yet</h2>
          <p className="text-muted-foreground">
            We're busy writing some great content. Please check back soon!
          </p>
        </div>
      )}
    </div>
  );
}
