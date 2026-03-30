"use server";

import { recommendCourses } from "@/ai/flows/recommend-courses-flow";
import { getStudentProgress } from "@/services/student-data";
import type { Course } from "@/lib/types";

export async function getRecommendations(userId: string): Promise<Course[]> {
  if (!userId) {
    console.error("No user ID provided for recommendations.");
    return [];
  }
  try {
    const studentProgress = await getStudentProgress(userId);
    const recommendations = await recommendCourses(studentProgress);
    return recommendations;
  } catch (error) {
    console.error("Error getting course recommendations:", error);
    // Return an empty array on error so the UI doesn't break.
    return [];
  }
}
