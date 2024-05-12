import { useState } from "react";
import Keyboard from "./src/Keyboard/Keyboard";
import { Input } from "./src/Input/Input";
import { stringToData } from "./src/utils/stringToData";
import { regexps } from "./src/shared/regexps";

export default function App() {
  const [str, setStr] = useState("");

  function keyManager(key) {
    switch (key) {
      case "C":
        setStr("");
        break;
      case "c1":
        setStr(str.slice(0, -1));
        break;
      case "=":
        handleEqual(str);
        break;
      case "±":
        setStr(str.endsWith("±") ? str.slice(0, -1) : str + "±");
        break;
      default:
        setStr(str + key);
    }
  }

  function handleEqual(string) {
    const [first, second] = stringToData(string);
    const operation = string.match(regexps.operations)[0];

    switch (operation) {
      case "+":
        setStr(first.sum(second).toString());
        break;
      case "-":
        setStr(first.sub(second).toString());
        break;
      case "*":
        setStr(first.mult(second).toString());
        break;
      case "/":
        setStr(first.div(second).toString());
        break;
      case "^":
        setStr(first.pow(second).toString());
        break;
    }
  }

  return (
    <main
      style={{
        backgroundColor: "#10451d",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center ",
        gap: 40,
      }}
    >
      <div>
        <Input value={str} />
      </div>
      <Keyboard onKeyPress={(key) => keyManager(key)} />
    </main>
  );
}
