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
        if (str.includes("error")) {
          setStr("");
        } else {
          setStr(str.slice(0, -1));
        }
        break;
      case "CC":
        if (str.includes("error")) {
          setStr("");
        } else {
          setStr(str.split(regexps.operations).length === 2 ? str.split(regexps.operations)[0] : "");
        }
        break;
      case "=":
        if (str.includes("error")) {
          setStr("error");
        } else {
          handleEqual(str);
        }
        break;
      case "±":
        if (str.includes("error")) {
          setStr("error");
        } else {
          const splitByOperation = str.split(regexps.operations);
          const operation = str.match(regexps.operations);
          if (splitByOperation.length === 1) {
            setStr(str.includes("±") ? str.replace("±", "") : "±" + str);
          } else {
            setStr(
              splitByOperation[0] +
                operation +
                (splitByOperation[1].includes("±") ? splitByOperation[1].replace("±", "") : "±" + splitByOperation[1])
            );
          }
        }
        break;
      case "to wrong":
      case "to mixed":
        if (str.includes("error")) {
          setStr("error");
        } else {
          const [first, second] = stringToData(str);
          const operation2 = str.match(regexps.operations);
          setStr(first.toString(key) + (operation2 ? operation2 : "") + (second ? second.toString(key) : ""));
          break;
        }
      case "÷":
      case "→":
        if (str.includes("error")) {
          setStr("error");
        } else {
          const splitByOperation1 = str.split(regexps.operations);
          const operation1 = str.match(regexps.operations);
          if (splitByOperation1.length === 1) {
            setStr(str.includes(key) ? str : str + key);
          } else {
            setStr(
              splitByOperation1[0] +
                operation1 +
                (splitByOperation1[1].includes(key) ? splitByOperation1[1] : splitByOperation1[1] + key)
            );
          }
        }
        break;
      default:
        if (str.includes("error")) {
          setStr("error");
        } else {
          setStr(str + key);
        }
    }
  }

  function handleEqual(string) {
    const [first, second] = stringToData(string);
    const operation = string.match(regexps.operations)[0];

    switch (operation) {
      case "+":
        setStr(first.sum(second));
        break;
      case "-":
        setStr(first.sub(second));
        break;
      case "*":
        setStr(first.mult(second));
        break;
      case "/":
        if (second.toString() == 0) {
          setStr("error");
        } else {
          setStr(first.div(second));
        }
        break;
      case "^":
        setStr(first.pow(second));
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
