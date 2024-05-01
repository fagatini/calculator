import { useState } from "react";
import Keyboard from "./src/Keyboard/Keyboard";
import { Input } from "./src/Input/Input";
import { stringToData } from "./src/utils/stringToData";
import { regexps } from "./src/shared/regexps";

function handleEqual(string) {
  const [first, second] = stringToData(string);
  const operation = string.match(regexps.operations);
  switch (operation) {
    case "+":
      first.sum(second);
      return;
    case "-":
      first.sub(second);
      return;
    case "*":
      first.mult(second);
      return;
    case "/":
      first.div(second);
      return;
  }
}

export default function App() {
  const [str, setStr] = useState("");

  function keyManager(key) {
    switch (key) {
      case "C":
        return setStr("");
      case "=":
        return handleEqual(str);
      default:
        setStr(str + key);
    }
  }

  return (
    <main
      style={{
        backgroundColor: "#fdfcdc",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center ",
        gap: 40,
      }}
    >
      <Input value={str} />
      <Keyboard onKeyPress={(key) => keyManager(key)} />
    </main>
  );
}
