import { useState } from "react";
import Keyboard from "./src/Keyboard/Keyboard";
import { Input } from "./src/Input/Input";
import { stringToData } from "./src/utils/stringToData";
import { regexps } from "./src/shared/regexps";
import { Button } from "react-native";

export default function App() {
  const [str, setStr] = useState("");
  const [vievType, setVievType] = useState("improper");

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
        setStr(first.sum(second).toString(vievType));
        break;
      case "-":
        setStr(first.sub(second).toString(vievType));
        break;
      case "*":
        setStr(first.mult(second).toString(vievType));
        break;
      case "/":
        setStr(first.div(second).toString(vievType));
        break;
    }
  }

  function changeVievOfFraction() {
    setVievType(vievType === "improper" ? "mixed" : "improper");
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
      <div>
        <Input value={str} vievType={vievType} />
        <div style={{ width: "22%", position: "absolute", zIndex: 2, right: "8%", top: "25%" }}>
          <Button title={vievType} onPress={() => changeVievOfFraction()} color={"gray"}></Button>
        </div>
      </div>
      <Keyboard onKeyPress={(key) => keyManager(key)} />
    </main>
  );
}
