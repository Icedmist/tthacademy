
'use client';

import { AuthProvider } from '@/hooks/use-auth';
import { FirebaseErrorListener } from '@/components/FirebaseErrorListener';
import { Toaster } from '@/components/ui/toaster';

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <FirebaseErrorListener />
      {children}
      <Toaster />
    </AuthProvider>
  );
}
