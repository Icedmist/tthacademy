import type { CourseCategory } from "./types";

export const COURSE_CATEGORIES = [
  'Futures Trading',
  'Web3',
  'Crypto',
  'Tech Skills',
  'AI & Machine Learning',
] as const;

export const COURSE_LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

export const COURSE_CATEGORY_COLORS: Record<CourseCategory, string> = {
  'Futures Trading': 'hsl(var(--chart-2))', // Green
  'Web3': 'hsl(var(--primary))', // Blue
  'Crypto': 'hsl(var(--chart-4))', // Yellow
  'Tech Skills': 'hsl(var(--secondary))', // Purple
  'AI & Machine Learning': 'hsl(var(--destructive))', // Red
};
