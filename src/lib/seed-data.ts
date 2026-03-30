import { auth, db } from './firebase';
import { collection, addDoc, setDoc, doc, Timestamp, getDocs, deleteDoc, updateDoc, writeBatch } from 'firebase/firestore';
import { COURSE_CATEGORIES, COURSE_LEVELS } from './constants';

const INSTRUCTORS = [
  {
    id: 'instructor_nasir',
    name: 'Nasir',
    email: 'nasir@academy.com',
    bio: 'Lead Instructor at TTH Academy with over 10 years of experience in algorithmic trading and software engineering. Passionate about empowering the next generation of tech-traders.',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Nasir',
    socials: { twitter: 'https://twitter.com/icedmist', linkedin: 'https://linkedin.com/in/icedmist' }
  },
  {
    id: 'instructor_benjamin',
    name: 'Benjamin',
    email: 'benjamin@academy.com',
    bio: 'Co-founder and Senior Fintech Consultant. Expert in blockchain technology and decentralized finance. Helping students navigate the future of money.',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Benjamin',
    socials: { twitter: 'https://twitter.com/benjamin', linkedin: 'https://linkedin.com/in/benjamin' }
  },
  {
    id: 'instructor_mudathir',
    name: 'Mudathir',
    email: 'mudathir@academy.com',
    bio: 'Community Manager and Market Analyst. Specialized in technical analysis and sentiment tracking for crypto and futures markets.',
    avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mudathir',
    socials: { twitter: 'https://twitter.com/mudathir', linkedin: 'https://linkedin.com/in/mudathir' }
  }
];

const BLOG_POSTS = [
  {
    title: 'Welcome to TechTradeHub Academy',
    slug: 'welcome-to-tth-academy',
    content: 'We are thrilled to launch TechTradeHub Academy, a platform dedicated to providing high-quality, practical education in technology and finance. Our mission is to bridge the skills gap and empower individuals to master their future. Explore our courses, join our community, and start your journey today.',
    imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=60',
    authorName: 'Nasir',
    status: 'published',
    createdAt: Timestamp.now(),
    publishedAt: Timestamp.now()
  },
  {
    title: 'Mastering the Futures Market',
    slug: 'mastering-futures-market',
    content: 'Futures trading can be a powerful tool for risk management and wealth creation, but it requires a solid understanding of market mechanics. In this post, we break down the core concepts of futures contracts and why they are essential for modern traders.',
    imageUrl: 'https://images.unsplash.com/photo-1611974714024-4607ad03d639?w=800&auto=format&fit=crop&q=60',
    authorName: 'Benjamin',
    status: 'published',
    createdAt: Timestamp.now(),
    publishedAt: Timestamp.now()
  },
  {
      title: 'The Rise of Algorithmic Trading',
      slug: 'rise-of-algo-trading',
      content: 'Algorithmic trading is no longer just for hedge funds. With the democratization of technology, individual traders can now leverage automation to execute complex strategies with precision. Learn how TTH Academy is preparing students for the era of automated finance.',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?w=800&auto=format&fit=crop&q=60',
      authorName: 'Nasir',
      status: 'published',
      createdAt: Timestamp.now(),
      publishedAt: Timestamp.now()
  }
];

const EVENTS = [
    {
        title: 'Intro to Futures Trading Webinar',
        description: 'Join us for a live session covering the basics of futures trading and how to get started on the TTH platform.',
        imageUrl: 'https://images.unsplash.com/photo-1591115765373-520b7a217286?w=800&auto=format&fit=crop&q=60',
        date: Timestamp.fromDate(new Date(Date.now() + 86400000 * 7)), // 7 days from now
        location: 'Online / Zoom',
        status: 'upcoming',
        link: 'https://zoom.us/j/tth-webinar'
    },
    {
        title: 'Algo-Trading Workshop',
        description: 'A deep dive into building your first trading bot using Python and TTH APIs.',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60',
        date: Timestamp.fromDate(new Date(Date.now() + 86400000 * 14)), // 14 days from now
        location: 'TTH Hub, Lagos',
        status: 'upcoming',
        link: 'https://tth.academy/events/workshop'
    }
];

const COURSES = [
    {
        id: 'algo-trading-101',
        title: 'Algorithmic Trading 101',
        description: 'Learn the fundamentals of building trading bots.',
        longDescription: 'This comprehensive course covers everything from basic strategy design to backtesting and live implementation. You will learn how to use Python and modern APIs to automate your trading ideas.',
        category: 'Tech Skills',
        level: 'Beginner',
        imageUrl: 'https://images.unsplash.com/photo-1611974714024-4607ad03d639?w=800&auto=format&fit=crop&q=60',
        duration: '12 Hours',
        instructor: 'Nasir',
        instructorId: 'instructor_nasir',
        price: 0,
        modules: [
            {
                title: 'Introduction to Algorithms',
                lessons: [
                    { title: 'What is Algo-Trading?', content: 'Algorithm trading uses a computer program that follows a defined set of instructions (an algorithm) to place a trade...', duration: '30 mins' },
                    { title: 'Setting up your Python Environment', content: 'Follow these steps to install Anaconda and necessary libraries...', duration: '45 mins' }
                ]
            }
        ]
    },
    {
        id: 'fintech-foundations',
        title: 'Fintech Foundations',
        description: 'Explore the future of finance and technology.',
        longDescription: 'Deep dive into the world of Fintech, exploring mobile payments, open banking, and the digital transformation of traditional financial institutions.',
        category: 'Futures Trading',
        level: 'Intermediate',
        imageUrl: 'https://images.unsplash.com/photo-1551288049-bbbda536339a?w=800&auto=format&fit=crop&q=60',
        duration: '8 Hours',
        instructor: 'Benjamin',
        instructorId: 'instructor_benjamin',
        price: 0,
        modules: [
            {
                title: 'Digital Payments',
                lessons: [
                    { title: 'Evolution of Money', content: 'From barter to digital coins...', duration: '40 mins' }
                ]
            }
        ]
    }
];

const STUDENT_PROFILES = [
    { name: 'Alice Smith', email: 'alice@example.com', role: 'student', enrolledCourses: [], overallProgress: 0 },
    { name: 'Bob Johnson', email: 'bob@example.com', role: 'student', enrolledCourses: [], overallProgress: 0 },
    { name: 'Charlie Davis', email: 'charlie@example.com', role: 'student', enrolledCourses: [], overallProgress: 0 }
];

export async function seedData() {
  if (!db) return;

  console.log('Starting system seeding...');

  // 1. Seed Instructors
  for (const instructor of INSTRUCTORS) {
    const { id, ...data } = instructor;
    const roleMap: Record<string, string> = {
        'instructor_nasir': 'Co-founder & Lead Instructor',
        'instructor_benjamin': 'Co-founder & Fintech Expert',
        'instructor_mudathir': 'Community Lead'
    };
    await setDoc(doc(db, 'instructors', id), { ...data, role: roleMap[id] || 'Instructor' });
  }

  // 2. Seed Blogs (Idempotent)
  for (const post of BLOG_POSTS) {
    const blogId = post.slug;
    await setDoc(doc(db, 'blogPosts', blogId), post);
  }

  // 3. Seed Events (Idempotent)
  for (const event of EVENTS) {
    const eventId = event.title.toLowerCase().replace(/\s+/g, '-');
    await setDoc(doc(db, 'events', eventId), event);
  }

  // 4. Update ALL Courses in DB with random instructors AND FIX CATEGORIES
  const instructorIds = INSTRUCTORS.map(i => i.id);
  const coursesCol = collection(db, 'courses');
  const courseSnapshot = await getDocs(coursesCol);
  
  // Mapping for legacy categories to new valid ones
  const categoryMap: Record<string, string> = {
      'Development': 'Tech Skills',
      'Finance': 'Futures Trading'
  };

  for (const courseDoc of courseSnapshot.docs) {
      const data = courseDoc.data();
      const randomInstructorId = instructorIds[Math.floor(Math.random() * instructorIds.length)];
      const instructorName = INSTRUCTORS.find(i => i.id === randomInstructorId)?.name || 'Nasir';
      
      const newCategory = categoryMap[data.category] || data.category;

      await updateDoc(doc(db, 'courses', courseDoc.id), { 
          instructorId: randomInstructorId,
          instructor: instructorName,
          category: newCategory // Force conversion to valid Zod enum
      });
  }

  // 5. Seed Student Profiles (Idempotent)
  for (const profile of STUDENT_PROFILES) {
      const dummyUid = `student_${profile.email.split('@')[0]}`;
      await setDoc(doc(db, 'studentProgress', dummyUid), {
          ...profile,
          studentId: dummyUid
      });
  }

  console.log('Seeding complete!');
}
