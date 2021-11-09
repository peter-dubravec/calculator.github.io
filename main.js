function add(num1, num2) {
  return parseFloat(num1 + num2);
}

function subtract(num1, num2) {
  return parseFloat(num1 - num2);
}

function multiply(num1, num2) {
  return parseFloat(num1 * num2);
}

function divide(num1, num2) {
  if (num2 == 0) {
    return "Lmao";
  }
  return parseFloat(num1 / num2);
}

function toFixedIfNecessary(value, dp) {
  return +parseFloat(value).toFixed(dp);
}

function checkIfTooBig(number) {
  if (number.toString().length > 10) {
    return "Too big";
  } else {
    return number;
  }
}

function operate(num1, num2, operator) {
  if (operator == "+") {
    answer = add(parseFloat(num1), parseFloat(num2));
    answer = toFixedIfNecessary(answer, 2);
    answer = checkIfTooBig(answer);
    return answer;
  } else if (operator == "-") {
    answer = subtract(num1, num2);
    answer = toFixedIfNecessary(answer, 2);
    answer = checkIfTooBig(answer);
    return answer;
  } else if (operator == "*") {
    answer = multiply(num1, num2);
    answer = toFixedIfNecessary(answer, 2);
    answer = checkIfTooBig(answer);
    return answer;
  } else if (operator == "/") {
    answer = divide(num1, num2);
    answer = toFixedIfNecessary(answer, 2);
    answer = checkIfTooBig(answer);
    return answer;
  }
}

let buttons = document.querySelectorAll("button");
let display = document.querySelector(".display");
display.textContent = "0";

let num1;
function storeValue1(num) {
  num1 = parseFloat(num);
}

let operator;
function storeOperator(value) {
  operator = value;
}

let triggerOnce;
let triggerAC;
let triggeredEqual;

function getNumber(e) {
  if (display.textContent == "0" || display.textContent == "Too big") {
    display.textContent = e.target.textContent;
  } else {
    display.textContent = display.textContent + e.target.textContent;
  }
}

function getValue(e) {
  if (e.target.textContent == "=") {
    if (triggerOnce == false) {
      num2 = display.textContent;
      display.textContent = operate(num1, num2, operator);
      triggerOnce = false;
      triggeredEqual = true;
    }
  }

  if (
    e.target.textContent == "+" ||
    e.target.textContent == "-" ||
    e.target.textContent == "*" ||
    e.target.textContent == "/"
  ) {
    if (triggerOnce == false && triggerAC == false && triggeredEqual == false) {
      num2 = display.textContent;
      display.textContent = operate(num1, num2, operator);
    }
    storeValue1(display.textContent);
    storeOperator(e.target.textContent);
    triggerOnce = true;
    triggerAC = false;
    triggeredEqual = false;
  }

  if (e.target.textContent == "+/-") {
    if (parseInt(display.textContent) < 0) {
      display.textContent = `${-display.textContent}`;
    } else {
      display.textContent = `${-display.textContent}`;
    }
  }

  if (e.target.textContent == ".") {
    if (!display.textContent.includes(".")) {
      display.textContent = display.textContent + ".";
    }
  }

  if (e.target.textContent == "%") {
    display.textContent = operate(display.textContent, 100, "*");
  }

  if (e.target.textContent == "AC") {
    display.textContent = "0";
    triggerAC = true;
    num1 = 0;
  }
}

function getTarget(e) {
  if (triggerOnce) {
    display.textContent = "";
    triggerOnce = false;
  }
  if (!isNaN(e.target.textContent) && display.textContent.length < 8) {
    getNumber(e);
  }

  if (isNaN(e.target.textContent)) {
    getValue(e);
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", getTarget);
});
