
'use server';

import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

/**
 * Uploads a file to Firebase Storage.
 * @param file The file to upload.
 * @param path The path in the storage bucket where the file should be saved.
 * @returns A promise that resolves with the public download URL of the uploaded file.
 */
export async function uploadFile(file: File, path: string): Promise<string> {
    if (!storage) {
        throw new Error("Firebase Storage is not initialized.");
    }
    if (!file) {
        throw new Error("No file provided for upload.");
    }

    const storageRef = ref(storage, path);

    try {
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading file:", error);
        throw new Error(`Failed to upload file: ${(error as Error).message}`);
    }
}
