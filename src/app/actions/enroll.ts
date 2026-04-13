


import { enrollInCourse } from "@/services/student-data";

export async function handleEnroll(userId: string, courseId: string): Promise<boolean> {
    try {
        await enrollInCourse(userId, courseId);
        return true;
    } catch (error) {
        console.error("Enrollment failed:", error);
        return false;
    }
}
