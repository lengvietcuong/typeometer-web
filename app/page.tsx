'use client'

import React, { useState, useEffect, useRef } from 'react';
import TypingArea from '../components/TypingArea';
import { darkGray, green } from '../styles/colors';
import './globals.css';

const TypingTest: React.FC = () => {
    const typingAreaRef = useRef<any>();
    const [textToType, setTextToType] = useState('');
    const [sourceOfText, setSourceOfText] = useState('');
    const [showNextButton, setShowNextButton] = useState(false);

    const fetchRandomText = async () => {
        try {
            const response = await fetch('/texts.json');
            const texts = await response.json();

            const randomIndex = Math.floor(Math.random() * texts.length);
            const { text: randomText, source } = texts[randomIndex];

            setTextToType(randomText);
            setSourceOfText(source);
            setShowNextButton(false);
        } catch (error) {
            console.error('Error fetching or parsing texts.json:', error);
        }
    };

    useEffect(() => {
        fetchRandomText();
    }, []);

    const handleNextButtonClick = () => {
        setTextToType('');
        typingAreaRef.current?.(); // Call resetState using the ref
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
            <TypingArea
                textToType={textToType}
                sourceOfText={sourceOfText}
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