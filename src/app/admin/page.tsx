
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Library, Newspaper, CalendarDays, MessageSquare, Briefcase } from 'lucide-react';
import Link from 'next/link';

const adminSections = [
    { href: '/admin/users', label: 'User Management', icon: Users, description: 'View and manage all registered users.' },
    { href: '/admin/courses', label: 'Course Management', icon: Library, description: 'Add, edit, and manage the course catalog.' },
    { href: '/admin/team', label: 'Team Management', icon: Briefcase, description: 'Manage co-founders and other team members.' },
    { href: '/admin/blog', label: 'Blog Management', icon: Newspaper, description: 'Create and publish blog posts.' },
    { href: '/admin/events', label: 'Event Management', icon: CalendarDays, description: 'Schedule and manage academy events.' },
    { href: '/admin/feedback', label: 'View Feedback', icon: MessageSquare, description: 'Review submissions from the feedback form.' },
];

export default function AdminDashboardPage() {
    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground mb-8">
                Welcome to the control center. Select a section to manage.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {adminSections.map((section) => (
                    <Link key={section.href} href={section.href}>
                        <Card className="bg-card/80 backdrop-blur-sm border-border/50 h-full hover:border-primary hover:shadow-lg transition-all">
                            <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                                <div className="p-3 rounded-md bg-primary/10">
                                    <section.icon className="h-6 w-6 text-primary" />
                                </div>
                                <CardTitle>{section.label}</CardTitle>
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
