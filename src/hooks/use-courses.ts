
'use client';

import { useState, useEffect } from 'react';
import type { Course } from '@/lib/types';
import { getCourses } from '@/services/course-data';

export function useCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCourses() {
      try {
        setIsLoading(true);
        setError(null);
        const courseData = await getCourses();
        setCourses(courseData);
      } catch (err: any) {
        console.error("Failed to fetch courses:", err);
        setError(err.message || 'An unknown error occurred.');
      } finally {
        setIsLoading(false);
      }
    }

    fetchCourses();
  }, []);

  return { courses, isLoading, error };
}
