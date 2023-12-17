'use client'

import React from 'react';
import './globals.css';
import { courier } from '../styles/courier';
import TextBox from '../components/Typing/TextBox';
import TypingLogic from '../components/Typing/TypingLogic';
import StatsDisplay from '../components/StatsDisplay';
import StatsGraphLink from '../components/StatsGraphLink';
import NextButton from '../components/NextButton';

const TypingArea: React.FC = () => {
    const {
        textToType,
        sourceOfText,
        textBoxWidth,
        currentIndex,
        lastCorrectIndex,
        speed,
        accuracy,
        showNextButton,
        handleNextButtonClick,
        showStatsGraphLink,
    } = TypingLogic();

    if (!textToType || !textBoxWidth) {
        return;
    }
    return (
        <main className={courier.className} id="typing-area" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            fontSize: '1.3rem'
        }}>
            <TextBox
                textToType={textToType}
                sourceOfText={sourceOfText}
                textBoxWidth={textBoxWidth}
                currentIndex={currentIndex}
                lastCorrectIndex={lastCorrectIndex}
            />
            {speed && accuracy && <StatsDisplay speed={speed} accuracy={accuracy} />}
            {showStatsGraphLink && <StatsGraphLink />}
            {showNextButton && <NextButton onClick={handleNextButtonClick} />}
        </main>
    );
};

export default TypingArea;
