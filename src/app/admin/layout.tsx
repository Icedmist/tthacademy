
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, Loader2, Users, Library, Newspaper, CalendarDays, MessageSquare, Shield, Home, LayoutDashboard, Briefcase, UserCog } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/admin/users', label: 'Users', icon: Users },
  { href: '/admin/courses', label: 'Courses', icon: Library },
  { href: '/admin/team', label: 'Team', icon: Briefcase },
  { href: '/admin/instructors', label: 'Instructors', icon: UserCog },
  { href: '/admin/blog', label: 'Blog', icon: Newspaper },
  { href: '/admin/events', label: 'Events', icon: CalendarDays },
  { href: '/admin/feedback', 'label': 'Feedback', icon: MessageSquare },
];

function AdminSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 flex-shrink-0 border-r bg-card/50 hidden md:flex flex-col">
            <div className="p-4 border-b h-16 flex items-center">
                <Link href="/admin" className='flex items-center gap-2'>
                    <Shield className='h-7 w-7 text-primary' />
                    <h2 className="text-xl font-headline font-bold">Admin Panel</h2>
                </Link>
            </div>
            <nav className="flex-grow p-4 space-y-2">
              <TooltipProvider delayDuration={0}>
                {navLinks.map(link => {
                    const isActive = link.exact ? pathname === link.href : pathname.startsWith(link.href);
                    return (
                      <Tooltip key={link.href}>
                        <TooltipTrigger asChild>
                           <Link href={link.href}>
                                <div className={cn(
                                    "flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary",
                                    isActive && "bg-primary/10 text-primary font-semibold"
                                )}>
                                    <link.icon className="h-5 w-5" />
                                    <span>{link.label}</span>
                                </div>
                            </Link>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          <p>{link.label}</p>
                        </TooltipContent>
                      </Tooltip>
                    )
                })}
              </TooltipProvider>
            </nav>
            <div className="p-4 border-t">
                <Link href="/" className="w-full">
                   <div className="flex items-center gap-3 rounded-md px-3 py-2 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground">
                        <Home className="h-5 w-5" />
                        <span>Back to Site</span>
                    </div>
                </Link>
            </div>
        </aside>
    )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login');
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return <div className="h-screen w-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin"/></div>;
  }
  
  const isAuthorized = profile?.role === 'admin';

  if (!isAuthorized) {
    return (
        <div className="container mx-auto py-12 flex items-center justify-center">
            <Card className="max-w-md w-full bg-destructive/10 border-destructive text-destructive">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ShieldAlert />
                        Access Denied
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>You do not have permission to view this page. This area is for administrators only.</p>
                    <p className='mt-4'>If you believe this is an error, please contact support.</p>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className='flex min-h-screen bg-muted/40'>
        <AdminSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
        </main>
    </div>
  );
}
