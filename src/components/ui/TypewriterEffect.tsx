'use client';

import React, { useState, useEffect } from 'react';

export function TypewriterEffect({ words }: { words: { text: string }[] }) {
    const [displayedText, setDisplayedText] = useState("");
    const [currWordIndex] = useState(0);

    useEffect(() => {
        const word = words[currWordIndex].text;
        let i = 0;
        const interval = setInterval(() => {
            setDisplayedText(word.substring(0, i + 1));
            i++;
            if (i === word.length) {
                clearInterval(interval);
            }
        }, 50); // Speed

        return () => clearInterval(interval);
    }, [currWordIndex, words]);

    return <span>{displayedText}</span>;
}
