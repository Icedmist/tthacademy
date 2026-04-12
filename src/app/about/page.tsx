
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Lightbulb, Users } from 'lucide-react';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import type { TeamMember } from '@/lib/types';
import { TeamMemberSchema } from '@/lib/types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

async function getTeamMembers(): Promise<TeamMember[]> {
  try {
    const teamCollection = collection(db, 'team');
    const q = query(teamCollection, orderBy('name', 'asc'));
    const teamSnapshot = await getDocs(q);
    const teamList = teamSnapshot.docs.map(d => TeamMemberSchema.parse({ id: d.id, ...d.data() }));
    return teamList;
  } catch (error) {
    console.error("Failed to fetch team members for about page", error);
    return [];
  }
}

export default async function AboutUsPage() {

  const teamMembers = await getTeamMembers();

  return (
    <div className="container mx-auto py-12 px-4">
      <Card className="bg-card/60 backdrop-blur-sm border-border/50">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl md:text-4xl font-headline font-bold">About TechTradeHub Academy</CardTitle>
          <CardDescription className="max-w-2xl mx-auto">
            Our mission is to empower the next generation of innovators, traders, and technologists with accessible, high-quality education.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-16 mt-8">
            <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-2xl font-headline font-semibold mb-4 text-primary">Our Story</h2>
                <p className="text-muted-foreground">
                    Founded with a vision to democratize elite tech and financial education, TechTradeHub Academy was born from a desire to bridge the skills gap in a rapidly evolving digital world. We believe that knowledge in cutting-edge fields like AI, Web3, and advanced trading should be accessible to everyone, everywhere. Our journey is one of passion for technology and a commitment to empowering individuals to master their future.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-center">
                <div className="flex flex-col items-center">
                    <Target className="w-12 h-12 text-secondary mb-4" />
                    <h3 className="text-xl font-headline font-semibold mb-2">Our Mission</h3>
                    <p className="text-muted-foreground">
                        To provide practical, affordable, and high-quality education in high-demand technology and finance sectors, enabling our students to achieve their career goals and drive innovation.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <Lightbulb className="w-12 h-12 text-success mb-4" />
                    <h3 className="text-xl font-headline font-semibold mb-2">Our Vision</h3>
                    <p className="text-muted-foreground">
                        To be the leading global platform for practical, cutting-edge skills, creating a community of lifelong learners who are prepared to shape the future of technology and finance.
                    </p>
                </div>
            </div>
        </CardContent>
      </Card>

      {teamMembers.length > 0 && (
         <section id="team" className="w-full py-16 md:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-center mb-12">
              Meet the Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member) => (
                  <Card key={member.id} className="bg-card/60 backdrop-blur-sm border-border/50 h-full text-center">
                    <CardHeader className="items-center pb-4">
                        <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                          <AvatarImage src={member.avatarUrl} alt={member.name} />
                          <AvatarFallback><Users /></AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-xl">{member.name}</CardTitle>
                        <CardDescription className="text-primary font-medium">{member.role}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-sm">{member.bio}</p>
                    </CardContent>
                    <CardFooter className="justify-center gap-2">
                        {member.socials?.twitter && (
                           <Link href={member.socials.twitter} target="_blank">
                             <Button variant="outline" size="icon"><Twitter className="w-4 h-4" /></Button>
                           </Link>
                        )}
                         {member.socials?.linkedin && (
                           <Link href={member.socials.linkedin} target="_blank">
                             <Button variant="outline" size="icon"><Linkedin className="w-4 h-4" /></Button>
                           </Link>
                        )}
                    </CardFooter>
                  </Card>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
