//HTMLの要素を取得して変数に格納する
const display = document.getElementById("display");
const buttons = document.querySelectorAll(".calculator-button");
let currentExpression = "";

//数字や演算子ボタンを押したら表示される
buttons.forEach(function(button) {
  button.addEventListener("click", function() {
    buttonPressed(button);
  });
});

//問題が起きないか確認する関数
function checkExpression(value, lastChar) {
  const operators = ["*", "/", "+", "-"];

  if (operators.includes(value) && operators.includes(lastChar)) {
    return false;
  }

  if (operators.includes(value) && currentExpression === "") {
    return false;
  }

  if (currentExpression === "" && value === "0") {
    return false;
  }

  if (value === ".") {
    if (currentExpression === "" || lastChar === ".") {
      return false;
    }
    else {
      let i = currentExpression.length -1;
      while (i >= 0) {
        let checkChar = currentExpression.charAt(i);
        if (operators.includes(checkChar)) {
          break;
        }
        if (checkChar === ".") {
          return false;
        }
        i--;
      }
    }
  }
  return true;
}

//×と÷の表示用の関数
function formatOperator(expression) {
  return expression.replaceAll("*", "×").replaceAll("/", "÷");
}

//ボタンを押したときの挙動
function buttonPressed(button) {
  let value = button.value;
  let lastChar = currentExpression.slice(-1);
  let checkResult = checkExpression(value, lastChar);

  if (checkResult === false) {
    return false;
  }

  else if (checkResult === true) {
  if (value === "equal") {
    if (currentExpression !== "") {
      let result = eval(currentExpression);
      display.textContent = result;
      currentExpression = "";
    }
  }
  
  else if (value === "all_clear") {
    currentExpression = "";
    display.textContent = "0";
  }
  
  else if (value === "backspace") {
    currentExpression = currentExpression.slice(0, -1);
    if (currentExpression === "") {
      display.textContent = "0";
    }
    else {
      display.textContent = currentExpression;
    }
  }

  else if (value === "*" || value === "/") {
    currentExpression += value;
    display.textContent = formatOperator(currentExpression);
  }

  else {
    currentExpression += value;
    display.textContent = formatOperator(currentExpression);
  }
}
}
