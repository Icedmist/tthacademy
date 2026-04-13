
'use client';

import { useRole } from '@/hooks/use-role';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlert, Loader2, BookCheck, LayoutDashboard, Home, Users } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';

const navLinks = [
  { href: '/instructor', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/instructor/reviews', label: 'Assessment Reviews', icon: BookCheck },
  { href: '/admin/users', label: 'Student Directory', icon: Users },
];

function InstructorSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-64 flex-shrink-0 border-r bg-card/50 hidden md:flex flex-col">
            <div className="p-4 border-b h-16 flex items-center">
                <Link href="/instructor" className='flex items-center gap-2'>
                    <BookCheck className='h-7 w-7 text-primary' />
                    <h2 className="text-xl font-headline font-bold">Instructor</h2>
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

export default function InstructorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { role, isInstructor, isLoading } = useRole();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isInstructor) {
      router.push('/login');
    }
  }, [isLoading, isInstructor, router]);

  if (isLoading) {
    return <div className="h-screen w-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin"/></div>;
  }
  
  if (!isInstructor) {
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
                    <p>You do not have permission to view this page. This area is for instructors only.</p>
                    <p className='mt-4'>If you believe this is an error, please ensure your email is registered as an instructor.</p>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className='flex min-h-screen bg-muted/40'>
        <InstructorSidebar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
            {children}
        </main>
    </div>
  );
}
