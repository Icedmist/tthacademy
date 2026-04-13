import { updateLessonStatus } from "@/services/student-data";
import { submitAssessment as submitSubService } from "@/services/assessment-data";
import { safeRevalidatePath } from "@/lib/revalidate";
import { AssessmentSubmission } from "@/lib/types";

export async function handleUpdateLessonStatus(
    userId: string, 
    courseId: string, 
    moduleIndex: number, 
    lessonIndex: number, 
    completed: boolean
) {
    try {
        await updateLessonStatus(userId, courseId, moduleIndex, lessonIndex, completed);
        // Revalidate paths to update UI across the app
        await safeRevalidatePath(`/learn/${courseId}`);
        await safeRevalidatePath(`/courses/${courseId}`);
        await safeRevalidatePath('/dashboard');
        return { success: true };
    } catch (error) {
        console.error("Failed to update lesson status:", error);
        return { success: false, error: (error as Error).message };
    }
}

export async function handleSubmitAssessment(
    submission: Omit<AssessmentSubmission, 'id' | 'submittedAt' | 'status'>
) {
    try {
        const submissionId = await submitSubService(submission);
        await safeRevalidatePath(`/learn/${submission.courseId}`);
        await safeRevalidatePath('/dashboard');
        return { success: true, submissionId };
    } catch (error) {
        console.error("Failed to submit assessment:", error);
        return { success: false, error: (error as Error).message };
    }
}
