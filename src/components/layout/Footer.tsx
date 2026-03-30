
import Link from 'next/link';
import { Logo } from '@/components/Logo';
import { GoogleIcon } from '@/components/icons/GoogleIcon';
import { XIcon } from '@/components/icons/XIcon';
import { FacebookIcon } from '../icons/FacebookIcon';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-2 text-sm text-muted-foreground">
             Your trusted platform for mastering the skills of tomorrow in technology and finance.
            </p>
          </div>
          <div className="space-y-8 md:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-headline font-semibold mb-4">Academy</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about" className="text-muted-foreground hover:text-primary">About Us</Link></li>
                <li><Link href="/courses" className="text-muted-foreground hover:text-primary">Courses</Link></li>
                 <li><Link href="/#testimonials" className="text-muted-foreground hover:text-primary">Testimonials</Link></li>
                 <li><Link href="/#features" className="text-muted-foreground hover:text-primary">Features</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/help" className="text-muted-foreground hover:text-primary">Help Center</Link></li>
                <li><Link href="/feedback" className="text-muted-foreground hover:text-primary">Feedback</Link></li>
                 <li><Link href="/privacy" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-muted-foreground hover:text-primary">Terms of Use</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-headline font-semibold mb-4">Community</h4>
               <ul className="space-y-2 text-sm">
                <li><a href="https://whatsapp.com/channel/0029Vb6Auu6G3R3gqLmqfz0t" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">Join Study Group</a></li>
                <li><Link href="/blog" className="text-muted-foreground hover:text-primary">Blog</Link></li>
                <li><Link href="/events" className="text-muted-foreground hover:text-primary">Events</Link></li>
              </ul>
            </div>
             <div>
              <h4 className="font-headline font-semibold mb-4">Connect</h4>
              <div className="flex space-x-4">
                <Link href="#" aria-label="Google">
                  <GoogleIcon className="h-6 w-6 text-muted-foreground hover:text-primary" />
                </Link>
                <Link href="#" aria-label="X/Twitter">
                  <XIcon className="h-6 w-6 text-muted-foreground hover:text-primary" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border/40 text-center text-sm text-muted-foreground">
          <p>&copy; {currentYear} TechTradeHub Academy. A Subsidiary of Tech Trade Hub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

    