const words = ["apple", "grape", "peach", "berry", "melon"];
const targetWord = words[Math.floor(Math.random() * words.length)];
let attempts = 0;
const maxAttempts = 6;
let currentRow = 0;
let currentInputIndex = 0;
const rows = document.querySelectorAll('.game-container div');
const inputs = rows[currentRow].querySelectorAll('input');

function handleKeyPress(letter) {
    if (currentInputIndex < inputs.length) {
        inputs[currentInputIndex].value = letter;
        currentInputIndex++;
    }
}

function handleEnterKey() {
    if (currentInputIndex === inputs.length) {
        // Validate the current row
        console.log('Row validated');
        currentRow++;
        if (currentRow < rows.length) {
            currentInputIndex++;
            // inputs = rows[currentRow].querySelectorAll('input');
        } else {
            console.log('All rows completed');
        }
    }
}

function handleDeleteKey() {
    if (currentInputIndex > 0) {
        currentInputIndex--;
        inputs[currentInputIndex].value = '';
    }
}

const keys = document.querySelectorAll('.key');
keys.forEach(key => {
    key.addEventListener('click', () => {
        const letter = key.innerText;
        handleKeyPress(letter);
    });
});

document.addEventListener('keydown', (event) => {
    const letter = event.key.toUpperCase();
    if (event.key === 'Enter') {
        handleEnterKey();
    } else if (event.key === 'Backspace') {
        handleDeleteKey();
    } else if (letter >= 'A' && letter <= 'Z') {
        handleKeyPress(letter);
    }
});
