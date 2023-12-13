export const calculateTextBoxWidth = (textToType: string) => {
    const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const charWidth = rootFontSize * 0.781;
    const leftRightPaddings = 2 * 3 * rootFontSize;
    const leftRightBorders = 2 * 1.5;
    const maxPossibleLineWidth = window.innerWidth * 0.6 - leftRightPaddings - leftRightBorders;

    const words = textToType.split(' ');
    let currentLine = '';
    let maxLineWidth = 0;

    words.forEach((word) => {
        currentLine = currentLine ? `${currentLine} ${word}` : word;

        const currentLineWidth = currentLine.length * charWidth;
        if (currentLineWidth > maxPossibleLineWidth) {
            currentLine = word;
        } else {
            maxLineWidth = Math.max(currentLineWidth, maxLineWidth);
        }
    });
    return maxLineWidth + leftRightPaddings + leftRightBorders;
};