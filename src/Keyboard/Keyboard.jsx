import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const CustomButton = ({ title, onPress, color }) => {
  return (
    <TouchableOpacity style={{ ...styles.button, backgroundColor: color }} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const Keyboard = ({ onKeyPress }) => {
  const buttons = [
    ["C", "C1", "CC"],
    ["→", "÷", "±"],
    ["to wrong", "to mixed", "="],
    ["7", "8", "9"],
    ["4", "5", "6"],
    ["1", "2", "3"],
    ["*", "0", "^"],
    ["/", "+", "-"],
  ];

  function getColorForButton(key) {
    switch (key) {
      case "C":
      case "C1":
      case "CC":
        return "#f07167";
      case "+":
      case "-":
      case "*":
      case "/":
      case "^":
      case "()":
        return "#1a7431";
      case "to wrong":
      case "to mixed":
      case "±":
      case "→":
      case "=":
      case "÷":
        return "#40916c";
      default:
        return "#4ad66d";
    }
  }

  function handlePress(key) {
    onKeyPress(key);
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
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
              <CustomButton
                title={button}
                key={button}
                color={getColorForButton(button)}
                onPress={() => handlePress(button)}
                style={styles.button}
              ></CustomButton>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Keyboard;

const styles = StyleSheet.create({
  button: {
    width: "25%",
    padding: 10,
    borderRadius: 5,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});
