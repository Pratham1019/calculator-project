const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display");

let displayText = "0";

function updateDisplay() {
    display.textContent = displayText;
}

function handleNumberInput(num) {
    if (num === ".") {
        if (!displayText.includes(".")) {
            displayText += ".";
        }
    } else {
        displayText = (displayText === "0") ? num : displayText + num;
    }

    updateDisplay();
}

function clearAll() {
    displayText = "0";
    updateDisplay();
}

function backspace() {
    displayText = (displayText.length > 1) ? displayText.slice(0, -1) : "0";
    updateDisplay();
}

buttons.addEventListener("click", (e) => {
    if (e.target.classList.contains("num")) {
        let num = e.target.dataset.val;
        handleNumberInput(num);
    }

    if (e.target.classList.contains("clear")) {
        clearAll();
    }

    if (e.target.classList.contains("backspace")) {
        backspace();
    }
});

updateDisplay();
