'use client'

import React, { useState, useEffect, useRef } from 'react';
import TypingArea from '../components/TypingArea';
import { darkGray, green, translucentWhite } from '../styles/colors';
import "./globals.css"

const TypingTest: React.FC = () => {
    const typingAreaRef = useRef<any>();
    const [textToType, setTextToType] = useState('');
    const [sourceOfText, setSourceOfText] = useState('');
    const [showNextButton, setShowNextButton] = useState(false);
    const [textBoxWidth, setTextBoxWidth] = useState<number | null>(null);

    const fetchRandomText = async () => {
        try {
            const response = await fetch('/texts.json');
            const texts = await response.json();

            const randomIndex = Math.floor(Math.random() * texts.length);
            const randomText = texts[randomIndex].text;
            const sourceOfText = texts[randomIndex].source;

            setTextToType(randomText);
            setSourceOfText(sourceOfText);
            setShowNextButton(false);
        } catch (error) {
            console.error('Error fetching or parsing texts.json:', error);
        }
    };

    useEffect(() => {
        fetchRandomText();
    }, []);

    useEffect(() => {
        // Calculate the width of the text box and set it to state
        const textBoxElement = document.getElementById('typing-area');
        if (textBoxElement) {
            const width = textBoxElement.offsetWidth;
            setTextBoxWidth(width);
        }
    }, [textToType]);

    const handleNextButtonClick = () => {
        typingAreaRef.current(); // Call resetState using the ref
        fetchRandomText();
        setShowNextButton(false);
    };

    const handleTypingComplete = () => {
        setShowNextButton(true);
    };

    return (
        <div
            style={{
                backgroundColor: darkGray,
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <div
                style={{
                    backgroundColor: translucentWhite,
                    padding: '0.7rem',
                    borderRadius: '8px 8px 0 0',
                    width: textBoxWidth ? textBoxWidth : 'fit-content',
                }}
            >
                <h1 style={{ textAlign: 'center', color: green, fontSize: '1.3em' }}>
                    {sourceOfText}
                </h1>
            </div>
            <TypingArea
                textToType={textToType}
                onTypingComplete={handleTypingComplete}
                resetRef={typingAreaRef}
            />
            {showNextButton && (
                <button
                    style={{
                        marginTop: '1.3rem',
                        backgroundColor: green,
                        color: 'black',
                        padding: '0.5rem 1rem',
                        borderRadius: '4px',
                        border: 'none',
                    }}
                    onClick={handleNextButtonClick}
                >
                    Next
                </button>
            )}
        </div>
    );
};

export default TypingTest;