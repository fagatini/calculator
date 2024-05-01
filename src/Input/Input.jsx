import React from "react";

export const Input = ({ value }) => {
  return (
    <div style={{ backgroundColor: "#fed9b7", borderRadius: 15, marginLeft: "4%", width: "92%", paddingLeft: 15 }}>
      <p>{value}</p>
    </div>
  );
};
