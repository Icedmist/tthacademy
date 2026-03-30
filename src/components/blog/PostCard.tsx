'use client';

import type { PlainBlog } from "@/lib/types";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { User, Calendar, BookOpen } from 'lucide-react';
import { format } from "date-fns";

interface PostCardProps {
  post: PlainBlog;
}

export function PostCard({ post }: PostCardProps) {
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const publishedDate = post.publishedAt ? format(new Date(post.publishedAt), 'PPP') : 'N/A';

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="h-full"
        >
            <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 bg-card/60 backdrop-blur-sm border-border/50">
                <CardHeader className="p-0">
                    <Link href={`/blog/${post.slug}`}>
                        <div className="relative w-full h-48 bg-muted flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-muted-foreground" />
                        </div>
                    </Link>
                </CardHeader>
                <CardContent className="flex-grow p-4">
                    <CardTitle className="text-xl font-headline leading-tight mb-2 h-14">
                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </CardTitle>
                     <div className="text-xs text-muted-foreground space-y-1 mb-4">
                        <div className="flex items-center gap-1.5">
                            <User className="w-3 h-3 shrink-0"/>
                            <span className="truncate">{post.authorName}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 shrink-0"/>
                            <span>{publishedDate}</span>
                        </div>
                    </div>
                    <CardDescription className="text-sm leading-relaxed">
                        {post.content.substring(0, 100)}...
                    </CardDescription>
                </CardContent>
                <CardFooter className="p-4 pt-0 mt-auto">
                    <Link href={`/blog/${post.slug}`} className="w-full">
                        <Button variant="outline" className="w-full">Read More</Button>
                    </Link>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
