
'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import type { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handleError = (error: FirestorePermissionError) => {
      console.error('Caught a Firestore Permission Error:', error);

      // In a real app, you might use a more sophisticated logging service.
      // For the developer experience, we will throw this error in development
      // so it gets caught by the Next.js error overlay.
      if (process.env.NODE_ENV === 'development') {
        const enhancedError = new Error(
          `FirestoreError: Missing or insufficient permissions: The following request was denied by Firestore Security Rules:\n${JSON.stringify({
            auth: 'No user authenticated or auth state not provided.',
            ...error.context,
          }, null, 2)}`
        );
        
        // This makes the Next.js overlay appear
        setTimeout(() => {
           throw enhancedError;
        }, 0);
      } else {
        // In production, just show a generic toast.
         toast({
            title: 'Permission Denied',
            description: 'You do not have permission to perform this action.',
            variant: 'destructive',
        });
      }
    };

    errorEmitter.on('permission-error', handleError);

    return () => {
      errorEmitter.off('permission-error', handleError);
    };
  }, [toast]);

  // This component does not render anything.
  return null;
}
