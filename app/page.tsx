'use client'

import './globals.css';
import TextBox from '../components/Typing/TextBox';
import TypingLogic from '../components/Typing/TypingLogic';
import StatisticsDisplay from '../components/StatisticsDisplay';
import NextButton from '../components/NextButton';


const TypingArea = () => {
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
    } = TypingLogic();

    if (!textToType || !textBoxWidth) {
        return;
    }
    console.log('render')
    return (
        <div id="typing-area" style={{
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
            {speed && accuracy && <StatisticsDisplay speed={speed} accuracy={accuracy} />}
            {showNextButton && <NextButton onClick={handleNextButtonClick} />}
        </div>
    );
};

export default TypingArea;
