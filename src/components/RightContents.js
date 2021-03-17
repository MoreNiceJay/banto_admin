import React from "react";

export default function RightContents({ children }) {
  return (
    <>
      <div
        style={{
          height: "100%",
          flex: "1 1 50%",
          borderRight: "1px solid black"
        }}
      >
        {children}
      </div>
    </>
  );
}
