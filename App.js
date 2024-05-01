import { useState } from "react";
import Keyboard from "./src/Keyboard/Keyboard";
import { Input } from "./src/Input/Input";

export default function App() {
  const [str, setStr] = useState("");

  function keyManager(key) {
    switch (key) {
      case "C":
        return setStr("");
      default:
        setStr(str + key);
    }
  }

  function handleEqual() {}

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
