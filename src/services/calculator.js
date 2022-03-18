export default function execOperation(operation, input) {
  if (operation === "0") return;

  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    x: (a, b) => a * b,
    "/": (a, b) => {
      return a !== 0 && b !== 0 ? a / b : 0;
    }
  };

  const a = Number(removeLastChar(operation));
  const operator = operation.slice(-1);
  const b = Number(input);
  const result = operators[operator](a, b);
  return isDecimal(result) ? fixDecimal(result) : result;
}

export function removeLastChar(text) {
  return text.slice(0, -1);
}

export function isDecimal(number) {
  return ("" + number).split("").includes(".");
}

function fixDecimal(number) {
  const numArray = ("" + number).split(".");
  const decimales = numArray[1].split("");
  console.log(decimales);

  //

  if (decimales.length >= 16) {
    // 11 / 6
    // 1.5 + 1.22
    if (decimales[1] === "0") return Number(number).toFixed(1);
    else if (decimales[1] === "9") {
      const newDecimal = Number(numArray[1].slice(0, 2)) + 1;
      return Number(`${numArray[0]}.${newDecimal}`).toFixed(1);
    } else if (decimales[2] === "9") {
      const newDecimal = Number(numArray[1].slice(0, 2)) + 1;
      return Number(`${numArray[0]}.${newDecimal}`).toFixed(2);
    } else {
      const customFixed = decimales.findIndex((num) => num === "0");
      return Number(number).toFixed(customFixed + 1);
    }
  }
  return Number(number).toFixed(decimales.length);
}
