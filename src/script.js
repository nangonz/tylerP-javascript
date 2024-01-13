const keys = document.querySelectorAll(".key");
const display_input = document.querySelector(".display .input");
const display_output = document.querySelector(".display .output");

let input = "";

for (let key of keys) {
  const value = key.dataset.key;

  key.addEventListener("click", () => {
    if (value == "clear") {
      clearScreen();
    } else if (value == "backspace") {
      deleteChar();
    } else if (value == "=") {
      resolveOperation();
    } else if (value == "brackets") {
      if (
        input.indexOf("(") == -1 ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") < input.lastIndexOf(")"))
      ) {
        input += "(";
      } else if (
        (input.indexOf("(") != -1 && input.indexOf(")") == -1) ||
        (input.indexOf("(") != -1 &&
          input.indexOf(")") != -1 &&
          input.lastIndexOf("(") > input.lastIndexOf(")"))
      ) {
        input += ")";
      }
      display_input.innerHTML = cleanInput(input);
    } else {
      if (validateInput(value)) {
        input += value;
        display_input.innerHTML = cleanInput(input);
      }
    }
  });
}

function cleanInput(input) {
  let input_array = input.split("");
  let input_array_length = input_array.length;

  for (let i = 0; i < input_array_length; i++) {
    if (input_array[i] == "*") {
      input_array[i] = ` <span class="operator">x</span> `;
    } else if (input_array[i] == "/") {
      input_array[i] = ` <span class="percent">÷</span> `;
    } else if (input_array[i] == "%") {
      input_array[i] = ` <span class="operator">%</span> `;
    } else if (input_array[i] == "+") {
      input_array[i] = ` <span class="operator">+</span> `;
    } else if (input_array[i] == "-") {
      input_array[i] = ` <span class="operator">-</span> `;
    } else if (input_array[i] == "(") {
      input_array[i] = ` <span class="brackets">(</span> `;
    } else if (input_array[i] == ")") {
      input_array[i] = ` <span class="brackets">)</span> `;
    }
  }
  return input_array.join("");
}

function cleanOutput(output) {
  let output_string = output.toString();
  let decimal = output_string.split(".")[1];
  output_string = output_string.split(".")[0];

  let output_array = output_string.split("");

  if (output_array.length > 3) {
    if (output_array.length == 4 && output_array[0] == "-") {
      return output_array.join("");
    }
    for (let i = output_array.length - 3; i > 0; i -= 3) {
      output_array.splice(i, 0, ",");
    }
  }

  if (decimal) {
    output_array.push(".");
    output_array.push(decimal);
  }

  return output_array.join("");
}

function validateInput(value) {
  // obtiene el último caracter del input
  let last_input = input.slice(-1);
  let operators = ["*", "/", "+", "-"];
  // evita que se introduzca mas de un "." decimal
  if (value == "." && last_input == ".") return false;
  // evita que se introduzcan dos operadores seguidos
  if (operators.includes(value)) {
    if (operators.includes(last_input)) {
      return false;
    } else {
      return true;
    }
  }
  return true;
}

function prepareInput(input) {
  let input_array = input.split("");

  for (let i = 0; i < input_array.length; i++) {
    if (input_array[i] == "%") {
      input_array[i] = "/100";
    }
  }
  return input_array.join("");
}

function clearScreen() {
  input = "";
  display_input.innerHTML = "";
  display_output.innerHTML = "";
}

function deleteChar() {
  input = input.slice(0, -1);
  display_input.innerHTML = cleanInput(input);
}

function resolveOperation() {
  let result = eval(prepareInput(input));
  display_output.innerHTML = cleanOutput(result);
}
