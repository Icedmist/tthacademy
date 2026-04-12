
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Award, Bot, Library, Newspaper, User, CalendarDays, ArrowRight, ShieldCheck, Zap, Users, Target, BookHeart, Briefcase } from 'lucide-react';
import Link from 'next/link';
import type { Course, PlainBlog, PlainEvent, TeamMember } from '@/lib/types';
import { CourseCard } from '@/components/courses/CourseCard';
import { PostCard } from '@/components/blog/PostCard';
import { EventCard } from '@/components/events/EventCard';
import { AnimatedHeroText } from './page-client';
import { motion } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { SampleCertificate } from '@/components/home/SampleCertificate';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

const testimonials = [
    {
        name: "Adebayo Adekunle",
        role: "Student",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
        quote: "The Futures Trading course was a game-changer for me. The practical strategies and risk management lessons were invaluable. I finally feel confident in my trading decisions."
    },
    {
        name: "Fatima Yusuf",
        role: "Student",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026705d",
        quote: "I came in knowing nothing about Web3, and now I'm building my own smart contracts. The instructors are amazing and the community is so supportive."
    },
    {
        name: "David Chen",
        role: "Student",
        avatar: "https://i.pravatar.cc/150?u=a042581f4e29026706d",
        quote: "TechTradeHub made learning complex AI concepts accessible and fun. The hands-on projects helped solidify my understanding and build a strong portfolio."
    }
];

export default function HomePageClient({ courses, posts, events, teamMembers }: { courses: Course[], posts: PlainBlog[], events: PlainEvent[], teamMembers: TeamMember[] }) {
    return (
        <div className="flex flex-col items-center text-foreground">
        {/* Hero Section */}
        <section className="w-full text-center py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-5xl font-headline font-bold mb-4"
            >
              Master the Future –{' '}
              <AnimatedHeroText />
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-md md:text-lg text-muted-foreground max-w-3xl mx-auto mb-8"
            >
              Unlock your potential with expert-led courses in the most in-demand fields of technology and finance. All courses are now free.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link href="/courses">
                <Button size="lg" variant="default">Explore Courses</Button>
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* About Us Section */}
        <section id="about" className="w-full py-16 md:py-20 bg-card/50 backdrop-blur-lg">
            <div className="container mx-auto px-4">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                         <div className="p-3 rounded-full bg-primary/10 w-fit mb-4">
                            <Target className="w-6 h-6 text-primary" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">
                            About TechTradeHub Academy
                        </h2>
                        <p className="text-muted-foreground mb-6">
                            Founded with a vision to democratize elite tech and financial education, TechTradeHub Academy was born from a desire to bridge the skills gap in a rapidly evolving digital world. We believe that knowledge in cutting-edge fields like AI, Web3, and advanced trading should be accessible to everyone, everywhere.
                        </p>
                        <p className="text-muted-foreground mb-8">
                            Our mission is to provide practical, affordable, and high-quality education in high-demand technology and finance sectors, enabling our students to achieve their career goals and drive innovation.
                        </p>
                        <Link href="/about">
                            <Button variant="outline">
                                Learn More About Us <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        </Link>
                    </div>
                    <div className="w-full h-72 bg-muted rounded-lg flex items-center justify-center">
                        <Library className="w-20 h-20 text-muted-foreground" />
                    </div>
                </div>
            </div>
        </section>

        {/* Why Choose Us Section */}
        <section id="features" className="w-full py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-center mb-12">
              Why Choose TechTradeHub?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Column 1 */}
                <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.1 }} className="space-y-12">
                    <div className="flex gap-6">
                        <div className="p-3 rounded-full bg-primary/10 h-fit">
                            <ShieldCheck className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Expert-Led Content</h3>
                            <p className="text-sm text-muted-foreground">Learn from industry professionals with real-world experience in trading, development, and AI.</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="p-3 rounded-full bg-success/10 h-fit">
                            <Zap className="w-6 h-6 text-success" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Practical, Hands-On Learning</h3>
                            <p className="text-sm text-muted-foreground">Our curriculum is project-based, ensuring you gain practical skills you can apply immediately.</p>
                        </div>
                    </div>
                </motion.div>
                {/* Column 2 */}
                <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.2 }} className="space-y-12">
                    <div className="flex gap-6">
                        <div className="p-3 rounded-full bg-secondary/10 h-fit">
                            <Users className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Vibrant Community</h3>
                            <p className="text-sm text-muted-foreground">Connect with fellow learners, share ideas, and grow together in our active community channels.</p>
                        </div>
                    </div>
                    <Dialog>
                        <DialogTrigger asChild>
                            <div className="flex gap-6 cursor-pointer group">
                                <div className="p-3 rounded-full bg-rose-500/10 h-fit">
                                    <Award className="w-6 h-6 text-rose-500" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">Verifiable Certificates</h3>
                                    <p className="text-sm text-muted-foreground">Receive a verifiable certificate upon course completion to showcase your skills.</p>
                                </div>
                            </div>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl p-0 border-0">
                            <SampleCertificate />
                        </DialogContent>
                    </Dialog>
                </motion.div>
                {/* Column 3 */}
                <motion.div variants={cardVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} transition={{ delay: 0.3 }} className="space-y-12">
                    <div className="flex gap-6">
                        <div className="p-3 rounded-full bg-purple-500/10 h-fit">
                            <BookHeart className="w-6 h-6 text-purple-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Community Access</h3>
                            <p className="text-sm text-muted-foreground">Join our exclusive WhatsApp and Telegram groups to network with peers and instructors.</p>
                        </div>
                    </div>
                    <div className="flex gap-6">
                        <div className="p-3 rounded-full bg-orange-500/10 h-fit">
                            <Briefcase className="w-6 h-6 text-orange-500" />
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Career-Focused</h3>
                            <p className="text-sm text-muted-foreground">Gain verifiable certificates and skills that are directly applicable to high-demand jobs.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
          </div>
        </section>

        {/* Featured Courses Section */}
        <section id="courses" className="w-full py-16 md:py-20 bg-card/50">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-center mb-4">
              Explore Our Top Courses
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
              Hand-picked courses to help you get started on your learning journey, no matter your skill level.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {courses.map((course) => <CourseCard key={course.id} course={course} />)}
            </div>
             <div className="text-center mt-12">
                <Link href="/courses">
                    <Button variant="outline">
                        View All Courses <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
          </div>
        </section>
        
        {/* Meet the Team Section */}
        <section id="team" className="w-full py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-headline font-bold text-center mb-12">
              Meet the Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={member.id}
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="bg-card/80 backdrop-blur-sm border-border/50 h-full text-center">
                    <CardHeader className="items-center">
                        <Avatar className="w-24 h-24 mb-4 border-4 border-primary">
                          <AvatarImage src={member.avatarUrl} alt={member.name} />
                          <AvatarFallback><User /></AvatarFallback>
                        </Avatar>
                        <CardTitle className="text-xl">{member.name}</CardTitle>
                        <p className="text-sm text-primary">{member.role}</p>
                    </CardHeader>
                  </Card>
                </motion.div>
              ))}
            </div>
             <div className="text-center mt-12">
                <Link href="/about">
                    <Button variant="outline">
                        Learn More About Our Team <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-16 md:py-20 bg-card/50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-headline font-bold text-center mb-4">What Our Students Say</h2>
                <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
                    Real stories from learners who have transformed their careers with us.
                </p>
                <Carousel
                    opts={{
                        align: "start",
                        loop: true,
                    }}
                    className="w-full"
                >
                    <CarouselContent>
                        {testimonials.map((testimonial, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                <div className="p-1 h-full">
                                    <Card className="bg-card/50 h-full flex flex-col">
                                        <CardContent className="p-6 flex-grow flex flex-col justify-center">
                                            <p className="text-muted-foreground italic mb-6">"{testimonial.quote}"</p>
                                            <div className="flex items-center">
                                                <Avatar className="h-10 w-10 mr-4">
                                                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} data-ai-hint="person" />
                                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-semibold">{testimonial.name}</p>
                                                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
        </section>
  
        {/* Dynamic Content Section */}
        <section className="w-full py-16 md:py-20 bg-background">
            <div className="container mx-auto px-4">
                 <div className="grid lg:grid-cols-2 gap-12">
                    {/* Upcoming Events */}
                    <div>
                        <h2 className="text-2xl font-headline font-bold mb-2 flex items-center gap-2"><CalendarDays className="w-7 h-7 text-primary" /> Upcoming Events</h2>
                        <p className="text-muted-foreground mb-8">Join our live events to learn from experts and connect with the community.</p>
                        <div className="space-y-4">
                            {events.length > 0 ? (
                                events.map(event => <EventCard key={event.id} event={event} />)
                            ) : (
                                <p className="text-muted-foreground">No upcoming events scheduled. Please check back soon!</p>
                            )}
                        </div>
                        <div className="text-left mt-8">
                            <Link href="/events">
                                <Button variant="outline">
                                    View All Events <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                    {/* Latest Blog Posts */}
                     <div>
                        <h2 className="text-2xl font-headline font-bold mb-2 flex items-center gap-2"><Newspaper className="w-7 h-7 text-primary" /> From The Blog</h2>
                        <p className="text-muted-foreground mb-8">Get the latest insights, tips, and academy news from our team.</p>
                        <div className="space-y-4">
                             {posts.length > 0 ? (
                                posts.map(post => <PostCard key={post.id} post={post} />)
                            ) : (
                                <p className="text-muted-foreground">No blog posts available yet.</p>
                            )}
                        </div>
                         <div className="text-left mt-8">
                            <Link href="/blog">
                                <Button variant="outline">
                                    Read All Articles <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                 </div>
            </div>
        </section>

        {/* Final CTA Section */}
        <section className="w-full text-center py-20 md:py-24 bg-card/50">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">Ready to Start Learning?</h2>
              <p className="text-md text-muted-foreground max-w-2xl mx-auto mb-8">
                Join thousands of students and professionals who are leveling up their skills with TechTradeHub Academy.
              </p>
              <Link href="/signup">
                <Button size="lg" variant="secondary">
                  Sign Up Now for Free
                </Button>
              </Link>
            </div>
        </section>
      </div>
    );
}
