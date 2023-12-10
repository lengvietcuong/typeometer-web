import React, { useState, useEffect } from 'react';
import { green, red, translucentWhite } from '../styles/colors';

interface TypingAreaProps {
    textToType: string;
    sourceOfText: string;
    onTypingComplete: () => void;
    resetRef: React.MutableRefObject<() => void>;
}

const TypingArea: React.FC<TypingAreaProps> = ({
    textToType,
    sourceOfText,
    onTypingComplete = () => { },
    resetRef,
}) => {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [lastCorrectIndex, setLastCorrectIndex] = useState<number>(-1);
    const [startTime, setStartTime] = useState<number | null>(null);
    const [typingSpeed, setTypingSpeed] = useState<number | null>(null);
    const [accuracy, setAccuracy] = useState<number | null>(null);
    const [incorrectEntries, setIncorrectEntries] = useState<number>(0);
    const [maxWidth, setMaxWidth] = useState<number>(0);

    const validChars = /^[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]$/;

    const calculateMaxLineWidth = () => {
        const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const leftRightPaddings = 2 * 3 * rootFontSize;
        const leftRightBorders = 2 * 1.5;
        const maxPossibleLineWidth = window.innerWidth * 0.6 - leftRightPaddings - leftRightBorders;

        const words = textToType.split(' ');
        let currentLine = '';
        let maxLineWidth = 0;

        const tempElement = document.createElement('div');
        tempElement.style.font = '1.3em Courier';
        tempElement.style.width = 'fit-content';

        words.forEach((word) => {
            currentLine = currentLine ? `${currentLine} ${word}` : word;
            tempElement.innerText = currentLine;
            document.body.appendChild(tempElement);

            const currentLineWidth = tempElement.getBoundingClientRect().width;
            if (currentLineWidth > maxPossibleLineWidth) {
                currentLine = word;
            } else {
                maxLineWidth = Math.max(currentLineWidth, maxLineWidth);
            }
            document.body.removeChild(tempElement);
        });
        setMaxWidth(maxLineWidth + leftRightBorders + leftRightPaddings);
    };

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
        calculateMaxLineWidth();
    }, [textToType]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [textToType, currentIndex, lastCorrectIndex, startTime]);

    const renderText = () => {
        return (
            <div id="typing-area" style={{ textAlign: 'center' }}>
                <div
                    style={{
                        width: maxWidth,
                        backgroundColor: translucentWhite,
                        padding: '0.7rem 1.4rem',
                        borderRadius: '8px 8px 0 0',
                    }}
                >
                    <h1 style={{ color: green, fontSize: '1.3em' }}>{sourceOfText}</h1>
                </div>
                <div
                    style={{
                        maxWidth: maxWidth,
                        border: `1.5px solid ${translucentWhite}`,
                        borderRadius: '0 0 8px 8px',
                        padding: '2rem 3rem',
                        overflowWrap: 'break-word',
                        textAlign: 'left',
                        fontSize: '1.3em',
                    }}
                >
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
                    <div style={{ marginTop: '3.5rem', fontSize: '1.3em' }}>
                        Speed: {typingSpeed} WPM
                        <br />
                        Accuracy: {accuracy}%
                    </div>
                )}
            </div>
        );
    };

    return renderText();
};

export default TypingArea;
