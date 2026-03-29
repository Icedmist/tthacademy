
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Poppins, Montserrat, Playfair_Display } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ClientProviders } from '@/components/layout/ClientProviders';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-poppins',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-montserrat',
});

const playfairDisplay = Playfair_Display({
  subsets: ['latin'],
  weight: ['700'],
  variable: '--font-playfair-display',
});

export const metadata: Metadata = {
  title: 'TechTradeHub Academy',
  description: 'Learn Futures Trading, Web3, Crypto, Tech Skills, AI & Machine Learning.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          'font-body antialiased min-h-screen flex flex-col',
          poppins.variable,
          montserrat.variable,
          playfairDisplay.variable
        )}
      >
        <ClientProviders>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </ClientProviders>
      </body>
    </html>
  );
}
