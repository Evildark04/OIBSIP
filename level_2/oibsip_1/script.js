let output = document.getElementById("output");
let historyList = document.getElementById("history-list");
let history = [];
let currentIndex = -1;
let answer = "";

function addToOutput(value) {
  output.value += value;
}

function clearOutput() {
  output.value = output.value.slice(0, -1);
}

function clearAll() {
  output.value = "";
  answer = "";
  currentIndex = -1;
  updateArrowButtons();
}

function clearHistory() {
  historyList.innerHTML = "";
  history = [];
  currentIndex = -1;
  updateArrowButtons();
  updateClearHistoryButton();
}

function storeAnswer() {
  answer = getAnswer();
  addToOutput(answer);
  currentIndex = history.findIndex((item) => item.result !== "");
  updateArrowButtons();
}

function calculate() {
  let expression = output.value.trim();

  if (!expression) {
    alert("Please enter an expression to calculate");
    return;
  }

  try {
    let result = eval(expression);
    output.value = result;

    let historyItem = document.createElement("li");
    historyItem.textContent = expression + " = " + result;
    historyList.appendChild(historyItem);

    history.push({
      expression: expression,
      result: result,
    });
    currentIndex = history.length - 1;
    updateArrowButtons();
    updateClearHistoryButton();

    history.splice(0, currentIndex);
    currentIndex = -1;

  } catch (error) {
    if (error instanceof SyntaxError) {
      alert("Invalid expression. Please enter a valid mathematical expression.");
    }
  }
}



function navigateHistory(direction) {
  if (history.length === 0) {
    return;
  }

  if (direction === "up") {
    if (currentIndex === -1) {
      currentIndex = history.length - 1;
    } else {
      currentIndex = Math.max(currentIndex - 1, 0);
    }
  } else if (direction === "down") {
    if (currentIndex === -1) {
      return;
    } else {
      currentIndex = Math.min(currentIndex + 1, history.length - 1);
    }
  }

  if (output.value !== "" && output.value !== answer) {
    let confirmation = confirm("Warning: You are about to lose unsaved changes.\nPress '=' to save to History!!");
    if (!confirmation) {
      return;
    }
  }

  output.value = history[currentIndex].expression;
  answer = history[currentIndex].result;
  updateArrowButtons();
}


function getAnswer() {
  return history[currentIndex]?.result || "";
}

function updateArrowButtons() {
  const upArrowButton = document.getElementById("upArrow");
  const downArrowButton = document.getElementById("downArrow");

  if (history.length === 0) {
    upArrowButton.disabled = true;
    downArrowButton.disabled = true;
  } else if (history.length === 1) {
    upArrowButton.disabled = true;
    downArrowButton.disabled = true;
  } else if (currentIndex === -1) {
    upArrowButton.disabled = true;
    downArrowButton.disabled = false;
  } else if (currentIndex === 0) {
    upArrowButton.disabled = true;
    downArrowButton.disabled = false;
  } else if (currentIndex === history.length - 1) {
    upArrowButton.disabled = false;
    downArrowButton.disabled = true;
  } else {
    upArrowButton.disabled = false;
    downArrowButton.disabled = false;
  }
}


function updateClearHistoryButton() {
  const clearHistoryButton = document.getElementById("clear-history");
  clearHistoryButton.disabled = history.length === 0;
}

updateArrowButtons();

output.addEventListener("input", function () {
  if (output.value) {
    currentIndex = -1;
    updateArrowButtons();
  }
});

document.getElementById("upArrow").addEventListener("click", function () {
  navigateHistory("up");
});

document.getElementById("downArrow").addEventListener("click", function () {
  navigateHistory("down");
});

document.getElementById("ac").addEventListener("click", clearAll);

document.getElementById("clear-history").addEventListener("click", clearHistory);

document.querySelector(".ans").addEventListener("click", storeAnswer);
