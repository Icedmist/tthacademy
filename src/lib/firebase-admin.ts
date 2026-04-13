
import * as admin from 'firebase-admin';

const firebaseAdminConfig = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  // Support either full key or part-by-part from env
  privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
};

export function getAdminApp() {
  if (!admin.apps.length) {
    if (!firebaseAdminConfig.privateKey || !firebaseAdminConfig.clientEmail) {
        // Fallback or development mode with local emulator
        if (process.env.FIREBASE_AUTH_EMULATOR_HOST) {
             return admin.initializeApp({
                projectId: firebaseAdminConfig.projectId,
             });
        }
        // In a real production environment, this would throw if env vars are missing
        // return admin.initializeApp(); 
    }

    return admin.initializeApp({
      credential: admin.credential.cert(firebaseAdminConfig as any),
      projectId: firebaseAdminConfig.projectId,
    });
  }
  return admin.app();
}

export const adminAuth = () => getAdminApp().auth();
export const adminDb = () => getAdminApp().firestore();
