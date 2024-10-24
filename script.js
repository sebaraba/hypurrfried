document.addEventListener("DOMContentLoaded", () => {
    const message = "We are cooking sum hypurrfried eggs ...";
    const messageContainer = document.getElementById("animated-message");
    let index = 0;

    function showNextLetter() {
        if (index < message.length) {
            messageContainer.textContent += message[index];
            index++;
        } else {
            messageContainer.textContent = "";
            index = 0;
        }
    }

    setInterval(showNextLetter, 100);
});
