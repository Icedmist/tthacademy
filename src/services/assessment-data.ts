

import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, doc, getDoc, getDocs, query, where, Timestamp, orderBy } from 'firebase/firestore';
import { AssessmentSubmission, AssessmentSubmissionSchema } from '@/lib/types';

/**
 * Submits a new assessment for review.
 */
export async function submitAssessment(submission: Omit<AssessmentSubmission, 'id' | 'submittedAt' | 'status'>) {
    if (!db) throw new Error("Firestore not initialized.");

    const submissionData = {
        ...submission,
        status: 'pending',
        submittedAt: Timestamp.now(),
    };

    // Save to the main submissions collection
    const docRef = await addDoc(collection(db, 'assessmentSubmissions'), submissionData);
    
    // Update the student's progress record with a reference to this submission
    const studentProgressRef = doc(db, 'studentProgress', submission.userId);
    const studentDoc = await getDoc(studentProgressRef);
    
    if (studentDoc.exists()) {
        const data = studentDoc.data();
        const currentAssessments = data.assessments || {};
        currentAssessments[submission.courseId] = {
            status: 'pending',
            submissionId: docRef.id,
        };
        await updateDoc(studentProgressRef, { assessments: currentAssessments });
    }

    return docRef.id;
}

/**
 * Fetches all pending submissions for an instructor.
 * Currently returns ALL pending if we don't have course-to-instructor mapping yet,
 * but filtered by instructorId if provided.
 */
export async function getPendingSubmissions(instructorId?: string): Promise<AssessmentSubmission[]> {
    if (!db) throw new Error("Firestore not initialized.");
    
    let q = query(collection(db, 'assessmentSubmissions'), where('status', '==', 'pending'), orderBy('submittedAt', 'desc'));
    
    if (instructorId) {
        // In the future, we can filter by instructorId if we stamp it during submission
        // For now, instructors see all pending to facilitate collaborative review
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    } as AssessmentSubmission));
}

/**
 * Reviews (approves/rejects) a submission.
 */
export async function reviewSubmission(
    submissionId: string, 
    status: 'approved' | 'rejected', 
    instructorId: string, 
    instructorName: string,
    feedback?: string
) {
    if (!db) throw new Error("Firestore not initialized.");

    const submissionRef = doc(db, 'assessmentSubmissions', submissionId);
    const submissionSnap = await getDoc(submissionRef);
    
    if (!submissionSnap.exists()) throw new Error("Submission not found.");
    
    const submissionData = submissionSnap.data() as AssessmentSubmission;

    await updateDoc(submissionRef, {
        status,
        instructorId,
        instructorName,
        feedback,
        updatedAt: Timestamp.now()
    });

    // Update the student's progress record
    const studentProgressRef = doc(db, 'studentProgress', submissionData.userId);
    const studentDoc = await getDoc(studentProgressRef);
    
    if (studentDoc.exists()) {
        const data = studentDoc.data();
        const currentAssessments = data.assessments || {};
        currentAssessments[submissionData.courseId] = {
            status,
            submissionId,
            lastFeedback: feedback
        };
        
        // If approved, we might want to trigger course completion here
        // or let the metric calculator handle it in the next fetch.
        await updateDoc(studentProgressRef, { assessments: currentAssessments });
    }

    return { success: true };
}
