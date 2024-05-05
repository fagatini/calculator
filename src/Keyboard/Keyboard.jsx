import React from "react";
import { Button } from "react-native";

const Keyboard = ({ onKeyPress }) => {
  const buttons = [
    ["C", "c1", "→", "|"],
    ["7", "8", "9", "*"],
    ["4", "5", "6", "-"],
    ["1", "2", "3", "+"],
    ["=", "0", "±", "/"],
  ];

  function getColorForButton(key) {
    switch (key) {
      case "C":
      case "c1":
        return "#f07167";
      case "=":
      case "+":
      case "-":
      case "*":
      case "/":
      case "|":
      case "()":
      case "±":
      case "→":
        return "#0081a7";
      default:
        return "#00afb9";
    }
  }

  function handlePress(key) {
    onKeyPress(key);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {buttons.map((row, index) => {
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-evenly",
            }}
            key={index}
          >
            {row.map((button) => (
              <div style={{ width: "20%" }} key={button}>
                <Button title={button} color={getColorForButton(button)} onPress={() => handlePress(button)}></Button>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;
