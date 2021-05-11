const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const clearButton = document.querySelector('[data-all-clear]');
const currentOperand = document.querySelector('#current-operand');

let currentNum = currentOperand.innerText;
let previousNum;
let operator;

function operate(currentNum, previousNum, operator) {
	let current = parseFloat(currentNum);
	let previous = parseFloat(previousNum);
	let answer;
	if (operator === '÷') {
		answer = previous / current;
	} else if (operator === '×') {
		answer = previous * current;
	} else if (operator === '−') {
		answer = previous - current;
	} else if (operator === '+') {
		answer = previous + current;
	}
	currentOperand.innerText = Math.round(answer * 100) / 100;
}

function populateDisplay(num) {
	if (currentOperand.innerText.length >= 12) {
		return;
	}
	if (currentOperand.innerText !== '0') {
		if (num === '.' && currentOperand.innerText.includes('.')) {
			return;
		} else {
			currentOperand.innerText += num;
		}
	} else {
		if (num === '.') {
			currentOperand.innerText += num;
		} else {
			currentOperand.innerText = num;
		}
	}

	currentNum = currentOperand.innerText;
}

function loadOperator(op) {
	operator = op;
}

function updateDisplay() {
	previousNum = currentOperand.innerText;
	currentOperand.innerText = '0';
	currentNum = currentOperand.innerText;
}

function clear() {
	currentNum = 0;
	currentOperand.innerText = '0';
	previousNum = 0;
	operator = '';
}

numberButtons.forEach(button => {
	button.addEventListener('click', () => {
		populateDisplay(button.innerText);
	});
});

operationButtons.forEach(button => {
	button.addEventListener('click', () => {
		loadOperator(button.innerText);
		updateDisplay();
	});
});

clearButton.addEventListener('click', () => {
	clear();
});

equalsButton.addEventListener('click', () => {
	operate(currentNum, previousNum, operator);
});
