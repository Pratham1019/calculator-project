const buttons = document.querySelector(".buttons");
const display = document.querySelector(".display");

let displayText = "0";
let firstNum;
let secondNum;
let operator = "";
let operatorMode = false;
let lastPressedEquals = false;

function updateDisplay() {
    display.textContent = displayText;
}

function handleNumberInput(num) {
    if (operatorMode || lastPressedEquals) {
        displayText = "";
        operatorMode = false;
        lastPressedEquals = false;
    }

    if (num === ".") {
        if (!displayText.includes(".")) {
            displayText += ".";
        }
    } else {
        displayText = (displayText === "0") ? num : displayText + num;
    }

    updateDisplay();
}

function propertiesReset() {
    firstNum = null;
    secondNum = null;
    operator = "";
}

function clearAll() {
    operatorMode = false;
    displayText = "0";
    propertiesReset();
    updateDisplay();
}

function backspace() {
    operatorMode = false;
    displayText = (displayText.length > 1) ? displayText.slice(0, -1) : "0";
    updateDisplay();
}

function printOperator(operator) {
    switch (operator) {
        case "divide":
            return "÷";
        case "multiply":
            return "×";
        case "subtract":
            return "−";
        case "add":
            return "+";
        default:
            return "";
    }
}

function handleOperatorInput(op) {
    if (operatorMode) {
        // Just change the operator (no operation happens yet)
        operator = op;
        return;
    }

    if (firstNum === null) {
        firstNum = parseFloat(displayText);
    } else if (!lastPressedEquals) {
        // Only operate if we’re not coming from =
        secondNum = parseFloat(displayText);
        operate(firstNum, secondNum, operator);
        firstNum = parseFloat(displayText); // Result becomes new firstNum
    }

    operator = op;
    operatorMode = true;
    lastPressedEquals = false;
}

function operate(num1, num2, op) {
    let result;
    switch (op) {
        case "add":
            result = num1 + num2;
            break;
        case "subtract":
            result = num1 - num2;
            break;
        case "multiply":
            result = num1 * num2;
            break;
        case "divide":
            result = num2 !== 0 ? num1 / num2 : "Error";
            break;
        default:
            result = null;
    }

    displayText = result.toString();
    firstNum = result === "Error" ? null : result;
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

    if (e.target.classList.contains("op")) {
        let op = e.target.dataset.action;
        handleOperatorInput(op)
    }

    if (e.target.classList.contains("equals")) {
        if (firstNum !== null && operator !== "") {
            secondNum = parseFloat(displayText);
            operate(firstNum, secondNum, operator);
            operator = ""; // reset operator
        }

        lastPressedEquals = true;
    }
});

updateDisplay();
