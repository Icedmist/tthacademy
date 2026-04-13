

import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, updateDoc, collection, getDocs, writeBatch } from "firebase/firestore"; 
import type { StudentProgress, Course as CourseType, UserRole } from '@/lib/types';
import { getCourse, getCourses } from './course-data';
import { getInstructors } from './instructor-data';
import { ADMIN_UIDS } from '@/lib/admin';
import { errorEmitter } from '@/firebase/error-emitter';

// This is the shape of the data stored in the 'enrolledCourses' array in Firestore.
// It's a lightweight reference to the full course object.
type EnrolledCourseRef = {
    id: string;
    progress: number;
    completedLessons: {
        [moduleIndex: number]: {
             [lessonIndex: number]: boolean
        }
    }
}

/**
 * Fetches a student's progress from Firestore.
 * If the student doesn't have a profile yet, it creates one.
 * The full course data can be optionally merged from the `courses` collection.
 * @param userId The UID of the authenticated user.
 * @param name The display name of the user, used for creating a new profile.
 * @param email The email of the user.
 * @param referralCode The UID of the user who referred this student.
 * @param options An object to control optional behaviors, like merging course data.
 * @returns The student's progress data.
 */
export async function getStudentProgress(
    userId: string, 
    name?: string, 
    email?: string, 
    referralCode?: string,
    options: { includeCourseData?: boolean } = { includeCourseData: true }
): Promise<StudentProgress> {
    if (!db) {
        throw new Error("Firestore is not initialized. Check your Firebase configuration.");
    }

    const docRef = doc(db, "studentProgress", userId);
    
    const docSnap = await getDoc(docRef);
    
    // Determine role. 
    // 1. Admin if in hardcoded list
    // 2. Instructor if email exists in instructors collection
    // 3. Fallback to existing student record role or 'student'
    let role: UserRole = 'student';
    if (ADMIN_UIDS.includes(userId)) {
        role = 'admin';
    } else {
        const instructorList = await getInstructors();
        if (email && instructorList.some(i => i.email === email)) {
            role = 'instructor';
        }
    }

    if (docSnap.exists()) {
        const studentData = docSnap.data();
        const enrolledCourseRefs: EnrolledCourseRef[] = studentData.enrolledCourses || [];

        let enrolledCourses: CourseType[] = [];

        if (options.includeCourseData && enrolledCourseRefs.length > 0) {
            const allCourses = await getCourses();
            
            // Merge static course data with student's progress
            enrolledCourses = enrolledCourseRefs.map(ref => {
                const fullCourseData = allCourses.find(c => c.id === ref.id);
                if (!fullCourseData) return null; // Course might have been deleted

                // Create a deep copy to avoid modifying the original data
                const courseWithProgress = JSON.parse(JSON.stringify(fullCourseData));

                courseWithProgress.progress = ref.progress;
                
                // Mark lessons as completed based on the reference
                courseWithProgress.modules.forEach((module: any, mIdx: number) => {
                    module.lessons.forEach((lesson: any, lIdx: number) => {
                        lesson.completed = !!ref.completedLessons?.[mIdx]?.[lIdx];
                    });
                });

                return courseWithProgress;
            }).filter(c => c !== null) as CourseType[];
        }
        
        const assessments = studentData.assessments || {};
        const metrics = calculateProgressMetrics(enrolledCourses, assessments);
        
        // Ensure the role in the database is consistent with our resolution
        const finalRole = role !== 'student' ? role : (studentData.role || 'student');

        if (finalRole !== studentData.role) {
            try {
                await updateDoc(docRef, { role: finalRole });
            } catch (error) {
                console.error("Non-blocking role update failure:", error);
                // We don't throw here so the user can still see their dashboard
            }
        }
        
        return {
            studentId: userId,
            name: studentData.name,
            email: studentData.email,
            role: finalRole,
            enrolledCourses: enrolledCourses,
            referredBy: studentData.referredBy,
            assessments: assessments,
            ...metrics
        };

    } else {
        console.log(`No progress document for user ${userId}. Creating new profile.`);
        
        const newStudentData = {
            studentId: userId,
            name: name || "New Student",
            email: email || "",
            role: role, // Use the pre-determined role
            enrolledCourses: [],
            referredBy: referralCode || undefined,
        };

        try {
            await setDoc(docRef, newStudentData);
        } catch (error: any) {
            if (error.code === 'permission-denied') {
                errorEmitter.emit('permission-error', {
                    path: `document 'studentProgress/${userId}'`,
                    operation: 'create',
                    requestResourceData: newStudentData
                });
            }
             // Even if creation fails, return a default structure so the app doesn't crash
             return {
                ...newStudentData,
                enrolledCourses: [],
                overallProgress: 0,
                completedCourses: 0,
                coursesInProgress: 0,
                assessments: {},
            };
        }
        
        // Return the full StudentProgress structure
        return {
             ...newStudentData,
             enrolledCourses: [],
             overallProgress: 0,
             completedCourses: 0,
             coursesInProgress: 0,
             assessments: {},
        };
    }
}


/**
 * Recalculates progress metrics based on the current list of enrolled courses.
 * @param enrolledCourses Array of full CourseType objects with progress.
 * @param assessments Optional record of course assessments and their statuses.
 * @returns An object with calculated progress metrics.
 */
function calculateProgressMetrics(enrolledCourses: CourseType[], assessments: Record<string, any> = {}) {
    if (!enrolledCourses || enrolledCourses.length === 0) {
        return { coursesInProgress: 0, completedCourses: 0, overallProgress: 0 };
    }
    
    // A course is only completed if progress is 100% AND (it has no assessment OR the assessment is approved)
    const completedCourses = enrolledCourses.filter(c => {
        const progress = c.progress ?? 0;
        const assessmentStatus = assessments[c.id]?.status;

        // If the course has a final assessment, it MUST be approved to be "Completed"
        if (c.finalAssessment && c.finalAssessment.length > 0) {
            return progress === 100 && assessmentStatus === 'approved';
        }
        
        return progress === 100;
    }).length;

    const coursesInProgress = enrolledCourses.filter(c => (c.progress ?? 0) > 0 && (c.progress ?? 0) < 100).length;
    const totalProgress = enrolledCourses.reduce((sum, course) => sum + (course.progress ?? 0), 0);
    const overallProgress = enrolledCourses.length > 0 ? Math.round(totalProgress / enrolledCourses.length) : 0;

    return { coursesInProgress, completedCourses, overallProgress };
}


/**
 * Enrolls a student in a specific course by adding a lightweight reference.
 * @param userId The UID of the authenticated user.
 * @param courseId The ID of the course to enroll in.
 */
export async function enrollInCourse(userId: string, courseId: string): Promise<void> {
    if (!db) throw new Error("Firestore not initialized.");

    const courseToEnroll = await getCourse(courseId);
    if (!courseToEnroll) throw new Error("Course not found.");

    const studentProgressRef = doc(db, "studentProgress", userId);
    
    // Ensure student profile exists by calling getStudentProgress, which creates if it doesn't exist
    await getStudentProgress(userId, "Student", "", undefined, { includeCourseData: false });
    
    const studentDoc = await getDoc(studentProgressRef);

    if (!studentDoc.exists()) {
        throw new Error("Failed to create student profile. Cannot enroll.");
    }
    
    const studentData = studentDoc.data();
    const currentEnrolledRefs: EnrolledCourseRef[] = studentData?.enrolledCourses || [];

    if (currentEnrolledRefs.some(c => c.id === courseId)) {
        console.log(`User ${userId} is already enrolled in course ${courseId}.`);
        return;
    }

    const newCourseRef: EnrolledCourseRef = {
        id: courseId,
        progress: 0,
        completedLessons: {}
    };

    const updatedCourseRefs = [...currentEnrolledRefs, newCourseRef];

    await updateDoc(studentProgressRef, {
        enrolledCourses: updatedCourseRefs,
    });
}

/**
 * Updates a lesson's completion status and recalculates progress for a course.
 * @param userId The user's ID.
 * @param courseId The course's ID.
 * @param moduleIndex The index of the module.
 * @param lessonIndex The index of the lesson within the module.
 * @param completed The new completion status.
 */
export async function updateLessonStatus(userId: string, courseId: string, moduleIndex: number, lessonIndex: number, completed: boolean): Promise<void> {
    if (!db) throw new Error("Firestore not initialized.");
    
    const studentProgressRef = doc(db, "studentProgress", userId);
    const studentDoc = await getDoc(studentProgressRef);
    if (!studentDoc.exists()) {
        throw new Error("Student progress document not found.");
    }

    const studentData = studentDoc.data()!;
    const currentEnrolledRefs: EnrolledCourseRef[] = studentData.enrolledCourses || [];

    const courseRefIndex = currentEnrolledRefs.findIndex(c => c.id === courseId);
    if (courseRefIndex === -1) throw new Error("Course not found in student's enrolled list.");

    const courseRef = currentEnrolledRefs[courseRefIndex];

    // Update completed lessons map
    if (completed) {
        if (!courseRef.completedLessons[moduleIndex]) {
            courseRef.completedLessons[moduleIndex] = {};
        }
        courseRef.completedLessons[moduleIndex][lessonIndex] = true;
    } else {
        if (courseRef.completedLessons?.[moduleIndex]?.[lessonIndex]) {
            delete courseRef.completedLessons[moduleIndex][lessonIndex];
            if (Object.keys(courseRef.completedLessons[moduleIndex]).length === 0) {
                delete courseRef.completedLessons[moduleIndex];
            }
        }
    }
    
    // Recalculate progress
    const staticCourse = await getCourse(courseId);
    if (!staticCourse) throw new Error("Static course data not found for progress calculation.");
    
    const totalLessons = staticCourse.modules.reduce((sum, module) => sum + module.lessons.length, 0);
    const completedLessonsCount = Object.values(courseRef.completedLessons).reduce((sum, module) => sum + Object.keys(module).length, 0);
    courseRef.progress = totalLessons > 0 ? Math.round((completedLessonsCount / totalLessons) * 100) : 0;
    
    const updatedCourseRefs = [...currentEnrolledRefs];
    updatedCourseRefs[courseRefIndex] = courseRef;
    
    await updateDoc(studentProgressRef, {
        enrolledCourses: updatedCourseRefs,
    });
}

export async function updateUserRole(userId: string, role: UserRole): Promise<void> {
    if (!db) throw new Error("Firestore not initialized.");
    const docRef = doc(db, 'studentProgress', userId);
    await updateDoc(docRef, { role });
}

export async function getAllStudentProgress(): Promise<StudentProgress[]> {
  const progressCol = collection(db, 'studentProgress');
  const snapshot = await getDocs(progressCol);
  const allCourses = await getCourses();

  return snapshot.docs.map(doc => {
    const data = doc.data();
    const enrolledCourseRefs: EnrolledCourseRef[] = data.enrolledCourses || [];

    const enrolledCourses = enrolledCourseRefs.map(ref => {
      const courseData = allCourses.find(c => c.id === ref.id);
      if (!courseData) return null;
      return { ...courseData, progress: ref.progress };
    }).filter(Boolean) as CourseType[];

    const metrics = calculateProgressMetrics(enrolledCourses);

    return {
      studentId: doc.id,
      name: data.name,
      email: data.email,
      role: data.role || 'student',
      enrolledCourses: enrolledCourses,
      referredBy: data.referredBy,
      ...metrics,
    };
  });
}
