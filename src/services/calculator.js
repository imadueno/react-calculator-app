export default function execOperation(operation, input) {
  if (operation === "0") return;

  const operators = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    x: (a, b) => a * b,
    "/": (a, b) => a / b
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

  //

  if (decimales.length >= 16) {
    // el segundo decimal es cero => a.b
    if (decimales[1] === "0") return Number(number).toFixed(1);
    // el segundo decimal es 9 => 19 + 1 => 20 => n.2
    else if (decimales[1] === "9") {
      const newDecimal = Number(numArray[1].slice(0, 2)) + 1;
      return Number(`${numArray[0]}.${newDecimal}`).toFixed(1);
      // el tercer decimal es 9 => 129 + 1 => 130 => n.13
    } else if (decimales[2] === "9") {
      const newDecimal = Number(numArray[1].slice(0, 2)) + 1;
      return Number(`${numArray[0]}.${newDecimal}`).toFixed(2);
      // no hay ceros o nueves
    } else {
      return Number(number).toFixed(2);

      // const firstDecimalDigit = decimales.slice(0, 1);
      // const decimalCount = decimales.filter((num) => num === firstDecimalDigit);

      // if (decimalCount.length === decimales.length) {
      // }
    }
  }
  return Number(number).toFixed(decimales.length);
}
