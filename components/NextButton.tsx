import React, { MouseEventHandler } from 'react';
import { green } from '../styles/colors';

interface NextButtonProps {
    onClick: MouseEventHandler<HTMLButtonElement>;
}

const NextButton: React.FC<NextButtonProps> = ({ onClick }) => {
    return (
        <button
            style={{
                marginTop: '1.3rem',
                backgroundColor: green,
                color: 'black',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                border: 'none',
            }}
            onClick={onClick}
        >
            Next
        </button>
    );
};

export default NextButton;
