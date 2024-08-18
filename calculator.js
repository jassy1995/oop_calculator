// Core Calculation Logic
class Calculator {
    constructor() {
        this.currentInput = '0';
        this.operator = null;
        this.previousInput = null;
    }

    handleNumber(value) {
        if (this.currentInput === '0') {
            this.currentInput = value;
        } else if (this.currentInput.endsWith(')')) {
            this.currentInput = this.currentInput.slice(0, -1) + value + ')'; // Remove ')' and insert value before it
        } else {
            this.currentInput += value;
        }
    }

    handleOperator(operator) {
        if (this.operator) {
            this.calculate(); // If there's an existing operator, calculate first
        }
        this.operator = operator;
        this.previousInput = this.currentInput;
        this.currentInput += operator; // Append the operator to the current input

    }

    handleTrigonometricOrLog(functionName) {
        this.operator = functionName;
        this.previousInput = '0'; // Reset previous input to 0
        this.currentInput = functionName + '()'; // Add '(' and ')' to the display
    }

    handleLn() {
        this.operator = 'ln';
        this.previousInput = '0';
        this.currentInput = 'ln()';
    }

    handlePi() {
        this.operator = 'π';
        if (this.currentInput === '0') {
            this.currentInput = 'π';
        } else {
            this.currentInput += 'π';
        }
    }

    handleExponent() {
        this.operator = '^';
        this.previousInput = this.currentInput;
        this.currentInput += '^';
    }

    handleE() {
        this.operator = 'e';
        this.currentInput = 'e';
    }

    handleSquareRoot() {
        this.operator = '√';
        this.previousInput = '0';
        this.currentInput = '√()';
    }

    handlePercentage() {
        this.operator = '%';
        this.currentInput += '%';
    }

    calculate() {
        let result;
        const num1 = parseFloat(this.previousInput);
        const num2 = ['sin', 'cos', 'tan', 'log', 'ln'].includes(this.operator)
            ? parseFloat(this.currentInput.split('(')[1]?.replace(')', '')) :
            ['+', '-', '÷', '×'].includes(this.operator) ? parseFloat(this.currentInput.substring(this.previousInput.length + 1)) :
                this.operator === '^' ? parseFloat(this.currentInput.split('^')[1]) :
                    this.operator === '√' ? parseFloat(this.currentInput.split('√')[1].split('(')[1].replace(')', '')) :
                        this.operator === '%' ? parseFloat(this.currentInput?.split('%')[0]) :
                            this.operator === 'π' ? parseFloat(this.currentInput?.split('π')[0]) :
                                parseFloat(this.previousInput);

        switch (this.operator) {
            case '+':
                result = num1 + num2;
                break;
            case '-':
                result = num1 - num2;
                break;
            case '÷':
                if (parseFloat(num2) === 0) {
                    result = "Error";
                } else {
                    result = num1 / num2;
                }
                break;
            case '×':
                result = num1 * num2;
                break;
            case 'sin':
                result = parseFloat(Math.sin(num2 * Math.PI / 180)).toFixed(4); // Convert to degree
                break;
            case 'cos':
                result = parseFloat(Math.cos(num2 * Math.PI / 180)).toFixed(4); // Convert to degree
                break;
            case 'tan':
                result = parseFloat(Math.tan(num2 * Math.PI / 180)).toFixed(4); // Convert to degree
                break;
            case 'log':
                if (num2 <= 0) {
                    result = "Error";
                } else {
                    result = parseFloat(Math.log10(num2)).toFixed(4);
                }
                break;
            case 'ln':
                if (num2 <= 0) {
                    result = "Error";
                } else {
                    result = parseFloat(Math.log(num2)).toFixed(4);
                }
                break;
            case '^':
                result = Math.pow(num1, num2);
                break;
            case '√':
                result = Math.sqrt(num2);
                break;
            case '%':
                result = num2 / 100;
                break;
            case 'π':
                result = parseFloat(num2 ? Math.PI * num2 : Math.PI).toFixed(4);
                break;
            case 'e':
                result = parseFloat(Math.E).toFixed(4);
                break;
        }

        this.currentInput = result.toString();
        this.operator = null;
        this.previousInput = null;
        return this.currentInput;
    }

    clear() {
        this.currentInput = '0';
        this.operator = null;
        this.previousInput = null;
    }

    delete() {
        if (this.currentInput.length > 1) {
            this.currentInput = this.currentInput.slice(0, -1);
        } else {
            this.currentInput = '0';
        }
    }
}

// UI Handling Logic
class CalculatorUI {
    constructor(calculator) {
        this.calculator = calculator;
        this.display = document.querySelector('.display');
        this.buttons = document.querySelectorAll('.buttons button');
        this.addClickListeners();
    }

    addClickListeners() {
        this.buttons.forEach(button => {
            button.addEventListener('click', () => {
                this.handleClick(button.textContent);
            });
        });
    }

    handleClick(value) {
        switch (value) {
            case '=':
                this.calculator.calculate();
                break;
            case 'AC':
                this.calculator.clear();
                break;
            case 'DEL':
                this.calculator.delete();
                break;
            case '+':
            case '-':
            case '÷':
            case '×':
                this.calculator.handleOperator(value);
                break;
            case 'sin':
            case 'cos':
            case 'tan':
            case 'log':
                this.calculator.handleTrigonometricOrLog(value);
                break;
            case 'ln':
                this.calculator.handleLn();
                break;
            case 'π':
                this.calculator.handlePi();
                break;
            case '^':
                this.calculator.handleExponent();
                break;
            case 'e':
                this.calculator.handleE();
                break;
            case '√':
                this.calculator.handleSquareRoot();
                break;
            case '%':
                this.calculator.handlePercentage();
                break;
            default:
                this.calculator.handleNumber(value);
                break;
        }
        this.updateDisplay();
    }

    updateDisplay() {
        this.display.textContent = this.calculator.currentInput;
    }
}

// Initializing the Calculator
const calculator = new Calculator();
const calculatorUI = new CalculatorUI(calculator);
