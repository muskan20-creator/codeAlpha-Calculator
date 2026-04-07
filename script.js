const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if ((value >= '0' && value <= '9') || (value === '.' && !currentInput.includes('.'))) {
            currentInput += value;
            display.value = currentInput;
        } else if (value === 'AC') {
            currentInput = '';
            operator = '';
            previousInput = '';
            display.value = '';
        } else if (value === 'DC') {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput;
        } else if (value === '=') {
            if (previousInput && operator && currentInput) {
                const result = calculate(previousInput, currentInput, operator);
                display.value = result;
                currentInput = result.toString();
                operator = '';
                previousInput = '';
            }
        } else {
            // Operator
            if (currentInput) {
                if (previousInput && operator) {
                    const result = calculate(previousInput, currentInput, operator);
                    display.value = result;
                    previousInput = result.toString();
                } else {
                    previousInput = currentInput;
                }
                currentInput = '';
                operator = value;
            }
        }
    });
});

function calculate(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return b !== 0 ? a / b : 'Error';
        case '%': return a % b;
        default: return 0;
    }
}

// Keyboard support
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if ((key >= '0' && key <= '9') || (key === '.' && !currentInput.includes('.'))) {
        currentInput += key;
        display.value = currentInput;
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        if (currentInput) {
            if (previousInput && operator) {
                const result = calculate(previousInput, currentInput, operator);
                display.value = result;
                previousInput = result.toString();
            } else {
                previousInput = currentInput;
            }
            currentInput = '';
            operator = key;
        }
    } else if (key === 'Enter' || key === '=') {
        if (previousInput && operator && currentInput) {
            const result = calculate(previousInput, currentInput, operator);
            display.value = result;
            currentInput = result.toString();
            operator = '';
            previousInput = '';
        }
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        currentInput = '';
        operator = '';
        previousInput = '';
        display.value = '';
    } else if (key === 'Backspace') {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput;
    }
});

// Add classes for styling
buttons.forEach(button => {
    if (button.textContent === '+' || button.textContent === '-' || button.textContent === '*' || button.textContent === '/' || button.textContent === '%') {
        button.classList.add('operator');
    } else if (button.textContent === 'AC' || button.textContent === 'DC') {
        button.classList.add('clear');
    } else if (button.textContent === '=') {
        button.classList.add('equals');
    }
});