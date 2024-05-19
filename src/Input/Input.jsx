import React from "react";
import { StyleSheet } from "react-native";
import { regexps } from "../shared/regexps";
import { stringToFraction } from "../utils/stringToData";

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
    const fraction = stringToFraction(fractionText);
    return (
      <>
        {fraction.sign === -1 ? <p style={styles.negative}>—</p> : null}
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
    height: 90,
    width: "88%",
    backgroundColor: "#4ad66d",
    borderRadius: 15,
    marginLeft: "6%",
    paddingLeft: 15,
    paddingRight: 15,
    boxSizing: "border-box",
    overflow: "scroll",
    borderColor: "white",
    borderWidth: 2,
  },
  pStyle: {
    textAlign: "center",
    fontSize: 30,
    marginTop: 0,
    marginBottom: 0,
  },
  integer: {
    marginRight: 4,
  },
  fractionContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginRight: 10,
    marginTop: 4,
  },
  separator: {
    backgroundColor: "black",
    height: 3,
    width: "100%",
  },
  operation: {
    fontSize: 40,
    marginTop: 14,
    marginRight: 7,
  },
  negative: {
    fontSize: 30,
    marginLeft: 7,
    marginRight: 5,
  },
});
