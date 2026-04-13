
/**
 * A browser-safe helper for Next.js revalidatePath.
 * Only executes on the server; does nothing on the client.
 */
export async function safeRevalidatePath(path: string, type?: 'layout' | 'page') {
    if (typeof window === 'undefined') {
        try {
            // Dynamic import to prevent client-side bundling issues
            const { revalidatePath } = await import('next/cache');
            revalidatePath(path, type);
        } catch (error) {
            console.error('Revalidation failed:', error);
        }
    }
}
