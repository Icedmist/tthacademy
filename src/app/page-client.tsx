
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function AnimatedHeroText() {
    const animatedWords = ["Learn.", "Trade.", "Dominate."];
    const animatedColors = ["text-primary", "text-secondary", "text-success"];
    const [wordIndex, setWordIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const fullText = animatedWords[wordIndex];
        
        const handleTyping = () => {
            if (isDeleting) {
                // Deleting text
                if (displayedText.length > 0) {
                    setDisplayedText(current => current.substring(0, current.length - 1));
                } else {
                    setIsDeleting(false);
                    setWordIndex((prevIndex) => (prevIndex + 1) % animatedWords.length);
                }
            } else {
                // Typing text
                if (displayedText.length < fullText.length) {
                    setDisplayedText(fullText.substring(0, displayedText.length + 1));
                } else {
                    // Wait for a bit before starting to delete
                    setTimeout(() => setIsDeleting(true), 2000);
                }
            }
        };

        const typingSpeed = isDeleting ? 100 : 150;
        const timer = setTimeout(handleTyping, typingSpeed);

        return () => clearTimeout(timer);
    }, [displayedText, isDeleting, wordIndex, animatedWords]);

    return (
        <span className={`inline-block font-mono ${animatedColors[wordIndex]}`}>
            {displayedText}
            <span className="animate-ping">|</span>
        </span>
    );
}

    