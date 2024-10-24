const words = ["apple", "grape", "peach", "berry", "melon"];
const targetWord = words[Math.floor(Math.random() * words.length)];
let attempts = 0;
const maxAttempts = 6;
let currentRow = 0;
let currentInputIndex = 0;
let rows = document.querySelectorAll('.game-container .row');
let tiles = rows[currentRow].querySelectorAll('.tile');

function handleKeyPress(letter) {
    if (currentInputIndex < tiles.length) {
        tiles[currentInputIndex].innerText = letter;
        currentInputIndex++;
    }
}

function updateKeyStyle(letter, status) {
    const key = document.querySelector(`.key[data-key="${letter.toUpperCase()}"]`);
    if (key) {
        key.classList.remove('correct', 'present', 'absent');
        key.classList.add(status);
    }
}

function handleEnterKey() {
    if (currentInputIndex === tiles.length) {
        const inputWord = Array.from(tiles).map(tile => tile.innerText).join('').toLowerCase();
        console.log(inputWord);
        console.log('TARGET WORD:', targetWord);

        if (inputWord === targetWord) {
            console.log('Success! You guessed the word.');
            tiles.forEach(tile => {
                tile.style.backgroundColor = 'green';
                updateKeyStyle(tile.innerText, 'correct');
            });
        } else {
            for (let i = 0; i < inputWord.length; i++) {
                if (inputWord[i] === targetWord[i]) {
                    tiles[i].style.backgroundColor = 'green';
                    updateKeyStyle(inputWord[i], 'correct');
                    console.log(`Letter ${inputWord[i]} is correct and in the correct position.`);
                } else if (targetWord.includes(inputWord[i])) {
                    tiles[i].style.backgroundColor = 'yellow';
                    updateKeyStyle(inputWord[i], 'present');
                    console.log(`Letter ${inputWord[i]} is in the word but in the wrong position.`);
                } else {
                    tiles[i].style.backgroundColor = 'gray';
                    updateKeyStyle(inputWord[i], 'absent');
                    console.log(`Letter ${inputWord[i]} is not in the word.`);
                }
            }
            currentRow++;
            if (currentRow < rows.length) {
                currentInputIndex = 0;
                tiles = rows[currentRow].querySelectorAll('.tile');
            } else {
                console.log('All rows completed');
            }
        }
    }
}

function handleDeleteKey() {
    if (currentInputIndex > 0) {
        currentInputIndex--;
        tiles[currentInputIndex].innerText = '';
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
