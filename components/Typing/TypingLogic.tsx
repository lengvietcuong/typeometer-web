import { useState, useEffect, useRef } from 'react';
import { fetchRandomText } from '../../utils/fetchRandomText';
import { calculateTextBoxWidth } from '../../utils/calculateTextBoxWidth';

const TypingLogic = () => {
    const [textToType, setTextToType] = useState('');
    const [sourceOfText, setSourceOfText] = useState('');
    const [textBoxWidth, setTextBoxWidth] = useState<number>(0);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [lastCorrectIndex, setLastCorrectIndex] = useState<number>(-1);
    const [incorrectEntries, setIncorrectEntries] = useState<number>(0);
    const [speed, setSpeed] = useState<number | null>(null);
    const [accuracy, setAccuracy] = useState<number | null>(null);
    const [showNextButton, setShowNextButton] = useState(false);
    const startTime = useRef<number | null>(null);

    const validChars = /^[a-zA-Z0-9\s!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]$/;

    async function setTextData() {
        const { text, source } = await fetchRandomText();
        setTextToType(text);
        setSourceOfText(source);
    }

    const handleKeyPress = (event: KeyboardEvent) => {
        if (startTime.current === null) {
            startTime.current = Date.now();
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
                calculateStats();
                setShowNextButton(true);
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
        const secondsElapsed = (endTime - startTime.current!) / 1000;
        const totalChars = textToType.length;

        const speed = parseFloat(((totalChars / 5) / (secondsElapsed / 60)).toFixed(2));
        const accuracyValue = parseFloat(((totalChars / (totalChars + incorrectEntries)) * 100).toFixed(2));

        setSpeed(speed);
        setAccuracy(accuracyValue);
    };

    const handleNextButtonClick = () => {
        resetState();
        setTextData();
        setShowNextButton(false);
    };

    const resetState = () => {
        setTextToType('');
        setTextBoxWidth(0);
        setCurrentIndex(0);
        setLastCorrectIndex(-1);
        setSpeed(null);
        setAccuracy(null);
        setIncorrectEntries(0);
        startTime.current = null;
    };

    useEffect(() => {
        setTextData();
    }, []);

    useEffect(() => {
        if (textToType) {
            const width = calculateTextBoxWidth(textToType);
            setTextBoxWidth(width);
        }
    }, [textToType]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, [textToType, currentIndex]);

    return {
        textToType,
        sourceOfText,
        textBoxWidth,
        currentIndex,
        lastCorrectIndex,
        speed,
        accuracy,
        showNextButton,
        handleKeyPress,
        handleNextButtonClick,
        setTextBoxWidth
    };
};

export default TypingLogic;