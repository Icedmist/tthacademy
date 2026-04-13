


import { getStudentProgress } from "@/services/student-data";
import { getCourses } from "@/services/course-data";
import type { Course } from "@/lib/types";

export async function getRecommendations(userId: string): Promise<Course[]> {
  if (!userId) {
    console.error("No user ID provided for recommendations.");
    return [];
  }
  try {
    const studentProgress = await getStudentProgress(userId);
    const allCourses = await getCourses();
    
    // Filter out courses the student is already enrolled in
    const enrolledIds = new Set(studentProgress.enrolledCourses.map(c => c.id));
    const availableCourses = allCourses.filter(c => !enrolledIds.has(c.id));
    
    if (availableCourses.length === 0) return [];

    // Simple recommendation: 
    // 1. Get categories the student is currently enrolled in
    const favoriteCategories = new Set(studentProgress.enrolledCourses.map(c => c.category));
    
    // 2. Sort available courses: same category first, then others
    const recommendations = availableCourses.sort((a, b) => {
        const aMatch = favoriteCategories.has(a.category) ? 1 : 0;
        const bMatch = favoriteCategories.has(b.category) ? 1 : 0;
        return bMatch - aMatch;
    });

    // Return top 4
    return recommendations.slice(0, 4);
  } catch (error) {
    console.error("Error getting course recommendations:", error);
    // Return an empty array on error so the UI doesn't break.
    return [];
  }
}
