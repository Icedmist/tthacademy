
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Library, Newspaper, CalendarDays, MessageSquare, Briefcase, LayoutDashboard } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const adminSections = [
    { href: '/admin/users', label: 'User Management', icon: Users, description: 'View and manage all registered users.' },
    { href: '/admin/courses', label: 'Course Management', icon: Library, description: 'Add, edit, and manage the course catalog.' },
    { href: '/admin/team', label: 'Team Management', icon: Briefcase, description: 'Manage co-founders and other team members.' },
    { href: '/admin/blog', label: 'Blog Management', icon: Newspaper, description: 'Create and publish blog posts.' },
    { href: '/admin/events', label: 'Event Management', icon: CalendarDays, description: 'Schedule and manage academy events.' },
    { href: '/admin/instructors', label: 'Instructor Management', icon: Users, description: 'Add and manage academy instructors.' },
    { href: '/admin/instructor-dashboard', label: 'Instructor View', icon: LayoutDashboard, description: 'Tracking for instructors: see your students and their progress.' },
    { href: '/admin/feedback', label: 'View Feedback', icon: MessageSquare, description: 'Review submissions from the feedback form.' },
];


export default function AdminDashboardPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">Admin Dashboard</h1>
                <p className="text-muted-foreground group flex items-center gap-2">
                    Welcome to the control center. Select a section to manage.
                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary border border-primary/20">
                        Alpha v0.1
                    </span>
                </p>
            </div>

            {/* SEED DATA BUTTON - PROMINENT AT TOP */}
            <div className="p-6 bg-primary/5 rounded-lg border border-primary/20 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                            <LayoutDashboard className="h-5 w-5 text-primary" />
                            Initial System Setup
                        </h3>
                        <p className="text-sm text-muted-foreground">
                            Seed the database with default instructors, courses, and blog posts to get started.
                        </p>
                    </div>
                    <Button 
                        size="lg"
                        className="shrink-0"
                        onClick={async () => {
                            const { seedData } = await import('@/lib/seed-data');
                            try {
                                await seedData();
                                alert("Seeding complete! Refresh to see changes.");
                                window.location.reload();
                            } catch (e: any) {
                                alert("Seeding failed: " + e.message);
                            }
                        }}
                    >
                        Seed Default Data
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {adminSections.map((section) => (
                    <Link key={section.href} href={section.href}>
                        <Card className="bg-card/80 backdrop-blur-sm border-border/50 h-full hover:border-primary hover:shadow-lg transition-all cursor-pointer">
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                <div className="p-3 rounded-md bg-primary/10">
                                    <section.icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle className="text-lg">{section.label}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{section.description}</p>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    );
}
