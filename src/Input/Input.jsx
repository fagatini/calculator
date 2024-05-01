import React from "react";
import { StyleSheet } from "react-native";
import { regexps } from "../shared/regexps";

export const Input = ({ value: fractionText }) => {
  function parseValue(text) {
    const [first, second] = text.split(regexps.operations, 2);
    const operation = text[regexps.operations.exec(text)?.index];

    return (
      <>
        {first?.length ? parseFraction(first) : null}
        {operation ? <p style={styles.operation}>{operation}</p> : null}
        {second?.length ? parseFraction(second) : null}
      </>
    );
  }

  function parseFraction(fractionText) {
    const fraction = {};

    if (!fractionText.includes("→") && !fractionText.includes("|")) {
      fraction.integer = fractionText;
    } else if (fractionText.includes("→")) {
      fraction.integer = fractionText.slice(0, fractionText.indexOf("→"));
      if (fractionText.includes("|")) {
        fraction.numerator = fractionText.slice(fractionText.indexOf("→") + 1, fractionText.indexOf("|"));
        fraction.denominator = fractionText.slice(fractionText.indexOf("|") + 1, fractionText.lenght);
      } else {
        fraction.numerator = fractionText.slice(fractionText.indexOf("→") + 1, fractionText.lenght);
        fraction.denominator = "";
      }
    } else if (fractionText.includes("|")) {
      fraction.numerator = fractionText.slice(0, fractionText.indexOf("|"));
      fraction.denominator = fractionText.slice(fractionText.indexOf("|") + 1, fractionText.lenght);
    }

    return (
      <>
        <div style={styles.integer}>
          <p style={styles.pStyle}>{fraction.integer}</p>
        </div>
        <div style={styles.fractionContainer}>
          <p style={styles.pStyle}>{fraction.numerator}</p>
          <div style={styles.separator}></div>
          <p style={styles.pStyle}>{fraction.denominator}</p>
        </div>
      </>
    );
  }

  return <div style={styles.container}>{parseValue(fractionText)}</div>;
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 70,
    width: "92%",
    backgroundColor: "#fed9b7",
    borderRadius: 15,
    marginLeft: "4%",
    paddingLeft: 15,
    paddingRight: 15,
    boxSizing: "border-box",
    overflow: "scroll",
    borderColor: "black",
    borderWidth: 2,
  },
  pStyle: {
    textAlign: "center",
    marginTop: 0,
    marginBottom: 0,
  },
  integer: {
    marginRight: 5,
  },
  fractionContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginRight: 5,
  },
  separator: {
    backgroundColor: "black",
    height: 2,
    width: "100%",
  },
  operation: {
    marginRight: 5,
  },
});
