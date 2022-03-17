import { useState } from "react";
import "./styles.css";

export default function App() {
  // state
  const [input, setInput] = useState("0"); // captura
  const [operation, setOperation] = useState("0"); // staging o lo de arriba
  const [inputHasOperator, setInputHasOperator] = useState(false);
  const [operacionPendiente, setOperacionPendiente] = useState(false);
  const [isInputDecimal, setIsInputDecimal] = useState(false);

  const handleNumber = (event) => {
    if (inputHasOperator) {
      setInputHasOperator(false);
      setOperation(input);
      setOperacionPendiente(true);
      setInput(event.target.value);
      setIsInputDecimal(false);
      return;
    }

    if (Number(input) === 0 && !isInputDecimal) {
      setInput(event.target.value);
    } else {
      setInput((inputValue) => `${inputValue}${event.target.value}`);
    }
  };

  // manejaremos las operaciones aritmeticas
  const handleOperation = (event) => {
    switch (event.target.value) {
      case "/":
      case "x":
      case "-":
      case "+":
        if (operacionPendiente) {
          execOperation();
        }
        if (inputHasOperator) {
          const tempinput = removeLastChar(input);
          setInput(`${tempinput}${event.target.value}`);
        } else {
          setInput((inputValue) => `${inputValue}${event.target.value}`);
        }
        setInputHasOperator(true);
        break;
      case ".":
        if (!isInputDecimal) {
          setInput((inputValue) => `${inputValue}.`);
          setIsInputDecimal(true);
        }
        break;
      case "=":
        execOperation();
        break;
      default:
        break;
    }
  };

  // manejaremos los DEL,C, CE
  const handleInput = (event) => {
    switch (event.target.value) {
      // borra todo el input
      case "CE":
        setInput("0");
        break;
      // borra todo
      case "C":
        setInput("0");
        setOperation("0");
        setOperacionPendiente(false);
        setIsInputDecimal(false);
        break;
      case "DEL":
        setInput((inputValue) => {
          if (input.length > 1) {
            return inputValue.slice(-1);
          } else {
            return "0";
          }
        });
        break;
      default:
        break;
    }
  };

  // funciones
  const removeLastChar = (text) => text.slice(0, -1);

  const execOperation = () => {
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
    setOperation("0");
    setInput(result);
    setOperacionPendiente(false);
  };

  return (
    <div className="App">
      <h1>React Calculator App</h1>
      <div className="calculator">
        <div className="calculator__screen">
          <div className="operation">{operation}</div>
          <div className="input">{input}</div>
        </div>
        <div className="calculator__pad">
          <Button onClick={handleInput} value="C" />
          <Button onClick={handleInput} value="CE" />
          <Button onClick={handleInput} value="DEL" />
          <Button onClick={handleOperation} value="/" />
          <Button onClick={handleNumber} value={7} />
          <Button onClick={handleNumber} value={8} />
          <Button onClick={handleNumber} value={9} />
          <Button onClick={handleOperation} value="x" />
          <Button onClick={handleNumber} value={4} />
          <Button onClick={handleNumber} value={5} />
          <Button onClick={handleNumber} value={6} />
          <Button onClick={handleOperation} value="-" />
          <Button onClick={handleNumber} value={1} />
          <Button onClick={handleNumber} value={2} />
          <Button onClick={handleNumber} value={3} />
          <Button onClick={handleOperation} value="+" />
          <Button onClick={handleNumber} cols="2" value={0} />
          <Button onClick={handleOperation} value="." />
          <Button onClick={handleOperation} value="=" />
        </div>
      </div>
    </div>
  );
}

function Button({ value, cols = 1, rows = 1, onClick }) {
  // inline styles
  const style = {
    border: "1px solid #b3b3b3",
    borderRadius: "5px",
    backgroundColor: "#fff",
    cursor: "pointer",
    gridColumn: `span ${cols}`,
    gridRows: `span ${rows}`
  };
  return (
    <button onClick={(event) => onClick(event)} style={style} value={value}>
      {value}
    </button>
  );
}
