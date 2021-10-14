function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(num1, num2, operator) {
  if (operator == "+") {
    console.log(add(num1, num2));
  } else if (operator == "-") {
    console.log(subtract(num1, num2));
  } else if (operator == "*") {
    console.log(multiply(num1, num2));
  } else if (operator == "/") {
    console.log(divide(num1, num2));
  }
}

let buttons = document.querySelectorAll("button");
let display = document.querySelector(".display");
display.textContent = "0";

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (display.textContent.length > 9) {
      return;
    }

    if (!isNaN(display.textContent) && !isNaN(e.target.textContent)) {
      if (display.textContent == "0") {
        display.textContent = e.target.textContent;
      } else {
        display.textContent = display.textContent + e.target.textContent;
      }
    }

    if (
      isNaN(e.target.textContent) &&
      e.target.textContent != "=" &&
      e.target.textContent != "AC" &&
      e.target.textContent != "+/-" &&
      e.target.textContent != "."
    ) {
      let operator = e.target.textContent;
      temp = display.textContent;
      console.log(temp);
      let temp1 = true;
    }
  });
});
