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
      case "C1":
        setStr(str.slice(0, -1));
        break;
      case "CC":
        setStr(str.split(regexps.operations).length === 2 ? str.split(regexps.operations)[0] : "");
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
    if (string.includes("error")) {
      setStr("error");
      return;
    }

    const [first, second] = stringToData(string);
    if (!second) {
      setStr(first.nod().toString());
      return;
    }

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
        if (second.toString() == 0) {
          setStr("error");
        } else {
          setStr(first.div(second).toString());
        }
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
        gap: 50,
      }}
    >
      <div>
        <Input value={str} />
      </div>
      <Keyboard onKeyPress={(key) => keyManager(key)} />
    </main>
  );
}
