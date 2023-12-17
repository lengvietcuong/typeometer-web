import React from 'react';

interface StatsDisplayProps {
    speed: number,
    accuracy: number
}

const StatsDisplay: React.FC<StatsDisplayProps> = ({
    speed,
    accuracy
}) => {
    return (
        <div style={{ marginTop: '3.5rem' }}>
            Speed: {speed} WPM
            <br />
            Accuracy: {accuracy}%
        </div>
    );
};

export default StatsDisplay;