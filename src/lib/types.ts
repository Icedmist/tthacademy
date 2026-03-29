
import { z } from 'zod';
import { COURSE_CATEGORIES, COURSE_LEVELS } from './constants';

export type CourseCategory = (typeof COURSE_CATEGORIES)[number];
export type CourseLevel = (typeof COURSE_LEVELS)[number];

// Zod schema for a Quiz Question - now for subjective/essay questions
export const QuestionSchema = z.object({
  questionText: z.string().min(1, 'Question text cannot be empty'),
});
export type Question = z.infer<typeof QuestionSchema>;

// Zod schema for a Lesson
export const LessonSchema = z.object({
  title: z.string().min(1, 'Lesson title cannot be empty'),
  content: z.string().min(1, 'Lesson content cannot be empty'),
  duration: z.string().min(1, 'Lesson duration cannot be empty'),
  completed: z.boolean().default(false),
});
export type Lesson = z.infer<typeof LessonSchema>;

// Zod schema for a Module
export const ModuleSchema = z.object({
  title: z.string().min(1, 'Module title cannot be empty'),
  lessons: z.array(LessonSchema).min(1, 'A module must have at least one lesson'),
  quiz: z.array(QuestionSchema).optional(),
});
export type Module = z.infer<typeof ModuleSchema>;

// Base schema for creating a new course. Does not include `id` or `progress`.
export const NewCourseSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Short description is required'),
  longDescription: z.string().min(1, 'Long description is required'),
  category: z.enum(COURSE_CATEGORIES),
  level: z.enum(COURSE_LEVELS),
  imageUrl: z.string().url('Must be a valid URL'),
  modules: z.array(ModuleSchema).min(1, 'A course must have at least one module'),
  finalAssessment: z.array(QuestionSchema).optional(),
  price: z.number().min(0, 'Price cannot be negative'),
  duration: z.string().min(1, 'Duration is required'),
  instructor: z.string().min(1, 'Instructor name is required'),
});
export type NewCourse = z.infer<typeof NewCourseSchema>;

// Full Course schema, including dynamic fields like `id` and `progress`.
export const CourseSchema = NewCourseSchema.extend({
  id: z.string(),
  progress: z.number().min(0).max(100).default(0).optional(),
});
export type Course = z.infer<typeof CourseSchema>;

export const UserRoleSchema = z.enum(['student', 'admin', 'instructor']);
export type UserRole = z.infer<typeof UserRoleSchema>;

// Zod schema for StudentProgress
export const StudentProgressSchema = z.object({
    studentId: z.string(),
    name: z.string(),
    email: z.string().email(),
    role: UserRoleSchema.default('student'),
    enrolledCourses: z.array(CourseSchema),
    overallProgress: z.number(),
    completedCourses: z.number(),
    coursesInProgress: z.number(),
    referredBy: z.string().optional(),
});
export type StudentProgress = z.infer<typeof StudentProgressSchema>;

// Zod schema for a Team Member
export const TeamMemberRoleSchema = z.enum(['Co-founder', 'Lead Instructor', 'Community Manager']);
export const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  role: TeamMemberRoleSchema,
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  avatarUrl: z.string().url('Must be a valid URL for the avatar image'),
  socials: z.object({
    twitter: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
  }).optional(),
});
export type TeamMember = z.infer<typeof TeamMemberSchema>;


// Zod schema for feedback
export const FeedbackSchema = z.object({
  id: z.string(),
  name: z.string().min(2, { message: "Please enter your name." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z.string().min(10, { message: "Feedback must be at least 10 characters long." }),
  userId: z.string().optional(),
  createdAt: z.any(), // Allow Firestore Timestamp on read
});
export type Feedback = z.infer<typeof FeedbackSchema>;


// Zod schema for a Blog Post
export const BlogSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  content: z.string().min(1, 'Content is required'),
  imageUrl: z.string().url('A valid image URL is required'),
  authorName: z.string().min(1, 'Author name is required'),
  authorId: z.string().optional(),
  status: z.enum(['draft', 'published']),
  createdAt: z.any(), // Firestore Timestamp
  publishedAt: z.any().optional(), // Firestore Timestamp
});
export type Blog = z.infer<typeof BlogSchema>;

export const NewBlogSchema = BlogSchema.omit({ id: true, slug: true, createdAt: true, publishedAt: true });

// A "plain" version of the Blog type for Client Components
export const PlainBlogSchema = BlogSchema.omit({ createdAt: true, publishedAt: true }).extend({
  createdAt: z.string(),
  publishedAt: z.string().optional(),
});
export type PlainBlog = z.infer<typeof PlainBlogSchema>;


// Zod schema for an Event
export const EventSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  imageUrl: z.string().url('A valid image URL is required'),
  date: z.any(), // Firestore Timestamp
  location: z.string().min(1, 'Location is required'),
  status: z.enum(['upcoming', 'past', 'cancelled']),
  link: z.string().url('A valid link is required'),
});
export type Event = z.infer<typeof EventSchema>;

export const NewEventSchema = EventSchema.omit({ id: true });
export type NewEvent = z.infer<typeof NewEventSchema>;

// A "plain" version of the Event type for Client Components
export const PlainEventSchema = EventSchema.omit({ date: true }).extend({
  date: z.string(),
});
export type PlainEvent = z.infer<typeof PlainEventSchema>;

// Zod schema for an Event Attendee
export const AttendeeSchema = z.object({
    id: z.string(),
    userId: z.string(),
    name: z.string(),
    email: z.string().email(),
    registeredAt: z.any(),
});
export type Attendee = z.infer<typeof AttendeeSchema>;


// Zod schema for an Instructor
export const InstructorSchema = z.object({
  id: z.string(),
  name: z.string().min(1, 'Name is required'),
  bio: z.string().min(10, 'Bio must be at least 10 characters'),
  avatarUrl: z.string().url('Must be a valid URL for the avatar image'),
  socials: z.object({
    twitter: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
  }).optional(),
});
export type Instructor = z.infer<typeof InstructorSchema>;
