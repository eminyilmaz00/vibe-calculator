const expressionEl = document.getElementById("expression");
const resultEl = document.getElementById("result");
const buttons = document.querySelectorAll(".buttons .btn");
const historyList = document.getElementById("historyList");
const clearHistoryBtn = document.getElementById("clearHistory");

let expression = "";
let history = [];

const MAX_HISTORY = 10;

const isOperator = (ch) => ["+", "-", "*", "/"].includes(ch);

const appendValue = (value) => {
  // Prevent duplicate decimals in a single number chunk.
  if (value === ".") {
    const lastChunk = expression.split(/[\+\-\*\/]/).pop();
    if (lastChunk.includes(".")) return;
  }

  // Prevent starting with an operator or doubling operators,
  // but allow unary minus where appropriate.
  if (isOperator(value)) {
    const lastChar = expression.slice(-1);

    // Allow unary minus at the start or right after an opening parenthesis,
    // e.g., "-15" or "sin(-30)".
    if (value === "-" && (expression === "" || lastChar === "(")) {
      expression += value;
      updateDisplay(expression);
      return;
    }

    if (!expression) return;

    // Replace the previous operator if user presses another operator,
    // EXCEPT when typing "-" after *, /, or + (we want "5 * -5", not "5 -5").
    if (isOperator(lastChar)) {
      const isLastStrongOp = lastChar === "*" || lastChar === "/" || lastChar === "+";
      if (value === "-" && isLastStrongOp) {
        // Treat this as a unary minus after an operator, so just append.
        expression += value;
        updateDisplay(expression);
        return;
      }

      expression = expression.slice(0, -1) + value;
      updateDisplay(expression);
      return;
    }
  }

  expression += value;
  updateDisplay(expression);
};

const applyFunction = (fn) => {
  // Wrap the current expression or number with a function call.
  if (!expression) return;
  expression = `${fn}(${expression})`;
  calculate(true);
};

const updateDisplay = (expr, res = null) => {
  expressionEl.textContent = expr || "";
  resultEl.textContent = res !== null ? res : expr || "0";
};

const sanitizeExpression = (expr) => {
  // Replace safe display characters with JS equivalents.
  return expr.replace(/÷/g, "/").replace(/×/g, "*");
};

const evaluateExpression = (expr) => {
  const sanitized = sanitizeExpression(expr);
  const evaluator = new Function(
    "Math",
    "sin",
    "cos",
    "tan",
    "log",
    "sqrt",
    `"use strict"; return (${sanitized});`
  );
  return evaluator(
    Math,
    (v) => Math.sin((v * Math.PI) / 180),
    (v) => Math.cos((v * Math.PI) / 180),
    (v) => Math.tan((v * Math.PI) / 180),
    (v) => Math.log10(v),
    (v) => Math.sqrt(v)
  );
};

const calculate = (silent = false) => {
  if (!expression) return;
  const originalExpr = expression;
  try {
    const raw = evaluateExpression(originalExpr);
    const result = Number.isFinite(raw) ? parseFloat(raw.toFixed(10)) : "Error";
    updateDisplay(silent ? originalExpr : "", result);
    if (!silent && result !== "Error") {
      pushHistory(originalExpr, result);
      expression = `${result}`;
    }
  } catch (err) {
    updateDisplay(originalExpr, "Error");
  }
};

const pushHistory = (expr, res) => {
  history.unshift({ expr, res });
  history = history.slice(0, MAX_HISTORY);
  renderHistory();
};

const renderHistory = () => {
  historyList.innerHTML = "";
  if (!history.length) {
    const empty = document.createElement("li");
    empty.className = "history-empty";
    empty.textContent = "No calculations yet";
    historyList.appendChild(empty);
    return;
  }

  history.forEach((item) => {
    const li = document.createElement("li");
    const expr = document.createElement("span");
    expr.className = "history-expression";
    expr.textContent = item.expr;

    const res = document.createElement("span");
    res.className = "history-result";
    res.textContent = item.res;

    li.appendChild(expr);
    li.appendChild(res);

    li.addEventListener("click", () => {
      expression = `${item.res}`;
      updateDisplay(expression);
    });

    historyList.appendChild(li);
  });
};

const clearAll = () => {
  expression = "";
  updateDisplay("", 0);
};

const backspace = () => {
  expression = expression.slice(0, -1);
  updateDisplay(expression || "0");
};

const applyAdvanced = (action) => {
  switch (action) {
    case "sin":
    case "cos":
    case "tan":
      applyFunction(action);
      break;
    case "log":
    case "sqrt":
      applyFunction(action);
      break;
    case "square":
      if (!expression) return;
      expression = `(${expression})**2`;
      calculate(true);
      break;
    default:
      break;
  }
};

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const value = btn.dataset.value;
    const action = btn.dataset.action;

    if (action === "clear") return clearAll();
    if (action === "backspace") return backspace();
    if (action === "equals") return calculate();

    if (action && !value) {
      return applyAdvanced(action);
    }

    if (value) {
      appendValue(value);
    }
  });
});

clearHistoryBtn.addEventListener("click", () => {
  history = [];
  renderHistory();
});

// Optional: basic keyboard support.
document.addEventListener("keydown", (e) => {
  if ((e.key >= "0" && e.key <= "9") || e.key === ".") {
    appendValue(e.key);
  } else if (["+", "-", "*", "/"].includes(e.key)) {
    appendValue(e.key);
  } else if (e.key === "Enter" || e.key === "=") {
    calculate();
  } else if (e.key === "Backspace") {
    backspace();
  } else if (e.key.toLowerCase() === "c") {
    clearAll();
  }
});

renderHistory();
updateDisplay("", 0);

