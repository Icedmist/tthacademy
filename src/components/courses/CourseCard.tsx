
'use client';

import type { Course } from "@/lib/types";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { COURSE_CATEGORY_COLORS } from "@/lib/constants";
import { motion } from "framer-motion";
import { Clock, User } from "lucide-react";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
    const categoryColor = COURSE_CATEGORY_COLORS[course.category];
    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    const getLink = () => {
        if (course.progress > 0 && course.progress < 100) {
            // Find first incomplete lesson to continue
            for (let mIdx = 0; mIdx < course.modules.length; mIdx++) {
                for (let lIdx = 0; lIdx < course.modules[mIdx].lessons.length; lIdx++) {
                    if (!(course.modules[mIdx].lessons[lIdx] as any).completed) {
                        return `/learn/${course.id}?module=${mIdx}&lesson=${lIdx}`;
                    }
                }
            }
        }
        // Default to the main course page
        return `/courses/${course.id}`;
    };

    return (
        <motion.div
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            viewport={{ once: true, amount: 0.3 }}
            className="h-full"
        >
            <Card 
                className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 bg-card/60 backdrop-blur-sm border-border/50"
                style={{ '--category-color': categoryColor, borderBottom: `2px solid var(--category-color)` }}
            >
            <CardHeader className="p-4">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <Badge variant="secondary" style={{ backgroundColor: categoryColor, color: 'hsl(var(--primary-foreground))' }} className="text-[10px] py-0.5 px-1.5">{course.category}</Badge>
                    <Badge variant="outline" className="text-[10px] py-0.5 px-1.5">{course.level}</Badge>
                </div>
                <CardTitle className="text-base font-headline leading-snug h-12">{course.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow p-4 pt-0">
                 <div className="text-xs text-muted-foreground space-y-1.5 mb-3">
                    <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 shrink-0"/>
                        <span>{course.duration}</span>
                    </div>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed mb-2 h-24 line-clamp-5">{course.description}</p>
            </CardContent>
            <CardFooter className="p-4 pt-0 mt-auto">
                 {course.progress > 0 && (
                <div className="w-full mb-3">
                    <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-medium text-muted-foreground">Progress</span>
                        <span className="text-xs font-bold text-primary">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-1.5" />
                </div>
                )}
                 <div className="flex justify-between items-center w-full mt-2">
                    <div>
                        <p className="text-xl font-bold text-success">Free</p>
                    </div>
                    <Link href={getLink()}>
                        <Button size="sm" className="text-xs h-8">
                            {course.progress > 0 && course.progress < 100 ? 'Continue' : 'View Details'}
                        </Button>
                    </Link>
                </div>
            </CardFooter>
            </Card>
        </motion.div>
    );
}
