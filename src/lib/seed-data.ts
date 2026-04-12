import { db } from './firebase';
import { collection, doc, setDoc, getDocs, updateDoc } from 'firebase/firestore';

const INSTRUCTORS = [
  { id: 'instructor_nasir', name: 'Nasir', email: 'nasir@example.com', role: 'Co-founder & Lead Instructor' },
  { id: 'instructor_benjamin', name: 'Benjamin', email: 'benjamin@example.com', role: 'Co-founder & Fintech Expert' },
  { id: 'instructor_mudathir', name: 'Mudathir', email: 'mudathir@example.com', role: 'Community Lead' }
];

export async function seedData() {
  if (!db) return;
  console.log('Force-syncing system data...');
  for (const instructor of INSTRUCTORS) {
    await setDoc(doc(db, 'instructors', instructor.id), instructor);
  }
  console.log('Seeding complete!');
}
