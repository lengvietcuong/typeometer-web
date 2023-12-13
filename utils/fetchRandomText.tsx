export async function fetchRandomText() {
    const response = await fetch('/texts.json');
    const texts = await response.json();

    const randomIndex = Math.floor(Math.random() * texts.length);
    return texts[randomIndex];
};