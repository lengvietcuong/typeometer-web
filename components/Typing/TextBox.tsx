import React from 'react';
import { translucentWhite, green, red } from '../../styles/colors';

interface TextBoxProps {
    textToType: string;
    sourceOfText: string;
    textBoxWidth: number;
    currentIndex: number;
    lastCorrectIndex: number;
}

const TextBox: React.FC<TextBoxProps> = ({
    textToType,
    sourceOfText,
    textBoxWidth,
    currentIndex,
    lastCorrectIndex,
}) => {
    return textBoxWidth > 0 && (
        <div style={{ width: textBoxWidth }}>
            <div
                style={{
                    color: green,
                    backgroundColor: translucentWhite,
                    padding: '0.7rem 1.4rem',
                    borderRadius: '8px 8px 0 0',

                }}
            >
                <h1>{sourceOfText}</h1>
            </div>
            <div
                style={{
                    border: `1.5px solid ${translucentWhite}`,
                    borderRadius: '0 0 8px 8px',
                    padding: '2rem 3rem',
                    overflowWrap: 'break-word',
                    textAlign: 'left',
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
        </div>
    );
};

export default TextBox;