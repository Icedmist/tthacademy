
'use client';

import { useEffect, useState } from 'react';
import QRCode from "react-qr-code";
import { Logo } from '@/components/Logo';

export function SampleCertificate() {
    const [url, setUrl] = useState('');

    useEffect(() => {
        if (typeof window !== "undefined") {
            setUrl(window.location.origin);
        }
    }, []);

    const studentName = "Iced Mist";
    const courseTitle = "Deep Learning and Neural Networks";
    const completionDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const finalScore = 95; // Mockup score

    return (
        <div className="w-full max-w-4xl bg-card/80 backdrop-blur-lg border-4 border-primary/80 aspect-[1.414/1] flex flex-col text-center shadow-2xl rounded-2xl overflow-hidden relative">
            <div 
                className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/20 via-background to-secondary/20 transition-opacity duration-1000"
            />
            <div className="absolute inset-0 w-full h-full bg-grid-slate-900/[0.04] bg-[bottom_1px_left_1px] dark:bg-grid-slate-400/[0.05] dark:bg-bottom-slate-400/10" />

            <div className="relative z-10 flex flex-col h-full p-8 text-foreground">
                <div className="flex justify-between items-start mb-4">
                    <div className="text-foreground">
                        <Logo />
                    </div>
                    <div className="text-right text-foreground">
                        <p className="font-semibold">TechTradeHub Academy</p>
                        <p className="text-xs text-muted-foreground">Master the Future</p>
                    </div>
                </div>
                
                <div className="flex-grow flex flex-col justify-center">
                  <p className="font-serif text-3xl md:text-5xl font-bold text-primary mb-2">Certificate of Completion</p>
                  <p className="text-muted-foreground mb-6">This certifies that</p>
                  <p className="font-serif text-4xl md:text-6xl font-bold mb-6">{studentName}</p>
                  <p className="text-muted-foreground mb-4">has successfully completed the course</p>
                  <p className="font-headline text-2xl md:text-3xl font-bold mb-8">{courseTitle}</p>
                </div>

                <div className="flex justify-between items-end">
                    <div className="text-left">
                        <p className="font-bold border-b border-foreground pb-1">{completionDate}</p>
                        <p className="text-xs text-muted-foreground mt-1">Date</p>
                    </div>

                    <div className="flex items-end gap-4">
                        {url ? (
                          <div className="bg-white p-1 rounded-md">
                            <QRCode value={url} size={80} level="L" />
                          </div>
                        ) : (
                          <div className="w-[88px] h-[88px] bg-muted/20 rounded-md animate-pulse" />
                        )}
                        <div className="text-left text-xs text-muted-foreground">
                            <p>Course ID: TTH-AI-009</p>
                            <p>Final Score: {finalScore}%</p>
                            <p className="truncate max-w-[150px]">Verify at: {url}</p>
                        </div>
                    </div>

                    <div className="text-left">
                        <p className="font-serif text-lg font-bold border-b border-foreground pb-1">Dr. Anya Sharma</p>
                        <p className="text-xs text-muted-foreground mt-1">Head Instructor</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

    