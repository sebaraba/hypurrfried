const words = ["apple", "grape", "peach", "berry", "melon"];
const targetWord = words[Math.floor(Math.random() * words.length)];
let attempts = 0;
const maxAttempts = 6;
let currentRow = 0;
let currentInputIndex = 0;
let rows = document.querySelectorAll('.game-container div');
let inputs = rows[currentRow].querySelectorAll('input');

function handleKeyPress(letter) {
    if (currentInputIndex < inputs.length) {
        inputs[currentInputIndex].value = letter;
        currentInputIndex++;
    }
}

function handleEnterKey() {
    if (currentInputIndex === inputs.length) {
        const inputWord = Array.from(inputs).map(input => input.value).join('').toLowerCase();
        console.log(inputWord);
        console.log('TARGET WORD:', targetWord);

        if (inputWord === targetWord) {
            console.log('Success! You guessed the word.');
            inputs.forEach(input => input.style.backgroundColor = 'green');
        } else {
            for (let i = 0; i < inputWord.length; i++) {
                if (inputWord[i] === targetWord[i]) {
                    inputs[i].style.backgroundColor = 'green';
                    console.log(`Letter ${inputWord[i]} is correct and in the correct position.`);
                } else if (targetWord.includes(inputWord[i])) {
                    inputs[i].style.backgroundColor = 'yellow';
                    console.log(`Letter ${inputWord[i]} is in the word but in the wrong position.`);
                } else {
                    inputs[i].style.backgroundColor = 'gray';
                    console.log(`Letter ${inputWord[i]} is not in the word.`);
                }
            }
            currentRow++;
            if (currentRow < rows.length) {
                currentInputIndex = 0;
                inputs = rows[currentRow].querySelectorAll('input');
            } else {
                console.log('All rows completed');
            }
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
