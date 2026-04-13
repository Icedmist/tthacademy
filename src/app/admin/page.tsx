
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Library, Newspaper, CalendarDays, MessageSquare, Briefcase, BookCheck, ShieldCheck, Mail, Fingerprint } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/hooks/use-auth';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const adminSections = [
    { href: '/admin/users', label: 'User Management', icon: Users, description: 'View and manage all registered users.' },
    { href: '/admin/courses', label: 'Course Management', icon: Library, description: 'Add, edit, and manage the course catalog.' },
    { href: '/admin/team', label: 'Team Management', icon: Briefcase, description: 'Manage co-founders and other team members.' },
    { href: '/admin/blog', label: 'Blog Management', icon: Newspaper, description: 'Create and publish blog posts.' },
    { href: '/admin/events', label: 'Event Management', icon: CalendarDays, description: 'Schedule and manage academy events.' },
    { href: '/admin/feedback', label: 'View Feedback', icon: MessageSquare, description: 'Review submissions from the feedback form.' },
    { href: '/admin/review-assessments', label: 'Assessment Reviews', icon: BookCheck, description: 'Review and grade student final assessments.' },
];

export default function AdminDashboardPage() {
    const { user, profile } = useAuth();

    return (
        <div>
            <h1 className="text-3xl md:text-4xl font-headline font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground mb-8">
                Welcome to the control center. Select a section to manage.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                <Card className="lg:col-span-2 bg-primary/5 border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary">
                            <ShieldCheck className="h-5 w-5" />
                            Role Diagnostics
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground flex items-center gap-1 uppercase font-bold tracking-wider">
                                <Fingerprint className="h-3 w-3" /> UID
                            </span>
                            <span className="text-sm font-mono truncate" title={user?.uid}>{user?.uid}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground flex items-center gap-1 uppercase font-bold tracking-wider">
                                <ShieldCheck className="h-3 w-3" /> System Role
                            </span>
                            <Badge variant="outline" className={cn(
                                "w-fit mt-1",
                                profile?.role === 'admin' ? "border-primary text-primary" : 
                                profile?.role === 'instructor' ? "border-success text-success" : ""
                            )}>
                                {profile?.role || 'student'}
                            </Badge>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs text-muted-foreground flex items-center gap-1 uppercase font-bold tracking-wider">
                                <Mail className="h-3 w-3" /> Email
                            </span>
                            <span className="text-sm truncate">{user?.email}</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-muted/30 border-dashed">
                    <CardHeader>
                        <CardTitle className="text-sm">Troubleshooting</CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-muted-foreground">
                        If "System Role" is <strong>student</strong>, you will not see assessments. Contact the lead admin to add your email to the instructors collection.
                    </CardContent>
                </Card>
            </div>

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
