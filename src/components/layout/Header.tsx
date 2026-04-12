
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/Logo';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, LogOut, User, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/use-auth';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';
import { useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const navLinks = [
  { href: '/courses', label: 'Courses' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/events', label: 'Events' },
  { href: '/#features', label: 'Features' },
  { href: '/#testimonials', label: 'Testimonials' },
];

export const Header = () => {
  const { user, profile } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/');
  };

  const isAuthorizedAdmin = profile?.role === 'admin';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <Logo />
        </Link>
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {navLinks.map(link => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
               <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                       <AvatarFallback>{user.displayName?.[0] || user.email?.[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.displayName || 'My Account'}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/account">
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Account Settings</span>
                    </DropdownMenuItem>
                  </Link>
                  {isAuthorizedAdmin && (
                    <Link href="/admin">
                      <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          <span>Admin Panel</span>
                      </DropdownMenuItem>
                    </Link>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button variant="secondary">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <div className="p-4">
                  <Link href="/" className="mb-6 block">
                    <Logo />
                  </Link>
                  <nav className="flex flex-col space-y-4">
                    {navLinks.map(link => (
                      <Link key={link.href} href={link.href} className="transition-colors hover:text-primary">
                        {link.label}
                      </Link>
                    ))}
                     <Link href="/account" className="transition-colors hover:text-primary flex items-center">
                        <User className="mr-2 h-4 w-4" />
                        Account Settings
                     </Link>
                     {isAuthorizedAdmin && (
                        <Link href="/admin" className="transition-colors hover:text-primary flex items-center">
                           <Shield className="mr-2 h-4 w-4" />
                           Admin Panel
                        </Link>
                    )}
                  </nav>
                  <div className="mt-6 flex flex-col space-y-2">
                     {user ? (
                        <Button variant="outline" onClick={handleLogout} className="w-full">Logout</Button>
                     ) : (
                      <>
                        <Link href="/login">
                            <Button variant="outline" className="w-full">Login</Button>
                        </Link>
                        <Link href="/signup">
                          <Button variant="secondary" className="w-full">Sign Up</Button>
                        </Link>
                      </>
                     )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};
