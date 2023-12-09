import React, { useState, useEffect } from 'react';
import { green, red, translucent_white } from '../styles/colors';

interface TypingAreaProps {
    textToType: string;
    onTypingComplete: () => void;
    resetRef: React.MutableRefObject<() => void>;
}

const TypingArea: React.FC<TypingAreaProps> = ({ textToType, onTypingComplete = () => { }, resetRef }) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [lastCorrectIndex, setLastCorrectIndex] = useState<number>(-1);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [typingSpeed, setTypingSpeed] = useState<number | null>(null);
    const [accuracy, setAccuracy] = useState<number | null>(null);
    const [incorrectEntries, setIncorrectEntries] = useState<number>(0);

    const validChars = /^[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]$/

    const resetState = () => {
        setCurrentIndex(0);
        setLastCorrectIndex(-1);
        setStartTime(null);
        setTypingSpeed(null);
        setAccuracy(null);
        setIncorrectEntries(0);
    };

    useEffect(() => {
        resetRef.current = resetState;
    }, []);

    useEffect(() => {
        const handleKeyPress = (event: KeyboardEvent) => {
            if (startTime === null) {
                setStartTime(Date.now());
            }
            const typedChar = event.key;
            const isValidInput = validChars.test(typedChar);
            if (isValidInput) {
                handleValidInput(typedChar);
            } else if (typedChar === 'Backspace' && currentIndex > 0) {
                handleBackspace();
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [textToType, currentIndex, lastCorrectIndex, startTime, resetRef]);

    const handleValidInput = (typedChar: string) => {
        if (currentIndex === textToType.length) {
            return;
        }
        setCurrentIndex((prevIndex) => prevIndex + 1);

        const expectedChar = textToType[currentIndex];
        if (lastCorrectIndex === currentIndex - 1 && typedChar === expectedChar) {
            setLastCorrectIndex((prevIndex) => prevIndex + 1);
            if (currentIndex === textToType.length - 1) {
                onTypingComplete();
                calculateStats();
            }
        } else {
            setIncorrectEntries((prevCount) => prevCount + 1);
        }
    };

    const handleBackspace = () => {
        const newCurrentIndex = Math.max(currentIndex - 1, 0);
        setCurrentIndex(newCurrentIndex);
        setLastCorrectIndex((prevIndex) => Math.min(prevIndex, newCurrentIndex - 1));
    };

    const calculateStats = () => {
        const endTime = Date.now();
        const secondsElapsed = (endTime - startTime!) / 1000;
        const totalChars = textToType.length;

        const speed = parseFloat(((totalChars / 5) / (secondsElapsed / 60)).toFixed(2));
        const accuracyValue = parseFloat(((totalChars / (totalChars + incorrectEntries)) * 100).toFixed(2));

        setTypingSpeed(speed);
        setAccuracy(accuracyValue);
    };

    const renderTextColor = () => {
        return (
            <div id="typing-area" style={{ color: 'white', fontFamily: 'Courier', textAlign: 'center' }}>
                <div style={{ maxWidth: '800px', margin: 'auto', border: `1.5px solid ${translucent_white}`, borderRadius: '0 0 8px 8px', padding: '20px 32px', overflowWrap: 'break-word', textAlign: 'left', fontSize: '1.3em' }}>
                    {textToType.split('').map((char, index) => {
                        const isHighlighted = index < currentIndex;
                        const isCorrect = index <= lastCorrectIndex;
                        const style: React.CSSProperties = {
                            color: isCorrect ? green : red,
                            backgroundColor: char === ' ' && !isCorrect ? red : 'transparent',
                        };

                        return (
                            <span key={index} style={isHighlighted ? style : {}}>
                                {char}
                            </span>
                        );
                    })}
                </div>
                {startTime && typingSpeed !== null && accuracy !== null && (
                    <div style={{ marginTop: '40px', fontSize: '1.3em', color: 'white' }}>
                        Speed: {typingSpeed} WPM
                        <br />
                        Accuracy: {accuracy}%
                    </div>
                )}
            </div>
        );
    };

    return renderTextColor();
};

export default TypingArea;
