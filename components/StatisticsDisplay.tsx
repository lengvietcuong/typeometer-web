const StatisticsDisplay = ({ speed = 0, accuracy = 0 }) => {
    return (
        <div style={{ marginTop: '3.5rem' }}>
            Speed: {speed} WPM
            <br />
            Accuracy: {accuracy}%
        </div>
    );
};

export default StatisticsDisplay;