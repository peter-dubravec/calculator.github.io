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
let intermediateresult = document.querySelector(".intermediateresult");

function addMargin() {
  display.style.marginTop = "20px";
}

function removeMargin() {
  display.style.marginTop = "-6px";
}

addMargin();

let triggerOnce;
let triggeredEqual;
let operator;
let changeOperator = false;
let alreadyHaveNumber = false;
let triggeredAC;
let changedOperator;
let answer;
let pressedOperator;

function addIntermediateResult(num1, operator) {
  removeMargin();
  intermediateresult.textContent = `${num1} ${operator}`;
}

function getNumber(number) {
  if (display.textContent == "0" || display.textContent == "Too big") {
    display.textContent = number;
  } else {
    display.textContent = display.textContent + number;
  }
}

function operateNumbers(num1, num2, operator) {
  display.textContent = operate(num1, num2, operator);
  answer = true;
}

function storeValues(chosenOperator) {
  num1 = display.textContent;
  operator = chosenOperator;

  addIntermediateResult(num1, operator);

  triggerOnce = true;
  alreadyHaveNumber = true;
  triggeredEqual = false;
  triggeredAC = false;
  changedOperator = false;
}

function handleIntermediateResult() {
  intermediateresult.textContent = "";
  addMargin();
}

function getValue(numberOrChar) {
  if (
    (numberOrChar == "=" || numberOrChar == "Enter") &&
    triggeredEqual == false &&
    pressedOperator != true &&
    display.textContent != ""
  ) {
    num2 = display.textContent;
    display.textContent = operate(num1, num2, operator);
    triggeredEqual = true;
    answer = true;
    intermediateresult.textContent = `${num1} ${operator} ${num2} =`;
  }

  if (
    (numberOrChar == "+" ||
      numberOrChar == "-" ||
      numberOrChar == "*" ||
      numberOrChar == "/") &&
    display.textContent != ""
  ) {
    if (answer == true) {
      operator = numberOrChar;
      changedOperator = true;
    }

    if (
      alreadyHaveNumber == true &&
      triggeredAC == false &&
      triggeredEqual == false &&
      changedOperator == false
    ) {
      operateNumbers(num1, display.textContent, operator);
    }

    storeValues(numberOrChar);
    pressedOperator = true;
  }

  if (numberOrChar == "DEL" || numberOrChar == "Backspace") {
    display.textContent = display.textContent.substring(
      0,
      display.textContent.length - 1
    );
    if (answer) {
      handleIntermediateResult();
    }
  }

  if (numberOrChar == ".") {
    if (!display.textContent.includes(".")) {
      display.textContent = display.textContent + ".";
      if (answer) {
        handleIntermediateResult();
      }
    }
  }

  if (numberOrChar == "%" && display.textContent != "") {
    display.textContent = operate(display.textContent, 100, "*");
    handleIntermediateResult();
  }

  if (numberOrChar == "AC" || numberOrChar == " ") {
    console.log(numberOrChar);
    display.textContent = "0";
    num1 = 0;
    triggeredAC = true;
    handleIntermediateResult();
  }
}

function getTarget(e) {
  if (e.key) {
    numberOrChar = e.key;
  } else {
    numberOrChar = e.target.textContent;
  }
  if (numberOrChar == ".") {
    triggerOnce = false;
  }

  if (triggerOnce && !isNaN(numberOrChar)) {
    display.textContent = "";
    triggerOnce = false;
  }

  if (!isNaN(numberOrChar) && display.textContent.length < 8) {
    pressedOperator = false;
    if (answer == true) {
      answer = false;
    }
    if (triggeredEqual == true) {
      handleIntermediateResult();
    }

    getNumber(numberOrChar);
  }

  if (
    [
      "+",
      "-",
      "*",
      "/",
      "AC",
      "%",
      "DEL",
      "Enter",
      " ",
      "Backspace",
      "=",
      ".",
    ].indexOf(numberOrChar) > -1
  ) {
    getValue(numberOrChar);
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", getTarget);
});

document.addEventListener("keydown", getTarget);
