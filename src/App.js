import { useState } from "react";
import "./styles.css";
import execOperation, {
  removeLastChar,
  isDecimal
} from "./services/calculator";

export default function App() {
  // state
  const [input, setInput] = useState("0"); // captura
  const [operation, setOperation] = useState("0"); // staging o lo de arriba
  const [isInputDecimal, setIsInputDecimal] = useState(false);
  const [inputHasOperator, setInputHasOperator] = useState(false);
  const [operacionPendiente, setOperacionPendiente] = useState(false);

  // handlers
  const handleNumber = (event) => {
    if (inputHasOperator) {
      setOperation(input);
      setInput(event.target.value);
      setOperacionPendiente(true);
      setInputHasOperator(false);
      setIsInputDecimal(false);
      return;
    }

    if (input.length >= 17) return;

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
          const result = execOperation(operation, input);
          setOperation("0");
          setInput(result);
          setOperacionPendiente(false);
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
        if (operation === "0") return;
        const result = execOperation(operation, input);
        setInput(result);
        setOperation("0");
        setInputHasOperator(false);
        setOperacionPendiente(false);
        setIsInputDecimal(isDecimal(result));
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
        setIsInputDecimal(false);
        setInputHasOperator(false);
        setOperacionPendiente(false);
        break;
      case "DEL":
        setInput((inputValue) => {
          if (input.length > 1) {
            return removeLastChar(inputValue);
          } else {
            return "0";
          }
        });
        break;
      default:
        break;
    }
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
    border: "2px solid #b3b3b3",
    borderRadius: "5px",
    backgroundColor: "#fff",
    cursor: "pointer",
    gridColumn: `span ${cols}`,
    gridRows: `span ${rows}`,
    fontWeight: "bold"
  };
  return (
    <button onClick={(event) => onClick(event)} style={style} value={value}>
      {value}
    </button>
  );
}
