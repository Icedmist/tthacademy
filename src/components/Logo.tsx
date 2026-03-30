import { cn } from '@/lib/utils';

export const Logo = ({ className }: { className?: string }) => (
  <div className={cn('flex items-center gap-2 text-lg font-bold font-headline', className)}>
    <svg aria-hidden="true" className="h-8 w-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" />
                <stop offset="100%" stopColor="hsl(var(--secondary))" />
            </linearGradient>
        </defs>
        <path d="M9 9V6.5C9 5.12 10.12 4 11.5 4C12.88 4 14 5.12 14 6.5V9" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12.06 13.5L14 11.5" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.94 13.5L10 11.5" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.5 15.5C9.01 15.5 7 17.51 7 20H16C16 17.51 13.99 15.5 11.5 15.5Z" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M7 12.5C4.24 12.5 2 14.74 2 17.5H4" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 12.5C18.76 12.5 21 14.74 21 17.5H19" stroke="url(#logo-grad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <span className="text-foreground">TechTradeHub</span>
  </div>
);