
import { getCourses } from '@/services/course-data';
import { getPosts } from '@/services/blog-data';
import { getEvents } from '@/services/event-data';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import HomePageClient from './home-page-client';
import type { Course, PlainBlog, PlainEvent, TeamMember } from '@/lib/types';
import { getTeamMembers } from '@/services/team-data';

function HomePageSkeleton() {
    return (
        <div className="space-y-12">
            <div className="container mx-auto text-center py-32">
                <Skeleton className="h-16 w-3/4 mx-auto mb-4" />
                <Skeleton className="h-6 w-1/2 mx-auto mb-8" />
                <Skeleton className="h-12 w-48 mx-auto" />
            </div>
            <div className="container mx-auto">
                <Skeleton className="h-8 w-1/3 mx-auto mb-12" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-80" />)}
                </div>
            </div>
        </div>
    )
}

async function PageContent() {
    const [allCourses, posts, events, teamMembers] = await Promise.all([
        getCourses(),
        getPosts('published'),
        getEvents('upcoming'),
        getTeamMembers()
    ]);
    
    // Get one course from each category for the "Featured" section
    const featuredCourses: Course[] = [];
    const categories = new Set();
    allCourses.forEach(course => {
        if (!categories.has(course.category)) {
            featuredCourses.push(course);
            categories.add(course.category);
        }
    });

    const latestPosts: PlainBlog[] = posts.slice(0, 3).map(post => ({
        ...post,
        createdAt: post.createdAt.toDate().toISOString(),
        publishedAt: post.publishedAt?.toDate().toISOString() || '',
    }));

    const upcomingEvents: PlainEvent[] = events.slice(0, 3).map(event => ({
        ...event,
        date: event.date.toDate().toISOString(),
    }));

    // Using Team Members for the homepage section
    const teamForHomePage = teamMembers.slice(0, 3);


    return <HomePageClient 
        courses={featuredCourses} 
        posts={latestPosts} 
        events={upcomingEvents}
        teamMembers={teamForHomePage}
    />;
}

export default function Home() {
  return (
    <Suspense fallback={<HomePageSkeleton />}>
      <PageContent />
    </Suspense>
  );
}
