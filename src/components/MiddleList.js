import React from "react";

export default function MiddleList({ children }) {
  return (
    <>
      <div
        style={{
          height: "100%",
          flex: "1 1 20%",
          borderRight: "1px solid black"
        }}
      >
        {children}
      </div>
    </>
  );
}
